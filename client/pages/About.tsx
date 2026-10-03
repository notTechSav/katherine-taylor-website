import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import { aboutJsonLd } from "@/lib/about-json-ld";
import { pageSeo } from "@/lib/page-seo";

const ABOUT_HERO_IMAGE = "/about-hero.webp?v=2";
const ABOUT_MEMORY_IMAGE = "/about-memory.webp?v=3";

const editorialLinkClass =
  "underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline";

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
          alignment="left"
        />
        <div className="mx-auto max-w-[680px] px-6 pb-24 pt-16 md:px-8 md:pb-28 md:pt-20">
          <header>
            <p className="text-center text-[17px] leading-[1.9] text-luxury-black">
              Katherine Taylor is a high-end escort working privately in San
              Francisco and Sacramento.
            </p>
            <div className="my-16 flex justify-center" aria-hidden="true">
              <span className="text-neutral-400/60">• • •</span>
            </div>
            <div className="space-y-6">
              <p>
                The conversation never resets. I carry forward everything—your
                M&amp;A timeline, your board anxieties, your daughter's college
                decision, the trip to Patagonia you've been planning. Not because I
                take notes, but because I've built a decade of pattern libraries
                that let me read what you don't say.
              </p>
              <p>
                <a href="/rates#why" className={editorialLinkClass}>
                  The rate
                </a>{" "}
                is what it costs to keep that memory human.
              </p>
            </div>
          </header>

          <div className="my-16 flex justify-center" aria-hidden="true">
            <span className="text-neutral-400/60">• • •</span>
          </div>

          <main className="space-y-16">
            <section className="space-y-7">
              <h2
                id="institutional-memory"
                className="scroll-mt-28 text-2xl font-extralight tracking-[-0.02em] text-luxury-black md:text-3xl"
                style={{ fontWeight: 200 }}
              >
                Institutional Memory
              </h2>
              <p>
                A client once sent two lines: in-suite only, three hours, no
                celebrity talk. Most people would see red flags. I saw the
                date—Gateway Conference, same week last year at the Four Seasons.
                I saw the precision—three hours meant no dinner break. I saw the
                subtext—he'd had a bad experience and wanted efficiency, privacy,
                and a conversation with substance. I arrived discreetly at seven,
                no instructions needed. That's what institutional memory looks
                like when it's in practice.
              </p>
              <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={ABOUT_MEMORY_IMAGE}
                    width={1024}
                    height={682}
                    sizes="(min-width: 768px) 680px, 100vw"
                    alt="Katherine Taylor lying beside a swimming pool in sunlight"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
            </section>

            <section className="space-y-7">
              <h2
                id="strategic-counsel"
                className="scroll-mt-28 text-2xl font-extralight tracking-[-0.02em] text-luxury-black md:text-3xl"
                style={{ fontWeight: 200 }}
              >
                Strategic Counsel and Continuity
              </h2>
              <p>
                My work sits at the intersection of strategic counsel and{" "}
                <a
                  href="/journal/continuity-as-craft"
                  className={editorialLinkClass}
                >{"personal continuity"}</a>{". Half of what I do is high-level thinking—pattern recognition, operational clarity, risk sorting. The other half is presence—listening until I can hear the sentence you didn't finish. The outcome is relief: you don't have to explain yourself to be understood."}
              </p>
              <p>
                I keep a{" "}
                <a
                  href="/journal/scarcity-discipline"
                  className={editorialLinkClass}
                >
                  small roster
                </a>{" "}
                so every relationship stays alive in my head. Each engagement
                builds on the last; by the third, we're operating at full depth.
                Decisions move faster, and the conversations reach a level most
                people never get to have.
              </p>
            </section>

            <section className="space-y-7">
              <h2
                id="who-i-work-with"
                className="scroll-mt-28 text-2xl font-extralight tracking-[-0.02em] text-luxury-black md:text-3xl"
                style={{ fontWeight: 200 }}
              >
                Who I Work With
              </h2>
              <p>
                I work with C-suite executives, IPO founders, and family-office
                principals who already have brilliant advisors but no one who
                remembers the whole picture—the professional, the personal, and
                the quiet space in between. That's the gap I fill.
              </p>
              <p>
                I don't advertise availability because capacity is limited by
                design. When I reach a handful of active partnerships, I{" "}
                <a href="/rates#why" className={editorialLinkClass}>
                  raise rates
                </a>{" "}
                rather than add more names. If continuity matters to you, reach
                out.
              </p>
            </section>
          </main>
        </div>
      </div>
  );
};

export default About;
