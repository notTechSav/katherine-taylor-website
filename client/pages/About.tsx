import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import { useEffect } from "react";

const ABOUT_HERO_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F544eebd3dfb24d86b1212878113625c0?format=webp&width=1600";
const ABOUT_SECONDARY_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fc52c5d671db044f38e0442b59a54c778?format=webp&width=1200";

const About = () => {
  useEffect(() => {
    document.title = "About Katherine Taylor | High-End Private Companionship";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Katherine Taylor offers refined, ongoing companionship for executives and founders. Strategic counsel meets personal continuity—institutional memory that lets you move without rehearsal."
      );
    }
  }, []);

  return (
    <div className="bg-luxury-white text-neutral-600">
        <PageHeroOverlay
          title="About Me"
          subtitle="I remember what matters. The conversation picks up where it left."
          eyebrow="Katherine Taylor"
          imageSrc={ABOUT_HERO_IMAGE}
          imageAlt="Sunlit doorway opening onto herringbone floors beside linen curtains"
          alignment="left"
        />
        <div className="mx-auto max-w-[680px] px-6 pb-24 pt-16 md:px-8 md:pb-28 md:pt-20">
          <header className="space-y-6">
            <p className="text-[17px] leading-[1.9] text-luxury-black">
              The conversation never resets. I carry forward everything—your
              M&amp;A timeline, your board anxieties, your daughter's college
              decision, the trip to Patagonia you've been planning. Not because I
              take notes, but because I've built a decade of pattern libraries
              that let me read what you don't say.
            </p>
          </header>

          <div className="my-16 flex justify-center" aria-hidden="true">
            <span className="text-neutral-400/60">• • •</span>
          </div>

          <main className="space-y-16">
            <section className="space-y-7">
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
                    src={ABOUT_SECONDARY_IMAGE}
                    alt="Hardcover journal with pencil and card in warm window light"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
              <p>
                My work sits at the intersection of strategic counsel and personal
                continuity. Half of what I do is high-level thinking—pattern
                recognition, operational clarity, risk sorting. The other half is
                presence—listening until I can hear the sentence you didn't
                finish. The outcome is relief: you don't have to explain yourself
                to be understood.
              </p>
              <p>
                I keep a small roster so every relationship stays alive in my
                head. Each engagement builds on the last; by the third, we're
                operating at full depth. Decisions move faster, and the
                conversations reach a level most people never get to have.
              </p>
              <p>
                I work with C-suite executives, IPO founders, and family-office
                principals who already have brilliant advisors but no one who
                remembers the whole picture—the professional, the personal, and
                the quiet space in between. That's the gap I fill.
              </p>
              <p>
                I don't advertise availability because capacity is limited by
                design. When I reach twenty active partnerships, I raise rates
                rather than add more names. If continuity matters to you, reach
                out before the next review window.
              </p>
            </section>
          </main>
        </div>
        <NextSectionCTA
          eyebrow="Next"
          label="Explore Gallery"
          href="/gallery"
        />
      </div>
  );
};

export default About;
