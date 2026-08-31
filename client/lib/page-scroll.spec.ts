import { describe, expect, it } from "vitest";

import {
  getDocumentArrowState,
  getFullpageArrowState,
  nextDocumentScrollTop,
} from "./page-scroll";

describe("getFullpageArrowState", () => {
  it("hides both directions when there are no sections", () => {
    expect(
      getFullpageArrowState({
        index: 0,
        sectionCount: 0,
        footerRevealed: false,
        hasFooter: false,
      }),
    ).toEqual({ canGoUp: false, canGoDown: false });
  });

  it("hides up on the first slide and down only after the last slide", () => {
    expect(
      getFullpageArrowState({
        index: 0,
        sectionCount: 3,
        footerRevealed: false,
        hasFooter: true,
      }),
    ).toEqual({ canGoUp: false, canGoDown: true });

    expect(
      getFullpageArrowState({
        index: 1,
        sectionCount: 3,
        footerRevealed: false,
        hasFooter: true,
      }),
    ).toEqual({ canGoUp: true, canGoDown: true });

    expect(
      getFullpageArrowState({
        index: 2,
        sectionCount: 3,
        footerRevealed: false,
        hasFooter: true,
      }),
    ).toEqual({ canGoUp: true, canGoDown: true });

    expect(
      getFullpageArrowState({
        index: 2,
        sectionCount: 3,
        footerRevealed: true,
        hasFooter: true,
      }),
    ).toEqual({ canGoUp: true, canGoDown: false });
  });

  it("hides down on the last slide when there is no footer", () => {
    expect(
      getFullpageArrowState({
        index: 2,
        sectionCount: 3,
        footerRevealed: false,
        hasFooter: false,
      }),
    ).toEqual({ canGoUp: true, canGoDown: false });
  });
});

describe("getDocumentArrowState", () => {
  it("hides both arrows when the page does not scroll", () => {
    expect(getDocumentArrowState(0, 800, 800)).toEqual({
      canGoUp: false,
      canGoDown: false,
    });
  });

  it("hides up at the top and down at the bottom", () => {
    expect(getDocumentArrowState(0, 800, 2400)).toEqual({
      canGoUp: false,
      canGoDown: true,
    });
    expect(getDocumentArrowState(400, 800, 2400)).toEqual({
      canGoUp: true,
      canGoDown: true,
    });
    expect(getDocumentArrowState(1600, 800, 2400)).toEqual({
      canGoUp: true,
      canGoDown: false,
    });
  });
});

describe("nextDocumentScrollTop", () => {
  it("moves by a viewport step and clamps to the document ends", () => {
    expect(nextDocumentScrollTop(1, 0, 800, 3000)).toBe(736);
    expect(nextDocumentScrollTop(-1, 736, 800, 3000)).toBe(0);
    expect(nextDocumentScrollTop(1, 2100, 800, 3000)).toBe(2200);
    expect(nextDocumentScrollTop(-1, 0, 800, 3000)).toBe(0);
  });
});
