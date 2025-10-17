import { useState } from "react";

// Optimized for performance: q_60 reduces file size from 10.5MB to ~4.6MB
const HERO_VIDEO =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_60,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.mp4";

// Valid poster image: 127KB JPEG at 3-second offset
const POSTER_URL =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_3,q_auto:good,f_jpg,w_1920/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.jpg";

export default function OpeningVideoSection() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="h-full w-full relative bg-black">
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
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Audio toggle */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="unmute-toggle absolute top-4 right-4 z-30 bg-white/10 text-white px-4 py-2 rounded-full text-sm tracking-wide backdrop-blur hover:bg-white/20 transition"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      {/* Bottom-aligned text block */}
      <div className="relative z-20 flex h-full w-full items-end px-6 pb-24 text-white">
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wide uppercase mb-4">
            Timeless Luxury
          </h1>
          <p className="text-sm sm:text-base leading-relaxed">
            A cinematic experience of elegance and intention.
          </p>
        </div>
      </div>
    </div>
  );
}
