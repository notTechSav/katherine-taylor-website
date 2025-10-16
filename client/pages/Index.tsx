import OpeningVideoSection from '@/sections/OpeningVideoSection';
import AboutSection from '@/sections/AboutSection';
import GalleryPreviewSection from '@/sections/GalleryPreviewSection';
import RatesVideoSection from '@/sections/RatesVideoSection';
import GiftsSection from '@/sections/GiftsSection';
import BlogTeaserSection from '@/sections/BlogTeaserSection';
import FAQTeaserSection from '@/sections/FAQTeaserSection';
import InquiryTeaserSection from '@/sections/InquiryTeaserSection';
import LocationSection from '@/sections/LocationSection';
import ClosingVideoSection from '@/sections/ClosingVideoSection';
import NewsletterSection from '@/sections/NewsletterSection';

const Index = () => {
  return (
    <main>
      <section id="opening-video" aria-label="Opening Video">
        <OpeningVideoSection />
      </section>

      <section id="about" aria-label="About Section">
        <AboutSection />
      </section>

      <section id="gallery-preview" aria-label="Gallery Preview">
        <GalleryPreviewSection
          title="Private Collections"
          subtitle="Saved for private viewing. Each frame a standard, each collection a retreat."
          footerHeading="Three collections for your viewing"
          footerLinkLabel="Indulge"
          footerLinkHref="/gallery"
        />
      </section>

      <section id="rates-video" aria-label="Rates Video">
        <RatesVideoSection />
      </section>

      <section id="gifts" aria-label="Gifts Section">
        <GiftsSection />
      </section>

      <section id="blog-teaser" aria-label="Blog Teaser">
        <BlogTeaserSection />
      </section>

      <section id="faq-teaser" aria-label="FAQ Teaser">
        <FAQTeaserSection />
      </section>

      <section id="inquiry-teaser" aria-label="Inquiry Teaser">
        <InquiryTeaserSection />
      </section>

      <section id="location" aria-label="San Francisco Location">
        <LocationSection />
      </section>

      <section id="closing-video" aria-label="Closing Video">
        <ClosingVideoSection />
      </section>

      <section id="newsletter" aria-label="Newsletter Signup">
        <NewsletterSection />
      </section>
    </main>
  );
};

export default Index;
