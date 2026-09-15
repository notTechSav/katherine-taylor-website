"use client";

import { useState, useCallback, type ReactNode } from "react";
import GiftsGuidance from "@/pages/GiftsGuidance";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import { guidanceParagraphs } from "@/lib/gifts-content";
import { giftsJsonLd } from "@/lib/page-json-ld";
import { pageSeo } from "@/lib/page-seo";

const giftsHero = {
  src: "/gifts-hero.webp?v=2",
  alt: "Open tan luxury cigar box with gold-banded cigars in warm window light",
};

const Gifts = ({ children }: { children?: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleGuidance = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <main className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.gifts.title}
        description={pageSeo.gifts.description}
        path={pageSeo.gifts.path}
        jsonLd={giftsJsonLd}
      />
      <PageHeroOverlay
        title="Gifts"
        subtitle="A quiet page, by request"
        eyebrow="A Quiet Protocol"
        imageSrc={giftsHero.src}
        imageAlt={giftsHero.alt}
        alignment="left"
        gradient="vertical"
        imageClassName="object-center"
      />

      <section className="bg-luxury-white px-6 pb-24 pt-16 text-luxury-black sm:px-10">
        <div className="mx-auto flex max-w-[680px] flex-col gap-16 sm:gap-20">
          <p
            className="text-center text-[12px] font-light uppercase tracking-[0.16em] text-gray-600"
            style={{ letterSpacing: "0.16em" }}
          >
            I don't expect gifts. They're punctuation, not purpose.
          </p>

          <div className="space-y-16">
            <article className="group space-y-4 border-t border-gray-200 pt-10 text-left first:border-t-0 first:pt-0">
              <header>
                <h2
                  className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
                  style={{ fontWeight: 200 }}
                >
                  On Thoughtful Gestures
                </h2>
              </header>
              <p className="max-w-[62ch] text-[18px] font-light leading-[1.75] text-gray-600">
                {guidanceParagraphs[0]}
              </p>
              <p className="max-w-[62ch] text-[18px] font-light leading-[1.75] text-gray-600">
                {guidanceParagraphs[1]}
              </p>
              <p className="max-w-[62ch] text-[18px] font-light leading-[1.75] text-gray-600">
                {guidanceParagraphs[2]}
              </p>
              <button
                type="button"
                onClick={toggleGuidance}
                className="inline-flex items-center text-[14px] font-light tracking-[0.01em] text-luxury-black transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-luxury-black/40 focus-visible:ring-offset-4 focus-visible:ring-offset-luxury-white"
                style={{
                  transitionDuration: "350ms",
                  letterSpacing: "0.01em",
                }}
                aria-expanded={isExpanded}
                aria-controls="gifts-guidance"
              >
                <span
                  className="underline-offset-[6px] transition-all hover:underline"
                  style={{ transitionDuration: "350ms" }}
                >
                  {isExpanded ? "Hide guidance" : "Read guidance"}
                </span>
              </button>
            </article>

            {isExpanded ? <GiftsGuidance /> : null}
          </div>
        </div>
      </section>

      {children}
    </main>
  );
};

export default Gifts;
