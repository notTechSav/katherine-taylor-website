import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

const GiftsBannerSection = () => {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">On Gifts</p>
        <h2 className="homepage-h2">Gift Etiquette</h2>
        <p className="homepage-body">
          Gifts aren't expected—they're punctuation, not purpose. When they happen, they feel like a quiet thank-you that marks knowing each other. The best ones reflect the texture of us.
        </p>
        <Link to="/gifts" className="homepage-cta text-white">
          Gift Guide
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default GiftsBannerSection;
