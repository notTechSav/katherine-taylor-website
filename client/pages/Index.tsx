// Opening Video Section (formerly Hero)
import OpeningVideoSection from "@/components/site/Hero";
// About Section (formerly LoveStorySection)
import AboutSection from "@/components/site/LoveStorySection";
// Gallery Preview Section (formerly ImageMosaicSection)
import GalleryPreviewSection from "@/components/site/ImageMosaicSection";
// Rates Video Section (formerly ImmersiveVideoSection)
import RatesVideoSection from "@/components/site/ImmersiveVideoSection";
// Gifts Section (formerly GiftsBannerSection)
import GiftsSection from "@/components/site/GiftsBannerSection";
// Blog Teaser Section (formerly JournalTeaserCard)
import BlogTeaserSection from "@/components/site/JournalTeaserCard";
// FAQ Teaser Section (formerly FAQTeaserCard)
import FAQTeaserSection from "@/components/site/FAQTeaserCard";
// Inquiry Teaser Section (formerly InquireTeaserCard)
import InquiryTeaserSection from "@/components/site/InquireTeaserCard";
// Location Section (formerly SanFranciscoTeaserSection)
import LocationSection from "@/components/site/SanFranciscoTeaserSection";
// Closing Video Section (formerly GoldenHourVideoSection)
import ClosingVideoSection from "@/components/site/GoldenHourVideoSection";
// Newsletter Section (formerly EmailSignupSection)
import NewsletterSection from "@/components/site/EmailSignupSection";

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

      <section id="location" aria-label="Location Section">
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
