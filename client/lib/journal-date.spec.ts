import { describe, expect, it } from "vitest";
import { formatJournalPublishedDate } from "./journal-content";

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
