import { memo } from "react";

interface JournalHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

const overlayGradient =
  "linear-gradient(180deg, rgba(26,26,26,0.05) 0%, rgba(26,26,26,0.65) 100%)";

const JournalHero = memo(({ title, subtitle, imageSrc, imageAlt }: JournalHeroProps) => {
  return (
    <section className="relative bg-[#fafaf7]">
      <figure className="relative h-[48vh] min-h-[280px] w-full overflow-hidden sm:h-[52vh]">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: overlayGradient }} aria-hidden />
        <figcaption className="pointer-events-none absolute inset-0 hidden items-end sm:flex">
          <div className="mx-auto w-full max-w-[1120px] px-12 pb-14">
            <div className="max-w-xl text-left text-[#fafaf7]">
              <p
                className="mb-3 text-sm font-light uppercase tracking-[0.12em] text-[#f2f2ee]/75"
                style={{ letterSpacing: "0.12em" }}
              >
                THE HIGH-END EDITION
              </p>
              <h1
                className="text-4xl font-extralight leading-[1.1] tracking-[-0.02em] sm:text-[50px]"
                style={{ fontWeight: 200 }}
              >
                {title}
              </h1>
              <p className="mt-5 text-base font-light text-[#f5f4f0]/85">{subtitle}</p>
            </div>
          </div>
        </figcaption>
      </figure>
      <div className="mx-auto w-full max-w-[640px] px-8 py-10 text-left sm:hidden">
        <p
          className="mb-2 text-xs font-light uppercase tracking-[0.12em] text-[#4a4a4a]"
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
        <p className="mt-4 text-sm font-light leading-[1.8] text-[#4a4a4a]">{subtitle}</p>
      </div>
    </section>
  );
});

JournalHero.displayName = "JournalHero";

export default JournalHero;
