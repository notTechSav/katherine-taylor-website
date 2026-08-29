import { describe, it, expect } from "vitest";
import { essays } from "./journal-content";
import { pageSeo } from "./page-seo";
import {
  footerGroupOrder,
  pagesInFooterGroup,
  renderSitemap,
  sitePageList,
} from "./site-pages";

const ORIGIN = "https://katherinetaylorescort.com";

describe("site pages", () => {
  it("gives every page a unique path", () => {
    const paths = sitePageList.map((page) => page.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("uses root-relative paths", () => {
    for (const page of sitePageList) {
      expect(page.path.startsWith("/")).toBe(true);
    }
  });
});

describe("footer coverage", () => {
  it("places every page in the brand block, exactly one link group, or sitemap-only", () => {
    const grouped = footerGroupOrder.flatMap((group) =>
      pagesInFooterGroup(group.id).map((page) => page.key),
    );
    const brand = sitePageList
      .filter((page) => page.footer === "brand")
      .map((page) => page.key);
    const sitemapOnly = sitePageList
      .filter((page) => page.footer === "none")
      .map((page) => page.key);

    expect(new Set(grouped).size).toBe(grouped.length);
    expect([...grouped, ...brand, ...sitemapOnly].sort()).toEqual(
      sitePageList.map((page) => page.key).sort(),
    );
  });

  it("leaves no footer group empty", () => {
    for (const group of footerGroupOrder) {
      expect(pagesInFooterGroup(group.id).length).toBeGreaterThan(0);
    }
  });

  it("gives every footer link visible text", () => {
    for (const page of sitePageList) {
      if (page.footer === "none") continue;
      expect(page.navLabel.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("sitemap", () => {
  const xml = renderSitemap(ORIGIN);

  it("lists every page exactly once", () => {
    for (const page of sitePageList) {
      const loc =
        page.path === "/" ? `${ORIGIN}/` : `${ORIGIN}${page.path}`;
      expect(xml.split(`<loc>${loc}</loc>`).length - 1).toBe(1);
    }
  });

  it("contains no URLs beyond the page list", () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBe(sitePageList.length);
  });

  it("is well-formed and absolute", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml.trimEnd().endsWith("</urlset>")).toBe(true);
    for (const loc of [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1],
    )) {
      expect(loc.startsWith(`${ORIGIN}/`)).toBe(true);
    }
  });

  it("lists every public journal essay", () => {
    for (const essay of essays) {
      const loc = `${ORIGIN}/journal/${essay.slug}`;
      expect(xml.split(`<loc>${loc}</loc>`).length - 1).toBe(1);
    }
  });
});

describe("page-seo", () => {
  it("points canonical paths at the shared page list", () => {
    const knownPaths = new Set(sitePageList.map((page) => page.path));
    for (const [key, entry] of Object.entries(pageSeo)) {
      expect(
        knownPaths.has(entry.path),
        `pageSeo.${key}.path is not a known page`,
      ).toBe(true);
    }
  });

  it("describes every indexable page", () => {
    const seoPaths = new Set<string>(
      Object.values(pageSeo).map((entry) => entry.path),
    );
    // Journal essay metadata is owned per-essay in journal-content.ts.
    const journalEssayPaths = new Set(
      sitePageList
        .filter((page) => page.path.startsWith("/journal/"))
        .map((page) => page.path),
    );

    for (const page of sitePageList) {
      if (journalEssayPaths.has(page.path)) continue;
      expect(seoPaths.has(page.path), `${page.path} has no pageSeo entry`).toBe(
        true,
      );
    }
  });
});
