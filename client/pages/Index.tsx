import { useEffect } from 'react';
import OpeningVideoSection from '@/sections/OpeningVideoSection';
import AboutSection from '@/sections/AboutSection';
import GallerySection from '@/sections/GallerySection';
import AboutGalleryCombinedSection from '@/sections/AboutGalleryCombinedSection';
import RatesVideoSection from '@/sections/RatesVideoSection';
import GiftsSection from '@/sections/GiftsSection';
import BlogTeaserSection from '@/sections/BlogTeaserSection';
import FAQTeaserSection from '@/sections/FAQTeaserSection';
import LocationSection from '@/sections/LocationSection';
import ClosingVideoSection from '@/sections/ClosingVideoSection';
import NewsletterSection from '@/sections/NewsletterSection';

const Index = () => {
  // Fix mobile viewport height bugs (iOS Safari address bar)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <main className="scroll-snap-container">
      {/* 1. Hero Video Section */}
      <section id="opening-video" className="frame" aria-label="Opening Video">
        <OpeningVideoSection />
      </section>

      {/* 2. About Section (Mobile Only) */}
      <section id="about" className="frame md:hidden" aria-label="About Section">
        <AboutSection />
      </section>

      {/* 3. Gallery Section (Mobile Only) */}
      <section id="gallery" className="frame md:hidden" aria-label="Gallery Section">
        <GallerySection />
      </section>

      {/* 2-3. About + Gallery Combined (Desktop Only) */}
      <section id="about-gallery-combined" className="frame" aria-label="About and Gallery">
        <AboutGalleryCombinedSection />
      </section>

      {/* 4. Rates Video Section */}
      <section id="rates-video" className="frame" aria-label="Rates Video">
        <RatesVideoSection />
      </section>

      {/* 5. Gifts Section */}
      <section id="gifts" className="frame bg-luxury-cream" aria-label="Gifts Section">
        <GiftsSection />
      </section>

      {/* 6. Blog Teaser Section */}
      <section id="blog-teaser" className="frame bg-luxury-black" aria-label="Blog Teaser">
        <BlogTeaserSection />
      </section>

      {/* 7. FAQ Section */}
      <section id="faq-teaser" className="frame bg-luxury-cream" aria-label="FAQ Teaser">
        <FAQTeaserSection />
      </section>

      {/* 8. San Francisco Local Page Teaser */}
      <section id="location" className="frame bg-luxury-black" aria-label="San Francisco Location">
        <LocationSection />
      </section>

      {/* 9. Inquiry Video Section (Limited Availability) */}
      <section id="closing-video" className="frame" aria-label="Inquiry Video - Limited Availability">
        <ClosingVideoSection />
      </section>

      {/* 10. Email Signup Section */}
      <section id="newsletter" className="frame bg-luxury-cream" aria-label="Newsletter Signup">
        <NewsletterSection />
      </section>
    </main>
  );
};

export default Index;
