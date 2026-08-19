import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { closingVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function ClosingVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={closingVideo.src}
      fallbackSrc={closingVideo.fallbackSrc}
      posterSrc={closingVideo.poster}
      objectPosition={closingVideo.objectPosition}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-24">
        <div className="pointer-events-auto max-w-xl">
          <h2 className="mb-4 font-serif text-2xl uppercase sm:text-4xl">
            Limited Availability
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/90 sm:text-base">
            Currently accepting 3–4 bookings monthly. Inquire for current
            availability.
          </p>
          <Link
            to="/inquire"
            className="text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Inquire
          </Link>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
