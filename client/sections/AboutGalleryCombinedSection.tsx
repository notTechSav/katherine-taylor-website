import FullBleedPhoto from "@/components/site/FullBleedPhoto";
import {
  HomepageImageNav,
  HomepageVeil,
} from "@/components/site/homepage-editorial";

export default function AboutGalleryCombinedSection() {
  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="relative flex h-full flex-col items-center justify-center">
        <FullBleedPhoto src="/about-slide-mobile.webp?v=hires3" />
        <HomepageVeil tone="center" />
        <HomepageImageNav
          title={
            <>
              About <span className="homepage-h2-break">Katherine Taylor</span>
            </>
          }
          to="/about"
          cta="About Katherine"
        />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center">
        <FullBleedPhoto src="/katherinewindow.webp?v=hires3" />
        <HomepageVeil tone="strong" />
        <HomepageImageNav
          title="Private Collections"
          to="/gallery"
          cta="View Private Collections"
        />
      </div>
    </div>
  );
}
