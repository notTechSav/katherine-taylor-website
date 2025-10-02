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
      <div className="mx-auto max-w-luxury px-6">
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
        </div>
      </div>
    </section>
  );
};

export default ImageMosaicSection;
