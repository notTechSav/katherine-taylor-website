const FAQTeaserCard = () => {
  return (
    <div className="relative flex min-h-full w-full items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-luxury flex-col justify-center px-6 py-8 md:px-8 md:py-12">
        <div className="max-w-[65ch] space-y-8">
          <span className="text-xs font-light uppercase tracking-uppercase text-white/80">
            Transparency Over Theater
          </span>
          <h2
            className="text-2xl font-extralight leading-[1.2] tracking-[-0.02em] text-white md:text-3xl"
            style={{ fontWeight: 200 }}
          >
            I answer the questions
            <br />
            other providers don't.
          </h2>
          <p className="text-base font-light leading-relaxed tracking-luxury text-white/90">
            After a decade at the highest tier of this industry, I answer what law firm blogs and agency websites won't touch.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-3 text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
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
