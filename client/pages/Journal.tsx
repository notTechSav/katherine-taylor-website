"use client";

import JournalGrid from "@/components/journal/JournalGrid";
import JournalHero from "@/components/journal/JournalHero";
import SeoHead from "@/components/site/SeoHead";
import { essays, heroImage, journalDisplay } from "@/lib/journal-content";
import {
  journalIndexBreadcrumbJsonLd,
  journalIndexJsonLd,
} from "@/lib/journal-json-ld";
import { pageSeo } from "@/lib/page-seo";
import { absoluteUrl } from "@/lib/site-config";

export const JournalIndexContent = () => (
  <main className="bg-luxury-white text-luxury-black">
    <SeoHead
      title={pageSeo.journal.title}
      description={pageSeo.journal.description}
      path={pageSeo.journal.path}
      image={absoluteUrl(heroImage.src)}
      imageAlt={heroImage.alt}
      jsonLd={[journalIndexJsonLd, journalIndexBreadcrumbJsonLd]}
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
  </main>
);

const Journal = () => <JournalIndexContent />;

export default Journal;
