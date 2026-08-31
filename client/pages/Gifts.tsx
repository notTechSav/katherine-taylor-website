"use client";

import { useState, useCallback, type ReactNode } from "react";
import GiftsGuidance from "@/pages/GiftsGuidance";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";

const GIFTS_HERO_VERSION = "2";
const giftsHero = {
  src: `/gifts-hero.webp?v=${GIFTS_HERO_VERSION}`,
  srcSet: [
    `/gifts-hero-800w.webp?v=${GIFTS_HERO_VERSION} 800w`,
    `/gifts-hero-1200w.webp?v=${GIFTS_HERO_VERSION} 1200w`,
    `/gifts-hero-1600w.webp?v=${GIFTS_HERO_VERSION} 1600w`,
    `/gifts-hero.webp?v=${GIFTS_HERO_VERSION} 2400w`,
  ].join(", "),
  sizes: "100vw",
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
      />
      {/* Hero Section - matching journal's hero exactly */}
      <section className="relative bg-luxury-white">
        <figure className="relative flex min-h-[68vh] w-full items-start justify-center overflow-hidden bg-[#2c241c] pt-4 sm:min-h-[76vh] sm:pt-6">
          <img
            src={giftsHero.src}
            srcSet={giftsHero.srcSet}
            sizes={giftsHero.sizes}
            alt="Open tan luxury cigar box with gold-banded cigars in warm window light"
            className="max-h-[56vh] w-auto max-w-[min(100%,32rem)] object-contain object-top sm:max-h-[62vh] sm:max-w-[min(80%,40rem)]"
            loading="eager"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,26,26,0.05) 0%, rgba(26,26,26,0.65) 100%)",
            }}
            aria-hidden
          />

          <figcaption className="pointer-events-none absolute inset-0 flex items-end">
            <div className="w-full px-8 pb-10 sm:mx-auto sm:max-w-[1120px] sm:px-12 sm:pb-14">
              <div className="max-w-xl text-left text-luxury-white">
                <p
                  className="mb-2 text-xs font-light uppercase tracking-[0.12em] text-luxury-white/75 sm:mb-3 sm:text-sm"
                  style={{ letterSpacing: "0.12em", fontWeight: 200 }}
                >
                  A QUIET PROTOCOL
                </p>
                <h1
                  className="text-[32px] font-extralight leading-[1.15] tracking-[-0.02em] text-luxury-white sm:text-4xl sm:leading-[1.1] sm:text-[50px]"
                  style={{ fontWeight: 200 }}
                >
                  Gifts
                </h1>
                <p className="mt-4 text-sm font-light leading-[1.8] text-luxury-white/80 sm:mt-5 sm:text-base">
                  A quiet page, by request
                </p>
              </div>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* Content Section - matching journal's grid section */}
      <section className="bg-luxury-white px-6 pb-24 pt-16 text-luxury-black sm:px-10">
        <div className="mx-auto flex max-w-[680px] flex-col gap-16 sm:gap-20">
          {/* Microline */}
          <p
            className="text-center text-[12px] font-light uppercase tracking-[0.16em] text-gray-600"
            style={{ letterSpacing: "0.16em" }}
          >
            I don't expect gifts. They're punctuation, not purpose.
          </p>

          {/* Main Content */}
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
                When they happen, they feel like punctuation — a quiet
                thank-you, a gesture that marks continuity, not transaction.
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
