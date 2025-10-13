import { memo } from "react";

interface NextSectionCTAProps {
  label: string;
  href: string;
  eyebrow?: string;
}

const NextSectionCTA = memo(
  ({ label, href, eyebrow }: NextSectionCTAProps) => {
    return (
      <section className="border-t border-neutral-200 bg-luxury-white py-20 md:py-24">
        <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6 px-6 text-center md:px-8">
          {eyebrow && (
            <span className="text-xs font-light uppercase tracking-uppercase text-neutral-500">
              {eyebrow}
            </span>
          )}
          <a
            href={href}
            className="group relative inline-flex items-center gap-3 text-lg font-light tracking-luxury text-luxury-black transition-opacity duration-250 hover:opacity-60"
          >
            <span>{label}</span>
            <svg
              className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    );
  }
);

NextSectionCTA.displayName = "NextSectionCTA";

export default NextSectionCTA;
