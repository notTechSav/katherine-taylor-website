import DeckBuilderPreview from "@/components/gallery/DeckBuilderPreview";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";

const GALLERY_HERO_IMAGE = "/rose-hero.webp";

const Gallery = () => {
  return (
    <main className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.gallery.title}
        description={pageSeo.gallery.description}
        path={pageSeo.gallery.path}
      />
      <PageHeroOverlay
        title="Private Collections"
        subtitle="Three collections from Los Angeles to Northern California. Some rooms hold stillness, others hold saturation."
        eyebrow="Katherine Taylor Escort"
        imageSrc={GALLERY_HERO_IMAGE}
        imageAlt="Cream-colored rose with flowing ribbon on linen fabric in warm afternoon light"
        alignment="left"
      />
      <DeckBuilderPreview />
      <NextSectionCTA label="A Brief Interruption" href="/film/a-brief-interruption" />
    </main>
  );
};

export default Gallery;
