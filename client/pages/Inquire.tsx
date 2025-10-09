'use client';

import { useEffect } from "react";

const Inquire = () => {
  useEffect(() => {
    document.title = "Inquire | Katherine Taylor Escort - San Francisco & Sacramento";
  }, []);

  return (
    <div className="bg-[#fafaf7] text-[#1a1a1a]">
      {/* Hero Section - matching journal/gifts aesthetic */}
      <section className="relative bg-[#fafaf7]">
        <div className="mx-auto max-w-[680px] px-6 py-24 sm:px-10 sm:py-32">
          <header className="text-center">
            <p
              className="mb-3 text-xs font-light uppercase tracking-[0.12em] text-[#4a4a4a]"
              style={{ letterSpacing: "0.12em", fontWeight: 200 }}
            >
              CONNECT WITH KATHERINE TAYLOR
            </p>
            <h1
              className="text-4xl font-extralight leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] sm:text-[50px]"
              style={{ fontWeight: 200 }}
            >
              Inquire
            </h1>
          </header>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-[#fafaf7] px-6 pb-24 pt-8 text-[#1a1a1a] sm:px-10">
        <div className="mx-auto max-w-[680px] space-y-16">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-[16px] font-light leading-[1.75] text-[#4a4a4a]">
              I keep a limited calendar—typically 3-4 bookings monthly—to ensure each encounter receives the attention it deserves.
              If you're seeking a San Francisco escort or Sacramento escort who prioritizes depth over volume, this is how we begin.
            </p>
          </div>

          {/* Contact Information */}
          <article className="border-t border-[#e8e8e5] pt-10">
            <header className="mb-6">
              <h2
                className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-[#1a1a1a]"
                style={{ fontWeight: 200 }}
              >
                How to Reach Me
              </h2>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-[#737373]">
                  Email
                </h3>
                <a
                  href="mailto:inquiries@katherinetaylor.com"
                  className="text-[18px] font-light text-[#1a1a1a] underline-offset-[4px] transition-colors duration-300 hover:underline"
                >
                  inquiries@katherinetaylor.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-[#737373]">
                  When You Write
                </h3>
                <p className="text-[16px] font-light leading-[1.75] text-[#4a4a4a]">
                  Include your name, date, time, duration, and city (San Francisco, Sacramento, or elsewhere in the Bay Area).
                  Screening is required—references from established escorts near me or professional LinkedIn verification.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-[#737373]">
                  Response Time
                </h3>
                <p className="text-[16px] font-light leading-[1.75] text-[#4a4a4a]">
                  I respond within 24-48 hours. Last-minute requests rarely work with my calendar, but advance planning—ideally
                  a week or more—ensures we can create something memorable.
                </p>
              </div>
            </div>
          </article>

          {/* Screening & Expectations */}
          <article className="border-t border-[#e8e8e5] pt-10">
            <header className="mb-6">
              <h2
                className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-[#1a1a1a]"
                style={{ fontWeight: 200 }}
              >
                What to Expect
              </h2>
            </header>

            <div className="space-y-4">
              <p className="text-[16px] font-light leading-[1.75] text-[#4a4a4a]">
                Among San Francisco escorts and Bay Area escorts, I maintain thorough screening protocols. This protects both
                of us and ensures mutual respect from first contact.
              </p>
              <p className="text-[16px] font-light leading-[1.75] text-[#4a4a4a]">
                Once confirmed, I'll share details about our appointment—location recommendations if hosting, preparation
                suggestions, and any questions you might have. Discretion is default, never negotiable.
              </p>
            </div>
          </article>

          {/* Note */}
          <div className="rounded border border-[#e8e8e5] bg-white p-6 sm:p-8">
            <p className="text-[14px] font-light italic leading-[1.7] text-[#737373]">
              For those searching "escorts near me" or seeking "San Francisco escorts" with substance: this page exists to
              begin conversations that lead somewhere meaningful. Not every inquiry becomes a booking, and that's by design.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e8e5] bg-[#fafaf7] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[620px] space-y-4 text-left">
          <p className="text-[14px] font-light leading-[1.7] text-[#4a4a4a]">
            Questions about process, rates, or availability? Most answers live in the FAQ or on my rates page.
          </p>
          <nav className="flex flex-wrap gap-3 text-[14px] font-light text-[#1a1a1a]">
            <a href="/faq" className="underline-offset-[4px] transition-colors duration-300 hover:underline">
              FAQ
            </a>
            <a href="/rates" className="underline-offset-[4px] transition-colors duration-300 hover:underline">
              Rates & Registry
            </a>
            <a href="/about" className="underline-offset-[4px] transition-colors duration-300 hover:underline">
              About
            </a>
            <a href="/journal" className="underline-offset-[4px] transition-colors duration-300 hover:underline">
              The High-End Edition
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Inquire;
