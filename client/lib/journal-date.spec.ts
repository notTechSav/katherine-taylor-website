import { describe, expect, it } from "vitest";
import { formatJournalPublishedDate, headingId } from "./journal-content";

describe("formatJournalPublishedDate", () => {
  it("keeps the calendar day of a date-only value", () => {
    expect(formatJournalPublishedDate("2026-08-20")).toBe("August 20, 2026");
  });

  it("does not shift a winter date", () => {
    expect(formatJournalPublishedDate("2025-01-01")).toBe("January 1, 2025");
  });

  it("returns the original string when the value is not date-only", () => {
    expect(formatJournalPublishedDate("unpublished")).toBe("unpublished");
  });
});

describe("headingId", () => {
  it("slugs memoir booking and press headings for citation fragments", () => {
    expect(headingId("How do I book a luxury companion in San Francisco?")).toBe(
      "how-do-i-book-a-luxury-companion-in-san-francisco",
    );
    expect(headingId("Screening Required")).toBe("screening-required");
    expect(headingId("I ♥ SF")).toBe("i-sf");
  });
});
