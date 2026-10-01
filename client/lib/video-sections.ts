export type VideoAsset = {
  src: string;
  /** Optional fallback if the primary source fails. */
  fallbackSrc?: string;
  /** Still shown before playback. Omit for a black hold while the video loads. */
  poster?: string;
  objectPosition?: string;
  /** Portrait crop. Desktop `objectPosition` stays landscape-first. */
  objectPositionMobile?: string;
};

const openingStream =
  "https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065";

/** Stream master lists 1080p first (SCORE=5). Do not pass clientBandwidthHint. */
export const OPENING_STREAM_MASTER = `${openingStream}/manifest/video.m3u8`;

/** Same-origin rewrite: 720p first for a smaller first fragment, 1080p as the cap. */
export const OPENING_HLS_PROXY_PATH = "/api/opening-hls.m3u8";

export const HLS_START_HEIGHT = 720;
export const HLS_MAX_HEIGHT = 1080;

const OPENING_MANIFEST_TTL_MS = 45_000;
let openingManifestCache: { body: string; expires: number } | null = null;

export const openingVideo: VideoAsset = {
  src: OPENING_HLS_PROXY_PATH,
  fallbackSrc: OPENING_STREAM_MASTER,
  objectPosition: "center 30%",
  objectPositionMobile: "center 68%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}

type LevelLike = { height?: number };

function heightOf(level: LevelLike): number {
  return level.height ?? 0;
}

/**
 * First fragment near 720p. Never pick 240/360/480 when a 720p+ rung exists.
 */
export function pickHlsStartLevel(
  levels: LevelLike[],
  targetHeight = HLS_START_HEIGHT,
  minHeight = HLS_START_HEIGHT,
): number {
  if (levels.length === 0) {
    return -1;
  }

  const indexed = levels.map((level, index) => ({
    index,
    height: heightOf(level),
  }));
  const eligible = indexed.filter((level) => level.height >= minHeight);
  const pool = eligible.length > 0 ? eligible : indexed;

  let bestIndex = pool[0].index;
  let bestDiff = Infinity;
  for (const level of pool) {
    const diff = Math.abs(level.height - targetHeight);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = level.index;
    }
  }
  return bestIndex;
}

/** Highest rung at or below 1080p. */
export function pickHlsCapLevel(
  levels: LevelLike[],
  maxHeight = HLS_MAX_HEIGHT,
): number {
  if (levels.length === 0) {
    return -1;
  }

  let bestIndex = -1;
  let bestHeight = -1;
  levels.forEach((level, index) => {
    const height = heightOf(level);
    if (height <= maxHeight && height >= bestHeight) {
      bestHeight = height;
      bestIndex = index;
    }
  });
  return bestIndex;
}

type ParsedVariant = {
  height: number;
  inf: string;
  uri: string;
};

function resolveManifestUri(uri: string, masterUrl: string): string {
  if (/^https?:\/\//i.test(uri)) {
    return uri;
  }
  return new URL(uri, masterUrl).href;
}

function rewriteQuotedUris(line: string, masterUrl: string): string {
  return line.replace(/URI="([^"]+)"/gi, (_, uri: string) => {
    return `URI="${resolveManifestUri(uri, masterUrl)}"`;
  });
}

function stripScore(inf: string): string {
  return inf
    .replace(/,SCORE=\d+(?:\.\d+)?/gi, "")
    .replace(/SCORE=\d+(?:\.\d+)?,?/gi, "")
    .replace(/,,+/g, ",")
    .replace(/,$/, "");
}

function closestInRange(
  variants: ParsedVariant[],
  target: number,
  min: number,
  max: number,
): ParsedVariant | undefined {
  const pool = variants.filter(
    (variant) => variant.height >= min && variant.height <= max,
  );
  if (pool.length === 0) {
    return undefined;
  }
  return pool.reduce((best, variant) =>
    Math.abs(variant.height - target) < Math.abs(best.height - target)
      ? variant
      : best,
  );
}

function selectOpeningVariants(variants: ParsedVariant[]): ParsedVariant[] {
  const start = closestInRange(variants, HLS_START_HEIGHT, 640, 800);
  const hi = closestInRange(variants, HLS_MAX_HEIGHT, 1000, 1200);
  const selected: ParsedVariant[] = [];
  if (start) {
    selected.push(start);
  }
  if (hi && hi.uri !== start?.uri) {
    selected.push(hi);
  }
  if (selected.length > 0) {
    return selected;
  }

  const capped = variants.filter(
    (variant) => variant.height > 0 && variant.height <= HLS_MAX_HEIGHT,
  );
  const sharp = capped.filter((variant) => variant.height >= HLS_START_HEIGHT);
  const pool = sharp.length > 0 ? sharp : capped;
  if (pool.length === 0) {
    return [];
  }
  return [
    pool.reduce((best, variant) =>
      variant.height > best.height ? variant : best,
    ),
  ];
}

/**
 * 720p first (smaller first fragment), then 1080p. Drop 480p and below so
 * ABR cannot fall into a grainy ladder.
 */
export function filterMobileHlsMaster(manifest: string, masterUrl: string): string {
  const lines = manifest.replace(/\r\n/g, "\n").split("\n");
  const header: string[] = [];
  const variants: ParsedVariant[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      continue;
    }

    if (line.startsWith("#EXT-X-STREAM-INF:")) {
      const uriLine = lines[index + 1]?.trim() ?? "";
      index += 1;
      const height = Number(line.match(/RESOLUTION=\d+x(\d+)/i)?.[1] ?? 0);
      variants.push({
        height,
        inf: stripScore(rewriteQuotedUris(line, masterUrl)),
        uri: resolveManifestUri(uriLine, masterUrl),
      });
      continue;
    }

    if (line.startsWith("#EXT-X-I-FRAME-STREAM-INF:")) {
      continue;
    }

    header.push(rewriteQuotedUris(line, masterUrl));
  }

  const selected = selectOpeningVariants(variants);
  if (selected.length === 0) {
    return manifest;
  }

  return `${[...header, ...selected.flatMap((variant) => [variant.inf, variant.uri])].join("\n")}\n`;
}

export async function loadMobileOpeningManifest(
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const now = Date.now();
  if (
    fetchImpl === fetch &&
    openingManifestCache &&
    openingManifestCache.expires > now
  ) {
    return openingManifestCache.body;
  }

  const response = await fetchImpl(OPENING_STREAM_MASTER);
  if (!response.ok) {
    throw new Error(`Opening HLS manifest failed: ${response.status}`);
  }
  const body = filterMobileHlsMaster(
    await response.text(),
    OPENING_STREAM_MASTER,
  );
  if (fetchImpl === fetch) {
    openingManifestCache = {
      body,
      expires: now + OPENING_MANIFEST_TTL_MS,
    };
  }
  return body;
}

/** First variant (720p) and audio playlist, for Link preload on the proxy. */
export function openingManifestChildUrls(manifest: string): string[] {
  const urls: string[] = [];
  for (const line of manifest.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.includes("TYPE=AUDIO")) {
      const uri = trimmed.match(/URI="([^"]+)"/)?.[1];
      if (uri) {
        urls.push(uri);
      }
      continue;
    }
    if (/^https?:\/\//i.test(trimmed) && trimmed.includes(".m3u8")) {
      urls.push(trimmed);
      break;
    }
  }
  return urls;
}

export function openingManifestLinkHeader(manifest: string): string {
  return openingManifestChildUrls(manifest)
    .map((url) => `<${url}>; rel="preload"; as="fetch"; crossorigin`)
    .join(", ");
}
