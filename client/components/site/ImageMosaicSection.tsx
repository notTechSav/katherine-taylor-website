import { cn } from "@/lib/utils";

const defaultTiles = [
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

type OverlayVariant = "dark" | "sepia";

type ImageTile = {
  src: string;
  alt: string;
  overlay?: OverlayVariant;
  heading?: string;
  subheading?: string;
};

type ImageMosaicSectionProps = {
  title?: string;
  subtitle?: string;
  tiles?: ImageTile[];
  withOverlay?: boolean;
  footerHeading?: string;
  footerLinkLabel?: string;
  footerLinkHref?: string;
};

const DEFAULT_TITLE =
  "Escorts Near Me | The High-End Experience by Katherine Taylor";
const DEFAULT_SUBTITLE =
  "For over a decade, Katherine Taylor escort has been the trusted choice for discerning clients in San Francisco and Sacramento.";

const overlayClasses: Record<OverlayVariant, string> = {
  dark: "bg-gradient-to-b from-black/15 via-black/45 to-black/80",
  sepia:
    "bg-gradient-to-b from-[#3a2414]/20 via-[#4a2d18]/55 to-[#2b1a10]/85",
};

const captionTextClasses: Record<OverlayVariant, string> = {
  dark: "text-white",
  sepia: "text-[#f8ebdc]",
};

const ImageMosaicSection = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  tiles,
  withOverlay = false,
}: ImageMosaicSectionProps) => {
  const displayTiles = tiles ?? defaultTiles;
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
          {displayTiles.map((tile) => {
            const overlayKey =
              tile.overlay ??
              (withOverlay || tile.heading || tile.subheading ? "dark" : null);
            const captionTone = overlayKey ?? "dark";

            return (
              <article
                key={tile.src}
                className="group bg-luxury-white p-8 md:p-10 lg:p-12 shadow-luxury-md transition-all duration-luxury hover:shadow-luxury-lg"
              >
                <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-105"
                    loading="lazy"
                  />
                  {overlayKey ? (
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100",
                        overlayClasses[overlayKey],
                      )}
                    />
                  ) : null}
                  {(tile.heading || tile.subheading) && (
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-5 pb-5 pt-16 text-left",
                        captionTextClasses[captionTone],
                      )}
                    >
                      {tile.heading ? (
                        <span className="text-xs font-medium uppercase tracking-[0.45em]">
                          {tile.heading}
                        </span>
                      ) : null}
                      {tile.subheading ? (
                        <span className="text-sm leading-relaxed opacity-90">
                          {tile.subheading}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {footerHeading || (footerLinkHref && footerLinkLabel) ? (
          <div className="border-t border-black/5 pt-8 text-left">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {footerHeading ? (
                <span className="text-xs font-medium uppercase tracking-[0.45em] text-gray-500">
                  {footerHeading}
                </span>
              ) : (
                <span className="sr-only">Gift guide prompt</span>
              )}
              {footerLinkHref && footerLinkLabel ? (
                <a
                  href={footerLinkHref}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-black transition-colors duration-luxury hover:text-gray-600"
                >
                  {footerLinkLabel}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ImageMosaicSection;
