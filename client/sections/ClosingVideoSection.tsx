import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { HomepageEditorialOverlay } from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

export default function ClosingVideoSection() {
  return (
    <FullscreenVideoSection
      posterSrc="/limited-availability-bg.webp"
      objectPosition="center 35%"
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
