const tiles = [
  {
    src: "https://images.pexels.com/photos/1457932/pexels-photo-1457932.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Close-up of intertwined gold bracelets",
    span: "lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/3641053/pexels-photo-3641053.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Jeweler polishing a ring",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/1773139/pexels-photo-1773139.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Diamond bracelet resting on silk",
    span: "lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/3641047/pexels-photo-3641047.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Craftsman sketching jewelry designs",
    span: "lg:row-span-3",
  },
  {
    src: "https://images.pexels.com/photos/3641003/pexels-photo-3641003.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Ring with diamond detail",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/3044279/pexels-photo-3044279.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Gold watch showcased on velvet",
    span: "lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/998568/pexels-photo-998568.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Stack of Cartier-inspired bracelets",
    span: "lg:row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/1435528/pexels-photo-1435528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Hands presenting a ring",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Gold necklace on marble tray",
    span: "lg:row-span-3",
  },
];

const ImageMosaicSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
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
        <div className="grid grid-cols-2 gap-4 auto-rows-[180px] sm:grid-cols-3 sm:auto-rows-[220px] lg:auto-rows-[240px]">
          {tiles.map((tile) => (
            <div
              key={tile.src}
              className={`group relative overflow-hidden rounded-sm border border-border/60 bg-muted/40 ${tile.span}`}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
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
