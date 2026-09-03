import FullBleedPhoto from "@/components/site/FullBleedPhoto";
import AboutSection from "@/sections/AboutSection";
import GallerySection from "@/sections/GallerySection";

export default function AboutGalleryCombinedSection() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="relative h-full min-w-0">
        <FullBleedPhoto src="/about-slide-mobile.webp?v=hires3" width={2048} height={3072} />
        <AboutSection />
      </div>

      <div className="relative h-full min-w-0">
        <FullBleedPhoto src="/katherinewindow.webp?v=hires3" width={2048} height={3072} />
        <GallerySection />
      </div>
    </div>
  );
}
