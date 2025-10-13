import DeckBuilderPreview from "@/components/gallery/DeckBuilderPreview";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import { useEffect } from "react";

const GALLERY_HERO_IMAGE = "/rose-hero.png";

const Gallery = () => {
  useEffect(() => {
    document.title = "Private Collections | Katherine Taylor";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Private photography collections by Katherine Taylor. Intimate moments from Los Angeles to Northern California—available by appointment for select clientele."
      );
    }
  }, []);

  return (
    <div className="bg-luxury-white text-luxury-black">
      <PageHeroOverlay
        title="Private Collections"
        subtitle="Three collections from Los Angeles to Northern California. Some rooms hold stillness, others hold saturation."
        eyebrow="Katherine Taylor"
        imageSrc={GALLERY_HERO_IMAGE}
        imageAlt="Cream-colored rose with flowing ribbon on linen fabric in warm afternoon light"
        alignment="left"
      />
      <DeckBuilderPreview />
      <NextSectionCTA
        eyebrow="Next"
        label="View Rates"
        href="/rates"
      />
    </div>
  );
};

export default Gallery;
