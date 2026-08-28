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
          “Escorts near me” is an incredibly efficient Google search. I'm not convinced it's a particularly good selection criterion.
        </p>
        <p className="homepage-body">
          Memory matters. Compatibility matters. Discretion matters. Presence matters. And sometimes the right person is worth getting on a plane for.
        </p>
        <p className="homepage-body">
          I left escorting because I genuinely thought I was going to get married. That did not go according to plan.
        </p>
        <Link to="/sacramento-escorts" className="homepage-cta text-white">
          Read the High{"\u2011"}End Edition
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default SacramentoTeaserSection;
