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

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

const requiredRoutes: { path: string; h1: string }[] = [
  { path: "/", h1: "Katherine Taylor Escort" },
  { path: "/about", h1: "About Katherine Taylor" },
  { path: "/gallery", h1: "Private Collections" },
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
});
