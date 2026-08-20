import AboutGalleryCombinedSection from "@/sections/AboutGalleryCombinedSection";
import AboutSection from "@/sections/AboutSection";
import BlogTeaserSection from "@/sections/BlogTeaserSection";
import ClosingVideoSection from "@/sections/ClosingVideoSection";
import FAQTeaserSection from "@/sections/FAQTeaserSection";
import FullBleedPhoto from "@/components/site/FullBleedPhoto";
import FullPageSections from "@/components/site/FullPageSections";
import GallerySection from "@/sections/GallerySection";
import GiftsSection from "@/sections/GiftsSection";
import LocationSection from "@/sections/LocationSection";
import NewsletterSection from "@/sections/NewsletterSection";
import OpeningVideoSection from "@/sections/OpeningVideoSection";
import RatesVideoSection from "@/sections/RatesVideoSection";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";
import { cn } from "@/lib/utils";

const sectionClass = (...classes: Array<string | undefined>) =>
  cn("fullpage-section relative isolate w-full max-w-[100vw]", ...classes);

const Index = () => {
  return (
    <>
      <SeoHead
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        path={pageSeo.home.path}
      />
      <FullPageSections>
      <section
        id="opening-video"
        data-fullpage-section
        className={sectionClass()}
        aria-label="Opening Video"
      >
        <OpeningVideoSection />
      </section>

      <section
        id="about-slide"
        data-fullpage-section
        className={sectionClass("bg-[#fdfaf6] md:hidden")}
        aria-label="About Section"
      >
        <FullBleedPhoto src="/about-slide-mobile.webp?v=hires3" />
        <AboutSection />
      </section>

      <section
        id="gallery-slide"
        data-fullpage-section
        className={sectionClass("bg-[#fdfaf6] md:hidden")}
        aria-label="Gallery Section"
      >
        <FullBleedPhoto src="/katherinewindow.webp?v=hires3" />
        <GallerySection />
      </section>

      <section
        id="about-gallery-combined"
        data-fullpage-section
        className={sectionClass("hidden bg-[#fdfaf6] md:flex")}
        aria-label="About and Gallery"
      >
        <AboutGalleryCombinedSection />
      </section>

      <section
        id="rates-video"
        data-fullpage-section
        className={sectionClass()}
        aria-label="Rates Video"
      >
        <RatesVideoSection />
      </section>

      <section
        id="gifts"
        data-fullpage-section
        className={sectionClass("bg-luxury-cream")}
        aria-label="Gifts Section"
      >
        <FullBleedPhoto src="/gifts-slide.webp?v=hires3" />
        <GiftsSection />
      </section>

      <section
        id="blog-teaser"
        data-fullpage-section
        className={sectionClass("bg-luxury-cream")}
        aria-label="Blog Teaser"
      >
        <FullBleedPhoto src="/journal-slide.webp?v=hires3" />
        <BlogTeaserSection />
      </section>

      <section
        id="faq-teaser"
        data-fullpage-section
        className={sectionClass("bg-luxury-cream")}
        aria-label="FAQ Teaser"
      >
        <FullBleedPhoto src="/faq-slide.webp?v=hires3" />
        <FAQTeaserSection />
      </section>

      <section
        id="location"
        data-fullpage-section
        className={sectionClass("bg-luxury-cream")}
        aria-label="San Francisco Location"
      >
        <FullBleedPhoto src="/location-slide.webp?v=hires3" />
        <LocationSection />
      </section>

      <section
        id="closing-video"
        data-fullpage-section
        className={sectionClass()}
        aria-label="Inquiry Video - Limited Availability"
      >
        <ClosingVideoSection />
      </section>

      <section
        id="newsletter"
        data-fullpage-section
        className={sectionClass("bg-luxury-cream")}
        aria-label="Newsletter Signup"
      >
        <NewsletterSection />
      </section>
    </FullPageSections>
    </>
  );
};

export default Index;
