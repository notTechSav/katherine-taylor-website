const FAQTeaserCard = () => {
  return (
    <section className="relative bg-luxury-black flex items-center" style={{ height: 'min(100vh, 100dvh)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/secrets.png"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-luxury-black/60" aria-hidden="true" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-4xl w-full">
        {/* Opening */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extralight tracking-[-0.02em] text-luxury-white mb-6 leading-[1.2]"
            style={{ fontWeight: 200 }}
          >
            I answer the questions<br />other providers don't.
          </h2>
          <p className="text-base font-light leading-[1.85] text-luxury-white/90 max-w-2xl mx-auto">
            After a decade at the highest tier of this industry, I answer what law firm blogs and agency websites won't touch.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group border-b border-luxury-white/30 pb-6 transition-all duration-300 hover:border-luxury-white/50">
            <h3 className="text-lg font-light text-luxury-white mb-3 transition-colors duration-300 group-hover:text-luxury-white/80">
              Why don't you have escort reviews?
            </h3>
            <p className="text-sm font-light leading-[1.7] text-luxury-white/70">
              I was ranked #1 or #2 on the West Coast. Then a client's profile made public reviews impossible. I delisted everything overnight.
            </p>
          </div>

          <div className="group border-b border-luxury-white/30 pb-6 transition-all duration-300 hover:border-luxury-white/50">
            <h3 className="text-lg font-light text-luxury-white mb-3 transition-colors duration-300 group-hover:text-luxury-white/80">
              How do escorts actually pay taxes?
            </h3>
            <p className="text-sm font-light leading-[1.7] text-luxury-white/70">
              S-corp structure, quarterly estimates, legitimate deductions. The IRS doesn't care what you do—only that you report it correctly.
            </p>
          </div>

          <div className="group border-b border-luxury-white/30 pb-6 transition-all duration-300 hover:border-luxury-white/50">
            <h3 className="text-lg font-light text-luxury-white mb-3 transition-colors duration-300 group-hover:text-luxury-white/80">
              Do escorts fall in love with clients?
            </h3>
            <p className="text-sm font-light leading-[1.7] text-luxury-white/70">
              Yes. We're human. You spend hours in private with someone—sometimes for years. Of course it happens.
            </p>
          </div>

          <div className="group border-b border-luxury-white/30 pb-6 transition-all duration-300 hover:border-luxury-white/50">
            <h3 className="text-lg font-light text-luxury-white mb-3 transition-colors duration-300 group-hover:text-luxury-white/80">
              What do founders look for in a companion?
            </h3>
            <p className="text-sm font-light leading-[1.7] text-luxury-white/70">
              Intelligence, discretion, zero friction. They want someone who fits into their world without needing explanations.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/faq"
            className="inline-flex items-center gap-3 text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            <span>View All 26 Questions</span>
            <svg
              className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-xs font-light italic text-luxury-white/60 mt-4">
            Topics most providers won't discuss publicly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQTeaserCard;
