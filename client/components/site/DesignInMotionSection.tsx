import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/luxury-typography";

const featureImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Fbd093f662cb045d19868b4b86fde26e4?format=webp&width=1600";

const DesignInMotionSection = () => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-luxury items-center gap-8 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12 lg:gap-16">
        <div className="space-y-6 text-left">
          <H2 as="p">SF Escorts | Framed Side-by-side</H2>
          <H3 as="p">
            What sets Katherine Taylor Apart From Other Escorts Near Me?
          </H3>
          <p className="max-w-[65ch] text-[0.82rem] leading-7 text-gray-700 sm:text-sm">
            Every frame you see here is captured with intention—curated moments
            that reveal artistry, confidence, and chemistry in equal measure.
            These are the signatures that define my experiences.
          </p>
          <Button asChild variant="ctaSecondary">
            <a href="/gallery">Take a Glimpse</a>
          </Button>
        </div>
        <div className="relative h-full w-full overflow-hidden border border-gray-200 bg-muted/40">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${featureImage})` }}
            role="img"
            aria-label="Portrait of Katherine Taylor wearing evening gloves"
          />
        </div>
      </div>
    </section>
  );
};

export default DesignInMotionSection;
