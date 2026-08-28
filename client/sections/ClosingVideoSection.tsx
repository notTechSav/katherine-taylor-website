import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { HomepageEditorialOverlay } from "@/components/site/homepage-editorial";
import { closingVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function ClosingVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={closingVideo.src}
      fallbackSrc={closingVideo.fallbackSrc}
      posterSrc={closingVideo.poster}
      objectPosition={closingVideo.objectPosition}
      overlayClassName="homepage-veil-lower"
    >
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">By Introduction</p>
        <h2 className="homepage-h2">Limited Availability</h2>
        <p className="homepage-body">
          I accept three to four private engagements each month.
        </p>
        <p className="homepage-body">
          Each inquiry is considered personally.
        </p>
        <Link to="/inquire" className="homepage-cta text-white">
          Private Inquiry
        </Link>
      </HomepageEditorialOverlay>
    </FullscreenVideoSection>
  );
}
