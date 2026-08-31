import { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { getSectionAdjacent } from "@/lib/section-nav";
import { cn } from "@/lib/utils";

interface NextSectionCTAProps {
  label?: string;
  href?: string;
  backLabel?: string;
  backHref?: string;
}

const linkClass =
  "group relative inline-flex min-h-[44px] items-center gap-3 text-lg font-light tracking-luxury text-luxury-black transition-opacity duration-250 hover:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current";

function DirectionArrow({ direction }: { direction: "back" | "next" }) {
  const isBack = direction === "back";

  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-250",
        isBack ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          isBack
            ? "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            : "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        }
      />
    </svg>
  );
}

const NextSectionCTA = memo(
  ({ label, href, backLabel, backHref }: NextSectionCTAProps) => {
    const hasNext = Boolean(label && href);
    const hasBack = Boolean(backLabel && backHref);

    if (!hasNext && !hasBack) {
      return null;
    }

    // Homepage keeps the original stacked NEXT band.
    if (!hasBack) {
      return (
        <section className="border-t border-neutral-200 bg-luxury-white py-24 md:py-32 lg:py-40">
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 px-6 text-center md:px-8">
            <span className="text-xs font-light uppercase tracking-uppercase text-neutral-500">
              Next
            </span>
            <Link to={href!} className={linkClass}>
              <span>{label}</span>
              <DirectionArrow direction="next" />
            </Link>
          </div>
        </section>
      );
    }

    return (
      <nav
        aria-label="Page"
        className="border-t border-neutral-200 bg-luxury-white py-10 md:py-12"
      >
        <div className="homepage-rail flex flex-nowrap items-center justify-between gap-4 md:gap-6">
          <Link to={backHref!} className={cn(linkClass, "min-w-0 text-base md:text-lg")}>
            <DirectionArrow direction="back" />
            <span>{backLabel}</span>
          </Link>
          {hasNext ? (
            <Link
              to={href!}
              className={cn(linkClass, "ml-auto min-w-0 text-right text-base md:text-lg")}
            >
              <span>{label}</span>
              <DirectionArrow direction="next" />
            </Link>
          ) : null}
        </div>
      </nav>
    );
  },
);

NextSectionCTA.displayName = "NextSectionCTA";

export const PageSectionNav = () => {
  const { pathname } = useLocation();
  const { back, next } = getSectionAdjacent(pathname);

  return (
    <NextSectionCTA
      backLabel={back?.label}
      backHref={back?.href}
      label={next?.label}
      href={next?.href}
    />
  );
};

export default NextSectionCTA;
