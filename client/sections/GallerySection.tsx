import {
  HomepageEditorialOverlay,
  HomepageVeil,
} from "@/components/site/homepage-editorial";
import { Link } from "react-router-dom";

export default function GallerySection() {
  return (
    <div className="absolute inset-0 z-10">
      <HomepageVeil tone="lower-strong" />
      <HomepageEditorialOverlay>
        <p className="homepage-eyebrow">Three Collections</p>
        <h2 className="homepage-h2">Private Collections</h2>
        <p className="homepage-body">
          From Los Angeles to Northern California. Some rooms hold stillness,
          others hold saturation.
        </p>
        <Link to="/gallery" className="homepage-cta text-white">
          View Private Collections
        </Link>
      </HomepageEditorialOverlay>
    </div>
  );
}
