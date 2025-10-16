import { useState } from "react";

// Balanced quality for fast loading and good visuals
const HERO_VIDEO =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_80,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.mp4";

const POSTER_URL =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_0,q_auto:low,f_auto,w_1920/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.jpg";

export default function OpeningVideoSection() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="h-full w-full relative bg-luxury-black">
      {/* Full-viewport video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        poster={POSTER_URL}
        src={HERO_VIDEO}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-luxury-black/60 z-10" />

      {/* Audio toggle - top right */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-30 bg-white/10 text-white px-4 py-2 rounded-full text-sm tracking-uppercase backdrop-blur hover:bg-white/20 transition-opacity duration-250"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      {/* Bottom-aligned text block */}
      <div className="relative z-20 flex h-full w-full flex-col justify-end px-6 pb-24 text-white">
        <div className="max-w-xl">
          <h3 className="text-sm sm:text-base font-light uppercase tracking-uppercase text-luxury-white/70 mb-4">
            Love, Elevated
          </h3>
          <h1 className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">
            An Experience That Reflects Your Highest Qualities
          </h1>
          <a
            href="/inquire"
            className="text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Reserve an Evening
          </a>
        </div>
      </div>
    </div>
  );
}
