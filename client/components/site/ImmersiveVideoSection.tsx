import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Balanced quality for fast loading and good visuals
const VIDEO_DESKTOP =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_70,f_auto/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4";

// Same quality as desktop for consistency and fast loading
const VIDEO_MOBILE =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_70,f_auto/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4";

// Poster image (first frame extraction)
const POSTER_URL =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_0,q_auto:low,f_auto,w_1920/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.jpg";

const ImmersiveVideoSection = () => {
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

  const videoSrc = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;

  // Scroll-triggered playback (plays when 50% visible, pauses when not)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked, user interaction needed
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (video.paused) {
      void video.play();
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
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (video.paused) {
      void video.play();
    }
    setIsMuted(nextMuted);
  };

  return (
    <section className="relative w-full overflow-hidden bg-luxury-black" style={{ height: '100vh' }}>
      {/* Aspect ratio container prevents layout shift */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          key={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          poster={POSTER_URL}
          preload="none"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          loading="lazy"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-luxury-black/55" />

      {/* Fading text overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-32">
        <div
          className={`mx-auto flex w-full max-w-luxury flex-col items-start gap-8 text-luxury-white transition-opacity duration-1000 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="font-serif text-5xl font-extralight tracking-display leading-[1.1]">
            The Story Continues
          </h2>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-white/85">
            Each engagement carries forward the full history of your context—professional, personal, logistical—so nothing resets.
          </p>
          <a
            href="/rates"
            className="text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            View Rates
          </a>
        </div>
      </div>

      {/* Persistent mute button - bottom right */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={
          isMuted ? "Unmute immersive video" : "Mute immersive video"
        }
        className="absolute bottom-8 right-8 z-20 inline-flex items-center justify-center gap-2 rounded-[2px] bg-white/10 px-5 py-3 text-xs font-light uppercase tracking-uppercase text-luxury-white backdrop-blur-sm transition-all duration-250 ease-out hover:bg-white/20 focus:outline-none"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
};

export default ImmersiveVideoSection;
