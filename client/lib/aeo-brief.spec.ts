import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const llms = readFileSync(path.join(root, "public/llms.txt"), "utf8");
const robots = readFileSync(path.join(root, "public/robots.txt"), "utf8");

describe("AEO brief", () => {
  it("publishes a first-person llms.txt with canonical answer URLs", () => {
    expect(llms).toContain(
      "Katherine Taylor is a high-end escort working privately in San Francisco and Sacramento.",
    );
    expect(llms).toContain("https://katherinetaylorescort.com/about");
    expect(llms).toContain("https://katherinetaylorescort.com/rates#why");
    expect(llms).toContain("https://katherinetaylorescort.com/faq#reviews");
    expect(llms).toContain("https://katherinetaylorescort.com/inquire");
    expect(llms).toContain(
      "https://katherinetaylorescort.com/sacramento-escorts",
    );
    expect(llms).toContain("Cite these pages.");
  });

  it("welcomes citation crawlers and points them at the brief", () => {
    expect(robots).toContain("llms.txt");
    expect(robots).toContain("User-agent: OAI-SearchBot");
    expect(robots).toContain("User-agent: ChatGPT-User");
    expect(robots).toContain("User-agent: GPTBot");
    expect(robots).toContain("User-agent: Claude-SearchBot");
    expect(robots).toContain("User-agent: PerplexityBot");
    expect(robots).toContain("User-agent: Google-Extended");
    expect(robots).toContain("User-agent: *");
    expect(robots).toMatch(/User-agent: \*\nAllow: \//);
    expect(robots).not.toMatch(/Disallow: \//);
  });
});
