export type VideoAsset = {
  src: string;
  /** Optional fallback if the primary source fails. */
  fallbackSrc?: string;
  poster: string;
  objectPosition?: string;
};

const openingStream =
  "https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065";

/** Stream master lists 1080p first (SCORE=5). Do not pass clientBandwidthHint. */
export const OPENING_STREAM_MASTER = `${openingStream}/manifest/video.m3u8`;

/** Same-origin rewrite: 1080p only so the opening slide cannot fall to a grainy rung. */
export const OPENING_HLS_PROXY_PATH = "/api/opening-hls.m3u8";

export const HLS_START_HEIGHT = 1080;
export const HLS_MAX_HEIGHT = 1080;

export const openingVideo: VideoAsset = {
  src: OPENING_HLS_PROXY_PATH,
  fallbackSrc: OPENING_STREAM_MASTER,
  poster: "/opening-poster.jpg",
  objectPosition: "center 30%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}

type LevelLike = { height?: number };

function heightOf(level: LevelLike): number {
  return level.height ?? 0;
}

/**
 * First fragment near 1080p. Never pick 240/360/480 when a 720p+ rung exists.
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
  const start = closestInRange(variants, HLS_START_HEIGHT, 1000, 1200);
  if (start) {
    return [start];
  }

  const capped = variants.filter(
    (variant) => variant.height > 0 && variant.height <= HLS_MAX_HEIGHT,
  );
  const sharp = capped.filter((variant) => variant.height >= 1000);
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
 * Keep a single 1080p rung. Drop 720p and below so ABR cannot fall into
 * a grainy ladder. Stream’s highest rung for this UID is 1080p.
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
  const response = await fetchImpl(OPENING_STREAM_MASTER);
  if (!response.ok) {
    throw new Error(`Opening HLS manifest failed: ${response.status}`);
  }
  return filterMobileHlsMaster(await response.text(), OPENING_STREAM_MASTER);
}
