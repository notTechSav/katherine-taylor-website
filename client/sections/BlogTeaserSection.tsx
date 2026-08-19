const JournalTeaserCard = () => {
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
            Continuity as Craft
          </span>
          <p className="text-base font-light leading-relaxed tracking-luxury text-white/90">
            The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
          </p>
          <a
            href="/journal"
            className="inline-flex items-center text-sm font-light uppercase tracking-uppercase text-white underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Read The Journal
          </a>
        </div>
      </div>
    </div>
  );
};

export default JournalTeaserCard;
