const tiles = [
  {
    src: "https://images.pexels.com/photos/1457932/pexels-photo-1457932.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Close-up of intertwined gold bracelets",
  },
  {
    src: "https://images.pexels.com/photos/3641053/pexels-photo-3641053.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Jeweler polishing a ring",
  },
  {
    src: "https://images.pexels.com/photos/1773139/pexels-photo-1773139.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Diamond bracelet resting on silk",
  },
  {
    src: "https://images.pexels.com/photos/3044279/pexels-photo-3044279.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Gold watch showcased on velvet",
  },
];

const ImageMosaicSection = () => {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-[0.78rem] uppercase tracking-[0.4em] text-foreground">
            Love Unlimited in Focus
          </h2>
          <p className="mx-auto max-w-[580px] text-[0.82rem] leading-7 text-foreground/80 sm:text-sm">
            Explore the atelier, the savoir-faire, and the intimate gestures that
            bring each creation to life.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.src}
              className="group relative aspect-square overflow-hidden rounded-sm border border-border/60 bg-muted/40"
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <span className="sr-only">{tile.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageMosaicSection;
