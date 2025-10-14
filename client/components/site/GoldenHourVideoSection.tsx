import { useEffect, useRef, useState } from "react";

const GoldenHourVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Original video URL - no optimization parameters
  const videoUrl = "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/v1760426427/golden_hour_opn5pm.mp4";
  const posterUrl = "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_0,q_auto:low,f_auto,w_1920/v1760426427/golden_hour_opn5pm.jpg";

  const videoSrc = videoUrl;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Aspect ratio container prevents layout shift */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={posterUrl}
          preload="none"
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default GoldenHourVideoSection;
