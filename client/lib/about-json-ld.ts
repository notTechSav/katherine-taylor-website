import { homeJsonLd } from "./home-json-ld";
import { DEFAULT_OG_IMAGE, absoluteUrl } from "./site-config";
import { sitePages } from "./site-pages";

const aboutUrl = absoluteUrl(sitePages.about.path);
const homepagePerson = homeJsonLd.find((node) => node["@type"] === "Person");

if (!homepagePerson) {
  throw new Error("Homepage Person JSON-LD is required for ProfilePage.mainEntity");
}

/** Article author pointing at the /about ProfilePage. */
export const katherineTaylorArticleAuthor = {
  "@type": "Person",
  name: "Katherine Taylor",
  url: aboutUrl,
} as const;

/** /about ProfilePage graph. Kept identical in first-byte HTML and SeoHead. */
export const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: aboutUrl,
    mainEntity: {
      "@type": "Person",
      name: "Katherine Taylor",
      alternateName: "Katherine Taylor Escort",
      jobTitle: "Luxury Companion",
      url: aboutUrl,
      image: DEFAULT_OG_IMAGE,
      sameAs: homepagePerson.sameAs,
    },
  },
] as const;
