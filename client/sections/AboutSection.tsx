import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">The Practice</p>
        <h2 className="homepage-h2">
          About <span className="homepage-h2-break">Katherine Taylor</span>
        </h2>
        <p className="homepage-body">
          I remember what matters. The conversation picks up where it left.
        </p>
        <Link to="/about" className="homepage-cta text-white">
          About Katherine
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
}
