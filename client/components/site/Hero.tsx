import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const HERO_VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-macro-shot-of-a-golden-watch-1665503983791?download=1";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-end px-6 pb-10 pt-24 sm:justify-center sm:pb-24">
        <div className="flex w-full max-w-[960px] flex-col items-start gap-6 text-white sm:gap-8">
          <span className="text-[0.72rem] uppercase tracking-[0.4em] text-white/70">
            Love, Elevated
          </span>
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">
            A Contemporary Icon
          </h1>
          <p className="max-w-[520px] text-sm leading-relaxed text-white/75 sm:text-base">
            Discover the timeless elegance of Cartier&apos;s LOVE designs reimagined
            for new horizons.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
        className="absolute left-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-foreground shadow-lg backdrop-blur transition hover:bg-white"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" strokeWidth={1.5} />
        ) : (
          <Volume2 className="h-5 w-5" strokeWidth={1.5} />
        )}
        <span className="sr-only">Toggle sound</span>
      </button>
    </section>
  );
};

export default Hero;
