const JournalTeaserCard = () => {
  return (
    <div className="relative flex h-full w-full isolate overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/journal-teaser-bg.webp"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-luxury-black/60" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative flex h-full w-full items-center px-8 py-12 md:py-24">
        <div className="relative z-10 max-w-[540px] space-y-8 text-luxury-white">
          <span className="text-xs font-light uppercase tracking-uppercase text-luxury-white/70">
            Continuity as Craft
          </span>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-luxury-white/90">
            The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
          </p>
          <a
            href="/journal"
            className="inline-flex items-center text-sm font-light uppercase tracking-uppercase text-luxury-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Read The Journal
          </a>
        </div>
      </div>
    </div>
  );
};

export default JournalTeaserCard;
