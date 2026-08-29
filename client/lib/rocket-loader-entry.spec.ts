import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  applicationModuleEntryTags,
  exemptModuleEntryFromRocketLoader,
  rocketLoaderEntryIssue,
} from "./rocket-loader-entry";
import { applyRouteBody } from "./route-body";
import {
  applyRouteHead,
  getPrerenderRoutes,
  notFoundHead,
} from "./route-head";

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

const distSpa = path.join(process.cwd(), "dist/spa");

function listHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...listHtmlFiles(full));
      continue;
    }
    if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function assertExemptEntry(html: string, label: string) {
  const issue = rocketLoaderEntryIssue(html);
  expect(issue, label).toBeNull();

  const [tag] = applicationModuleEntryTags(html);
  expect(tag, `${label} type=module`).toMatch(/\btype\s*=\s*["']module["']/i);
  expect(tag, `${label} not inlined`).toMatch(/\bsrc\s*=\s*["'][^"']+["']/i);

  const inlineModuleScripts = [
    ...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi),
  ].filter(
    (match) =>
      /\btype\s*=\s*["']module["']/i.test(match[1]) && match[2].trim().length > 0,
  );
  expect(inlineModuleScripts, `${label} must stay an external module`).toHaveLength(
    0,
  );
}

describe("Rocket Loader exemption for the Vite entry", () => {
  it("puts data-cfasync before src on the source application entry", () => {
    expect(indexHtml).toContain(
      '<script type="module" data-cfasync="false" src="/client/App.tsx"></script>',
    );
    assertExemptEntry(indexHtml, "source index.html");
    expect(applicationModuleEntryTags(indexHtml)).toHaveLength(1);
  });

  it("re-applies the exemption when Vite injects a hashed entry tag", () => {
    const viteEmitted = `<!doctype html>
<html>
  <head>
    <script type="module" crossorigin src="/assets/index-AbC123de.js"></script>
    <link rel="modulepreload" crossorigin href="/assets/vendor-react-XyZ789.js">
  </head>
  <body></body>
</html>`;
    const restored = exemptModuleEntryFromRocketLoader(viteEmitted);
    assertExemptEntry(restored, "vite-injected entry");
    expect(restored).toContain(
      '<script type="module" crossorigin data-cfasync="false" src="/assets/index-AbC123de.js"></script>',
    );
    expect(restored).toContain(
      '<link rel="modulepreload" crossorigin href="/assets/vendor-react-XyZ789.js">',
    );
    expect(applicationModuleEntryTags(restored)).toHaveLength(1);
  });

  it("fails when the exemption is missing, after src, or duplicated", () => {
    expect(
      rocketLoaderEntryIssue(
        '<script type="module" src="/assets/index-hash.js"></script>',
      ),
    ).toMatch(/missing data-cfasync/);
    expect(
      rocketLoaderEntryIssue(
        '<script type="module" src="/assets/index-hash.js" data-cfasync="false"></script>',
      ),
    ).toMatch(/after src/);
    expect(
      rocketLoaderEntryIssue(
        '<script type="module" data-cfasync="false" src="/assets/a.js"></script><script type="module" data-cfasync="false" src="/assets/b.js"></script>',
      ),
    ).toMatch(/exactly one/);
  });

  it("keeps the exemption on every prerendered route", () => {
    for (const route of getPrerenderRoutes()) {
      const html = applyRouteBody(applyRouteHead(indexHtml, route), route.path);
      assertExemptEntry(html, route.path);
      expect(html).toContain(
        '<script type="module" data-cfasync="false" src="/client/App.tsx"></script>',
      );
    }

    const notFound = applyRouteBody(
      applyRouteHead(indexHtml, notFoundHead),
      notFoundHead.path,
    );
    assertExemptEntry(notFound, "/404");
  });
});

describe("built HTML Rocket Loader exemption", () => {
  const hasDist = existsSync(path.join(distSpa, "index.html"));

  it.skipIf(!hasDist)(
    "keeps one exempt module entry on dist/spa and every route HTML file",
    () => {
      const files = listHtmlFiles(distSpa);
      expect(files.length).toBeGreaterThan(1);

      const home = readFileSync(path.join(distSpa, "index.html"), "utf8");
      assertExemptEntry(home, "dist/spa/index.html");
      expect(home).toMatch(/rel=["']modulepreload["']/);
      const [homeTag] = applicationModuleEntryTags(home);
      const homeSrc = homeTag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
      expect(homeSrc).toMatch(/^\/assets\/.+\.js$/);

      for (const file of files) {
        const html = readFileSync(file, "utf8");
        const label = path.relative(distSpa, file);
        assertExemptEntry(html, label);
        expect(html).toMatch(/rel=["']modulepreload["']/);
        const [tag] = applicationModuleEntryTags(html);
        expect(tag).toBe(homeTag);
      }
    },
  );
});
