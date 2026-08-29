import { Volume2, VolumeX } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { isHlsSource, pickHlsStartLevel } from "@/lib/video-sections";
import { cn } from "@/lib/utils";
import { useNearbyFullpageMedia } from "@/hooks/useNearbyFullpageMedia";

type HlsInstance = {
  destroy: () => void;
  loadSource: (src: string) => void;
  attachMedia: (element: HTMLMediaElement) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  startLevel: number;
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

function markVideoRendering(
  element: HTMLVideoElement,
  onActive: () => void,
): () => void {
  if (
    element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    element.videoWidth > 0
  ) {
    onActive();
    return () => {};
  }

  const videoWithFrameCallback = element as HTMLVideoElement & {
    requestVideoFrameCallback?: (
      callback: () => void,
    ) => number;
    cancelVideoFrameCallback?: (handle: number) => void;
  };

  if (videoWithFrameCallback.requestVideoFrameCallback) {
    const id = videoWithFrameCallback.requestVideoFrameCallback(() =>
      onActive(),
    );
    return () => videoWithFrameCallback.cancelVideoFrameCallback?.(id);
  }

  const onTimeUpdate = () => {
    if (element.currentTime > 0 && element.videoWidth > 0) {
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

  const tryNextSource = useCallback(() => {
    setVideoActive(false);
    setSourceIndex((index) =>
      index < sources.length - 1 ? index + 1 : index,
    );
  }, [sources.length]);

  const attemptPlay = useCallback(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    element.muted = isMutedRef.current;
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

    markVideoRendering(element, () => setVideoActive(true));
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
    element.removeAttribute("src");
    element.load();

    hlsRef.current?.destroy();
    hlsRef.current = null;

    let cancelled = false;

    const play = () => {
      if (cancelled) {
        return;
      }
      attemptPlay();
    };

    if (isHlsSource(currentSrc)) {
      if (element.canPlayType("application/vnd.apple.mpegurl")) {
        element.src = currentSrc;
        element.load();
        element.addEventListener("loadeddata", play, { once: true });
      } else {
        void import("hls.js").then(({ default: Hls }) => {
          if (cancelled || !videoRef.current) {
            return;
          }

          if (Hls.isSupported()) {
            const hls = new Hls({
              capLevelToPlayerSize: true,
              startLevel: -1,
              maxBufferLength: 10,
              maxMaxBufferLength: 20,
              abrEwmaDefaultEstimate: 2_000_000,
            });
            hlsRef.current = hls;
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              hls.startLevel = pickHlsStartLevel(hls.levels);
              play();
            });
            hls.on(Hls.Events.ERROR, (_, data: { fatal?: boolean }) => {
              if (data.fatal) {
                tryNextSource();
              }
            });
            hls.loadSource(currentSrc);
            hls.attachMedia(videoRef.current);
          } else {
            tryNextSource();
          }
        });
      }
    } else {
      element.src = currentSrc;
      element.load();
      element.addEventListener("loadeddata", play, { once: true });
    }

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [allowMedia, attemptPlay, currentSrc, holdMobilePoster, tryNextSource]);

  useEffect(() => {
    const container = containerRef.current;
    const element = videoRef.current;
    if (!container || !element || !currentSrc || holdMobilePoster || !allowMedia) {
      return;
    }

    const syncPlayback = (intersecting?: boolean) => {
      const section = container.closest("[data-fullpage-section]");
      const sectionActive =
        !section || section.getAttribute("data-active") === "true";
      const shouldPlay =
        sectionActive && (intersecting === undefined || intersecting);

      if (shouldPlay) {
        attemptPlay();
      } else {
        element.pause();
      }
    };

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
  }, [allowMedia, attemptPlay, currentSrc, holdMobilePoster]);

  useEffect(() => {
    const retry = () => attemptPlay();
    document.addEventListener("touchstart", retry, { once: true, passive: true });
    document.addEventListener("pointerdown", retry, { once: true });

    return () => {
      document.removeEventListener("touchstart", retry);
      document.removeEventListener("pointerdown", retry);
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
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
          posterMobileSrc && "max-md:hidden",
          videoActive ? "opacity-0" : "opacity-100",
        )}
        style={{ objectPosition }}
      />

      {currentSrc && !holdMobilePoster && allowMedia ? (
        <video
          ref={videoRef}
          key={currentSrc}
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
          preload={priority ? "auto" : "none"}
          poster={posterSrc}
          onPlaying={handleVideoPlaying}
          onError={tryNextSource}
        />
      ) : null}

      <div
        className={cn("absolute inset-0 z-10", overlayClassName)}
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
