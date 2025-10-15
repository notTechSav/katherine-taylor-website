import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoBackground({ src, poster, className = '' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          // Load video when section is about to enter viewport
          const source = video.querySelector('source');
          if (source && source.dataset.src) {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            video.load();
            setIsLoaded(true);
          }

          // Play video (YSL pattern: catch errors silently)
          video.play().catch(() => {
            // Autoplay prevented - silently fail
          });
        } else if (!entry.isIntersecting && video && !video.paused) {
          // Pause when out of view (critical for memory management with multiple videos)
          video.pause();
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px'  // Start loading 100px before entering viewport
      }
    );

    observer.observe(video);

    // Add event listeners to ensure video keeps looping and playing
    const handleEnded = () => {
      console.log('Video ended, restarting...');
      video.currentTime = 0;
      video.play().catch((err) => console.error('Play failed:', err));
    };

    const handleLoadedData = () => {
      console.log('Video loaded, duration:', video.duration);
      video.play().catch((err) => console.error('Initial play failed:', err));
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      observer.disconnect();
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isLoaded]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      poster={poster}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    >
      <source data-src={src} type="video/mp4" />
    </video>
  );
}
