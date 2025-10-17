import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/luxury-typography";

const backgroundImage =
  "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Faeb049f55ced4eeca0bd9f5973346df1?format=webp&width=1600";

const LegendReinventedSection = () => {
  return (
    <section className="bg-luxury-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-luxury items-center gap-8 px-4 sm:px-6 md:px-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="relative h-full w-full overflow-hidden border border-gray-200 bg-gray-50 shadow-luxury-md transition-shadow duration-400 ease-out hover:shadow-luxury-lg">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            role="img"
            aria-label="Katherine Taylor elegant portrait"
          />
        </div>
        <div className="space-y-8 text-left">
          <H2 as="p" className="mb-0 text-luxury-black">
            Katherine Taylor — Elegant San Francisco & Sacramento Escort
          </H2>
          <p className="max-w-[65ch] text-base font-light leading-relaxed tracking-luxury text-gray-600">
            Is it possible to find a genuine connection when searching for
            escorts near me? Katherine Taylor is an elegant San Francisco escort
            who transforms uncertainty into warm, authentic companionship that
            puts you at ease — whether in San Francisco or Sacramento.
          </p>
          <Button asChild variant="ctaPrimary">
            <a href="/about">Discover</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegendReinventedSection;
