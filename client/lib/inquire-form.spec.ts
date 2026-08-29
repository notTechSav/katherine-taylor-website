import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import Inquire from "@/pages/Inquire";
import { applyRouteBody } from "./route-body";
import { applyRouteHead, getPrerenderRoutes } from "./route-head";

const indexHtml = readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8",
);

function renderPrerenderedInquire(): string {
  const route = getPrerenderRoutes().find((entry) => entry.path === "/inquire");
  if (!route) throw new Error("missing /inquire prerender route");
  return applyRouteBody(applyRouteHead(indexHtml, route), route.path);
}

function renderHydratedInquireForm(): string {
  return renderToStaticMarkup(
    createElement(HelmetProvider, null, createElement(Inquire)),
  );
}

function inquiryForm(html: string): string {
  const match = html.match(/<form\b[\s\S]*?<\/form>/i);
  if (!match) throw new Error("missing inquiry form");
  return match[0];
}

function namedControl(html: string, name: string): string {
  const match = html.match(
    new RegExp(`<(?:input|select|textarea)\\b[^>]*\\sname="${name}"[^>]*>`, "i"),
  );
  if (!match) throw new Error(`missing control name="${name}"`);
  return match[0];
}

function hasRequired(tag: string): boolean {
  return /\srequired(?:\s|\/|>|=)/i.test(tag);
}

function autocompleteOf(tag: string): string | null {
  return tag.match(/\sautocomplete="([^"]*)"/i)?.[1] ?? null;
}

function assertInquiryFormContract(html: string) {
  const form = inquiryForm(html);
  const formOpen = form.match(/<form\b[^>]*>/i)?.[0] ?? "";

  expect(formOpen).toMatch(/\smethod="post"/i);
  expect(formOpen).toMatch(/\saction="\/api\/inquiry"/i);
  expect(formOpen).not.toMatch(/\smethod=["']get["']/i);
  expect(formOpen).not.toMatch(/\saction=["']\/inquire["']/i);

  const name = namedControl(form, "name");
  const email = namedControl(form, "email");
  const phone = namedControl(form, "phone");
  const preferredDate = namedControl(form, "preferredDate");
  const duration = namedControl(form, "duration");
  const location = namedControl(form, "location");
  const referral = namedControl(form, "referral");
  const message = namedControl(form, "message");

  expect(hasRequired(name)).toBe(true);
  expect(hasRequired(email)).toBe(true);
  expect(hasRequired(phone)).toBe(false);
  expect(hasRequired(preferredDate)).toBe(false);
  expect(hasRequired(duration)).toBe(true);
  expect(hasRequired(location)).toBe(true);
  expect(hasRequired(referral)).toBe(false);
  expect(hasRequired(message)).toBe(true);

  expect(autocompleteOf(name)).toBe("name");
  expect(autocompleteOf(email)).toBe("email");
  expect(autocompleteOf(phone)).toBe("tel");
  expect(autocompleteOf(location)).toBeNull();
  expect(location).not.toMatch(
    /autocomplete="(?:street-address|address-line[12]|address-level[12]|postal-code|country)"/i,
  );
}

describe("inquiry form fallback", () => {
  it("declares POST /api/inquiry on the prerendered /inquire document", () => {
    const html = renderPrerenderedInquire();
    assertInquiryFormContract(html);
    expect(html).toContain('id="prerender-root"');
  });

  it("declares the same POST attributes on the hydrated Inquire form", () => {
    assertInquiryFormContract(renderHydratedInquireForm());
  });

  it("does not put inquiry field values on the form action URL", () => {
    const formOpen =
      inquiryForm(renderPrerenderedInquire()).match(/<form\b[^>]*>/i)?.[0] ?? "";
    expect(formOpen).toContain('action="/api/inquiry"');
    expect(formOpen).not.toMatch(/[?&](?:name|email|phone|message)=/i);
  });
});
