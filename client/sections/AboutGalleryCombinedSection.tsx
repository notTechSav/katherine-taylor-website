import FullBleedPhoto from "@/components/site/FullBleedPhoto";
import { Link } from "react-router-dom";

export default function AboutGalleryCombinedSection() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="relative flex h-full flex-col items-center justify-center px-6 py-12 md:px-8">
        <FullBleedPhoto src="/about-slide-mobile.webp?v=hires3" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <h2 className="homepage-h2-split relative z-10 mb-6 text-white">
          About Katherine Taylor
        </h2>
        <Link
          to="/about"
          className="homepage-cta-frame relative z-10 text-white"
        >
          About Katherine
        </Link>
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6 py-12 md:px-8">
        <FullBleedPhoto src="/katherinewindow.webp?v=hires3" />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <h2 className="homepage-h2-split relative z-10 mb-6 text-white">
          Private Collections
        </h2>
        <Link
          to="/gallery"
          className="homepage-cta-frame relative z-10 text-white"
        >
          View Private Collections
        </Link>
      </div>
    </div>
  );
}
