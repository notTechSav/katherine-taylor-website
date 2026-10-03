import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import { aboutJsonLd } from "@/lib/about-json-ld";
import { pageSeo } from "@/lib/page-seo";

const ABOUT_HERO_IMAGE = "/about-hero.webp?v=2";
const ABOUT_MEMORY_IMAGE = "/about-memory.webp?v=3";
const ABOUT_CONTINUITY_IMAGE = "/about-continuity.webp?v=1";

const editorialLinkClass =
  "underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline";

const headingClass =
  "scroll-mt-28 text-balance text-center text-[1.75rem] font-extralight leading-tight tracking-[-0.02em] text-luxury-black md:text-[2rem]";

const copyClass =
  "space-y-6 text-pretty text-[17px] font-light leading-[1.85] text-neutral-600";

function SectionRule() {
  return (
    <div className="flex justify-center py-12 md:py-14" aria-hidden="true">
      <span className="block h-px w-10 bg-neutral-300" />
    </div>
  );
}

function AboutFigure({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.setAttribute("data-lightbox-open", "");
    return () => html.removeAttribute("data-lightbox-open");
  }, [open]);

  return (
    <figure className="mt-10">
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger className="about-portrait" aria-label={`View, ${alt}`}>
          <AspectRatio ratio={3 / 2}>
            <img
              src={src}
              width={1024}
              height={682}
              sizes="(min-width: 768px) 640px, 100vw"
              alt={alt}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </AspectRatio>
          <span className="about-portrait-cue" aria-hidden="true">
            <span className="about-portrait-view">View</span>
          </span>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="about-portrait-stage about-portrait-veil fixed inset-0 z-[80]" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="about-portrait-stage fixed inset-0 z-[80] flex items-center justify-center outline-none"
            onClick={() => setOpen(false)}
          >
            <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="about-portrait-close"
              onClick={(event) => event.stopPropagation()}
            >
              Close
            </DialogPrimitive.Close>
            <img
              src={src}
              alt={alt}
              width={1024}
              height={682}
              className="max-h-[86vh] max-w-[92vw] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </figure>
  );
}

const About = () => {
  return (
    <div className="bg-luxury-white text-neutral-600">
      <SeoHead
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        path={pageSeo.about.path}
        jsonLd={[...aboutJsonLd] as Record<string, unknown>[]}
      />
      <PageHeroOverlay
        title="About Katherine Taylor"
        subtitle="I remember what matters. The conversation picks up where it left off."
        eyebrow="Katherine Taylor Escort"
        imageSrc={ABOUT_HERO_IMAGE}
        imageAlt="Katherine Taylor lying along the tiled edge of a swimming pool"
        imageClassName="object-[center_42%] sm:object-[center_42%]"
        alignment="center"
        gradient="vertical"
      />
      <main className="mx-auto max-w-[40rem] px-6 pb-24 pt-16 md:px-8 md:pb-28 md:pt-20">
        <p className="text-balance text-center text-[17px] font-light leading-[1.8] text-luxury-black">
          Katherine Taylor is a{" "}
          <span className="whitespace-nowrap">high-end</span> escort working
          privately in San Francisco and Sacramento.
        </p>

        <SectionRule />

        <section>
          <h2 id="where-we-left-off" className={headingClass} style={{ fontWeight: 200 }}>
            Where We Left Off
          </h2>
          <div className={`mt-6 ${copyClass}`}>
            <p>
              The conversation never resets. I carry forward everything—your
              M&amp;A timeline, your board anxieties, your daughter&apos;s college
              decision, the trip to Patagonia you&apos;ve been planning. Not because I
              take notes, but because I&apos;ve built a decade of pattern libraries
              that let me read what you don&apos;t say.
            </p>
          </div>
        </section>

        <SectionRule />

        <section>
          <h2 id="institutional-memory" className={headingClass} style={{ fontWeight: 200 }}>
            Institutional Memory
          </h2>
          <div className={`mt-6 ${copyClass}`}>
            <p>
              A client once sent two lines: in-suite only, three hours, no
              celebrity talk. Most people would see red flags. I saw the
              date—Gateway Conference, same week last year at the Four Seasons.
              I saw the precision—three hours meant no dinner break. I saw the
              subtext—he&apos;d had a bad experience and wanted efficiency, privacy,
              and a conversation with substance. I arrived discreetly at seven,
              no instructions needed. That&apos;s what institutional memory looks
              like when it&apos;s in practice.
            </p>
          </div>
          <AboutFigure
            src={ABOUT_MEMORY_IMAGE}
            alt="Katherine Taylor lying beside a swimming pool in sunlight"
          />
        </section>

        <SectionRule />

        <section>
          <h2 id="strategic-counsel" className={headingClass} style={{ fontWeight: 200 }}>
            Strategic Counsel and Continuity
          </h2>
          <div className={`mt-6 ${copyClass}`}>
            <p>
              My work sits at the intersection of strategic counsel and{" "}
              <a href="/journal/continuity-as-craft" className={editorialLinkClass}>
                personal continuity
              </a>
              {". Half of what I do is high-level thinking—pattern recognition, operational clarity, risk sorting. The other half is presence—listening until I can hear the sentence you didn't finish. The outcome is relief: you don't have to explain yourself to be understood."}
            </p>
            <p>
              I keep a{" "}
              <a href="/journal/scarcity-discipline" className={editorialLinkClass}>
                small roster
              </a>{" "}
              so every relationship stays alive in my head. Each engagement
              builds on the last; by the third, we&apos;re operating at full depth.
              Decisions move faster, and the conversations reach a level most
              people never get to have.
            </p>
          </div>
          <AboutFigure
            src={ABOUT_CONTINUITY_IMAGE}
            alt="Katherine Taylor reclining on a white sofa in a fur coat"
          />
        </section>

        <SectionRule />

        <section>
          <h2 id="who-i-work-with" className={headingClass} style={{ fontWeight: 200 }}>
            Who I Work With
          </h2>
          <div className={`mt-6 ${copyClass}`}>
            <p>
              I work with C-suite executives, IPO founders, and family-office
              principals who already have brilliant advisors but no one who
              remembers the whole picture—the professional, the personal, and
              the quiet space in between. That&apos;s the gap I fill.
            </p>
            <p>
              I don&apos;t advertise availability because capacity is limited by
              design. When I reach a handful of active partnerships, I{" "}
              <a href="/rates#why" className={editorialLinkClass}>
                raise rates
              </a>{" "}
              rather than add more names. If continuity matters to you, reach
              out.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
