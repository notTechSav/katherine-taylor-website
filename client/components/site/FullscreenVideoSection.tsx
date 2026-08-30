import { Volume2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  canPlayNativeHls,
  shouldAttachHlsAfterImport,
  shouldLoadHlsJs,
} from "@/lib/hls-playback";
import {
  HLS_MAX_HEIGHT,
  HLS_START_HEIGHT,
  isHlsSource,
  pickHlsCapLevel,
  pickHlsStartLevel,
} from "@/lib/video-sections";
import { bindVideoLoopRestart, lockVideoLoop } from "@/lib/video-loop";
import { cn } from "@/lib/utils";
import { useNearbyFullpageMedia } from "@/hooks/useNearbyFullpageMedia";

type HlsInstance = {
  destroy: () => void;
  loadSource: (src: string) => void;
  attachMedia: (element: HTMLMediaElement) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  startLevel: number;
  autoLevelCapping: number;
  nextLoadLevel: number;
  levels: Array<{ height?: number }>;
};

type FullscreenVideoSectionProps = {
  videoSrc?: string;
  fallbackSrc?: string;
  posterSrc: string;
  posterMobileSrc?: string;
  overlayClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  children: ReactNode;
};

const nativeHlsSupported = canPlayNativeHls();

const prefetchHlsJs =
  typeof document !== "undefined" && !nativeHlsSupported
    ? import("hls.js")
    : null;

function lockInlineAutoplay(element: HTMLVideoElement, muted: boolean) {
  element.setAttribute("playsinline", "true");
  element.setAttribute("webkit-playsinline", "true");
  element.setAttribute("autoplay", "");
  lockVideoLoop(element);
  if (muted) {
    element.defaultMuted = true;
    element.muted = true;
    element.setAttribute("muted", "");
  }
}

function markVideoRendering(
  element: HTMLVideoElement,
  onActive: () => void,
): () => void {
  const shouldReveal = () => element.videoWidth > 0;

  if (shouldReveal()) {
    onActive();
    return () => {};
  }

  const videoWithFrameCallback = element as HTMLVideoElement & {
    requestVideoFrameCallback?: (callback: () => void) => number;
    cancelVideoFrameCallback?: (handle: number) => void;
  };

  if (videoWithFrameCallback.requestVideoFrameCallback) {
    let handle = 0;
    const tick = () => {
      if (shouldReveal()) {
        onActive();
        return;
      }
      handle = videoWithFrameCallback.requestVideoFrameCallback!(tick);
    };
    handle = videoWithFrameCallback.requestVideoFrameCallback(tick);
    return () => videoWithFrameCallback.cancelVideoFrameCallback?.(handle);
  }

  const onTimeUpdate = () => {
    if (shouldReveal()) {
      onActive();
      element.removeEventListener("timeupdate", onTimeUpdate);
    }
  };

  element.addEventListener("timeupdate", onTimeUpdate);
  return () => element.removeEventListener("timeupdate", onTimeUpdate);
}

export default function FullscreenVideoSection({
  videoSrc,
  fallbackSrc,
  posterSrc,
  posterMobileSrc,
  overlayClassName = "homepage-veil-lower",
  objectPosition = "center center",
  priority = false,
  children,
}: FullscreenVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<HlsInstance | null>(null);
  const isMutedRef = useRef(true);
  const stopRevealRef = useRef<(() => void) | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoActive, setVideoActive] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [holdMobilePoster, setHoldMobilePoster] = useState(false);
  const allowMedia = useNearbyFullpageMedia(containerRef, priority);

  useEffect(() => {
    if (!posterMobileSrc) {
      setHoldMobilePoster(false);
      return;
    }

    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setHoldMobilePoster(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [posterMobileSrc]);

  const sources = useMemo(
    () => [videoSrc, fallbackSrc].filter(Boolean) as string[],
    [fallbackSrc, videoSrc],
  );
  const currentSrc = sources[sourceIndex];
  const useNativeHlsSrc = Boolean(
    currentSrc && isHlsSource(currentSrc) && nativeHlsSupported,
  );

  const tryNextSource = useCallback(() => {
    setVideoActive(false);
    setSourceIndex((index) =>
      index < sources.length - 1 ? index + 1 : index,
    );
  }, [sources.length]);

  const setVideoNode = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    if (!element) {
      return;
    }
    lockInlineAutoplay(element, isMutedRef.current);
  }, []);

  const attemptPlay = useCallback(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    lockInlineAutoplay(element, isMutedRef.current);
    const playPromise = element.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, []);

  const handleVideoPlaying = useCallback(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    stopRevealRef.current?.();
    stopRevealRef.current = markVideoRendering(element, () => setVideoActive(true));
    attemptPlay();
  }, [attemptPlay]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    const element = videoRef.current;
    if (element) {
      element.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !currentSrc || holdMobilePoster || !allowMedia) {
      if (holdMobilePoster) {
        setVideoActive(false);
      }
      return;
    }

    setVideoActive(false);
    lockInlineAutoplay(element, isMutedRef.current);

    hlsRef.current?.destroy();
    hlsRef.current = null;

    let cancelled = false;

    const play = () => {
      if (cancelled) {
        return;
      }
      attemptPlay();
    };

    const stopLoop = bindVideoLoopRestart(element, () => {
      const section = containerRef.current?.closest("[data-fullpage-section]");
      return section?.getAttribute("data-active") !== "false";
    });

    if (shouldLoadHlsJs(currentSrc, canPlayNativeHls(element))) {
      element.removeAttribute("src");
      void (prefetchHlsJs ?? import("hls.js")).then(({ default: Hls }) => {
        if (
          !shouldAttachHlsAfterImport({
            cancelled,
            video: videoRef.current,
            expectedVideo: element,
          })
        ) {
          return;
        }

        if (!Hls.isSupported()) {
          tryNextSource();
          return;
        }

        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxDevicePixelRatio: 3,
          testBandwidth: false,
          startLevel: -1,
          abrEwmaDefaultEstimate: 3_500_000,
          maxBufferLength: 8,
          maxMaxBufferLength: 16,
          maxBufferSize: 15_000_000,
        });

        if (
          !shouldAttachHlsAfterImport({
            cancelled,
            video: videoRef.current,
            expectedVideo: element,
          })
        ) {
          hls.destroy();
          return;
        }

        hlsRef.current = hls;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const start = pickHlsStartLevel(hls.levels, HLS_START_HEIGHT);
          const cap = pickHlsCapLevel(hls.levels, HLS_MAX_HEIGHT);
          if (start >= 0) {
            hls.startLevel = start;
            hls.nextLoadLevel = start;
          }
          if (cap >= 0) {
            hls.autoLevelCapping = cap;
          }
          play();
        });
        hls.on(Hls.Events.ERROR, (_, data: { fatal?: boolean }) => {
          if (data.fatal) {
            tryNextSource();
          }
        });
        hls.loadSource(currentSrc);
        hls.attachMedia(element);
      });

      return () => {
        cancelled = true;
        stopRevealRef.current?.();
        stopRevealRef.current = null;
        stopLoop();
        hlsRef.current?.destroy();
        hlsRef.current = null;
      };
    }

    if (!useNativeHlsSrc) {
      element.src = currentSrc;
    }

    play();
    element.addEventListener("loadedmetadata", play);
    element.addEventListener("loadeddata", play);
    element.addEventListener("canplay", play);

    return () => {
      cancelled = true;
      stopRevealRef.current?.();
      stopRevealRef.current = null;
      stopLoop();
      element.removeEventListener("loadedmetadata", play);
      element.removeEventListener("loadeddata", play);
      element.removeEventListener("canplay", play);
    };
  }, [
    allowMedia,
    attemptPlay,
    currentSrc,
    holdMobilePoster,
    tryNextSource,
    useNativeHlsSrc,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const element = videoRef.current;
    if (!container || !element || !currentSrc || holdMobilePoster || !allowMedia) {
      return;
    }

    const sectionIsInactive = () => {
      const section = container.closest("[data-fullpage-section]");
      return section?.getAttribute("data-active") === "false";
    };

    const syncPlayback = (intersecting?: boolean) => {
      if (sectionIsInactive()) {
        element.pause();
        return;
      }

      const inView =
        priority || intersecting === undefined || intersecting;
      if (inView) {
        attemptPlay();
      } else {
        element.pause();
      }
    };

    if (priority) {
      syncPlayback(true);
      const onFullPageChange = () => syncPlayback(true);
      window.addEventListener("fullpage:change", onFullPageChange);
      return () => {
        window.removeEventListener("fullpage:change", onFullPageChange);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        syncPlayback(entry.isIntersecting && entry.intersectionRatio >= 0.15);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 1] },
    );

    observer.observe(container);
    syncPlayback(true);

    const onFullPageChange = () => syncPlayback();
    window.addEventListener("fullpage:change", onFullPageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("fullpage:change", onFullPageChange);
    };
  }, [allowMedia, attemptPlay, currentSrc, holdMobilePoster, priority]);

  useEffect(() => {
    const retry = () => {
      if (document.visibilityState === "hidden") {
        return;
      }
      attemptPlay();
    };
    document.addEventListener("touchstart", retry, { once: true, passive: true });
    document.addEventListener("pointerdown", retry, { once: true });
    document.addEventListener("visibilitychange", retry);

    return () => {
      document.removeEventListener("touchstart", retry);
      document.removeEventListener("pointerdown", retry);
      document.removeEventListener("visibilitychange", retry);
    };
  }, [attemptPlay]);

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    const nextMuted = !isMuted;
    isMutedRef.current = nextMuted;
    element.muted = nextMuted;
    if (element.paused) {
      void element.play();
    }
    setIsMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full min-w-0 overflow-hidden bg-luxury-black"
    >
      {posterMobileSrc ? (
        <img
          src={posterMobileSrc}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          style={{ objectPosition }}
        />
      ) : null}

      <img
        src={posterSrc}
        alt=""
        aria-hidden="true"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
          posterMobileSrc && "max-md:hidden",
          videoActive ? "opacity-0" : "opacity-100",
        )}
        style={{ objectPosition }}
      />

      {currentSrc && !holdMobilePoster && allowMedia ? (
        <video
          ref={setVideoNode}
          key={currentSrc}
          src={useNativeHlsSrc ? currentSrc : undefined}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
            posterMobileSrc && "max-md:hidden",
            videoActive ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          {...{ "webkit-playsinline": "true" }}
          preload={priority ? "auto" : "none"}
          poster={posterSrc}
          onPlaying={handleVideoPlaying}
          onError={tryNextSource}
        />
      ) : null}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          overlayClassName,
        )}
        aria-hidden="true"
      />

      {videoActive && !holdMobilePoster ? (
        <button
          type="button"
          onClick={toggleMute}
          className={cn(
            "absolute bottom-6 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50 sm:right-6",
            posterMobileSrc && "max-md:hidden",
          )}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      ) : null}

      <div className="relative z-20 h-full w-full min-w-0">{children}</div>
    </div>
  );
}
