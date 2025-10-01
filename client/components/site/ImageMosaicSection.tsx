const tiles = [
  {
    src: "https://images.pexels.com/photos/1457932/pexels-photo-1457932.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Close-up of intertwined gold bracelets",
    title: "Signature Bracelet Duo",
    description:
      "Iconic LOVE bangles interpreted in luminous rose gold, hand-polished for a mirror finish that embraces the wrist with ease.",
  },
  {
    src: "https://images.pexels.com/photos/3641053/pexels-photo-3641053.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Jeweler polishing a ring",
    title: "Atelier Craftsmanship",
    description:
      "Parisian artisans perfect every setting, refining each screw motif until it reflects the Maison's signature precision.",
  },
  {
    src: "https://images.pexels.com/photos/1773139/pexels-photo-1773139.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Diamond bracelet resting on silk",
    title: "Diamond Paved Bangle",
    description:
      "Brilliant-cut diamonds drape across supple links, illuminating the LOVE silhouette with delicate radiance.",
  },
  {
    src: "https://images.pexels.com/photos/3044279/pexels-photo-3044279.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1260",
    alt: "Gold watch showcased on velvet",
    title: "Timeless Timepiece",
    description:
      "A refined liaison of horology and jewelry—the LOVE motif encircles the dial for a quietly confident statement.",
  },
];

const ImageMosaicSection = () => {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-luxury flex-col gap-10 px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-[0.78rem] uppercase tracking-[0.4em] text-foreground">
            Love Unlimited in Focus
          </h2>
          <p className="mx-auto max-w-[580px] text-[0.82rem] leading-7 text-foreground/80 sm:text-sm">
            Explore the atelier, the savoir-faire, and the intimate gestures that
            bring each creation to life.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-14">
          {tiles.map((tile) => (
            <article
              key={tile.src}
              className="group bg-white p-8 shadow-luxury-md transition-all duration-luxury hover:shadow-luxury-lg"
            >
              <div className="mb-6 aspect-square overflow-hidden">
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mb-3 text-xl font-light tracking-tight text-foreground">
                {tile.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                {tile.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageMosaicSection;
