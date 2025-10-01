import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-sunrise-over-new-york-city-1578921443792?download=1";

const ImmersiveVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (!isPaused && video.paused) {
      void video.play();
    }
  }, [isMuted, isPaused]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (video.paused) {
      void video.play();
      setIsPaused(false);
    }
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="https://images.pexels.com/photos/1610123/pexels-photo-1610123.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="relative z-10 flex h-full min-h-screen flex-col justify-end px-6 pb-24">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-start gap-6 text-white">
          <span className="text-[0.72rem] uppercase tracking-[0.4em] text-white/70">
            An Immersive Viewpoint
          </span>
          <h2 className="font-serif text-5xl leading-tight">
            The Story Continues
          </h2>
          <p className="max-w-[65ch] text-sm leading-loose text-white/80">
            Experience the LOVE collection in motion. Let the skyline mirror the
            timeless brilliance of every piece as the city awakens to golden
            light.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                isPaused ? "Play immersive video" : "Pause immersive video"
              }
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white transition-all duration-luxury-fast ease-luxury-in hover:border-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              {isPaused ? (
                <Play className="h-5 w-5" />
              ) : (
                <Pause className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={
                isMuted ? "Unmute immersive video" : "Mute immersive video"
              }
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white transition-all duration-luxury-fast ease-luxury-in hover:border-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveVideoSection;
