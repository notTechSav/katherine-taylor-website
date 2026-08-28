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
      <div className="homepage-overlay-bottom pointer-events-none text-white">
        <div className="homepage-rail">
          <div className="pointer-events-auto max-w-xl">
            <h1 className="homepage-h1 mb-3 sm:mb-4">
              Katherine Taylor Escort
            </h1>
            <p className="homepage-body mb-6 max-w-md text-white/90">
              High-end private companionship in San Francisco and Sacramento.
            </p>
            <Link to="/about" className="homepage-cta text-white">
              About Katherine
            </Link>
          </div>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
