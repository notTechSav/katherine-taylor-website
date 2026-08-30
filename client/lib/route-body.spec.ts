import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  applyRouteBody,
  htmlHidesPrerenderRoot,
  renderRouteBodyInner,
} from "./route-body";
import {
  applyRouteHead,
  getPrerenderRoutes,
  notFoundHead,
} from "./route-head";
import { essays } from "./journal-content";
import { pageSeo } from "./page-seo";
import { sitePageList } from "./site-pages";

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

const requiredRoutes: { path: string; h1: string }[] = [
  { path: "/", h1: "Katherine Taylor Escort" },
  { path: "/about", h1: "About Katherine Taylor" },
  { path: "/gallery", h1: "Private Collections" },
  { path: "/film/a-brief-interruption", h1: "A Brief Interruption" },
  { path: "/rates", h1: "Rates" },
  { path: "/gifts", h1: "Gifts" },
  { path: "/faq", h1: "Frequently Asked Questions" },
  { path: "/inquire", h1: "Inquire" },
  { path: "/journal", h1: "The High-End Edition" },
  { path: "/journal/memoirs-in-the-city", h1: "Memoirs in the City" },
  { path: "/journal/continuity-as-craft", h1: "Continuity as Craft" },
  { path: "/journal/the-luxury-of-unsaid-things", h1: "The Luxury of Unsaid Things" },
  { path: "/journal/scarcity-discipline", h1: "Scarcity Discipline" },
  { path: "/sacramento-escorts", h1: "Escorts Near Me | The High-End Edition" },
];

function renderRoute(pathName: string): string {
  const route = getPrerenderRoutes().find((entry) => entry.path === pathName);
  if (!route) throw new Error(`missing route ${pathName}`);
  return applyRouteBody(applyRouteHead(indexHtml, route), route.path);
}

function landmarkParts(html: string) {
  const opens = html.match(/<main\b/gi) ?? [];
  const openMatch = html.match(/<main\b[^>]*>/i);
  const closeIndex = html.lastIndexOf("</main>");
  const openIndex = openMatch ? html.indexOf(openMatch[0]) : -1;
  return {
    mainCount: opens.length,
    before: openIndex >= 0 ? html.slice(0, openIndex) : html,
    inner:
      openMatch && closeIndex >= 0
        ? html.slice(openIndex + openMatch[0].length, closeIndex)
        : "",
    after: closeIndex >= 0 ? html.slice(closeIndex + "</main>".length) : "",
  };
}

describe("prerender route bodies", () => {
  it("covers every required indexable route with its H1", () => {
    for (const { path: routePath, h1 } of requiredRoutes) {
      const html = renderRouteBodyInner(routePath);
      const h1Text = html
        .match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
        ?.replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#x27;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
      expect(h1Text, `${routePath} missing H1`).toBe(h1);
    }
  });

  it("puts route bodies inside the root markers without changing head metadata", () => {
    const html = renderRoute("/about");
    expect(html).toContain('<div id="root">');
    expect(html).toContain('id="prerender-root"');
    expect(html).toMatch(/<h1[^>]*>About Katherine Taylor<\/h1>/);
    expect(html).toContain(`<title data-rh="true">${pageSeo.about.title}</title>`);
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/about"',
    );
  });

  it("keeps Sacramento long-form copy in a native details element", () => {
    const html = renderRoute("/sacramento-escorts");
    expect(html).toMatch(
      /<h1[^>]*>Escorts Near Me \| The High-End Edition<\/h1>/,
    );
    expect(html).toContain("<details");
    expect(html).toContain("like to hear this story");
    expect(html).toContain("People travel for people.");
    expect(html).toContain("The Right Person Is Not Always the Nearest Person");
    expect(html).toContain(pageSeo.sacramento.title);
    expect(html).toContain(
      'rel="canonical" href="https://katherinetaylorescort.com/sacramento-escorts"',
    );
  });

  it("embeds journal article bodies before JavaScript", () => {
    const memoir = essays.find((essay) => essay.slug === "memoirs-in-the-city");
    if (!memoir) throw new Error("missing memoir");
    const html = renderRoute("/journal/memoirs-in-the-city");
    expect(html).toMatch(/<h1[^>]*>Memoirs in the City<\/h1>/);
    expect(html).toContain("Searching for Katherine Taylor in San Francisco");
    expect(html).toContain(memoir.seo?.title);
  });

  it("exposes primary internal links on public routes", () => {
    const home = renderRoute("/");
    expect(home).toContain('href="/about"');
    expect(home).toContain('href="/rates"');
    expect(home).toContain('href="/sacramento-escorts"');

    const journal = renderRoute("/journal");
    expect(journal).toMatch(/<h1[^>]*>The High-End Edition<\/h1>/);
    for (const essay of essays) {
      expect(journal).toContain(`href="/journal/${essay.slug}"`);
      expect(journal).toContain(`aria-label="Read quietly: ${essay.title}"`);
    }
    const buttons = journal.match(/<button\b[\s\S]*?<\/button>/g) ?? [];
    expect(buttons.some((button) => button.includes("Read quietly"))).toBe(
      false,
    );
    expect(journal).toContain("<a");
    expect(journal).toContain('href="/gallery"');
  });

  it("does not index the 404 shell and still includes branded copy", () => {
    const html = applyRouteBody(
      applyRouteHead(indexHtml, notFoundHead),
      notFoundHead.path,
    );
    expect(html).toContain('name="robots" content="noindex, nofollow"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).toMatch(/<h1[^>]*>404<\/h1>/);
  });

  it("does not hide the prerendered body before React mounts", () => {
    expect(htmlHidesPrerenderRoot(indexHtml)).toBe(false);
    const about = renderRoute("/about");
    expect(htmlHidesPrerenderRoot(about)).toBe(false);
    expect(about).not.toContain("display: none !important");
    expect(about).not.toContain('classList.add("js")');
    expect(about).not.toMatch(/id="prerender-root"[^>]*aria-hidden/);
    expect(about).not.toMatch(/id="prerender-root"[^>]*inert/);
  });

  it("emits exactly one main landmark for each indexable route", () => {
    const indexablePaths = new Set(sitePageList.map((page) => page.path));
    expect(indexablePaths).toEqual(
      new Set(requiredRoutes.map((route) => route.path)),
    );

    for (const { path: routePath, h1 } of requiredRoutes) {
      const html = renderRoute(routePath);
      const parts = landmarkParts(html);
      expect(parts.mainCount, `${routePath} main count`).toBe(1);
      expect(html).not.toMatch(/role=["']main["']/i);
      expect(parts.before, `${routePath} site nav`).toMatch(
        /<nav\b[^>]*class="fixed top-0/,
      );
      expect(parts.inner).not.toMatch(/<nav\b[^>]*class="fixed top-0/);
      expect(parts.inner).not.toMatch(/<main\b/i);

      if (routePath === "/about") {
        expect(parts.before).toContain(h1);
        expect(parts.after).toMatch(/<footer\b/);
        continue;
      }

      expect(
        parts.inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "),
        `${routePath} H1 in main`,
      ).toContain(h1);
      if (routePath === "/") {
        expect(parts.inner).toMatch(/<footer\b/);
        continue;
      }

      expect(parts.after, `${routePath} footer outside main`).toMatch(
        /<footer\b/,
      );
      expect(parts.inner).not.toMatch(/role="contentinfo"/);
    }
  });

  it("inserts A Brief Interruption between Gallery and Gifts", () => {
    const gallery = renderRoute("/gallery");
    expect(gallery).toContain('href="/film/a-brief-interruption"');
    expect(gallery).toContain(">A Brief Interruption<");
    expect(gallery).not.toContain(">Browse Gifts<");

    const film = renderRoute("/film/a-brief-interruption");
    expect(film).toMatch(/<h1[^>]*>A Brief Interruption<\/h1>/);
    expect(film).toMatch(/<h2[^>]*>[\s\S]*A Word From Our Sponsors ↗[\s\S]*<\/h2>/);
    expect(film).toContain(
      'href="https://www.cigarsinternational.com/cigars.html"',
    );
    expect(film).toContain('rel="noopener noreferrer"');
    expect(film).not.toContain('rel="sponsored"');
    expect(film).toContain(
      'aria-label="A Word From Our Sponsors — Cigars International"',
    );
    expect(film).toContain('src="/film/a-brief-interruption.mp4"');
    expect(film).toContain('aria-label="Play audio"');
    expect(film).toContain('href="/gifts"');
    expect(film).toContain(">Gift Etiquette<");

    const footer = film.slice(film.lastIndexOf("<footer"));
    expect(footer).not.toContain("/film/a-brief-interruption");
  });

  it("does not add a main landmark to the 404 page", () => {
    const html = applyRouteBody(
      applyRouteHead(indexHtml, notFoundHead),
      notFoundHead.path,
    );
    expect(html.match(/<main\b/gi) ?? []).toHaveLength(0);
  });
});
