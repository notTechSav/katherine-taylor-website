import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/luxury-typography";
import { useEffect, useRef, useState } from "react";

// Desktop: High quality (q_80) - fast WiFi, large screen, worth it
const HERO_VIDEO_DESKTOP =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_80,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.mp4";

// Mobile: Medium-high quality (q_60) - good balance, no pixelation
const HERO_VIDEO_MOBILE =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_60,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.mp4";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showText, setShowText] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const videoSrc = isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;

  useEffect(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    element.muted = isMuted;
    if (element.paused) {
      void element.play();
    }
  }, [isMuted]);

  // Fade out text after 5 seconds, fade back in after 15 seconds (cycle)
  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setShowText(false), 5000);
    const fadeInTimer = setTimeout(() => setShowText(true), 15000);

    const interval = setInterval(() => {
      setShowText(true);
      setTimeout(() => setShowText(false), 5000);
    }, 20000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(fadeInTimer);
      clearInterval(interval);
    };
  }, []);

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
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-luxury-black">
      <video
        ref={videoRef}
        key={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/katherine-taylor-escort-video/image/upload/q_80,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.jpg"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-luxury-black/60" />

      {/* Fading text overlay */}
      <div className="relative z-10 flex h-full min-h-screen flex-col justify-end px-8 pb-32">
        <div
          className={`mx-auto flex w-full max-w-luxury flex-col items-start gap-8 text-luxury-white transition-opacity duration-1000 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <H3 as="p" aria-hidden="true" className="mb-0 text-luxury-white/70">
            Love, Elevated
          </H3>
          <H2 as="p" aria-hidden="true" className="text-luxury-white">
            An Experience That Reflects Your Highest Qualities
          </H2>
          <a
            href="/inquire"
            className="text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Reserve an Evening
          </a>
        </div>
      </div>

      {/* Persistent mute button - bottom right */}
      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
        className="absolute bottom-8 right-8 z-20 inline-flex items-center justify-center gap-2 rounded-[2px] bg-white/10 px-5 py-3 text-xs font-light uppercase tracking-uppercase text-luxury-white backdrop-blur-sm transition-all duration-250 ease-out hover:bg-white/20 focus:outline-none"
      >
        <span>{isMuted ? "Unmute" : "Mute"}</span>
      </button>
    </section>
  );
};

export default Hero;
