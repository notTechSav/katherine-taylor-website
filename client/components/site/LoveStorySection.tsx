import { Button } from "@/components/ui/button";

const braceletImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F3787c432450b4b348ab6d2d5752be09d?format=webp&width=1600";

const LoveStorySection = () => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-luxury items-center gap-8 px-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <div className="relative flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${braceletImage})` }}
            role="img"
            aria-label="Elegant moment of connection and refined presence"
          />
        </div>
        <div className="space-y-8 text-left">
          <span className="text-xs font-light uppercase tracking-uppercase text-gray-600">
            Strategic Counsel Meets Personal Continuity
          </span>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-700">
            I work with C-suite executives, IPO founders, and family-office principals who already have brilliant advisors but no one who remembers the whole picture—the professional, the personal, and the quiet space in between. By the third engagement, we're operating at full depth. Decisions move faster, and conversations reach a level most people never get to have.
          </p>
          <Button variant="ctaSecondary" asChild>
            <a href="/about">Learn More About My Practice</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
