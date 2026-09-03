import { CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_URL } from "./site-config";
import { pageSeo } from "./page-seo";

const homeUrl = `${SITE_URL}/`;

/** Homepage Person + WebSite + WebPage + VideoObject. Kept identical in first-byte HTML and SeoHead. */
export const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Katherine Taylor",
    alternateName: "Katherine Taylor Escort",
    jobTitle: "Luxury Companion",
    image: DEFAULT_OG_IMAGE,
    description:
      "High-end escort offering private companionship in San Francisco, Sacramento, and the Bay Area.",
    url: homeUrl,
    email: CONTACT_EMAIL,
    areaServed: [
      {
        "@type": "City",
        name: "San Francisco",
        containedInPlace: { "@type": "State", name: "California" },
      },
      {
        "@type": "City",
        name: "Sacramento",
        containedInPlace: { "@type": "State", name: "California" },
      },
    ],
    sameAs: [
      "https://x.com/TheKatherineExp",
      "https://www.instagram.com/katherineunscripted/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Katherine Taylor",
    alternateName: "Katherine Taylor Escort",
    url: homeUrl,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: "Katherine Taylor",
      url: homeUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: pageSeo.home.title,
    description: pageSeo.home.description,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "Katherine Taylor", url: homeUrl },
    about: { "@type": "Person", name: "Katherine Taylor", url: homeUrl },
    primaryImageOfPage: DEFAULT_OG_IMAGE,
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Love Elevated | Katherine Taylor Escort",
    description:
      "An immersive cinematic introduction to Katherine Taylor, a high-end escort offering private companionship in San Francisco and Sacramento.",
    thumbnailUrl: DEFAULT_OG_IMAGE,
    embedUrl:
      "https://iframe.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065",
    uploadDate: "2025-01-10T00:00:00+00:00",
    duration: "PT24S",
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: "Katherine Taylor",
      url: homeUrl,
    },
  },
] as const;
