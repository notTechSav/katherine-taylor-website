import { describe, expect, it, vi } from "vitest";
import {
  EMPTY_INQUIRY,
  handleInquiryPostRequest,
  INQUIRY_CONFIG_MESSAGE,
  INQUIRY_DELIVERY_MESSAGE,
  INQUIRY_FIELD_MAX_LENGTHS,
  INQUIRY_INVALID_BODY_MESSAGE,
  INQUIRY_REQUIRED_FIELDS,
  INQUIRY_SUCCESS_MESSAGE,
  INQUIRY_VALIDATION_MESSAGE,
  normalizeInquiryInput,
  parseInquiryRequestBody,
  processInquiry,
  type InquiryDeliveryReceipt,
} from "./inquiry";
import { createResendInquiryDeliver } from "./inquiry-delivery";

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

const receipt: InquiryDeliveryReceipt = {
  provider: "resend",
  id: "email_test_receipt",
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

function resolvingDeliver(id = receipt.id) {
  return vi.fn().mockResolvedValue({ provider: "resend", id });
}

describe("inquiry payload normalization", () => {
  it("maps JSON and urlencoded bodies to the same trimmed record", () => {
    const jsonRaw = parseInquiryRequestBody(
      "application/json; charset=utf-8",
      JSON.stringify({
        ...sample,
        name: "  Ada Lovelace  ",
        email: " ada@example.com ",
      }),
    );
    const encodedRaw = parseInquiryRequestBody(
      "application/x-www-form-urlencoded; charset=UTF-8",
      new URLSearchParams({
        ...sample,
        name: "  Ada Lovelace  ",
        email: " ada@example.com ",
      }).toString(),
    );

    expect(normalizeInquiryInput(jsonRaw)).toEqual(sample);
    expect(normalizeInquiryInput(encodedRaw)).toEqual(
      normalizeInquiryInput(jsonRaw),
    );
  });

  it("runs the same validation once and dispatches at most once", async () => {
    const deliverValid = resolvingDeliver();
    const valid = await processInquiry(sample, deliverValid);
    expect(valid.ok).toBe(true);
    expect(deliverValid).toHaveBeenCalledTimes(1);
    expect(deliverValid.mock.calls[0][0]).toEqual(sample);

    const deliverInvalid = resolvingDeliver();
    const invalid = await processInquiry(
      { ...sample, name: "", email: "" },
      deliverInvalid,
    );
    expect(invalid).toEqual({
      ok: false,
      status: 400,
      message: INQUIRY_VALIDATION_MESSAGE,
    });
    expect(deliverInvalid).not.toHaveBeenCalled();
  });
});

describe("inquiry POST handler", () => {
  it("accepts valid JSON, awaits delivery once, and returns receipt-backed success", async () => {
    let finish!: (value: InquiryDeliveryReceipt) => void;
    const deliver = vi.fn(
      () =>
        new Promise<InquiryDeliveryReceipt>((resolve) => {
          finish = resolve;
        }),
    );

    const pending = handleInquiryPostRequest(jsonRequest(sample), deliver);
    let settled = false;
    const tracked = pending.then((response) => {
      settled = true;
      return response;
    });

    await vi.waitFor(() => expect(deliver).toHaveBeenCalledTimes(1));
    expect(settled).toBe(false);
    expect(deliver).toHaveBeenCalledWith(sample, expect.stringMatching(/^INQ-\d+$/));

    finish(receipt);
    const response = await tracked;
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
      success: true,
      confirmationNumber: expect.stringMatching(/^INQ-\d+$/),
      receiptId: receipt.id,
      message: INQUIRY_SUCCESS_MESSAGE,
    });
  });

  it("accepts valid URL-encoded submission through the same awaited delivery path", async () => {
    const deliver = resolvingDeliver();
    const response = await handleInquiryPostRequest(
      urlencodedRequest(sample),
      deliver,
    );

    expect(response.status).toBe(200);
    expect(deliver).toHaveBeenCalledTimes(1);
    expect(deliver.mock.calls[0][0]).toEqual(sample);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.receiptId).toBe(receipt.id);
    expect(body.confirmationNumber).toMatch(/^INQ-\d+$/);
    expect(body.message).toBe(INQUIRY_SUCCESS_MESSAGE);
  });

  it.each(INQUIRY_REQUIRED_FIELDS)(
    "rejects a missing %s with 400 and never calls delivery",
    async (field) => {
      const deliver = resolvingDeliver();
      const response = await handleInquiryPostRequest(
        jsonRequest({ ...sample, [field]: "" }),
        deliver,
      );

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        success: false,
        message: INQUIRY_VALIDATION_MESSAGE,
      });
      expect(deliver).not.toHaveBeenCalled();
    },
  );

  it("rejects whitespace-only required fields", async () => {
    const deliver = resolvingDeliver();
    const response = await handleInquiryPostRequest(
      jsonRequest({
        ...sample,
        name: "   ",
        email: "\t",
        duration: " ",
        location: "\n",
        message: "  ",
      }),
      deliver,
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_VALIDATION_MESSAGE,
    });
    expect(deliver).not.toHaveBeenCalled();
  });

  it("rejects an invalid email", async () => {
    const deliver = resolvingDeliver();
    const response = await handleInquiryPostRequest(
      jsonRequest({ ...sample, email: "not-an-email" }),
      deliver,
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_VALIDATION_MESSAGE,
    });
    expect(deliver).not.toHaveBeenCalled();
  });

  it("rejects oversized fields", async () => {
    const deliver = resolvingDeliver();

    for (const [field, max] of Object.entries(INQUIRY_FIELD_MAX_LENGTHS)) {
      const oversized = {
        ...sample,
        email: field === "email" ? `${"a".repeat(max)}@x.io` : sample.email,
        [field]: "x".repeat(max + 1),
      };
      const response = await handleInquiryPostRequest(
        jsonRequest(oversized),
        deliver,
      );
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({
        success: false,
        message: INQUIRY_VALIDATION_MESSAGE,
      });
    }

    expect(deliver).not.toHaveBeenCalled();
  });

  it("rejects invalid JSON without dispatching", async () => {
    const deliver = resolvingDeliver();
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

  it("rejects unsupported content types as invalid bodies", async () => {
    const deliver = resolvingDeliver();
    const response = await handleInquiryPostRequest(
      new Request("https://katherinetaylorescort.com/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "name=Ada",
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

  it("returns non-2xx when runtime delivery configuration is missing", async () => {
    const fetchImpl = vi.fn();
    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver({}, fetchImpl as unknown as typeof fetch),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_CONFIG_MESSAGE,
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("returns non-2xx when delivery resolves without a provider email ID", async () => {
    const deliver = vi.fn().mockResolvedValue({ provider: "resend", id: "" });
    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      deliver,
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });
  });

  it("cannot return HTTP 200 when asynchronous delivery rejects", async () => {
    const deliver = vi.fn(
      () =>
        new Promise<InquiryDeliveryReceipt>((_resolve, reject) => {
          setTimeout(() => reject(new Error("provider down")), 15);
        }),
    );

    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      deliver,
    );

    expect(response.status).not.toBe(200);
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });
    expect(body.message).not.toBe(INQUIRY_INVALID_BODY_MESSAGE);
  });

  it("does not echo submitted values into URLs, error payloads, or logs", async () => {
    const logs: string[] = [];
    const capture = (...args: unknown[]) => {
      logs.push(args.map((value) => String(value)).join(" "));
    };
    const logSpy = vi.spyOn(console, "log").mockImplementation(capture);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(capture);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(capture);

    const secrets = [
      "secret-name-value",
      "secret.inquiry@private.test",
      "SECRET-PHONE-999",
      "SECRET-MESSAGE-BODY",
    ];
    const deliver = resolvingDeliver();
    const response = await handleInquiryPostRequest(
      urlencodedRequest({
        name: "",
        email: "secret.inquiry@private.test",
        phone: "SECRET-PHONE-999",
        message: "SECRET-MESSAGE-BODY",
        duration: "",
        location: "",
        referral: "secret-name-value",
        preferredDate: "",
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
    const serialized = `${JSON.stringify(body)}\n${logs.join("\n")}`;
    for (const secret of secrets) {
      expect(serialized).not.toContain(secret);
    }
    expect(deliver).not.toHaveBeenCalled();

    logSpy.mockRestore();
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });
});
