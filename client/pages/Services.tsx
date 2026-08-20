import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import SeoHead from "@/components/site/SeoHead";
import { pageSeo } from "@/lib/page-seo";

const heroImage = {
  src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2F544eebd3dfb24d86b1212878113625c0?format=webp&width=1600",
  alt: "San Francisco skyline at golden hour",
};

const Services = () => {
  return (
    <div className="bg-luxury-white text-neutral-600">
      <SeoHead
        title={pageSeo.services.title}
        description={pageSeo.services.description}
        path={pageSeo.services.path}
      />
      <PageHeroOverlay
        title="Companion Services"
        subtitle="Fantasy dates through San Francisco and beyond. Waymo rides, ballgames, Napa wine country—experiences that showcase the city and make you feel like a tourist in your own life."
        eyebrow="Katherine Taylor Escort"
        imageSrc={heroImage.src}
        imageAlt={heroImage.alt}
        alignment="left"
      />
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-16 md:px-8 md:pb-28 md:pt-20">
        <header className="space-y-6">
          <p className="text-[17px] leading-[1.9] text-luxury-black">
            This section is a work in progress. Check back soon for curated San Francisco date experiences including:
          </p>
        </header>
        <div className="mt-16 space-y-12">
          <section className="space-y-3">
            <h2
              className="text-2xl font-extralight tracking-[-0.02em] text-luxury-black md:text-3xl"
              style={{ fontWeight: 200 }}
            >
              San Francisco Date Experiences
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              Fantasy dates through the city and beyond—experiences that showcase San Francisco and make you feel like a tourist in your own life.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-xl font-light text-luxury-black">Ballgames at Oracle Park</h3>
            <p className="text-base leading-relaxed text-gray-700">
              Yes, I'm cliche as fuck, but it's my job to escort men to ball games.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-xl font-light text-luxury-black">Dinner at Spruce</h3>
            <p className="text-base leading-relaxed text-gray-700">
              And of course you must take a Waymo.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-xl font-light text-luxury-black">Napa Valley Wine Country</h3>
            <p className="text-base leading-relaxed text-gray-700">
              Wine country day trips north of the city.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-xl font-light text-luxury-black">Private Gallery Viewings</h3>
            <p className="text-base leading-relaxed text-gray-700">
              Museum tours and private gallery viewings across San Francisco.
            </p>
          </section>
          <section className="space-y-3">
            <h3 className="text-xl font-light text-luxury-black">Sunset Sails on the Bay</h3>
            <p className="text-base leading-relaxed text-gray-700">
              Golden hour on the water—San Francisco from the one angle that still feels cinematic.
            </p>
          </section>
        </div>
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
