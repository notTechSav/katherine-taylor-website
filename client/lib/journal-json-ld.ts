import { katherineTaylorArticleAuthor } from "./about-json-ld";
import {
  essayMetadata,
  heroImage,
  journalDisplay,
  type JournalEssay,
} from "./journal-content";
import { pageSeo } from "./page-seo";
import { absoluteUrl } from "./site-config";
import { sitePages } from "./site-pages";

function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const journalIndexJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: journalDisplay.pageTitle,
  description: pageSeo.journal.description,
  url: absoluteUrl(sitePages.journal.path),
  image: absoluteUrl(heroImage.src),
  author: {
    "@type": "Person",
    name: "Katherine Taylor",
  },
};

export const journalIndexBreadcrumbJsonLd = breadcrumbJsonLd([
  { name: "Home", path: sitePages.home.path },
  { name: "Journal", path: sitePages.journal.path },
]);

export function journalEssayArticleJsonLd(
  essay: JournalEssay,
  description: string,
): Record<string, unknown> {
  const path = `${sitePages.journal.path}/${essay.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description,
    author: { ...katherineTaylorArticleAuthor },
    publisher: {
      "@type": "Person",
      name: "Katherine Taylor",
    },
    datePublished: essay.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    keywords: essay.seo?.keywords ?? essayMetadata.keywords,
    image: absoluteUrl(heroImage.src),
  };
}

export function journalEssayBreadcrumbJsonLd(
  essay: Pick<JournalEssay, "title" | "slug">,
): Record<string, unknown> {
  return breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "Journal", path: sitePages.journal.path },
    {
      name: essay.title,
      path: `${sitePages.journal.path}/${essay.slug}`,
    },
  ]);
}

export function journalEssayJsonLd(
  essay: JournalEssay,
  description: string,
): Record<string, unknown>[] {
  return [
    journalEssayArticleJsonLd(essay, description),
    journalEssayBreadcrumbJsonLd(essay),
  ];
}
