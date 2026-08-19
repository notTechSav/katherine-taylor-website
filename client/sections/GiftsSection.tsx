const GiftsBannerSection = () => {
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
          <span className="text-xs font-light uppercase tracking-uppercase text-white/80">
            On Gifts
          </span>
          <p className="text-base font-light leading-relaxed tracking-luxury text-white/90">
            Gifts aren't expected—they're punctuation, not purpose. When they happen, they feel like a quiet thank-you that marks knowing each other. The best ones reflect the texture of us.
          </p>
          <a
            href="/gifts"
            className="inline-flex items-center text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default GiftsBannerSection;
