"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import PageHeroOverlay from "@/components/site/PageHeroOverlay";

const heroImage = {
  src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fff453c7ff48442fc8efd2f475a954ade?format=webp&width=800",
  alt: "Warm afternoon light casting shadows over a solitary wooden knight chess piece on linen",
};

const RatesPage = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="bg-luxury-white text-luxury-black">
      <PageHeroOverlay
        title="Rates"
        subtitle="Every figure on this page exists to protect one idea: you never have to explain yourself twice."
        eyebrow="Rate Structure"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />

      <section className="bg-luxury-white">
        <div className="container mx-auto px-6 pb-20 pt-16 md:px-8 md:pt-20">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700 md:text-lg">
              My work is cumulative, not transactional. Each engagement carries
              forward the full history of your context—professional, personal,
              logistical—so nothing resets.
            </p>
            <p className="text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700 md:text-lg">
              The premium reflects continuity, discretion, and the scarcity
              discipline required to deliver them without compromise.
            </p>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="group inline-flex items-center gap-3 border border-gray-300 px-8 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
              style={{ fontWeight: 300 }}
            >
              <span>
                {isRevealed ? "CONCEAL STRUCTURE" : "SHOW CURRENT STRUCTURE"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-all duration-300 ${isRevealed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Expandable Rates Content */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isRevealed ? "max-h-[20000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Rates */}
        <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <h2
              className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Rates
            </h2>

            {/* Hourly Rates */}
            <div className="space-y-4 mb-12">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  1 hour
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $2,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  2 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $3,500
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  3 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $5,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  4 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $6,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  5 hours
                  <span className="ml-3 text-xs font-light tracking-[0.08em] uppercase text-gray-400">
                    Most Popular
                  </span>
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $7,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  6 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $8,000
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Extended Rates */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  Overnight{" "}
                  <span className="text-sm text-gray-500">(up to 14 hours)</span>
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $14,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  24 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $18,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  48 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $20,000
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 transition-all duration-200 hover:border-gray-400 hover:pb-4">
                <span className="text-base font-light text-gray-700">
                  72 hours
                </span>
                <span className="text-lg font-light text-luxury-black tabular-nums">
                  $28,000
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Travel */}
        <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <h2
              className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Travel
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black">
                  West Coast
                </p>
                <p className="text-sm font-light text-gray-600 mt-1">
                  Add $1,000 travel fee + first-class airfare + accommodation
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black">
                  Midwest
                </p>
                <p className="text-sm font-light text-gray-600 mt-1">
                  Add $2,000 travel fee + first-class airfare + accommodation
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black">
                  National
                </p>
                <p className="text-sm font-light text-gray-600 mt-1">
                  Add $3,000 travel fee + first-class airfare + accommodation
                </p>
              </div>
              <div className="pb-4">
                <p className="text-base font-light text-luxury-black">
                  International
                </p>
                <p className="text-sm font-light text-gray-600 mt-1">
                  Add $4,000 travel fee + first-class airfare + accommodation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <h2
              className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Notes
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black mb-1">
                  Sacramento
                </p>
                <p className="text-sm font-light text-gray-600">
                  Hosting provided at no additional cost.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black mb-1">
                  Outcalls
                </p>
                <p className="text-sm font-light text-gray-600">
                  Round-trip car service preferred.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black mb-1">
                  Extensions
                </p>
                <p className="text-sm font-light text-gray-600">
                  $1,000 per additional hour.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-base font-light text-luxury-black mb-1">
                  Additional Guest
                </p>
                <p className="text-sm font-light text-gray-600">
                  Add $1,000 for a companion to join.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-gray-50">
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <h2
              className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Payment
            </h2>

            <div className="space-y-4">
              <p className="text-base font-light leading-[1.8] text-gray-700">
                Full payment is preferred in advance. A 50% deposit secures your date; balance due before we meet.
              </p>
              <p className="text-base font-light leading-[1.8] text-gray-700">
                I accept bank transfer, Zelle, PayPal, Visa, and MasterCard.
              </p>
              <div className="border-l-2 border-gray-300 pl-4 py-2">
                <p className="text-sm font-light text-gray-600">
                  Amex: 3% processing fee on transactions over $10,000.
                </p>
              </div>
              <p className="text-sm font-light text-gray-600">
                Cancellations are non-refundable but may be rescheduled within 90 days.
              </p>
            </div>
          </div>
        </section>

        {/* Annual Partnership - The Hidden Birkin */}
        <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
          <div className="container mx-auto px-6 md:px-8 max-w-2xl">
            <h2
              className="mb-8 text-3xl md:text-4xl font-extralight tracking-[-0.02em] text-luxury-black"
              style={{ fontWeight: 200 }}
            >
              Annual Partnerships
            </h2>

            <p className="text-base font-light leading-[1.8] text-gray-700 mb-8">
              For a limited number of clients, I offer ongoing retainer arrangements that formalize what many already practice: continuity without interruption.
            </p>

            <p className="mb-6 text-sm font-light tracking-[0.06em] text-gray-500">
              What this includes:
            </p>

            <ul className="space-y-3 text-base font-light leading-[1.8] text-gray-700 mb-8">
              <li className="border-l-2 border-gray-300 pl-4">
                Unlimited access between engagements—you're never an interruption
              </li>
              <li className="border-l-2 border-gray-300 pl-4">
                The conversation never resets—I stay current on your world
              </li>
              <li className="border-l-2 border-gray-300 pl-4">
                Priority on your calendar, not mine—you book when it works for you
              </li>
              <li className="border-l-2 border-gray-300 pl-4">
                Anticipatory preparation—I've done my homework before you arrive
              </li>
              <li className="border-l-2 border-gray-300 pl-4">
                Flexible structure—designed around your life, not a fixed schedule
              </li>
              <li className="border-l-2 border-gray-300 pl-4">
                Optional S-corp billing for tax purposes
              </li>
            </ul>

            <p className="text-base font-light leading-[1.8] text-gray-700 mb-6">
              These partnerships are customized individually and limited by design.
            </p>

            <p className="text-sm font-light italic text-gray-600 mb-8">
              If continuity matters to you, reach out. We'll discuss what makes sense.
            </p>

            <div className="text-center">
              <a
                href="/inquire"
                className="inline-flex items-center gap-3 border border-gray-300 px-8 py-4 text-sm font-medium tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                style={{ fontWeight: 300 }}
              >
                INQUIRE
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Closing Statement */}
      <section className="border-t border-gray-200 py-20 md:py-28 bg-luxury-white">
        <div className="container mx-auto px-6 md:px-8 max-w-2xl text-center space-y-8">
          <p
            className="text-xl md:text-2xl font-extralight leading-[1.5] text-luxury-black"
            style={{ fontWeight: 200 }}
          >
            I don't sell time.
          </p>
          <p
            className="text-xl md:text-2xl font-extralight leading-[1.5] text-gray-700"
            style={{ fontWeight: 200 }}
          >
            I reserve attention, continuity, and discretion for the few who
            understand their value.
          </p>
          <p className="text-sm font-light italic text-gray-500 pt-4">
            Discretion is embedded, not billed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-luxury-white px-6 py-16">
        <div className="mx-auto max-w-[620px] space-y-6 text-left">
          <nav className="flex flex-wrap gap-3 text-[14px] font-light text-luxury-black">
            <a
              href="/inquire"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              Inquire
            </a>
            <a
              href="/faq"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              FAQ
            </a>
            <a
              href="/about"
              className="underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
            >
              About
            </a>
          </nav>
          <p className="text-xs font-light text-gray-400 tracking-[0.08em]">
            © 2025 Katherine Taylor
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RatesPage;
