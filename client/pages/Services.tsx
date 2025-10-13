import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import NextSectionCTA from "@/components/site/NextSectionCTA";

const heroImage = {
  src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F544eebd3dfb24d86b1212878113625c0?format=webp&width=1600",
  alt: "San Francisco skyline at golden hour",
};

const Services = () => {
  return (
    <div className="bg-luxury-white text-neutral-600">
      <PageHeroOverlay
        title="Services"
        subtitle="Fantasy dates through San Francisco and beyond. Waymo rides, ballgames, Napa wine country—experiences that showcase the city and make you feel like a tourist in your own life."
        eyebrow="Date Experiences"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-16 md:px-8 md:pb-28 md:pt-20">
        <header className="space-y-6">
          <p className="text-[17px] leading-[1.9] text-luxury-black">
            This section is a work in progress. Check back soon for curated San Francisco date experiences including:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base leading-relaxed text-gray-700">
            <li>Ballgames at Oracle Park (yes, I'm cliche as fuck, but it's my job to escort men to ball games)</li>
            <li>Dinner at Spruce (and of course you must take a Waymo)</li>
            <li>Wine country day trips to Napa Valley</li>
            <li>Private gallery viewings and museum tours</li>
            <li>Sunset sails on the Bay</li>
          </ul>
        </header>
      </div>
      <NextSectionCTA
        eyebrow="Next"
        label="Read The Journal"
        href="/journal"
      />
    </div>
  );
};

export default Services;
