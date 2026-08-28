import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

const FAQTeaserCard = () => {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">Transparency Over Theater</p>
        <h2 className="homepage-h2">
          Frequently Asked <span className="homepage-h2-break">Questions</span>
        </h2>
        <p className="homepage-body">
          Clear answers on screening, discretion, etiquette, and the practical details worth understanding before an introduction.
        </p>
        <Link to="/faq" className="homepage-cta text-white">
          Read the FAQ
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
};

export default FAQTeaserCard;
