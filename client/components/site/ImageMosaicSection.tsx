const tiles = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Feb43c94d56914a3e9070f0803602ba8e?format=webp&width=800",
    alt: "Portrait of Katherine Taylor in tailored attire",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fd3ec1e31a22847378a6aaa373933f6b7?format=webp&width=800",
    alt: "Overhead view of a white luxury car",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F2eeac4f0544d4ec5952dafcbdbce130b?format=webp&width=800",
    alt: "Katherine Taylor wearing a fur coat",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F49821e94c0e742a6afe147811dfebac6?format=webp&width=800",
    alt: "Katherine Taylor posing on a staircase",
  },
];

const ImageMosaicSection = () => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-luxury flex-col gap-10 px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-[0.78rem] uppercase tracking-[0.4em] text-gray-500">
            Escorts Near Me | The High-End Experience by Katherine Taylor
          </h1>
          <h2 className="mx-auto max-w-[580px] text-[0.82rem] leading-7 text-gray-700 sm:text-sm">
            For over a decade, Katherine Taylor escort has been the trusted
            choice for discerning clients in San Francisco and Sacramento.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16">
          {tiles.map((tile) => (
            <article
              key={tile.src}
              className="group bg-luxury-white p-8 md:p-10 lg:p-12 shadow-luxury-md transition-all duration-luxury hover:shadow-luxury-lg"
            >
              <div className="mb-6 aspect-[4/5] overflow-hidden">
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
          <article className="flex h-full flex-col justify-between bg-black p-8 text-left text-white md:p-10 lg:p-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tight md:text-3xl">
                Gifts – What to Give an Escort
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                What’s the etiquette when gifting an escort? Discover thoughtful gestures that feel personal, generous, and memorable for every rendezvous.
              </p>
            </div>
            <a
              href="/gifts"
              className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white transition-colors duration-luxury hover:text-white/70"
            >
              Explore the Gifts Guide
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ImageMosaicSection;
