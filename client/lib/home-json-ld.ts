import { CONTACT_EMAIL, DEFAULT_OG_IMAGE, SITE_URL } from "./site-config";

/** Homepage Person + WebSite graph. Kept identical in first-byte HTML and SeoHead. */
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
    url: `${SITE_URL}/`,
    email: CONTACT_EMAIL,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Katherine Taylor",
    alternateName: "Katherine Taylor Escort",
    url: `${SITE_URL}/`,
  },
] as const;
