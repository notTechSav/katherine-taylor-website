"use client";

import { useState, useCallback } from "react";
import GiftsGuidance from "@/pages/GiftsGuidance";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";

const Gifts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleGuidance = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.gifts.title}
        description={pageSeo.gifts.description}
        path={pageSeo.gifts.path}
      />
      {/* Hero Section - matching journal's hero exactly */}
      <section className="relative bg-luxury-white">
        <figure className="relative h-[48vh] min-h-[280px] w-full overflow-hidden sm:h-[52vh]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fe8959b4139fc4dd9a3ce4786c1b4e8dc?format=webp&width=1600"
            alt="Gifts for Katherine Taylor escort — San Francisco and Sacramento"
            className="h-full w-full object-cover"
            loading="eager"
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

      <NextSectionCTA label="Frequently Asked Questions" href="/faq" />
    </div>
  );
};

export default Gifts;
