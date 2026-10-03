import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
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

type PortraitFrame = {
  layoutWidth: number;
  layoutHeight: number;
  offsetTop: number;
  offsetLeft: number;
  visualWidth: number;
  visualHeight: number;
  rotate: number;
};

const EMPTY_PORTRAIT_FRAME: PortraitFrame = {
  layoutWidth: 0,
  layoutHeight: 0,
  offsetTop: 0,
  offsetLeft: 0,
  visualWidth: 0,
  visualHeight: 0,
  rotate: 0,
};

function framesMatch(a: PortraitFrame, b: PortraitFrame) {
  return (
    a.layoutWidth === b.layoutWidth &&
    a.layoutHeight === b.layoutHeight &&
    a.offsetTop === b.offsetTop &&
    a.offsetLeft === b.offsetLeft &&
    a.visualWidth === b.visualWidth &&
    a.visualHeight === b.visualHeight &&
    a.rotate === b.rotate
  );
}

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

/** Clockwise degrees from the device's natural orientation. */
function clockwiseDeviceAngle() {
  const orientation = window.screen?.orientation;
  if (orientation && typeof orientation.angle === "number") {
    return normalizeAngle(orientation.angle);
  }

  const legacy = (window as Window & { orientation?: number }).orientation;
  if (typeof legacy === "number") {
    // window.orientation is counterclockwise.
    return normalizeAngle(-legacy);
  }

  return 0;
}

/**
 * Degrees to rotate the photograph so it stays upright when the layout
 * viewport did not follow the phone. 0 means the viewport already matches.
 */
function uprightTurn() {
  if (typeof window === "undefined") return 0;

  const legacy = (window as Window & { orientation?: number }).orientation;
  const handheld =
    typeof legacy === "number" || window.matchMedia("(pointer: coarse)").matches;
  if (!handheld) return 0;

  const angle = clockwiseDeviceAngle();
  if (angle === 90) return -90;
  if (angle === 270) return 90;
  return 0;
}

function readPortraitFrame(): PortraitFrame {
  if (typeof window === "undefined") return EMPTY_PORTRAIT_FRAME;

  const viewport = window.visualViewport;
  const layoutWidth = Math.round(viewport?.width || window.innerWidth);
  const layoutHeight = Math.round(viewport?.height || window.innerHeight);
  const offsetTop = Math.round(viewport?.offsetTop ?? 0);
  const offsetLeft = Math.round(viewport?.offsetLeft ?? 0);
  const turn = uprightTurn();
  const layoutPortrait = layoutHeight >= layoutWidth;
  const stuckSideways = (turn === 90 || turn === -90) && layoutPortrait;

  return {
    layoutWidth,
    layoutHeight,
    offsetTop,
    offsetLeft,
    visualWidth: stuckSideways ? layoutHeight : layoutWidth,
    visualHeight: stuckSideways ? layoutWidth : layoutHeight,
    rotate: stuckSideways ? turn : 0,
  };
}

function usePortraitFrame(open: boolean) {
  const [frame, setFrame] = useState(readPortraitFrame);
  const [trackedOpen, setTrackedOpen] = useState(open);

  if (open !== trackedOpen) {
    setTrackedOpen(open);
    if (open) setFrame(readPortraitFrame());
  }

  useEffect(() => {
    if (!open) return;

    let timeouts: number[] = [];
    const commit = () => {
      const next = readPortraitFrame();
      setFrame((prev) => (framesMatch(prev, next) ? prev : next));
    };
    // iOS can report the new orientation before the visual viewport resizes.
    const followTurn = () => {
      commit();
      window.requestAnimationFrame(commit);
      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts = [80, 200, 400, 700].map((delay) => window.setTimeout(commit, delay));
    };

    followTurn();
    window.addEventListener("resize", followTurn);
    window.addEventListener("orientationchange", followTurn);
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", followTurn);
    viewport?.addEventListener("scroll", commit);
    const orientation = window.screen?.orientation;
    orientation?.addEventListener("change", followTurn);
    const observer = new ResizeObserver(commit);
    observer.observe(document.documentElement);

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      window.removeEventListener("resize", followTurn);
      window.removeEventListener("orientationchange", followTurn);
      viewport?.removeEventListener("resize", followTurn);
      viewport?.removeEventListener("scroll", commit);
      orientation?.removeEventListener("change", followTurn);
    };
  }, [open]);

  return frame;
}

function layerStyle(frame: PortraitFrame): CSSProperties {
  return {
    top: 0,
    left: 0,
    width: frame.layoutWidth,
    height: frame.layoutHeight,
    transform:
      frame.offsetTop !== 0 || frame.offsetLeft !== 0
        ? `translate(${frame.offsetLeft}px, ${frame.offsetTop}px)`
        : undefined,
  };
}

function AboutFigure({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const frame = usePortraitFrame(open);

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
          <DialogPrimitive.Overlay
            className="about-portrait-stage about-portrait-veil about-portrait-layer"
            style={layerStyle(frame)}
          />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="about-portrait-stage about-portrait-layer about-portrait-shell"
            style={layerStyle(frame)}
            onClick={() => setOpen(false)}
          >
            <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
            <div
              className="about-portrait-orient"
              data-turned={frame.rotate !== 0 ? "" : undefined}
              style={{
                width: frame.visualWidth,
                height: frame.visualHeight,
                transform: `translate(-50%, -50%) rotate(${frame.rotate}deg)`,
              }}
            >
              <DialogPrimitive.Close
                className="about-portrait-close"
                onClick={(event) => event.stopPropagation()}
              >
                Close
              </DialogPrimitive.Close>
              <div className="about-portrait-fit">
                <img
                  src={src}
                  alt={alt}
                  width={1024}
                  height={682}
                  className="about-portrait-photo"
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
            </div>
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
