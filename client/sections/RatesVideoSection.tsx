import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { ratesVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function RatesVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={ratesVideo.src}
      fallbackSrc={ratesVideo.fallbackSrc}
      posterSrc={ratesVideo.poster}
      posterMobileSrc={ratesVideo.posterMobile}
      objectPosition={ratesVideo.objectPosition}
    >
      <div className="homepage-overlay-bottom pointer-events-none text-white">
        <div className="homepage-rail">
          <div className="pointer-events-auto max-w-xl">
            <h2 className="homepage-h2-display mb-4">Companion Rates</h2>
            <p className="homepage-body mb-6 text-white/90">
              Transparent pricing for timeless experiences.
            </p>
            <Link to="/rates" className="homepage-cta text-white">
              View Rates
            </Link>
          </div>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
