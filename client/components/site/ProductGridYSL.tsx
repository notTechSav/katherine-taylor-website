/**
 * YSL-Style Product Grid Section
 *
 * Key differences from typical grids:
 * 1. Always 3 columns (desktop) - never 4
 * 2. NO card styling (shadows, padding, borders)
 * 3. Simple header: Category + "EXPLORE" link
 * 4. Images fill container completely
 * 5. Minimal padding between items
 * 6. Very simple hover: just image scale
 *
 * YSL Pattern:
 * <SectionHeader>
 *   <H2>READY TO WEAR</H2> <Link>EXPLORE</Link>
 * </SectionHeader>
 * <3-Column Grid>
 */

interface ProductTile {
  src: string;
  alt: string;
  href?: string;
  label?: string;
}

interface ProductGridYSLProps {
  categoryTitle: string;
  exploreLink?: string;
  tiles: ProductTile[];
  showLabels?: boolean;
}

const ProductGridYSL = ({
  categoryTitle,
  exploreLink = "#",
  tiles,
  showLabels = false,
}: ProductGridYSLProps) => {
  return (
    <section className="bg-luxury-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* YSL-Style Section Header */}
        <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-6">
          <h2 className="text-lg font-light uppercase tracking-[0.15em] text-luxury-black md:text-xl">
            {categoryTitle}
          </h2>
          <a
            href={exploreLink}
            className="text-xs font-light uppercase tracking-[0.15em] text-luxury-black transition-opacity duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-70"
          >
            Explore
          </a>
        </div>

        {/* YSL 3-Column Grid (no cards, no shadows) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {tiles.map((tile, index) => (
            <a
              key={`${tile.src}-${index}`}
              href={tile.href || "#"}
              className="group block"
            >
              {/* Image Container - No padding, no shadow */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Optional Label (YSL shows product names below) */}
              {showLabels && tile.label && (
                <div className="mt-3 text-center">
                  <p className="text-xs font-light uppercase tracking-[0.15em] text-gray-700">
                    {tile.label}
                  </p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGridYSL;
