const FAQTeaserCard = () => {
  return (
    <div className="flex h-full w-full items-center px-6 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid max-w-luxury items-center gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{ backgroundImage: 'url(/secrets.webp)' }}
            role="img"
            aria-label="FAQ background"
          />
          {/* Subtle gradient overlay - darker at bottom, fades to transparent */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.15) 50%, transparent 100%)'
            }}
            aria-hidden="true"
          />
        </div>
        <div className="space-y-8 text-left">
          <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
            Transparency Over Theater
          </span>
          <h2
            className="text-2xl md:text-3xl font-extralight tracking-[-0.02em] text-luxury-black leading-[1.2]"
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
    </div>
  );
};

export default FAQTeaserCard;
