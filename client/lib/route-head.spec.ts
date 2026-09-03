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
import { DEFAULT_OG_IMAGE } from "./site-config";
import { sitePageList } from "./site-pages";

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

describe("prerender route heads", () => {
  const routes = getPrerenderRoutes();

  it("includes the Google tag once, immediately after <head>", () => {
    expect(indexHtml).toMatch(
      /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async data-cfasync="false" src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-K4RWGESF1K"><\/script>/,
    );
    expect(indexHtml.match(/gtag\/js\?id=G-K4RWGESF1K/g)).toHaveLength(1);
    expect(indexHtml.match(/gtag\('config', 'G-K4RWGESF1K'\)/g)).toHaveLength(1);

    for (const route of routes) {
      const html = applyRouteHead(indexHtml, route);
      expect(
        html.match(/gtag\/js\?id=G-K4RWGESF1K/g),
        `${route.path} should keep one Google tag`,
      ).toHaveLength(1);
    }

    const notFound = applyRouteHead(indexHtml, notFoundHead);
    expect(notFound.match(/gtag\/js\?id=G-K4RWGESF1K/g)).toHaveLength(1);
  });

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
    expect(prerenderOutputPath("/film/a-brief-interruption")).toBe(
      "film/a-brief-interruption.html",
    );
    expect(prerenderOutputPath("/film/please-stand-by")).toBe(
      "film/please-stand-by.html",
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
    expect(html).toContain('"@type":"WebPage"');
    expect(html).toContain('"@type":"VideoObject"');
    expect(html).toContain('"email":"private@katherinetaylorescort.com"');
    expect(html).toContain(
      'rel="preload" as="image" href="/opening-poster.jpg"',
    );
    expect(html).toContain('rel="preload" as="fetch" href="/api/opening-hls.m3u8"');
    expect(html).toContain('property="og:locale" content="en_US"');
    expect(html).toContain('name="twitter:image:alt"');
    expect(html).toContain('property="og:image:width" content="1920"');
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
    expect(html).not.toContain('rel="preload" as="image"');
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

  it("gives A Brief Interruption its own title, canonical, and VideoObject", () => {
    const film = routes.find(
      (route) => route.path === "/film/a-brief-interruption",
    );
    if (!film) throw new Error("missing film route");
    expect(film.title).toBe(pageSeo.briefInterruption.title);
    expect(film.description).toBe(pageSeo.briefInterruption.description);
    expect(film.canonical).toBe(
      "https://katherinetaylorescort.com/film/a-brief-interruption",
    );
    expect(film.image).toBe(
      "https://katherinetaylorescort.com/film/a-brief-interruption.jpg",
    );

    const html = applyRouteHead(indexHtml, film);
    expect(html).toContain(
      `<title data-rh="true">${pageSeo.briefInterruption.title}</title>`,
    );
    expect(html).toContain(
      `content="${pageSeo.briefInterruption.description}"`,
    );
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/film/a-brief-interruption"',
    );
    expect(html).not.toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/"',
    );
    expect(html).not.toContain(pageSeo.home.title);
    expect(html).not.toContain('rel="preload" as="image"');
    expect(html).not.toContain('rel="preload" as="fetch" href="/api/opening-hls.m3u8"');
    expect(html).toContain('"@type":"VideoObject"');
    expect(html).toContain('"name":"A Brief Interruption"');
    expect(html).toContain(
      '"contentUrl":"https://katherinetaylorescort.com/film/a-brief-interruption.mp4"',
    );

    const jsonLd = html.match(
      /<script data-rh="true" type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    if (!jsonLd) throw new Error("missing film JSON-LD");
    const parsed = JSON.parse(jsonLd) as { "@type": string };
    expect(parsed["@type"]).toBe("VideoObject");
  });

  it("gives Please Stand By its own title, canonical, and VideoObject", () => {
    const film = routes.find((route) => route.path === "/film/please-stand-by");
    if (!film) throw new Error("missing please-stand-by route");
    expect(film.title).toBe(pageSeo.pleaseStandBy.title);
    expect(film.description).toBe(pageSeo.pleaseStandBy.description);
    expect(film.canonical).toBe(
      "https://katherinetaylorescort.com/film/please-stand-by",
    );
    expect(film.image).toBe(
      "https://katherinetaylorescort.com/film/please-stand-by.jpg",
    );
    expect(film.robots).toMatch(/index,\s*follow/);

    const html = applyRouteHead(indexHtml, film);
    expect(html).toContain(
      `<title data-rh="true">${pageSeo.pleaseStandBy.title}</title>`,
    );
    expect(html).toContain(`content="${pageSeo.pleaseStandBy.description}"`);
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/film/please-stand-by"',
    );
    expect(html).not.toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/"',
    );
    expect(html).not.toContain(pageSeo.home.title);
    expect(html).not.toContain('rel="preload" as="image"');
    expect(html).not.toContain(
      'rel="preload" as="fetch" href="/api/opening-hls.m3u8"',
    );
    expect(html).toContain('"@type":"VideoObject"');
    expect(html).toContain('"name":"Please Stand By"');
    expect(html).toContain(
      '"contentUrl":"https://katherinetaylorescort.com/film/please-stand-by.mp4"',
    );
    expect(html).not.toContain("a-brief-interruption.mp4");

    const jsonLd = html.match(
      /<script data-rh="true" type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    if (!jsonLd) throw new Error("missing please-stand-by JSON-LD");
    const parsed = JSON.parse(jsonLd) as { "@type": string };
    expect(parsed["@type"]).toBe("VideoObject");
  });

  it("does not canonical or index the 404 shell", () => {
    const html = applyRouteHead(indexHtml, notFoundHead);
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('property="og:url"');
    expect(html).toContain(pageSeo.notFound.title);
  });
});

const FORBIDDEN_SCHEMA_TYPES = new Set([
  "LocalBusiness",
  "Organization",
  "FAQPage",
  "Service",
  "Product",
  "Offer",
  "Review",
  "AggregateRating",
]);

function parseJsonLd(html: string): Record<string, unknown>[] {
  const pattern =
    /<script data-rh="true" type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  return [...html.matchAll(pattern)].map((match) => {
    const raw = match[1];
    if (!raw) throw new Error("empty JSON-LD script");
    return JSON.parse(raw) as Record<string, unknown>;
  });
}

function typesOf(nodes: Record<string, unknown>[]): string[] {
  return nodes.map((node) => {
    const type = node["@type"];
    if (typeof type !== "string") {
      throw new Error("JSON-LD node is missing @type");
    }
    return type;
  });
}

function routeHtml(path: string): string {
  const route = getPrerenderRoutes().find((entry) => entry.path === path);
  if (!route) throw new Error(`missing route ${path}`);
  return applyRouteHead(indexHtml, route);
}

describe("structured-data graph", () => {

  it("keeps homepage Person, WebSite, WebPage, and VideoObject, including sameAs", () => {
    const nodes = parseJsonLd(routeHtml("/"));
    expect(typesOf(nodes)).toEqual([
      "Person",
      "WebSite",
      "WebPage",
      "VideoObject",
    ]);
    const person = nodes[0] as {
      sameAs: string[];
      url: string;
      areaServed: Array<{ name: string }>;
    };
    expect(person.sameAs).toEqual([
      "https://x.com/TheKatherineExp",
      "https://www.instagram.com/katherineunscripted/",
    ]);
    expect(person.url).toBe("https://katherinetaylorescort.com/");
    expect(person.areaServed.map((place) => place.name)).toEqual([
      "San Francisco",
      "Sacramento",
    ]);
    const page = nodes[2] as { inLanguage: string; url: string };
    expect(page.inLanguage).toBe("en-US");
    expect(page.url).toBe("https://katherinetaylorescort.com/");
    const video = nodes[3] as { duration: string; embedUrl: string };
    expect(video.duration).toBe("PT24S");
    expect(video.embedUrl).toContain("cloudflarestream.com");
  });

  it("adds a single ProfilePage to /about whose mainEntity is Katherine Taylor", () => {
    const nodes = parseJsonLd(routeHtml("/about"));
    expect(typesOf(nodes)).toEqual(["ProfilePage"]);
    const profile = nodes[0] as {
      url: string;
      mainEntity: {
        "@type": string;
        name: string;
        alternateName: string;
        jobTitle: string;
        url: string;
        image: string;
        sameAs: string[];
      };
    };
    expect(profile.url).toBe("https://katherinetaylorescort.com/about");
    expect(profile.mainEntity["@type"]).toBe("Person");
    expect(profile.mainEntity.name).toBe("Katherine Taylor");
    expect(profile.mainEntity.alternateName).toBe("Katherine Taylor Escort");
    expect(profile.mainEntity.jobTitle).toBe("Luxury Companion");
    expect(profile.mainEntity.url).toBe(
      "https://katherinetaylorescort.com/about",
    );
    expect(profile.mainEntity.image).toBe(DEFAULT_OG_IMAGE);
    expect(profile.mainEntity.sameAs).toEqual([
      "https://x.com/TheKatherineExp",
      "https://www.instagram.com/katherineunscripted/",
    ]);
    expect(profile.mainEntity).not.toHaveProperty("email");
    expect(JSON.stringify(profile)).not.toContain("interactionStatistic");
    expect(JSON.stringify(profile)).not.toContain("dateCreated");
  });

  it("adds BreadcrumbList beside the existing Blog on /journal", () => {
    const nodes = parseJsonLd(routeHtml("/journal"));
    expect(typesOf(nodes)).toEqual(["Blog", "BreadcrumbList"]);
    const blog = nodes[0] as { name: string };
    expect(blog.name).toBe("The High-End Edition");
    const crumbs = nodes[1] as {
      itemListElement: Array<{
        position: number;
        name: string;
        item: string;
      }>;
    };
    expect(crumbs.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://katherinetaylorescort.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: "https://katherinetaylorescort.com/journal",
      },
    ]);
  });

  it("keeps one Article per essay, points author.url at /about, and adds breadcrumbs", () => {
    for (const essay of essays) {
      const nodes = parseJsonLd(routeHtml(`/journal/${essay.slug}`));
      expect(typesOf(nodes), essay.slug).toEqual(["Article", "BreadcrumbList"]);
      const article = nodes[0] as {
        headline: string;
        author: { "@type": string; name: string; url: string };
      };
      expect(article.headline).toBe(essay.title);
      expect(article.author).toEqual({
        "@type": "Person",
        name: "Katherine Taylor",
        url: "https://katherinetaylorescort.com/about",
      });
      expect(article.author).not.toHaveProperty("sameAs");
      const crumbs = nodes[1] as {
        itemListElement: Array<{ name: string; item: string }>;
      };
      expect(crumbs.itemListElement.map((item) => item.name)).toEqual([
        "Home",
        "Journal",
        essay.title,
      ]);
      expect(crumbs.itemListElement[2]?.item).toBe(
        `https://katherinetaylorescort.com/journal/${essay.slug}`,
      );
    }
  });

  it("points the Sacramento Article author at /about without adding a new schema type", () => {
    const nodes = parseJsonLd(routeHtml("/sacramento-escorts"));
    expect(typesOf(nodes)).toEqual(["Article"]);
    const article = nodes[0] as {
      author: { url: string; name: string; jobTitle: string };
    };
    expect(article.author.name).toBe("Katherine Taylor");
    expect(article.author.jobTitle).toBe("Luxury Companion");
    expect(article.author.url).toBe("https://katherinetaylorescort.com/about");
  });

  it("leaves film VideoObject graphs unchanged and does not add ProfilePage or breadcrumbs elsewhere", () => {
    const breadcrumbPaths = new Set([
      "/journal",
      ...essays.map((essay) => `/journal/${essay.slug}`),
    ]);

    for (const route of getPrerenderRoutes()) {
      const nodes = parseJsonLd(applyRouteHead(indexHtml, route));
      const types = typesOf(nodes);
      expect(types.filter((type) => type === "ProfilePage")).toHaveLength(
        route.path === "/about" ? 1 : 0,
      );
      expect(types.filter((type) => type === "BreadcrumbList")).toHaveLength(
        breadcrumbPaths.has(route.path) ? 1 : 0,
      );
      expect(types.filter((type) => type === "Article")).toHaveLength(
        route.path === "/sacramento-escorts" ||
          route.path.startsWith("/journal/")
          ? 1
          : 0,
      );
      for (const type of types) {
        expect(FORBIDDEN_SCHEMA_TYPES.has(type), `${route.path} ${type}`).toBe(
          false,
        );
      }
    }

    expect(typesOf(parseJsonLd(routeHtml("/film/a-brief-interruption")))).toEqual(
      ["VideoObject"],
    );
    expect(typesOf(parseJsonLd(routeHtml("/film/please-stand-by")))).toEqual([
      "VideoObject",
    ]);
  });
});
