import { katherineTaylorArticleAuthor } from "./about-json-ld";
import { breadcrumbJsonLd } from "./breadcrumb-json-ld";
import { pageSeo } from "./page-seo";
import { SITE_URL, absoluteUrl } from "./site-config";
import { sitePages } from "./site-pages";

const aboutPerson = {
  "@type": "Person",
  name: "Katherine Taylor",
  url: absoluteUrl(sitePages.about.path),
} as const;

function webPageJsonLd(
  path: string,
  name: string,
  description: string,
  significantLink: readonly string[],
): Record<string, unknown> {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Katherine Taylor",
      url: `${SITE_URL}/`,
    },
    about: aboutPerson,
    significantLink: [...significantLink],
  };
}

export const ratesJsonLd: Record<string, unknown>[] = [
  webPageJsonLd(
    sitePages.rates.path,
    pageSeo.rates.title,
    pageSeo.rates.description,
    [
      absoluteUrl("/faq#reviews"),
      absoluteUrl("/journal/continuity-as-craft"),
      absoluteUrl("/journal/scarcity-discipline"),
    ],
  ),
  breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "Rates", path: sitePages.rates.path },
  ]),
];

export const faqJsonLd: Record<string, unknown>[] = [
  webPageJsonLd(
    sitePages.faq.path,
    pageSeo.faq.title,
    pageSeo.faq.description,
    [
      absoluteUrl("/rates#why"),
      absoluteUrl("/faq#reviews"),
      absoluteUrl("/faq#screening"),
      absoluteUrl("/faq#booking"),
    ],
  ),
  breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "FAQ", path: sitePages.faq.path },
  ]),
];

export const inquireJsonLd: Record<string, unknown>[] = [
  webPageJsonLd(
    sitePages.inquire.path,
    pageSeo.inquire.title,
    pageSeo.inquire.description,
    [absoluteUrl("/faq#screening"), absoluteUrl("/faq#booking")],
  ),
  breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "Inquire", path: sitePages.inquire.path },
  ]),
];

export const giftsJsonLd: Record<string, unknown>[] = [
  webPageJsonLd(
    sitePages.gifts.path,
    pageSeo.gifts.title,
    pageSeo.gifts.description,
    [
      absoluteUrl("/gifts#favorites-heading"),
      absoluteUrl("/gifts#noticed-heading"),
    ],
  ),
  breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "Gifts", path: sitePages.gifts.path },
  ]),
];

export const sacramentoJsonLd: Record<string, unknown>[] = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Escorts Near Me | The High-End Edition",
    description: pageSeo.sacramento.description,
    author: {
      ...katherineTaylorArticleAuthor,
      jobTitle: "Luxury Companion",
    },
    about: ["Sacramento escort", "escorts near me", "California escorts"],
    url: absoluteUrl(sitePages.sacramento.path),
    datePublished: "2026-08-20",
    image: absoluteUrl("/location-slide.webp?v=hires2"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(sitePages.sacramento.path),
    },
    publisher: {
      "@type": "Person",
      name: "Katherine Taylor",
    },
  },
  breadcrumbJsonLd([
    { name: "Home", path: sitePages.home.path },
    { name: "Sacramento", path: sitePages.sacramento.path },
  ]),
];
