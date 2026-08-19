import FullscreenVideoSection from "@/components/site/FullscreenVideoSection";
import { ratesVideo } from "@/lib/video-sections";
import { Link } from "react-router-dom";

export default function RatesVideoSection() {
  return (
    <FullscreenVideoSection
      videoSrc={ratesVideo.src}
      fallbackSrc={ratesVideo.fallbackSrc}
      posterSrc={ratesVideo.poster}
      posterMobileSrc={ratesVideo.posterMobile}
      objectPosition={ratesVideo.objectPosition}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-24 md:pb-20">
        <div className="pointer-events-auto max-w-xl">
          <h2 className="mb-4 font-serif text-2xl uppercase tracking-wide sm:text-4xl">
            Rates
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/90 sm:text-base">
            Transparent pricing for timeless experiences.
          </p>
          <Link
            to="/rates"
            className="text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            View Rates
          </Link>
        </div>
      </div>
    </FullscreenVideoSection>
  );
}
