import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/luxury-typography";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-macro-shot-of-a-golden-watch-1665503983791?download=1";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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
    <section className="relative isolate flex min-h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="https://images.pexels.com/photos/15969264/pexels-photo-15969264.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-end px-6 pb-10 pt-24 sm:justify-center sm:pb-24">
        <div className="flex w-full max-w-[960px] flex-col items-start gap-6 sm:gap-8 text-white">
          <H3
            as="p"
            aria-hidden="true"
            className="mb-0 md:mb-0 text-white/70"
          >
            Love, Elevated
          </H3>
          <H2 as="p" aria-hidden="true" className="text-white">
            An Experience That Reflects Your Highest Qualities
          </H2>
          <Button asChild variant="ctaPrimary">
            <a href="/inquire">Request an Introduction</a>
          </Button>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
        className="absolute left-6 bottom-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/80 px-5 py-2 text-sm text-foreground shadow-lg backdrop-blur transition-all duration-luxury-fast ease-luxury-in hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
      >
        <span>{isMuted ? "Unmute" : "Mute"}</span>
      </button>
    </section>
  );
};

export default Hero;
