import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

const SacramentoTeaserSection = () => {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">
          Katherine Taylor • Sacramento Escort
        </p>
        <h2 className="homepage-h2">
          Escorts Near Me |{" "}
          <span className="homepage-h2-break">The High{"\u2011"}End Edition</span>
        </h2>
        <p className="homepage-body">
          “Escorts near me” can find proximity. It can't find chemistry, trust, or history.
        </p>
        <p className="homepage-body">
          I left escorting two years ago to pursue marriage and a normal life. That chapter went differently than expected. This is why I left—and what brought me back.
        </p>
        <Link to="/sacramento-escorts" className="homepage-cta text-white">
          Read the High{"\u2011"}End Edition
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default SacramentoTeaserSection;
