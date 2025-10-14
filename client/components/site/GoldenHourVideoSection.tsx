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

  // Responsive video URLs with Cloudinary optimization
  const mobileVideoUrl = "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:low,f_auto,w_720,br_1500k/v1760426427/golden_hour_opn5pm.mp4";
  const desktopVideoUrl = "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_auto:good,f_auto,w_1920,br_3000k/v1760426427/golden_hour_opn5pm.mp4";
  const posterUrl = "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_0,q_auto:low,f_auto,w_1920/v1760426427/golden_hour_opn5pm.jpg";

  const videoSrc = isMobile ? mobileVideoUrl : desktopVideoUrl;

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* Aspect ratio container prevents layout shift */}
      <div className="relative aspect-[16/9] w-full">
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

        {/* Optional: Subtle gradient overlay for future text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default GoldenHourVideoSection;
