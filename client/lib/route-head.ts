import { aboutJsonLd, katherineTaylorArticleAuthor } from "./about-json-ld";
import { briefInterruptionJsonLd, briefInterruptionVideo } from "./brief-interruption";
import { homeJsonLd } from "./home-json-ld";
import { essays, essayMetadata, heroImage } from "./journal-content";
import {
  journalEssayJsonLd,
  journalIndexBreadcrumbJsonLd,
  journalIndexJsonLd,
} from "./journal-json-ld";
import { pageSeo } from "./page-seo";
import { pleaseStandByJsonLd, pleaseStandByVideo } from "./please-stand-by";
import { DEFAULT_OG_IMAGE, SITE_URL, absoluteUrl } from "./site-config";
import { sitePageList } from "./site-pages";
import { OPENING_HLS_PROXY_PATH, openingVideo } from "./video-sections";

export const ROUTE_HEAD_START = "<!--route-head:start-->";
export const ROUTE_HEAD_END = "<!--route-head:end-->";

const INDEX_ROBOTS =
  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex, nofollow";

export type RouteHead = {
  path: string;
  title: string;
  description: string;
  canonical: string | null;
  robots: string;
  ogType: "website" | "article";
  image: string;
  imageAlt: string;
  jsonLd: Record<string, unknown>[];
  geoRegion?: string;
  geoPlacename?: string;
  noIndex?: boolean;
};

const sacramentoJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Escorts Near Me | The High-End Edition",
  description: pageSeo.sacramento.description,
  author: {
    ...katherineTaylorArticleAuthor,
    jobTitle: "Luxury Companion",
  },
  about: ["Sacramento escort", "escorts near me", "California escorts"],
  url: absoluteUrl("/sacramento-escorts"),
};

const pageSeoHeads: Record<string, Partial<RouteHead>> = {
  "/": {
    jsonLd: [...homeJsonLd] as Record<string, unknown>[],
    geoRegion: "US-CA",
  },
  "/about": {
    jsonLd: [...aboutJsonLd] as Record<string, unknown>[],
  },
  "/rates": {},
  "/gallery": {},
  "/film/a-brief-interruption": {
    image: absoluteUrl(briefInterruptionVideo.poster),
    imageAlt: "A Brief Interruption",
    jsonLd: [briefInterruptionJsonLd],
  },
  "/film/please-stand-by": {
    image: absoluteUrl(pleaseStandByVideo.poster),
    imageAlt: "Please Stand By",
    jsonLd: [pleaseStandByJsonLd],
  },
  "/faq": {},
  "/inquire": {},
  "/gifts": {},
  "/journal": {
    image: absoluteUrl(heroImage.src),
    imageAlt: heroImage.alt,
    jsonLd: [journalIndexJsonLd, journalIndexBreadcrumbJsonLd],
  },
  "/sacramento-escorts": {
    ogType: "article",
    jsonLd: [sacramentoJsonLd],
    geoRegion: "US-CA",
    geoPlacename: "Sacramento",
  },
};

const extraPrerenderRoutes: RouteHead[] = [
  {
    path: "/content-generator",
    title: "Content Generator | Katherine Taylor",
    description: "Internal content tools.",
    canonical: null,
    robots: NOINDEX_ROBOTS,
    ogType: "website",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Katherine Taylor Escort",
    jsonLd: [],
    noIndex: true,
  },
  {
    path: "/ai-concierge",
    title: "AI Concierge | Katherine Taylor",
    description: "Internal concierge tools.",
    canonical: null,
    robots: NOINDEX_ROBOTS,
    ogType: "website",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Katherine Taylor Escort",
    jsonLd: [],
    noIndex: true,
  },
];

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function baseHead(path: string, title: string, description: string): RouteHead {
  return {
    path,
    title,
    description,
    canonical: absoluteUrl(path),
    robots: INDEX_ROBOTS,
    ogType: "website",
    image: DEFAULT_OG_IMAGE,
    imageAlt: "Katherine Taylor Escort",
    jsonLd: [],
  };
}

function essayHead(slug: string): RouteHead | null {
  const essay = essays.find((entry) => entry.slug === slug);
  if (!essay) {
    return null;
  }

  const title =
    essay.seo?.title ?? `${essay.title} — Katherine Taylor Escort`;
  const description =
    essay.seo?.description ?? essay.excerpt ?? essayMetadata.description;
  const path = `/journal/${essay.slug}`;

  return {
    path,
    title,
    description,
    canonical: absoluteUrl(path),
    robots: INDEX_ROBOTS,
    ogType: "article",
    image: absoluteUrl(heroImage.src),
    imageAlt: heroImage.alt,
    geoRegion: essay.seo?.geoRegion,
    geoPlacename: essay.seo?.geoPlacename,
    jsonLd: journalEssayJsonLd(essay, description),
  };
}

export const notFoundHead: RouteHead = {
  path: "/404",
  title: pageSeo.notFound.title,
  description: pageSeo.notFound.description,
  canonical: null,
  robots: NOINDEX_ROBOTS,
  ogType: "website",
  image: DEFAULT_OG_IMAGE,
  imageAlt: "Katherine Taylor Escort",
  jsonLd: [],
  noIndex: true,
};

export function getPrerenderRoutes(): RouteHead[] {
  const fromPages = sitePageList.map((page) => {
    if (page.path.startsWith("/journal/")) {
      const slug = page.path.slice("/journal/".length);
      const essay = essayHead(slug);
      if (!essay) {
        throw new Error(`Missing essay metadata for ${page.path}`);
      }
      return essay;
    }

    const seo = Object.values(pageSeo).find((entry) => entry.path === page.path);
    if (!seo) {
      throw new Error(`Missing pageSeo for ${page.path}`);
    }

    return {
      ...baseHead(page.path, seo.title, seo.description),
      ...pageSeoHeads[page.path],
    };
  });

  return [...fromPages, ...extraPrerenderRoutes];
}

export function renderRouteHeadBlock(page: RouteHead): string {
  const tags: string[] = [
    `    <meta data-rh="true" name="robots" content="${escapeAttr(page.robots)}" />`,
    `    <meta data-rh="true" name="description" content="${escapeAttr(page.description)}" />`,
    `    <title data-rh="true">${escapeAttr(page.title)}</title>`,
  ];

  if (page.canonical) {
    tags.push(
      `    <link data-rh="true" rel="canonical" href="${escapeAttr(page.canonical)}" />`,
    );
  }

  tags.push(
    `    <meta data-rh="true" property="og:type" content="${page.ogType}" />`,
    `    <meta data-rh="true" property="og:site_name" content="Katherine Taylor" />`,
    `    <meta data-rh="true" property="og:title" content="${escapeAttr(page.title)}" />`,
    `    <meta data-rh="true" property="og:description" content="${escapeAttr(page.description)}" />`,
  );

  if (page.canonical) {
    tags.push(
      `    <meta data-rh="true" property="og:url" content="${escapeAttr(page.canonical)}" />`,
    );
  }

  tags.push(
    `    <meta data-rh="true" property="og:image" content="${escapeAttr(page.image)}" />`,
    `    <meta data-rh="true" property="og:image:alt" content="${escapeAttr(page.imageAlt)}" />`,
    `    <meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `    <meta data-rh="true" name="twitter:title" content="${escapeAttr(page.title)}" />`,
    `    <meta data-rh="true" name="twitter:description" content="${escapeAttr(page.description)}" />`,
    `    <meta data-rh="true" name="twitter:image" content="${escapeAttr(page.image)}" />`,
  );

  if (page.geoRegion) {
    tags.push(
      `    <meta data-rh="true" name="geo.region" content="${escapeAttr(page.geoRegion)}" />`,
    );
  }
  if (page.geoPlacename) {
    tags.push(
      `    <meta data-rh="true" name="geo.placename" content="${escapeAttr(page.geoPlacename)}" />`,
    );
  }

  for (const node of page.jsonLd) {
    tags.push(
      `    <script data-rh="true" type="application/ld+json">${JSON.stringify(node)}</script>`,
    );
  }

  if (page.path === "/") {
    tags.push(
      `    <link data-rh="true" rel="preload" as="image" href="${escapeAttr(openingVideo.poster)}" fetchpriority="high" />`,
      `    <link data-rh="true" rel="preload" as="fetch" href="${OPENING_HLS_PROXY_PATH}" crossorigin />`,
    );
  }

  return `${ROUTE_HEAD_START}\n${tags.join("\n")}\n    ${ROUTE_HEAD_END}`;
}

export function applyRouteHead(html: string, page: RouteHead): string {
  const pattern = new RegExp(
    `${ROUTE_HEAD_START}[\\s\\S]*?${ROUTE_HEAD_END}`,
  );
  if (!pattern.test(html)) {
    throw new Error("index.html is missing route-head markers");
  }
  return html.replace(pattern, renderRouteHeadBlock(page));
}

export function prerenderOutputPath(routePath: string): string {
  if (routePath === "/") {
    return "index.html";
  }
  return `${routePath.replace(/^\//, "")}.html`;
}

export const SITE_ORIGIN = SITE_URL;
