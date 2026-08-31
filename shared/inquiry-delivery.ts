import type {
  InquiryDeliver,
  InquiryDeliveryReceipt,
  InquiryPayload,
} from "./inquiry";

export const RESEND_EMAILS_URL = "https://api.resend.com/emails";
export const INQUIRY_DELIVERY_TIMEOUT_MS = 10_000;

export type InquiryDeliveryEnv = {
  RESEND_API_KEY?: string;
  INQUIRY_TO_EMAIL?: string;
  INQUIRY_FROM_EMAIL?: string;
};

export type InquiryDeliveryConfig = {
  apiKey: string;
  toEmail: string;
  fromEmail: string;
};

export class InquiryDeliveryConfigError extends Error {
  readonly kind = "configuration" as const;

  constructor() {
    super("configuration");
    this.name = "InquiryDeliveryConfigError";
  }
}

export class InquiryDeliveryProviderError extends Error {
  readonly kind = "provider" as const;

  constructor(readonly category: string) {
    super(category);
    this.name = "InquiryDeliveryProviderError";
  }
}

type DeliveryLogCategory =
  | "configuration"
  | "timeout"
  | "network"
  | "provider_http"
  | "provider_response";

function nonempty(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

export function readInquiryDeliveryConfig(
  env: InquiryDeliveryEnv,
): InquiryDeliveryConfig | null {
  const apiKey = nonempty(env.RESEND_API_KEY);
  const toEmail = nonempty(env.INQUIRY_TO_EMAIL);
  const fromEmail = nonempty(env.INQUIRY_FROM_EMAIL);
  if (!apiKey || !toEmail || !fromEmail) {
    return null;
  }
  return { apiKey, toEmail, fromEmail };
}

export function formatInquiryPlainText(
  data: InquiryPayload,
  confirmationNumber: string,
): string {
  return [
    "New website inquiry",
    "",
    `Confirmation number: ${confirmationNumber}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Preferred date: ${data.preferredDate}`,
    `Duration: ${data.duration}`,
    `Location: ${data.location}`,
    `Referral: ${data.referral}`,
    `Message: ${data.message}`,
  ].join("\n");
}

function logDeliveryOk(confirmationNumber: string, receiptId: string): void {
  console.log(
    JSON.stringify({
      event: "inquiry_delivery_ok",
      confirmationNumber,
      provider: "resend",
      receiptId,
    }),
  );
}

function logDeliveryFailure(
  confirmationNumber: string,
  category: DeliveryLogCategory,
): void {
  console.log(
    JSON.stringify({
      event: "inquiry_delivery_failed",
      confirmationNumber,
      provider: "resend",
      category,
    }),
  );
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "AbortError"
  );
}

export async function deliverInquiryViaResend(
  data: InquiryPayload,
  confirmationNumber: string,
  config: InquiryDeliveryConfig,
  fetchImpl: typeof fetch = fetch,
  timeoutMs: number = INQUIRY_DELIVERY_TIMEOUT_MS,
): Promise<InquiryDeliveryReceipt> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let response: Response;
    try {
      response = await fetchImpl(RESEND_EMAILS_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": confirmationNumber,
        },
        body: JSON.stringify({
          from: config.fromEmail,
          to: [config.toEmail],
          reply_to: data.email,
          subject: `Inquiry ${confirmationNumber}`,
          text: formatInquiryPlainText(data, confirmationNumber),
        }),
        signal: controller.signal,
      });
    } catch (error) {
      const category = isAbortError(error) ? "timeout" : "network";
      logDeliveryFailure(confirmationNumber, category);
      throw new InquiryDeliveryProviderError(category);
    }

    if (!response.ok) {
      logDeliveryFailure(confirmationNumber, "provider_http");
      throw new InquiryDeliveryProviderError("provider_http");
    }

    let parsed: unknown;
    try {
      parsed = await response.json();
    } catch {
      logDeliveryFailure(confirmationNumber, "provider_response");
      throw new InquiryDeliveryProviderError("provider_response");
    }

    const id =
      typeof parsed === "object" &&
      parsed !== null &&
      "id" in parsed &&
      typeof parsed.id === "string"
        ? parsed.id.trim()
        : "";

    if (!id) {
      logDeliveryFailure(confirmationNumber, "provider_response");
      throw new InquiryDeliveryProviderError("provider_response");
    }

    logDeliveryOk(confirmationNumber, id);
    return { provider: "resend", id };
  } finally {
    clearTimeout(timer);
  }
}

export function createResendInquiryDeliver(
  env: InquiryDeliveryEnv,
  fetchImpl: typeof fetch = fetch,
  timeoutMs: number = INQUIRY_DELIVERY_TIMEOUT_MS,
): InquiryDeliver {
  return async (data, confirmationNumber) => {
    const config = readInquiryDeliveryConfig(env);
    if (!config) {
      logDeliveryFailure(confirmationNumber, "configuration");
      throw new InquiryDeliveryConfigError();
    }

    return deliverInquiryViaResend(
      data,
      confirmationNumber,
      config,
      fetchImpl,
      timeoutMs,
    );
  };
}
