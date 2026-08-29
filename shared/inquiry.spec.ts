import { describe, expect, it, vi } from "vitest";
import {
  EMPTY_INQUIRY,
  handleInquiryPostRequest,
  INQUIRY_INVALID_BODY_MESSAGE,
  INQUIRY_SUCCESS_MESSAGE,
  INQUIRY_VALIDATION_MESSAGE,
  normalizeInquiryInput,
  parseInquiryRequestBody,
  processInquiry,
} from "./inquiry";

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

function jsonRequest(body: unknown, extraHeaders?: HeadersInit) {
  return new Request("https://katherinetaylorescort.com/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(body),
  });
}

function urlencodedRequest(body: Record<string, string>) {
  return new Request("https://katherinetaylorescort.com/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  });
}

describe("inquiry payload normalization", () => {
  it("maps JSON and urlencoded bodies to the same record", () => {
    const jsonRaw = parseInquiryRequestBody(
      "application/json; charset=utf-8",
      JSON.stringify(sample),
    );
    const encodedRaw = parseInquiryRequestBody(
      "application/x-www-form-urlencoded; charset=UTF-8",
      new URLSearchParams(sample).toString(),
    );

    expect(normalizeInquiryInput(jsonRaw)).toEqual(sample);
    expect(normalizeInquiryInput(encodedRaw)).toEqual(
      normalizeInquiryInput(jsonRaw),
    );
  });

  it("runs the same validation once and dispatches at most once", () => {
    const deliverValid = vi.fn();
    const valid = processInquiry(sample, deliverValid);
    expect(valid.ok).toBe(true);
    expect(deliverValid).toHaveBeenCalledTimes(1);
    expect(deliverValid.mock.calls[0][0]).toEqual(sample);

    const deliverInvalid = vi.fn();
    const invalid = processInquiry(
      { ...sample, name: "", email: "" },
      deliverInvalid,
    );
    expect(invalid).toEqual({
      ok: false,
      message: INQUIRY_VALIDATION_MESSAGE,
    });
    expect(deliverInvalid).not.toHaveBeenCalled();
  });
});

describe("inquiry POST handler", () => {
  it("accepts JSON and urlencoded through one validation and delivery path", async () => {
    const jsonDeliver = vi.fn();
    const encodedDeliver = vi.fn();

    const jsonResponse = await handleInquiryPostRequest(
      jsonRequest(sample),
      jsonDeliver,
    );
    const encodedResponse = await handleInquiryPostRequest(
      urlencodedRequest(sample),
      encodedDeliver,
    );

    expect(jsonResponse.status).toBe(200);
    expect(encodedResponse.status).toBe(200);
    expect(jsonDeliver).toHaveBeenCalledTimes(1);
    expect(encodedDeliver).toHaveBeenCalledTimes(1);
    expect(jsonDeliver.mock.calls[0][0]).toEqual(encodedDeliver.mock.calls[0][0]);

    const jsonBody = await jsonResponse.json();
    const encodedBody = await encodedResponse.json();
    expect(jsonBody.success).toBe(true);
    expect(encodedBody.success).toBe(true);
    expect(jsonBody.message).toBe(INQUIRY_SUCCESS_MESSAGE);
    expect(encodedBody.message).toBe(INQUIRY_SUCCESS_MESSAGE);
    expect(jsonBody.confirmationNumber).toMatch(/^INQ-\d+$/);
  });

  it("does not echo submitted values into URLs or error payloads", async () => {
    const deliver = vi.fn();
    const response = await handleInquiryPostRequest(
      urlencodedRequest({
        name: "",
        email: "",
        message: "secret-test-value",
      }),
      deliver,
    );

    expect(response.status).toBe(400);
    expect(response.headers.get("location")).toBeNull();
    const body = await response.json();
    expect(body).toEqual({
      success: false,
      message: INQUIRY_VALIDATION_MESSAGE,
    });
    expect(JSON.stringify(body)).not.toContain("secret-test-value");
    expect(deliver).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON without dispatching", async () => {
    const deliver = vi.fn();
    const response = await handleInquiryPostRequest(
      new Request("https://katherinetaylorescort.com/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{not-json",
      }),
      deliver,
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_INVALID_BODY_MESSAGE,
    });
    expect(deliver).not.toHaveBeenCalled();
  });
});
