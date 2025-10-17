const FAQTeaserSection = () => {
  return (
    <>
      {/* Mobile layout - stacked */}
      <section className="bg-luxury-white py-24 md:hidden">
        <div className="mx-auto grid max-w-luxury items-center gap-8 px-4 sm:px-6">
          <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(/faq-key-bg-mobile.webp)` }}
              role="img"
              aria-label="FAQ background"
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
              Transparency Over Theater
            </span>
            <h2
              className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black leading-[1.2]"
              style={{ fontWeight: 200 }}
            >
              I answer the questions<br />other providers don't.
            </h2>
            <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
              After a decade at the highest tier of this industry, I answer what law firm blogs and agency websites won't touch.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-3 text-sm font-light uppercase tracking-uppercase text-luxury-black underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
            >
              <span>View All 26 Questions</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Tablet/Desktop layout - grid with image */}
      <section className="hidden md:block bg-luxury-white py-24 md:py-32 lg:py-40">
        <div className="mx-auto grid max-w-luxury items-center gap-8 px-4 sm:px-6 md:px-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative h-full w-full overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(/faq-key-bg-mobile.webp)` }}
              role="img"
              aria-label="FAQ background"
            />
          </div>
          <div className="space-y-6 text-left">
            <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
              Transparency Over Theater
            </span>
            <h2
              className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black leading-[1.2]"
              style={{ fontWeight: 200 }}
            >
              I answer the questions<br />other providers don't.
            </h2>
            <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
              After a decade at the highest tier of this industry, I answer what law firm blogs and agency websites won't touch.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-3 text-sm font-light uppercase tracking-uppercase text-luxury-black underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
            >
              <span>View All 26 Questions</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQTeaserSection;
