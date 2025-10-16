import { useState } from "react";

// Cloudinary video optimized for fast loading
const VIDEO_URL =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/q_70,f_auto/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.mp4";

const POSTER_URL =
  "https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/so_0,q_auto:low,f_auto,w_1920/v1760312600/The_Story_Continues_Katherine_Taylor_Escort_slmfra.jpg";

export default function RatesVideoSection() {
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
        src={VIDEO_URL}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-luxury-black/50 z-10" />

      {/* Audio toggle - top right */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-30 bg-white/10 text-white px-4 py-2 rounded-full text-sm tracking-uppercase backdrop-blur hover:bg-white/20 transition-opacity duration-250"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      {/* Bottom-aligned text block */}
      <div className="relative z-20 flex h-full w-full items-end px-6 pb-24 text-white">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-4xl font-serif tracking-wide uppercase mb-4">
            Rates
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Transparent pricing for timeless experiences.
          </p>
          <a
            href="/rates"
            className="inline-block mt-6 text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            View Rates
          </a>
        </div>
      </div>
    </div>
  );
}
