const JournalTeaserCard = () => {
  return (
    <div className="flex h-full w-full items-center px-6 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid max-w-luxury items-center gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{ backgroundImage: 'url(/journal-teaser-bg.webp)' }}
            role="img"
            aria-label="Journal background"
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
            Continuity as Craft
          </span>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
            The conversation never resets. I remember your M&A timeline, your board anxieties, the trip you've been planning. Not because I take notes—because I've built a decade of pattern libraries that let me read what you don't say.
          </p>
          <a
            href="/journal"
            className="inline-flex items-center text-sm font-light uppercase tracking-uppercase text-luxury-black underline decoration-1 underline-offset-4 transition-opacity duration-250 hover:opacity-70"
          >
            Read The Journal
          </a>
        </div>
      </div>
    </div>
  );
};

export default JournalTeaserCard;
