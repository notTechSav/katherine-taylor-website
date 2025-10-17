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
      <section id="opening-video" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Opening Video">
        <OpeningVideoSection />
      </section>

      {/* 2. About Slide (Mobile Only) */}
      <section id="about-slide" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate md:hidden bg-[#fdfaf6]" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="About Section">
        <AboutSection />
      </section>

      {/* 3. Gallery Slide (Mobile Only) */}
      <section id="gallery-slide" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate md:hidden bg-[#fdfaf6]" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Gallery Section">
        <GallerySection />
      </section>

      {/* 2-3. About + Gallery Combined (Desktop Only) */}
      <section id="about-gallery-combined" className="hidden md:flex h-screen snap-start relative items-center justify-center overflow-hidden isolate" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="About and Gallery">
        <AboutGalleryCombinedSection />
      </section>

      {/* 4. Rates Video Section */}
      <section id="rates-video" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Rates Video">
        <RatesVideoSection />
      </section>

      {/* 5. Gifts Section */}
      <section id="gifts" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate bg-luxury-cream" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Gifts Section">
        <GiftsSection />
      </section>

      {/* 6. Blog Teaser Section */}
      <section id="blog-teaser" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate bg-luxury-black" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Blog Teaser">
        <BlogTeaserSection />
      </section>

      {/* 7. FAQ Section */}
      <section id="faq-teaser" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate bg-luxury-cream" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="FAQ Teaser">
        <FAQTeaserSection />
      </section>

      {/* 8. San Francisco Local Page Teaser */}
      <section id="location" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate bg-luxury-black" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="San Francisco Location">
        <LocationSection />
      </section>

      {/* 9. Inquiry Video Section (Limited Availability) */}
      <section id="closing-video" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Inquiry Video - Limited Availability">
        <ClosingVideoSection />
      </section>

      {/* 10. Email Signup Section */}
      <section id="newsletter" className="h-screen snap-start relative flex items-center justify-center overflow-hidden isolate bg-luxury-cream" style={{height: 'calc(var(--vh, 1vh) * 100)'}} aria-label="Newsletter Signup">
        <NewsletterSection />
      </section>
    </main>
  );
};

export default Index;
