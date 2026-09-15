import { useLocation } from "react-router-dom";

import DeckBuilderPreview from "@/components/gallery/DeckBuilderPreview";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import { galleryJsonLd } from "@/lib/page-json-ld";
import { pageSeo } from "@/lib/page-seo";

const GALLERY_HERO_IMAGE = "/rose-hero.webp";
const GALLERY_INDEX_ID = "private-collections";

const Gallery = () => {
  const hashId = useLocation().hash.replace(/^#/, "");
  const showHero = !hashId || hashId === GALLERY_INDEX_ID;

  return (
    <main className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.gallery.title}
        description={pageSeo.gallery.description}
        path={pageSeo.gallery.path}
        jsonLd={galleryJsonLd}
      />
      {showHero && (
        <PageHeroOverlay
          title="Private Collections"
          subtitle="Three collections from Los Angeles to Northern California. Some rooms hold stillness, others hold saturation."
          eyebrow="Katherine Taylor Escort"
          imageSrc={GALLERY_HERO_IMAGE}
          imageAlt="Cream-colored rose with flowing ribbon on linen fabric in warm afternoon light"
          alignment="left"
        />
      )}
      <DeckBuilderPreview />
    </main>
  );
};

export default Gallery;
