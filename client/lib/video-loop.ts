/** Force loop the same way muted/autoplay are locked on homepage videos. */
export function lockVideoLoop(element: HTMLVideoElement) {
  element.loop = true;
  element.setAttribute("loop", "");
}

/** Native HLS treats the loop attribute as a backwards seek, which can fail the demuxer. */
export function unlockVideoLoop(element: HTMLVideoElement) {
  element.loop = false;
  element.removeAttribute("loop");
}

export function restartLoopingVideo(element: HTMLVideoElement) {
  if (element.currentTime !== 0) {
    element.currentTime = 0;
  }
  const playPromise = element.play();
  if (playPromise) {
    playPromise.catch(() => {});
  }
}

/**
 * HTML loop is unreliable for HLS (hls.js and some native playback).
 * Restart from the beginning when the element reports that it ended.
 */
export function bindVideoLoopRestart(
  element: HTMLVideoElement,
  shouldRestart: () => boolean = () => true,
  restart: (element: HTMLVideoElement) => void = restartLoopingVideo,
): () => void {
  const onEnded = () => {
    if (!shouldRestart()) {
      return;
    }
    restart(element);
  };

  element.addEventListener("ended", onEnded);
  return () => element.removeEventListener("ended", onEnded);
}
