import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { essays } from "./journal-content";
import { pageSeo } from "./page-seo";
import {
  applyRouteHead,
  getPrerenderRoutes,
  notFoundHead,
  prerenderOutputPath,
} from "./route-head";
import { sitePageList } from "./site-pages";

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

describe("prerender route heads", () => {
  const routes = getPrerenderRoutes();

  it("covers every indexable site page", () => {
    const paths = new Set(routes.map((route) => route.path));
    for (const page of sitePageList) {
      expect(paths.has(page.path), `${page.path} is not prerendered`).toBe(
        true,
      );
    }
  });

  it("emits extension-less Cloudflare pretty-URL files", () => {
    expect(prerenderOutputPath("/")).toBe("index.html");
    expect(prerenderOutputPath("/sacramento-escorts")).toBe(
      "sacramento-escorts.html",
    );
    expect(prerenderOutputPath("/journal/memoirs-in-the-city")).toBe(
      "journal/memoirs-in-the-city.html",
    );
  });

  it("keeps homepage first-byte metadata on /", () => {
    const home = routes.find((route) => route.path === "/");
    if (!home) throw new Error("missing home route");
    expect(home.title).toBe(pageSeo.home.title);
    expect(home.canonical).toBe("https://katherinetaylorescort.com/");
    const html = applyRouteHead(indexHtml, home);
    expect(html).toContain(
      `<title data-rh="true">${pageSeo.home.title.replace(/&/g, "&amp;")}</title>`,
    );
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/"',
    );
    expect(html).toContain('"@type":"Person"');
    expect(html).toContain('"@type":"WebSite"');
  });

  it("gives Sacramento its own title and canonical in raw HTML", () => {
    const sacramento = routes.find(
      (route) => route.path === "/sacramento-escorts",
    );
    if (!sacramento) throw new Error("missing sacramento route");
    expect(sacramento.title).toBe(pageSeo.sacramento.title);
    const html = applyRouteHead(indexHtml, sacramento);
    expect(html).toContain(pageSeo.sacramento.title);
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/sacramento-escorts"',
    );
    expect(html).not.toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/"',
    );
    expect(html).toContain("Escorts Near Me");
  });

  it("gives the San Francisco memoir its own title and canonical", () => {
    const memoir = routes.find(
      (route) => route.path === "/journal/memoirs-in-the-city",
    );
    const expected = essays.find((essay) => essay.slug === "memoirs-in-the-city")
      ?.seo?.title;
    if (!memoir) throw new Error("missing memoir route");
    expect(memoir.title).toBe(expected);
    const html = applyRouteHead(indexHtml, memoir);
    expect(html).toContain(expected);
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/journal/memoirs-in-the-city"',
    );
  });

  it("does not canonical or index the 404 shell", () => {
    const html = applyRouteHead(indexHtml, notFoundHead);
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('property="og:url"');
    expect(html).toContain(pageSeo.notFound.title);
  });
});
