import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { isHlsSource } from "@/lib/video-sections";
import { cn } from "@/lib/utils";

type HlsInstance = {
  destroy: () => void;
  loadSource: (src: string) => void;
  attachMedia: (element: HTMLMediaElement) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  Events: { MANIFEST_PARSED: string; ERROR: string };
};

type FullscreenVideoSectionProps = {
  videoSrc: string;
  fallbackSrc?: string;
  posterSrc: string;
  overlayClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  children: ReactNode;
};

export default function FullscreenVideoSection({
  videoSrc,
  fallbackSrc,
  posterSrc,
  overlayClassName = "bg-black/50",
  objectPosition = "center center",
  priority = false,
  children,
}: FullscreenVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<HlsInstance | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoActive, setVideoActive] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

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

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !currentSrc) {
      return;
    }

    setVideoActive(false);
    element.removeAttribute("src");
    element.load();

    hlsRef.current?.destroy();
    hlsRef.current = null;

    let cancelled = false;

    const play = () => {
      element.muted = isMuted;
      const playPromise = element.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    };

    if (isHlsSource(currentSrc)) {
      if (element.canPlayType("application/vnd.apple.mpegurl")) {
        element.src = currentSrc;
        element.load();
        play();
      } else {
        void import("hls.js").then(({ default: Hls }) => {
          if (cancelled || !videoRef.current) {
            return;
          }

          if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;
            hls.on(Hls.Events.MANIFEST_PARSED, play);
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
      play();
    }

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [currentSrc, isMuted, tryNextSource]);

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    const nextMuted = !isMuted;
    element.muted = nextMuted;
    if (element.paused) {
      void element.play();
    }
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative h-full w-full min-w-0 overflow-hidden bg-luxury-black">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out",
          videoActive ? "opacity-0" : "opacity-100",
        )}
        style={{
          backgroundImage: `url(${posterSrc})`,
          backgroundPosition: objectPosition,
        }}
      />

      {currentSrc ? (
        <video
          ref={videoRef}
          key={currentSrc}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
            videoActive ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={posterSrc}
          // @ts-expect-error fetchPriority is valid on video in modern browsers
          fetchPriority={priority ? "high" : "auto"}
          onCanPlay={() => setVideoActive(true)}
          onPlaying={() => setVideoActive(true)}
          onError={tryNextSource}
        />
      ) : null}

      <div className={`absolute inset-0 z-10 ${overlayClassName}`} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
      />

      {videoActive ? (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-6 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50 sm:right-6"
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
