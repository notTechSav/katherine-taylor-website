import { memo } from "react";

interface JournalHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const overlayGradient =
  "linear-gradient(180deg, rgba(26,26,26,0) 0%, rgba(26,26,26,0.55) 90%)";

const JournalHero = memo(({ title, subtitle, imageSrc, imageAlt }: JournalHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-[#fafaf7]">
      <div className="relative mx-auto flex max-w-6xl flex-col">
        <figure className="relative h-[48vh] min-h-[280px] overflow-hidden rounded-none sm:h-[50vh]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ background: overlayGradient }}
            aria-hidden
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[rgba(26,26,26,0.65)] to-transparent px-8 pb-12 pt-24 text-left text-[#fafaf7] sm:block sm:px-12">
            <div className="max-w-xl">
              <p
                className="mb-2 text-sm font-light tracking-[0.1em] text-[#f2f2ee]/80"
                style={{ letterSpacing: "0.12em" }}
              >
                THE HIGH-END EDITION
              </p>
              <h1
                className="text-4xl font-extralight leading-[1.1] tracking-[-0.02em] sm:text-[48px]"
                style={{ fontWeight: 200 }}
              >
                {title}
              </h1>
              <p className="mt-4 text-base font-light text-[#f5f4f0]/85">
                {subtitle}
              </p>
            </div>
          </figcaption>
        </figure>
        <div className="px-8 py-10 text-left sm:hidden">
          <p
            className="mb-2 text-xs font-light tracking-[0.12em] text-[#4a4a4a]"
            style={{ letterSpacing: "0.12em" }}
          >
            THE HIGH-END EDITION
          </p>
          <h1
            className="text-[32px] font-extralight leading-[1.15] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 200 }}
          >
            {title}
          </h1>
          <p className="mt-4 text-sm font-light leading-[1.8] text-[#4a4a4a]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
});

JournalHero.displayName = "JournalHero";

export default JournalHero;
