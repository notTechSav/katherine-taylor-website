"use client";

import JournalGrid from "@/components/journal/JournalGrid";
import JournalHero from "@/components/journal/JournalHero";
import NextSectionCTA from "@/components/site/NextSectionCTA";
import SeoHead from "@/components/site/SeoHead";
import { essays, heroImage, journalDisplay } from "@/lib/journal-content";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl } from "@/lib/site-config";

export const journalIndexJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: journalDisplay.pageTitle,
  description: pageSeo.journal.description,
  url: absoluteUrl("/journal"),
  image: absoluteUrl(heroImage.src),
  author: {
    "@type": "Person",
    name: "Katherine Taylor",
  },
};

export const JournalIndexContent = () => (
  <div className="bg-luxury-white text-luxury-black">
    <SeoHead
      title={pageSeo.journal.title}
      description={pageSeo.journal.description}
      path={pageSeo.journal.path}
      image={absoluteUrl(heroImage.src)}
      imageAlt={heroImage.alt}
      jsonLd={journalIndexJsonLd}
    />
    <JournalHero
      title={journalDisplay.pageTitle}
      subtitle={journalDisplay.subtitle}
      imageSrc={heroImage.src}
      imageAlt={heroImage.alt}
    />
    <JournalGrid
      entries={essays}
      microline={journalDisplay.microline}
      ctaLabel={journalDisplay.ctaLabel}
    />
    <NextSectionCTA label="Browse Gallery" href="/gallery" />
  </div>
);

const Journal = () => <JournalIndexContent />;

export default Journal;
