import { afterEach, describe, expect, it, vi } from "vitest";
import {
  EMPTY_INQUIRY,
  handleInquiryPostRequest,
  INQUIRY_DELIVERY_MESSAGE,
  INQUIRY_SUCCESS_MESSAGE,
} from "./inquiry";
import {
  createResendInquiryDeliver,
  formatInquiryPlainText,
  RESEND_EMAILS_URL,
} from "./inquiry-delivery";

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

const env = {
  RESEND_API_KEY: "test-resend-key",
  INQUIRY_TO_EMAIL: "inbox@example.test",
  INQUIRY_FROM_EMAIL: "website@example.test",
};

const privateTokens = [
  sample.name,
  sample.email,
  sample.phone,
  sample.message,
  env.RESEND_API_KEY,
];

function jsonRequest(body: unknown) {
  return new Request("https://katherinetaylorescort.com/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function capturedLogs(): { logs: string[]; restore: () => void } {
  const logs: string[] = [];
  const capture = (...args: unknown[]) => {
    logs.push(args.map((value) => String(value)).join(" "));
  };
  const logSpy = vi.spyOn(console, "log").mockImplementation(capture);
  const errorSpy = vi.spyOn(console, "error").mockImplementation(capture);
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(capture);
  return {
    logs,
    restore() {
      logSpy.mockRestore();
      errorSpy.mockRestore();
      warnSpy.mockRestore();
    },
  };
}

describe("Resend inquiry delivery", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("sends the complete inquiry once and returns the provider receipt", async () => {
    const now = 1_700_000_000_000;
    vi.spyOn(Date, "now").mockReturnValue(now);
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(jsonResponse(200, { id: "email_resend_1" }));
    const capture = capturedLogs();

    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver(env, fetchImpl as unknown as typeof fetch),
    );

    expect(response.status).toBe(200);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(RESEND_EMAILS_URL);
    const headers = new Headers(init.headers);
    expect(headers.get("Authorization")).toBe(`Bearer ${env.RESEND_API_KEY}`);
    expect(headers.get("Idempotency-Key")).toBe(`INQ-${now}`);
    expect(headers.get("Content-Type")).toBe("application/json");
    expect(JSON.stringify(Object.fromEntries(headers.entries()))).not.toContain(
      sample.email,
    );

    const payload = JSON.parse(String(init.body)) as {
      from: string;
      to: string[];
      reply_to: string;
      subject: string;
      text: string;
    };
    expect(payload.from).toBe(env.INQUIRY_FROM_EMAIL);
    expect(payload.to).toEqual([env.INQUIRY_TO_EMAIL]);
    expect(payload.reply_to).toBe(sample.email);
    expect(payload.subject).toBe(`Inquiry INQ-${now}`);
    expect(payload.subject).not.toContain(sample.email);
    expect(payload.text).toBe(formatInquiryPlainText(sample, `INQ-${now}`));
    expect(payload.text).toContain(sample.name);
    expect(payload.text).toContain(sample.email);
    expect(payload.text).toContain(sample.phone);
    expect(payload.text).toContain(sample.preferredDate);
    expect(payload.text).toContain(sample.duration);
    expect(payload.text).toContain(sample.location);
    expect(payload.text).toContain(sample.referral);
    expect(payload.text).toContain(sample.message);

    const body = await response.json();
    expect(body).toEqual({
      success: true,
      confirmationNumber: `INQ-${now}`,
      receiptId: "email_resend_1",
      message: INQUIRY_SUCCESS_MESSAGE,
    });

    const joined = capture.logs.join("\n");
    expect(joined).toContain("inquiry_delivery_ok");
    expect(joined).toContain("email_resend_1");
    for (const token of [sample.name, sample.email, sample.phone, sample.message]) {
      expect(joined).not.toContain(token);
    }
    capture.restore();
  });

  it("returns non-2xx when the provider responds with a non-2xx status", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(500, {
        error: sample.email,
        message: sample.message,
      }),
    );
    const capture = capturedLogs();

    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver(env, fetchImpl as unknown as typeof fetch),
    );

    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });
    const serialized = `${JSON.stringify(body)}\n${capture.logs.join("\n")}`;
    for (const token of privateTokens) {
      expect(serialized).not.toContain(token);
    }
    capture.restore();
  });

  it("returns non-2xx when the provider fetch is aborted or rejects", async () => {
    const timeoutFetch = vi.fn().mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          });
        }),
    );

    const timeoutResponse = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver(
        env,
        timeoutFetch as unknown as typeof fetch,
        20,
      ),
    );
    expect(timeoutResponse.status).toBe(502);
    expect(await timeoutResponse.json()).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });

    const networkFetch = vi.fn().mockRejectedValue(new Error("network down"));
    const networkResponse = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver(env, networkFetch as unknown as typeof fetch),
    );
    expect(networkResponse.status).toBe(502);
    expect(await networkResponse.json()).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });
  });

  it("returns non-2xx when the provider 2xx response has no email ID", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, {}));
    const response = await handleInquiryPostRequest(
      jsonRequest(sample),
      createResendInquiryDeliver(env, fetchImpl as unknown as typeof fetch),
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      success: false,
      message: INQUIRY_DELIVERY_MESSAGE,
    });
  });
});
