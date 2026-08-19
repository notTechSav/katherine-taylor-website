import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { openingVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function OpeningVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={openingVideo.src}
      fallbackSrc={openingVideo.fallbackSrc}
      posterSrc={openingVideo.poster}
      objectPosition={openingVideo.objectPosition}
      overlayClassName="bg-black/20 md:bg-black/30"
      priority
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-24 md:pb-28">
        <div className="pointer-events-auto max-w-xl">
          <h1 className="mb-3 font-serif text-3xl uppercase tracking-wide sm:mb-4 sm:text-5xl">
            Timeless Luxury
          </h1>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
            A cinematic experience of elegance and intention.
          </p>
          <Link
            to="/about"
            className="text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Discover
          </Link>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
