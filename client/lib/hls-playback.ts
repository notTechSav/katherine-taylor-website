import { isHlsSource } from "./video-sections";

export const HLS_MIME_TYPES = [
  "application/vnd.apple.mpegurl",
  "application/x-mpegURL",
] as const;

type VideoWithCanPlayType = {
  canPlayType: (type: string) => string;
};

function probeVideo(
  video?: VideoWithCanPlayType | null,
): VideoWithCanPlayType | null {
  if (video) {
    return video;
  }
  if (typeof document === "undefined") {
    return null;
  }
  return document.createElement("video");
}

/**
 * Native HLS when the video element reports a non-empty canPlayType
 * ("probably" or "maybe") for an HLS MIME type. User-agent is not consulted.
 */
export function canPlayNativeHls(
  video?: VideoWithCanPlayType | null,
): boolean {
  const probe = probeVideo(video);
  if (!probe) {
    return false;
  }

  return HLS_MIME_TYPES.some((type) => probe.canPlayType(type) !== "");
}

export function shouldLoadHlsJs(
  src: string | undefined,
  nativeHlsSupported: boolean,
): boolean {
  return Boolean(src && isHlsSource(src) && !nativeHlsSupported);
}

export function shouldAttachHlsAfterImport(options: {
  cancelled: boolean;
  video: HTMLVideoElement | null;
  expectedVideo: HTMLVideoElement;
}): boolean {
  return !options.cancelled && options.video === options.expectedVideo;
}
