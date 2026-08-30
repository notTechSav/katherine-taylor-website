import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { homeJsonLd } from "./home-json-ld";
import { applyRouteBody } from "./route-body";
import { applyRouteHead, getPrerenderRoutes } from "./route-head";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "./site-config";

const ROOT = process.cwd();
const indexHtml = readFileSync(path.join(ROOT, "index.html"), "utf8");

const SOURCE_DIRS = ["client", "server", "shared", "functions", "public"];
const SOURCE_FILES = [
  "index.html",
  "wrangler.toml",
  ".env.example",
  "CLOUDFLARE.md",
];
const SKIP_DIR_NAMES = new Set([
  "node_modules",
  "dist",
  ".wrangler",
  ".git",
]);
const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".html",
  ".md",
  ".json",
  ".toml",
  ".txt",
  ".xml",
  ".css",
  ".svg",
]);

const RETIRED_ADDRESSES = [
  "inquiries@katherinetaylor.com",
  "inquiries@katherinetaylorescort.com",
  "contact@katherinetaylor.com",
  "contact@katherinetaylorescort.com",
  "hello@katherinetaylor.com",
  "hello@katherinetaylorescort.com",
  "booking@katherinetaylor.com",
  "booking@katherinetaylorescort.com",
  "reserve@katherinetaylor.com",
  "reserve@katherinetaylorescort.com",
];

const THIS_SPEC = path.join(ROOT, "client/lib/contact-email.spec.ts");

function walkFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIR_NAMES.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkFiles(full, files);
      continue;
    }
    if (full === THIS_SPEC) continue;
    if (!SOURCE_EXTENSIONS.has(path.extname(entry))) continue;
    files.push(full);
  }
  return files;
}

function firstPartyFiles(): string[] {
  const files = SOURCE_FILES.map((relative) => path.join(ROOT, relative)).filter(
    (file) => {
      try {
        return statSync(file).isFile();
      } catch {
        return false;
      }
    },
  );
  for (const dir of SOURCE_DIRS) {
    walkFiles(path.join(ROOT, dir), files);
  }
  return files;
}

function renderRoute(routePath: string): string {
  const route = getPrerenderRoutes().find((entry) => entry.path === routePath);
  if (!route) throw new Error(`missing route ${routePath}`);
  return applyRouteBody(applyRouteHead(indexHtml, route), route.path);
}

describe("public contact email", () => {
  it("keeps the official address as the only public Katherine Taylor mailbox", () => {
    expect(CONTACT_EMAIL).toBe("private@katherinetaylorescort.com");
    expect(CONTACT_MAILTO).toBe("mailto:private@katherinetaylorescort.com");
  });

  it("publishes that address on the existing Person schema", () => {
    const person = homeJsonLd.find((node) => node["@type"] === "Person");
    expect(person?.email).toBe(CONTACT_EMAIL);
    expect(JSON.stringify(person)).not.toContain("mailto:");
  });

  it("exposes one mailto in the site footer and no retired addresses", () => {
    const html = renderRoute("/inquire");
    expect(html).toContain(`href="${CONTACT_MAILTO}"`);
    expect(html).toContain(CONTACT_EMAIL);
    expect(html.match(/mailto:/g)?.length).toBe(1);
    for (const address of RETIRED_ADDRESSES) {
      expect(html).not.toContain(address);
    }
  });

  it("does not reintroduce retired Katherine Taylor contact addresses", () => {
    const retired = RETIRED_ADDRESSES.map((address) => address.toLowerCase());
    const ktEscortEmail = /[a-z0-9._%+-]+@katherinetaylorescort\.com/gi;
    const ktLegacyEmail = /[a-z0-9._%+-]+@katherinetaylor\.com/gi;
    const mailto = /mailto:([^?"'\s>]+)/gi;

    for (const file of firstPartyFiles()) {
      const text = readFileSync(file, "utf8");
      const lower = text.toLowerCase();
      const relative = path.relative(ROOT, file);

      for (const address of retired) {
        expect(lower, relative).not.toContain(address);
      }

      for (const match of text.matchAll(ktEscortEmail)) {
        expect(match[0].toLowerCase(), relative).toBe(CONTACT_EMAIL);
      }

      expect(text.match(ktLegacyEmail), relative).toBeNull();

      for (const match of text.matchAll(mailto)) {
        const href = match[1].toLowerCase();
        if (
          href.endsWith("@katherinetaylorescort.com") ||
          href.endsWith("@katherinetaylor.com")
        ) {
          expect(href, relative).toBe(CONTACT_EMAIL);
        }
      }
    }
  });
});
