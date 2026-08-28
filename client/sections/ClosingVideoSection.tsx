import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { closingVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function ClosingVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={closingVideo.src}
      fallbackSrc={closingVideo.fallbackSrc}
      posterSrc={closingVideo.poster}
      objectPosition={closingVideo.objectPosition}
    >
      <div className="homepage-overlay-bottom pointer-events-none text-white">
        <div className="homepage-rail">
          <div className="pointer-events-auto max-w-xl">
            <h2 className="homepage-h2-display mb-4">Limited Availability</h2>
            <p className="homepage-body mb-6 text-white/90">
              Currently accepting 3–4 bookings monthly. Inquire for current
              availability.
            </p>
            <Link to="/inquire" className="homepage-cta text-white">
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
