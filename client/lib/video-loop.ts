/** Force loop the same way muted/autoplay are locked on homepage videos. */
export function lockVideoLoop(element: HTMLVideoElement) {
  element.loop = true;
  element.setAttribute("loop", "");
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
 * HTML loop is unreliable for HLS (hls.js and some native Safari playback).
 * Restart from the beginning when the element reports that it ended.
 */
export function bindVideoLoopRestart(
  element: HTMLVideoElement,
  shouldRestart: () => boolean = () => true,
): () => void {
  const onEnded = () => {
    if (!shouldRestart()) {
      return;
    }
    restartLoopingVideo(element);
  };

  element.addEventListener("ended", onEnded);
  return () => element.removeEventListener("ended", onEnded);
}
