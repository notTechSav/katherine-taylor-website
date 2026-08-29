export type VideoAsset = {
  src: string;
  /** Optional fallback if the primary source fails (local MP4, remote MP4, etc.). */
  fallbackSrc?: string;
  poster: string;
  /** Optional portrait poster shown below the Tailwind md breakpoint. */
  posterMobile?: string;
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

export const ratesVideo: VideoAsset = {
  src: "/videos/rates.mp4",
  poster: "/journal-teaser-bg.webp",
  posterMobile: "/rates-video-poster-mobile.webp",
  objectPosition: "center center",
};

export const closingVideo: VideoAsset = {
  src: "/videos/closing.mp4",
  poster: "/limited-availability-bg.webp",
  objectPosition: "center 35%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}
