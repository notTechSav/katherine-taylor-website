import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const HERO_VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-macro-shot-of-a-golden-watch-1665503983791?download=1";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
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
    <section className="relative">
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="https://images.pexels.com/photos/15969264/pexels-photo-15969264.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/0" />
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-foreground shadow-lg backdrop-blur"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Volume2 className="h-5 w-5" strokeWidth={1.5} />
          )}
          <span className="sr-only">Toggle sound</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
