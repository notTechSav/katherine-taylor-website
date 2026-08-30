import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { HomepageEditorialOverlay } from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

export default function RatesVideoSection() {
  return (
    <FullscreenVideoSection
      posterSrc="/journal-teaser-bg.webp"
      posterMobileSrc="/rates-video-poster-mobile.webp?v=hires1"
      objectPosition="center center"
      overlayClassName="homepage-veil-lower-strong"
    >
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">The Structure</p>
        <h2 className="homepage-h2">Companion Rates</h2>
        <p className="homepage-body">
          Rates are published plainly. Availability remains intentionally limited.
        </p>
        <Link to="/rates" className="homepage-cta text-white">
          View Rates
        </Link>
      </HomepageEditorialOverlay>
    </FullscreenVideoSection>
  );
}
