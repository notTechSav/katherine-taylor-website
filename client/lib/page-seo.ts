import { sitePages } from "./site-pages";

/**
 * Per-page titles and descriptions. Paths come from site-pages.ts so a route
 * change cannot leave a canonical URL pointing at the old location.
 */
export const pageSeo = {
  home: {
    title: "Katherine Taylor Escort | San Francisco & Sacramento",
    description:
      "Katherine Taylor is a high-end escort in San Francisco and Sacramento. Private companionship by appointment—continuity, discretion, and scarcity by design.",
    path: sitePages.home.path,
  },
  about: {
    title: "About Katherine Taylor | High-End Private Companionship",
    description:
      "Katherine Taylor offers refined, ongoing companionship for executives and founders. Strategic counsel meets personal continuity—institutional memory that lets you move without rehearsal.",
    path: sitePages.about.path,
  },
  rates: {
    title: "Companion Rates | Katherine Taylor — San Francisco & Sacramento",
    description:
      "Transparent rates for high-end companionship with Katherine Taylor in San Francisco and Sacramento. Continuity, discretion, and scarcity—priced to protect the work.",
    path: sitePages.rates.path,
  },
  gallery: {
    title: "Private Collections | Katherine Taylor Escort",
    description:
      "Private photography collections by Katherine Taylor. Intimate moments from Los Angeles to Northern California—available by appointment for select clientele.",
    path: sitePages.gallery.path,
  },
  faq: {
    title: "FAQ | Katherine Taylor Escort — San Francisco",
    description:
      "Straight answers on booking, screening, rates, and discretion from Katherine Taylor, a high-end San Francisco escort. What agency pages won't tell you.",
    path: sitePages.faq.path,
  },
  inquire: {
    title: "Inquire | Book Katherine Taylor Escort",
    description:
      "Private inquiry for companionship with Katherine Taylor in San Francisco and Sacramento. Every request is read personally; incomplete inquiries rarely receive a response.",
    path: sitePages.inquire.path,
  },
  gifts: {
    title: "Gifts | Katherine Taylor — Thoughtful Gestures & Gift Etiquette",
    description:
      "A few favorite things from Katherine Taylor — perfume, cigars, beautiful shoes, spa days, lingerie, and the etiquette of a thoughtful gesture.",
    path: sitePages.gifts.path,
  },
  journal: {
    title: "The Journal | Katherine Taylor",
    description:
      "Essays, memoirs, and notes from Katherine Taylor on companionship, travel, culture, and the quiet discipline of continuity.",
    path: sitePages.journal.path,
  },
  sacramento: {
    title: "Escorts Near Me | The High-End Edition — Sacramento Escort",
    description:
      "What ten years in escorting—and two years trying very hard not to do it—taught Katherine Taylor about proximity, compatibility, discretion, and finding the right person in Sacramento.",
    path: sitePages.sacramento.path,
  },
  notFound: {
    title: "Page Not Found | Katherine Taylor Escort",
    description: "This page has not been crafted yet. Return home to continue.",
    path: sitePages.home.path,
    noIndex: true,
  },
} as const;
