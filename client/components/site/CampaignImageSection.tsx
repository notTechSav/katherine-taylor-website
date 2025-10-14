/**
 * YSL-Style Campaign Image Section
 *
 * This component creates the seamless hero-to-content transition
 * that YSL uses. Key features:
 *
 * 1. NO padding/margin (full-bleed)
 * 2. Appears immediately after hero
 * 3. Full-width campaign image
 * 4. Optional overlay text (minimal)
 *
 * YSL Pattern:
 * Hero Video → Campaign Image → Section Header → Product Grid
 */

interface CampaignImageSectionProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "4/3" | "3/2" | "2/3";
}

const CampaignImageSection = ({
  src,
  alt,
  title,
  subtitle,
  aspectRatio = "16/9",
}: CampaignImageSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-luxury-black">
      {/* Full-Bleed Image (YSL style - no padding) */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: aspectRatio,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="eager" // Load immediately after hero
        />

        {/* Optional Minimal Text Overlay (YSL style) */}
        {(title || subtitle) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-luxury-white">
            {title && (
              <h2 className="text-sm font-light uppercase tracking-[0.2em] md:text-base">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs font-light tracking-[0.15em] opacity-70">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignImageSection;
