import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { HomepageEditorialOverlay } from "@/components/site/homepage-editorial";
import { openingVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function OpeningVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={openingVideo.src}
      fallbackSrc={openingVideo.fallbackSrc}
      posterSrc={openingVideo.poster}
      objectPosition={openingVideo.objectPosition}
      overlayClassName="homepage-veil-lower"
      priority
    >
      <HomepageEditorialOverlay>
        <h1 className="homepage-h1">
          Katherine Taylor <span className="homepage-h1-break">Escort</span>
        </h1>
        <p className="homepage-body">
          Private companionship in
          <br className="md:hidden" /> San Francisco and Sacramento.
        </p>
        <Link to="/about" className="homepage-cta text-white">
          About Katherine
        </Link>
      </HomepageEditorialOverlay>
    </FullscreenVideoSection>
  );
}
