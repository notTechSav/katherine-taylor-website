import { cn } from "@/lib/utils";

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

const defaultTiles: ImageTile[] = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Feb43c94d56914a3e9070f0803602ba8e?format=webp&width=800",
    alt: "Portrait of Katherine Taylor in tailored attire",
  },
  {
    src: "/gallery-third.png",
    alt: "Katherine Taylor in elegant red evening gown",
  },
  {
    src: "/katherinewindow.png",
    alt: "Katherine Taylor in elegant white shirt and black attire",
  },
];

const DEFAULT_TITLE =
  "Escorts Near Me | The High-End Experience by Katherine Taylor";
const DEFAULT_SUBTITLE =
  "For over a decade, Katherine Taylor escort has been the trusted choice for discerning clients in San Francisco and Sacramento.";

const overlayClasses: Record<OverlayVariant, string> = {
  dark: "bg-gradient-to-b from-black/20 via-black/45 to-black/75",
  sepia: "bg-gradient-to-b from-[#3a2414]/20 via-[#4a2d18]/55 to-[#2b1a10]/80",
};

const captionTextClasses: Record<OverlayVariant, string> = {
  dark: "text-luxury-white",
  sepia: "text-[#f8ebdc]",
};

const ImageMosaicSection = ({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  tiles,
  withOverlay = false,
  footerHeading,
  footerLinkHref,
  footerLinkLabel,
}: ImageMosaicSectionProps) => {
  const displayTiles = tiles ?? defaultTiles;

  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex flex-col gap-12">
        <div className="space-y-4 text-center px-8">
          <h1 className="text-xs font-light uppercase tracking-uppercase text-gray-600">
            {title}
          </h1>
          <h2 className="mx-auto max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
            {subtitle}
          </h2>
        </div>
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-16 px-12 md:grid-cols-2 md:gap-12 md:px-16 lg:grid-cols-3 lg:gap-24 lg:px-20">
          {displayTiles.map((tile, index) => {
            const overlayKey =
              tile.overlay ??
              (withOverlay || tile.heading || tile.subheading
                ? "dark"
                : undefined);
            const captionTone: OverlayVariant = overlayKey ?? "dark";

            // Mobile: show only 1st image (window shot)
            // Tablet (md): show first 2 in row
            // Desktop (lg): show all 3 in row
            const hiddenClasses =
              index === 0 ? "" : // Always show first (window shot)
              index === 1 ? "hidden md:block" : // Hide on mobile, show on tablet+
              "hidden lg:block"; // Hide on mobile+tablet, show on desktop

            return (
              <article
                key={tile.src}
                className={cn(
                  "group",
                  hiddenClasses
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105",
                      index === 1 ? "object-[50%_95%]" : "object-[50%_5%]"
                    )}
                  />
                  {overlayKey ? (
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-90 mix-blend-multiply transition-opacity duration-400 ease-out group-hover:opacity-100",
                        overlayClasses[overlayKey],
                      )}
                    />
                  ) : null}
                  {(tile.heading || tile.subheading) && (
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-6 pb-6 pt-16 text-left",
                        captionTextClasses[captionTone],
                      )}
                    >
                      {tile.heading ? (
                        <span className="text-[0.7rem] font-light uppercase tracking-uppercase">
                          {tile.heading}
                        </span>
                      ) : null}
                      {tile.subheading ? (
                        <span className="text-sm font-light leading-relaxed">
                          {tile.subheading}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
          {/* Mobile-only additional image (glam2) */}
          <article className="group md:hidden">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/glam2.jpeg"
                alt="Katherine Taylor glamour portrait"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105 object-[50%_95%]"
              />
            </div>
          </article>
        </div>
        {footerHeading || (footerLinkHref && footerLinkLabel) ? (
          <div className="pt-8 text-left px-12 md:px-16 lg:px-20">
            <div className="mx-auto max-w-[1600px] flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {footerHeading ? (
                <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
                  {footerHeading}
                </span>
              ) : (
                <span className="sr-only">Gift guide prompt</span>
              )}
              {footerLinkHref && footerLinkLabel ? (
                <a
                  href={footerLinkHref}
                  className="inline-flex items-center gap-3 text-sm font-light uppercase tracking-uppercase text-luxury-black underline underline-offset-4 transition-opacity duration-250 ease-out hover:opacity-70"
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
