"use client";

import PageHeroOverlay from "@/components/site/PageHeroOverlay";
import SeoHead from "@/components/site/SeoHead";
import SacramentoLongVersion from "@/pages/SacramentoLongVersion";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl } from "@/lib/site-config";

const heroImage = {
  src: "/sacramento-slide.webp?v=hires1",
  alt: "Katherine Taylor — Sacramento escort",
};

const sacramentoJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Escorts Near Me | The High-End Edition",
  description: pageSeo.sacramento.description,
  author: {
    "@type": "Person",
    name: "Katherine Taylor",
    jobTitle: "Luxury Companion",
  },
  about: ["Sacramento escort", "escorts near me", "California escorts"],
  url: absoluteUrl("/sacramento-escorts"),
};

const body =
  "text-base font-light leading-[1.85] tracking-[0.01em] text-gray-700";

const SacramentoPage = () => {
  return (
    <div className="bg-luxury-white text-luxury-black">
      <SeoHead
        title={pageSeo.sacramento.title}
        description={pageSeo.sacramento.description}
        path={pageSeo.sacramento.path}
        type="article"
        jsonLd={sacramentoJsonLd}
        geoRegion="US-CA"
        geoPlacename="Sacramento"
      />

      <article itemScope itemType="https://schema.org/Article">
        <PageHeroOverlay
          title="Escorts Near Me | The High-End Edition"
          subtitle="What ten years in escorting—and two years trying very hard not to do it—taught me about proximity, compatibility, discretion, money, memory, and finding the right person in Sacramento."
          eyebrow="Sacramento Escort • Memoirs in the City"
          imageSrc={heroImage.src}
          imageAlt={heroImage.alt}
          alignment="left"
          gradient="vertical"
          imageClassName="object-center"
        />

        <section
          id="short-version"
          aria-labelledby="short-version-heading"
          className="bg-luxury-white py-20 md:py-28"
        >
          <div className="container mx-auto max-w-2xl px-6 md:px-8">
            <p className="mb-10 text-sm font-light tracking-[0.01em] text-gray-500">
              By <span itemProp="author">Katherine Taylor</span>
            </p>
            <h2
              id="short-version-heading"
              className="mb-8 text-3xl font-extralight tracking-display text-luxury-black md:text-4xl"
            >
              What “Escorts Near Me” Doesn't Tell You
            </h2>
            <div className="space-y-7">
              <p className={body}>“Escorts near me” is an incredibly efficient Google search.</p>
              <p className={body}>I'm not convinced it's a particularly good selection criterion.</p>
              <p className={body}>Near you tells you distance.</p>
              <p className={body}>It cannot tell you whether you'll like someone.</p>
              <p className={body}>
                It can't tell you whether she'll remember your grandchildren's names years later, understand the cast of characters in your company without requiring the entire story again, know when you want spectacle and when you'd rather disappear into a booth, or understand from the way you're dressed that tonight probably isn't the night for stilettos.
              </p>
              <p className={body}>Google can calculate proximity.</p>
              <p className={body}>The rest takes time.</p>
              <p className={body}>
                I've spent more than ten years escorting in California, primarily between Sacramento and San Francisco. Then I left for two years because I genuinely thought I was going to get married, settle down, and try some approximation of normal life.
              </p>
              <p className={body}>That did not go according to plan.</p>
              <p className={body}>
                I had passive income. I had a beautiful house in Sacramento. I went on dates. I relaxed. At one point I was practically rehearsing for life as a tradwife because, frankly, there wasn't much else to do.
              </p>
              <p className={body}>And then I remembered something inconvenient:</p>
              <p className={body}>
                <strong className="font-medium text-luxury-black">
                  I didn't miss working because I needed the money. I missed having somewhere to put my mastery.
                </strong>
              </p>
              <p className={body}>So I'm back.</p>
              <p className={body}>
                If you arrived here looking for a Sacramento escort—or simply typed “escorts near me” into Google—consider this the longer answer to a very short search.
              </p>
              <p className={`${body} text-luxury-black`}>—Katherine</p>
            </div>
          </div>
        </section>

        <details className="sacramento-story-toggle group">
          <summary className="cursor-pointer border-b border-t border-gray-200 bg-luxury-gray-50 py-20 marker:content-none">
            <span className="container mx-auto flex max-w-2xl justify-center px-6 md:px-8">
              <span className="inline-flex items-center gap-3 border border-gray-300 px-12 py-4 text-sm font-light tracking-[0.1em] text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-luxury-black hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)] group-open:border-gray-400 group-open:text-luxury-black">
                If you'd like to hear this story →
              </span>
            </span>
          </summary>
          <SacramentoLongVersion />
        </details>
      </article>
    </div>
  );
};

export default SacramentoPage;
