export type VideoAsset = {
  src: string;
  /** Optional fallback if the primary source fails. */
  fallbackSrc?: string;
  poster: string;
  objectPosition?: string;
};

const openingStream =
  "https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065";

export const openingVideo: VideoAsset = {
  // Full ladder (240p–1080p). Do not pass clientBandwidthHint: a 3.5 Mbps hint
  // collapses Stream’s playlist to 1080p-only (~1.3 MB before the first frame).
  src: `${openingStream}/manifest/video.m3u8`,
  poster: `${openingStream}/thumbnails/thumbnail.jpg?time=3s&height=720`,
  objectPosition: "center 30%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}

/** First fragment near 720p so playback can start without waiting on 1080p. */
export function pickHlsStartLevel(
  levels: Array<{ height?: number }>,
  targetHeight = 720,
): number {
  if (levels.length === 0) {
    return -1;
  }

  let bestIndex = 0;
  let bestDiff = Infinity;
  levels.forEach((level, index) => {
    const diff = Math.abs((level.height ?? 0) - targetHeight);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = index;
    }
  });
  return bestIndex;
}
