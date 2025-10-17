/**
 * YSL-Style Hero Component
 *
 * Key differences from original:
 * 1. Minimal/no dark overlay (video is visible)
 * 2. Centered text (not bottom-left)
 * 3. Small collection title + 3 text links (no buttons)
 * 4. Designer/photographer credits below
 * 5. Small icon-only controls (bottom-right)
 * 6. Much less text overall
 */

import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// YSL uses ~4-5 Mbps bitrate (200MB for 40s video)
// Cloudinary video quality transformation:
// - q_auto:best = highest quality encoding
// - br_5m = 5 Mbps target bitrate (matches YSL)
// - vc_h264 = H.264 codec
const HERO_VIDEO_SRC =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:best,br_5m,vc_h264/v1760237084/MAYA_2_cnpwna.mp4";

const HeroYSL = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = isMuted;
    if (element.paused && !isPaused) {
      void element.play();
    }
  }, [isMuted, isPaused]);

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element) return;

    setIsMuted(!isMuted);
    element.muted = !isMuted;
  };

  const togglePlayPause = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      void element.play();
      setIsPaused(false);
    } else {
      element.pause();
      setIsPaused(true);
    }
  };

  return (
    <section className="hero relative isolate flex min-h-screen w-full overflow-hidden bg-luxury-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/katherine-taylor-escort-video/image/upload/q_auto:best,f_auto/v1760237084/MAYA_2_cnpwna.jpg"
        // @ts-ignore - fetchpriority is valid but TypeScript doesn't recognize it yet
        fetchpriority="high"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Hero Content - Bottom-left like YSL */}
      <div className="absolute bottom-8 left-8 z-10 flex flex-col gap-2 md:bottom-12 md:left-12">
        <div className="flex flex-col gap-1">
          {/* Collection Title - Small like YSL */}
          <h1 className="text-[10px] font-light uppercase tracking-[0.2em] text-luxury-white md:text-xs">
            Exclusive Companionship
          </h1>

          {/* Credits - Like YSL */}
          <p className="text-[10px] font-light uppercase tracking-[0.15em] text-luxury-white/60 md:text-xs">
            Experience by Katherine Taylor
          </p>
          <p className="text-[10px] font-light uppercase tracking-[0.15em] text-luxury-white/60 md:text-xs">
            San Francisco, California
          </p>
        </div>
      </div>

      {/* Video Controls - YSL Style (bottom-right, icon-only) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        {/* Play/Pause */}
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPaused ? "Play video" : "Pause video"}
          className="flex h-8 w-8 items-center justify-center text-luxury-white transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-70"
        >
          {isPaused ? (
            <Play className="h-4 w-4" fill="currentColor" />
          ) : (
            <Pause className="h-4 w-4" fill="currentColor" />
          )}
        </button>

        {/* Mute/Unmute */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="unmute-toggle flex h-8 w-8 items-center justify-center text-luxury-white transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-70"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
};

export default HeroYSL;
