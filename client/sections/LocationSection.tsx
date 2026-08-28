import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

const SanFranciscoTeaserSection = () => {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">The City</p>
        <h2 className="homepage-h2">San Francisco Escorts</h2>
        <p className="homepage-body">
          Where I spend much of my time with clients. I know this city the way you know your own patterns—where privacy is assumed, which hotels understand discretion, and how to move through San Francisco without friction.
        </p>
        <Link to="/memoirs-in-the-city" className="homepage-cta text-white">
          Memoirs in the City
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default SanFranciscoTeaserSection;
