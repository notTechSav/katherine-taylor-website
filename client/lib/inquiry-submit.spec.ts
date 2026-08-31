import { describe, expect, it, vi } from "vitest";
import { EMPTY_INQUIRY, INQUIRY_ENDPOINT } from "@shared/inquiry";
import {
  postInquiryJson,
  readInquirySubmitResult,
  submitInquiryFromForm,
} from "./inquiry-submit";

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

const verifiedBody = {
  success: true,
  confirmationNumber: "INQ-1700000000000",
  receiptId: "email_client_receipt",
  message: "Your inquiry has been received.",
};

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("JavaScript inquiry submission", () => {
  it("prevents native submit and posts the existing JSON payload", async () => {
    const preventDefault = vi.fn();
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, verifiedBody));

    const result = await submitInquiryFromForm(
      { preventDefault },
      sample,
      fetchImpl as unknown as typeof fetch,
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      confirmationNumber: verifiedBody.confirmationNumber,
      receiptId: verifiedBody.receiptId,
    });

    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(INQUIRY_ENDPOINT);
    expect(url).toBe("/api/inquiry");
    expect(String(url)).not.toContain("?");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(String(init.body))).toEqual(sample);
  });

  it("does not append inquiry field values to the request URL", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, verifiedBody));

    await postInquiryJson(sample, fetchImpl as unknown as typeof fetch);

    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/inquiry");
    expect(url).not.toMatch(/Ada|Lovelace|ada@example\.com|415-555-0100|Hello/);
    expect(String(init.body)).toContain("ada@example.com");
  });

  it("rejects HTTP 200 with success:false", async () => {
    await expect(
      readInquirySubmitResult(
        jsonResponse(200, {
          success: false,
          confirmationNumber: "INQ-1",
          receiptId: "email_1",
          message: sample.message,
        }),
      ),
    ).rejects.toThrow("Submission failed");
  });

  it("rejects HTTP 200 with a missing confirmation number or receipt ID", async () => {
    await expect(
      readInquirySubmitResult(
        jsonResponse(200, {
          success: true,
          receiptId: "email_1",
          message: "Your inquiry has been received.",
        }),
      ),
    ).rejects.toThrow("Submission failed");

    await expect(
      readInquirySubmitResult(
        jsonResponse(200, {
          success: true,
          confirmationNumber: "INQ-1",
          message: "Your inquiry has been received.",
        }),
      ),
    ).rejects.toThrow("Submission failed");

    await expect(
      readInquirySubmitResult(
        jsonResponse(200, {
          success: true,
          confirmationNumber: "   ",
          receiptId: "email_1",
        }),
      ),
    ).rejects.toThrow("Submission failed");
  });

  it("accepts only the verified success shape", async () => {
    await expect(
      readInquirySubmitResult(jsonResponse(200, verifiedBody)),
    ).resolves.toEqual({
      confirmationNumber: verifiedBody.confirmationNumber,
      receiptId: verifiedBody.receiptId,
    });

    await expect(
      readInquirySubmitResult(
        jsonResponse(502, {
          success: true,
          confirmationNumber: "INQ-1",
          receiptId: "email_1",
        }),
      ),
    ).rejects.toThrow("Submission failed");

    await expect(
      readInquirySubmitResult(new Response("not-json", { status: 200 })),
    ).rejects.toThrow("Submission failed");
  });
});
