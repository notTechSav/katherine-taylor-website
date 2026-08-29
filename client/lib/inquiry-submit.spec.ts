import { describe, expect, it, vi } from "vitest";
import { EMPTY_INQUIRY, INQUIRY_ENDPOINT } from "@shared/inquiry";
import { postInquiryJson, submitInquiryFromForm } from "./inquiry-submit";

const sample = {
  ...EMPTY_INQUIRY,
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "415-555-0100",
  preferredDate: "March 15",
  duration: "2-hours",
  location: "san-francisco",
  referral: "a friend",
  message: "Hello from a test handler",
};

describe("JavaScript inquiry submission", () => {
  it("prevents native submit and posts the existing JSON payload", async () => {
    const preventDefault = vi.fn();
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true });

    const response = await submitInquiryFromForm(
      { preventDefault },
      sample,
      fetchImpl as unknown as typeof fetch,
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ ok: true });

    const [url, init] = fetchImpl.mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toBe(INQUIRY_ENDPOINT);
    expect(url).toBe("/api/inquiry");
    expect(String(url)).not.toContain("?");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(String(init.body))).toEqual(sample);
  });

  it("does not append inquiry field values to the request URL", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true });

    await postInquiryJson(sample, fetchImpl as unknown as typeof fetch);

    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/inquiry");
    expect(url).not.toMatch(/Ada|Lovelace|ada@example\.com|415-555-0100|Hello/);
    expect(String(init.body)).toContain("ada@example.com");
  });
});
