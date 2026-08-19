export type VideoAsset = {
  src: string;
  /** Optional fallback if the primary source fails (local MP4, remote MP4, etc.). */
  fallbackSrc?: string;
  poster: string;
  objectPosition?: string;
};

const openingStream =
  "https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065";

export const openingVideo: VideoAsset = {
  // clientBandwidthHint biases Safari/native HLS toward 1080p (~3.9 Mbps top rendition)
  src: `${openingStream}/manifest/video.m3u8?clientBandwidthHint=3.5`,
  poster: "/glam2.jpeg",
  objectPosition: "center 30%",
};

export const ratesVideo: VideoAsset = {
  src: "/videos/rates.mp4",
  fallbackSrc:
    "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_70,f_auto/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4",
  poster: "/journal-teaser-bg.webp",
  objectPosition: "center center",
};

export const closingVideo: VideoAsset = {
  src: "/videos/closing.mp4",
  fallbackSrc:
    "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_80,f_auto/v1760426427/golden_hour_opn5pm.mp4",
  poster: "/limited-availability-bg.webp",
  objectPosition: "center 35%",
};

export function isHlsSource(src: string): boolean {
  return src.includes(".m3u8");
}
