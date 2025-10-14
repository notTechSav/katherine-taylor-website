import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Responsive video URLs with Cloudinary optimization + bitrate control
// WebM format (30% smaller than MP4, supported by 96% of browsers)
const VIDEO_MOBILE_WEBM =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:low,f_webm,w_720,br_1500k/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.webm";
const VIDEO_DESKTOP_WEBM =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:good,f_webm,w_1920,br_3000k/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.webm";

// MP4 fallback for Safari/older browsers
const VIDEO_MOBILE_MP4 =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:low,f_auto,w_720,br_1500k/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4";
const VIDEO_DESKTOP_MP4 =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:good,f_auto,w_1920,br_3000k/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4";

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

  const videoSrcWebM = isMobile ? VIDEO_MOBILE_WEBM : VIDEO_DESKTOP_WEBM;
  const videoSrcMP4 = isMobile ? VIDEO_MOBILE_MP4 : VIDEO_DESKTOP_MP4;

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
    <section className="relative min-h-screen w-full overflow-hidden bg-luxury-black">
      {/* Aspect ratio container prevents layout shift */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          key={videoSrcWebM}
          className="absolute inset-0 h-full w-full object-cover"
          poster={POSTER_URL}
          preload="none"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          loading="lazy"
        >
          {/* WebM first (30% smaller, Chrome/Firefox) */}
          <source src={videoSrcWebM} type="video/webm" />
          {/* MP4 fallback (Safari/older browsers) */}
          <source src={videoSrcMP4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-luxury-black/55" />

      {/* Fading text overlay */}
      <div className="relative z-10 flex h-full min-h-screen flex-col justify-end px-8 pb-32">
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
