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
  // clientBandwidthHint biases Safari/native HLS toward 1080p (~3.9 Mbps top rendition)
  src: `${openingStream}/manifest/video.m3u8?clientBandwidthHint=3.5`,
  poster: `${openingStream}/thumbnails/thumbnail.jpg?time=3s&height=1080`,
  objectPosition: "center 30%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}
