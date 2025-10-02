const tiles = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F90e6ea7a489c45f484ccfc2cc5a8da76?format=webp&width=800",
    alt: "Luxury heels displayed on ice in a freezer",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F6030363da8e5421ebdcbc885e5ffb31c?format=webp&width=800",
    alt: "Woman in gold dress lighting a dollar bill with a cigarette",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fdc2cf87e4f974dea8523c77c35d9e77b?format=webp&width=800",
    alt: "Hand holding a crystal coupe glass filled with champagne",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F85037534c78640379bd5dbbd264663ac?format=webp&width=800",
    alt: "Woman surrounded by luxurious accessories and perfume bottles",
  },
];

type ImageMosaicSectionProps = {
  title?: string;
  subtitle?: string;
};

const DEFAULT_TITLE =
  "Escorts Near Me | The High-End Experience by Katherine Taylor";
const DEFAULT_SUBTITLE =
  "For over a decade, Katherine Taylor escort has been the trusted choice for discerning clients in San Francisco and Sacramento.";

const ImageMosaicSection = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
}: ImageMosaicSectionProps) => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-luxury flex-col gap-10 px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-[0.78rem] uppercase tracking-[0.4em] text-gray-500">
            {title}
          </h1>
          <h2 className="mx-auto max-w-[580px] text-[0.82rem] leading-7 text-gray-700 sm:text-sm">
            {subtitle}
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
        </div>
      </div>
    </section>
  );
};

export default ImageMosaicSection;
