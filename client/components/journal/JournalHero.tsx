import { memo } from "react";

import { builderHeroAttrs } from "@/lib/builder-image";

interface JournalHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const overlayGradient =
  "linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.65) 100%)";

const JournalHero = memo(
  ({ title, subtitle, imageSrc, imageAlt }: JournalHeroProps) => {
    const heroImage = builderHeroAttrs(imageSrc);

    return (
      <section className="relative bg-luxury-black">
        <figure className="relative h-[48vh] min-h-[280px] w-full overflow-hidden bg-luxury-black sm:h-[52vh]">
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes={heroImage.sizes}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{ background: overlayGradient }}
            aria-hidden
          />

          <figcaption className="pointer-events-none absolute inset-0 flex items-end">
            <div className="w-full px-8 pb-10 sm:mx-auto sm:max-w-[1120px] sm:px-12 sm:pb-14">
              <div className="max-w-xl text-left text-luxury-white">
                <p
                  className="mb-2 text-xs font-light uppercase tracking-[0.12em] text-luxury-white/75 sm:mb-3 sm:text-sm"
                  style={{ letterSpacing: "0.12em" }}
                >
                  THE HIGH-END EDITION
                </p>
                <h1
                  className="text-[32px] font-extralight leading-[1.15] tracking-[-0.02em] text-luxury-white sm:text-4xl sm:leading-[1.1] sm:text-[50px]"
                  style={{ fontWeight: 200 }}
                >
                  {title}
                </h1>
                <p className="mt-4 text-sm font-light leading-[1.8] text-luxury-white/80 sm:mt-5 sm:text-base">
                  {subtitle}
                </p>
              </div>
            </div>
          </figcaption>
        </figure>
      </section>
    );
  },
);

JournalHero.displayName = "JournalHero";

export default JournalHero;
