import { describe, expect, it } from "vitest";

import { getSectionAdjacent } from "./section-nav";
import { sitePageList } from "./site-pages";

describe("getSectionAdjacent", () => {
  it("does not give the homepage a back link", () => {
    expect(getSectionAdjacent("/").back).toBeUndefined();
    expect(getSectionAdjacent("/").next).toEqual({
      href: "/about",
      label: "About Katherine",
    });
  });

  it("preserves the existing next destinations", () => {
    expect(getSectionAdjacent("/about").next).toEqual({
      href: "/gallery",
      label: "Browse Gallery",
    });
    expect(getSectionAdjacent("/gallery").next).toEqual({
      href: "/film/a-brief-interruption",
      label: "A Brief Interruption",
    });
    expect(getSectionAdjacent("/film/a-brief-interruption").next).toEqual({
      href: "/gifts",
      label: "Gift Etiquette",
    });
    expect(getSectionAdjacent("/gifts").next).toEqual({
      href: "/faq",
      label: "Frequently Asked Questions",
    });
    expect(getSectionAdjacent("/faq").next).toEqual({
      href: "/film/please-stand-by",
      label: "Please Stand By",
    });
    expect(getSectionAdjacent("/film/please-stand-by").next).toEqual({
      href: "/inquire",
      label: "Private Inquiry",
    });
    expect(getSectionAdjacent("/rates").next).toEqual({
      href: "/gifts",
      label: "Browse Gifts",
    });
    expect(getSectionAdjacent("/journal").next).toEqual({
      href: "/gallery",
      label: "Browse Gallery",
    });
  });

  it("gives every inner indexable page a back link", () => {
    for (const page of sitePageList) {
      if (page.path === "/") continue;
      expect(getSectionAdjacent(page.path).back, page.path).toBeTruthy();
    }
  });

  it("returns journal articles to the journal index", () => {
    expect(
      getSectionAdjacent("/journal/memoirs-in-the-city").back,
    ).toEqual({ href: "/journal", label: "The Journal" });
  });
});
