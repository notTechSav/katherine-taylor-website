const SanFranciscoTeaserSection = () => {
  return (
    <div className="relative z-10 flex min-h-full w-full items-center justify-center">
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
          <p className="text-xs font-light uppercase tracking-uppercase text-white/80">
            The City
          </p>
          <h2 className="font-serif text-2xl uppercase tracking-wide text-white md:text-3xl">
            San Francisco Escorts
          </h2>
          <p className="text-base font-light leading-relaxed tracking-luxury text-white/90">
            Where I spend most of my time with clients. Where continuity happens. I know this city the way you know your own patterns—where discretion matters, which hotels understand privacy, how to move through the city without friction.
          </p>
          <a
            href="/memoirs-in-the-city"
            className="inline-flex items-center text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Explore San Francisco
          </a>
        </div>
      </div>
    </div>
  );
};

export default SanFranciscoTeaserSection;
