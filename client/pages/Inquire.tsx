'use client';

import { useEffect } from "react";

const Inquire = () => {
  useEffect(() => {
    document.title = "Inquire | Katherine Taylor Escort - San Francisco & Sacramento";
  }, []);

  return (
    <div className="bg-luxury-white text-luxury-black">
      {/* Hero Section - matching journal/gifts aesthetic */}
      <section className="relative bg-luxury-white">
        <div className="mx-auto max-w-[680px] px-6 py-24 sm:px-10 sm:py-32">
          <header className="text-center">
            <p
              className="mb-3 text-xs font-light uppercase tracking-[0.12em] text-gray-600"
              style={{ letterSpacing: "0.12em", fontWeight: 200 }}
            >
              CONNECT WITH KATHERINE TAYLOR
            </p>
            <h1
              className="text-4xl font-extralight leading-[1.1] tracking-[-0.02em] text-luxury-black sm:text-[50px]"
              style={{ fontWeight: 200 }}
            >
              Inquire
            </h1>
          </header>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-luxury-white px-6 pb-24 pt-8 text-luxury-black sm:px-10">
        <div className="mx-auto max-w-[680px] space-y-16">
          {/* Introduction */}
          <div className="space-y-6">
            <p className="text-[16px] font-light leading-[1.75] text-gray-600">
              I keep a limited calendar—typically 3-4 bookings monthly—to ensure each encounter receives the attention it deserves.
              If you're seeking a San Francisco escort or Sacramento escort who prioritizes depth over volume, this is how we begin.
            </p>
          </div>

          {/* Contact Information */}
          <article className="border-t border-gray-200 pt-10">
            <header className="mb-6">
              <h2
                className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                How to Reach Me
              </h2>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-gray-500">
                  Email
                </h3>
                <a
                  href="mailto:inquiries@katherinetaylor.com"
                  className="text-[18px] font-light text-luxury-black underline-offset-[4px] transition-colors duration-300 hover:text-gray-600 hover:underline"
                >
                  inquiries@katherinetaylor.com
                </a>
              </div>

              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-gray-500">
                  When You Write
                </h3>
                <p className="text-[16px] font-light leading-[1.75] text-gray-600">
                  Include your name, date, time, duration, and city (San Francisco, Sacramento, or elsewhere in the Bay Area).
                  Screening is required—references from established escorts near me or professional LinkedIn verification.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-[14px] font-light uppercase tracking-[0.1em] text-gray-500">
                  Response Time
                </h3>
                <p className="text-[16px] font-light leading-[1.75] text-gray-600">
                  I respond within 24-48 hours. Last-minute requests rarely work with my calendar, but advance planning—ideally
                  a week or more—ensures we can create something memorable.
                </p>
              </div>
            </div>
          </article>

          {/* Screening & Expectations */}
          <article className="border-t border-gray-200 pt-10">
            <header className="mb-6">
              <h2
                className="text-[28px] font-extralight leading-[1.25] tracking-[-0.02em] text-luxury-black"
                style={{ fontWeight: 200 }}
              >
                What to Expect
              </h2>
            </header>

            <div className="space-y-4">
              <p className="text-[16px] font-light leading-[1.75] text-gray-600">
                Among San Francisco escorts and Bay Area escorts, I maintain thorough screening protocols. This protects both
                of us and ensures mutual respect from first contact.
              </p>
              <p className="text-[16px] font-light leading-[1.75] text-gray-600">
                Once confirmed, I'll share details about our appointment—location recommendations if hosting, preparation
                suggestions, and any questions you might have. Discretion is default, never negotiable.
              </p>
            </div>
          </article>

          {/* Note */}
          <div className="rounded border border-gray-200 bg-luxury-gray-50 p-6 sm:p-8">
            <p className="text-[14px] font-light italic leading-[1.7] text-gray-500">
              For those searching "escorts near me" or seeking "San Francisco escorts" with substance: this page exists to
              begin conversations that lead somewhere meaningful. Not every inquiry becomes a booking, and that's by design.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-luxury-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-[620px] space-y-4 text-left">
          <p className="text-[14px] font-light leading-[1.7] text-gray-600">
            Questions about process, rates, or availability? Most answers live in the FAQ or on my rates page.
          </p>
          <nav className="flex flex-wrap gap-3 text-[14px] font-light text-luxury-black">
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
