/**
 * Single source of truth for every indexable page.
 *
 * The footer nav, the generated sitemap, and the canonical paths in page-seo.ts
 * all derive from this list, so adding or removing a page here updates all of
 * them at once. `site-pages.spec.ts` fails if a page is ever left unreachable.
 *
 * Keep this module dependency-free: vite.config.ts imports it to build the
 * sitemap at build time, outside the app's module graph.
 */

export type FooterGroupId = "practice" | "writing" | "collections";

/** "brand" pages are surfaced in the footer's brand block, not in a link group. */
export type FooterPlacement = "brand" | FooterGroupId;

export type SitePage = {
  path: string;
  /** Footer link text. Short and conventional unless the destination needs context. */
  navLabel: string;
  changefreq: "weekly" | "monthly";
  priority: number;
  footer: FooterPlacement;
};

/**
 * Declaration order is meaningful: it sets the order links appear within their
 * footer group.
 */
export const sitePages = {
  home: {
    path: "/",
    navLabel: "Katherine Taylor",
    changefreq: "weekly",
    priority: 1.0,
    footer: "brand",
  },
  inquire: {
    path: "/inquire",
    navLabel: "Inquire",
    changefreq: "monthly",
    priority: 0.9,
    footer: "brand",
  },
  about: {
    path: "/about",
    navLabel: "About",
    changefreq: "monthly",
    priority: 0.9,
    footer: "practice",
  },
  rates: {
    path: "/rates",
    navLabel: "Rates",
    changefreq: "monthly",
    priority: 0.9,
    footer: "practice",
  },
  services: {
    path: "/services",
    navLabel: "Services",
    changefreq: "monthly",
    priority: 0.7,
    footer: "practice",
  },
  faq: {
    path: "/faq",
    navLabel: "FAQ",
    changefreq: "monthly",
    priority: 0.8,
    footer: "practice",
  },
  journal: {
    path: "/journal",
    navLabel: "The Journal",
    changefreq: "weekly",
    priority: 0.7,
    footer: "writing",
  },
  memoirs: {
    path: "/journal/memoirs-in-the-city",
    navLabel: "Memoirs in the City",
    changefreq: "monthly",
    priority: 0.9,
    footer: "writing",
  },
  sacramento: {
    path: "/sacramento-escorts",
    navLabel: "Sacramento",
    changefreq: "monthly",
    priority: 0.9,
    footer: "writing",
  },
  gallery: {
    path: "/gallery",
    navLabel: "Private Collections",
    changefreq: "monthly",
    priority: 0.8,
    footer: "collections",
  },
  gifts: {
    path: "/gifts",
    navLabel: "Gifts",
    changefreq: "monthly",
    priority: 0.6,
    footer: "collections",
  },
} as const satisfies Record<string, SitePage>;

export type PageKey = keyof typeof sitePages;

export const sitePageList: readonly (SitePage & { key: PageKey })[] =
  Object.entries(sitePages).map(([key, page]) => ({
    ...page,
    key: key as PageKey,
  }));

/** Footer link groups, in render order. */
export const footerGroupOrder: readonly {
  id: FooterGroupId;
  label: string;
}[] = [
  { id: "practice", label: "The Practice" },
  { id: "writing", label: "Writing" },
  { id: "collections", label: "Collections" },
];

export const pagesInFooterGroup = (group: FooterGroupId) =>
  sitePageList.filter((page) => page.footer === group);

/** Absolute URLs for every indexable page, for sitemap generation. */
export const sitemapEntries = (origin: string) =>
  sitePageList.map((page) => ({
    loc: page.path === "/" ? `${origin}/` : `${origin}${page.path}`,
    changefreq: page.changefreq,
    priority: page.priority.toFixed(1),
  }));

export const renderSitemap = (origin: string): string => {
  const urls = sitemapEntries(origin)
    .map(
      (entry) =>
        `  <url>\n    <loc>${entry.loc}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
