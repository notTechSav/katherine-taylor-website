import {
  HomepageImageNav,
  HomepageVeil,
} from "@/components/site/homepage-editorial";

export default function GallerySection() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <HomepageVeil tone="strong" />
      <HomepageImageNav
        title="Private Collections"
        to="/gallery"
        cta="View Private Collections"
      />
    </div>
  );
}
