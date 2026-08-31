/**
 * Shared inquiry payload handling for the Inquire form.
 * JSON (JavaScript fetch) and urlencoded (native form POST) normalize into
 * the same record, then share one validation pass and one awaited delivery.
 */

export const INQUIRY_ENDPOINT = "/api/inquiry";
export const INQUIRY_FORM_METHOD = "post";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  duration: string;
  location: string;
  referral: string;
  message: string;
};

export const EMPTY_INQUIRY: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  duration: "",
  location: "",
  referral: "",
  message: "",
};

export const INQUIRY_FIELD_MAX_LENGTHS = {
  name: 120,
  email: 254,
  phone: 40,
  preferredDate: 80,
  duration: 64,
  location: 64,
  referral: 200,
  message: 4000,
} as const;

export const INQUIRY_REQUIRED_FIELDS = [
  "name",
  "email",
  "duration",
  "location",
  "message",
] as const;

export const INQUIRY_VALIDATION_MESSAGE = "Unable to accept this inquiry.";
export const INQUIRY_SUCCESS_MESSAGE = "Your inquiry has been received.";
export const INQUIRY_INVALID_BODY_MESSAGE = "Invalid request body.";
export const INQUIRY_CONFIG_MESSAGE =
  "Inquiry delivery is temporarily unavailable.";
export const INQUIRY_DELIVERY_MESSAGE =
  "Unable to send your inquiry. Please try again.";

export type InquiryDeliveryReceipt = {
  provider: "resend";
  id: string;
};

export type InquiryDeliver = (
  data: InquiryPayload,
  confirmationNumber: string,
) => Promise<InquiryDeliveryReceipt>;

export type InquiryProcessResult =
  | {
      ok: true;
      confirmationNumber: string;
      receiptId: string;
      message: string;
    }
  | {
      ok: false;
      status: 400 | 502 | 503;
      message: string;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  if (value.includes("\n") || value.includes("\r")) {
    return false;
  }
  return EMAIL_PATTERN.test(value);
}

function isConfigurationFailure(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (("kind" in error && error.kind === "configuration") ||
      ("name" in error && error.name === "InquiryDeliveryConfigError"))
  );
}

export function normalizeInquiryInput(raw: unknown): InquiryPayload {
  const source = isRecord(raw) ? raw : {};
  return {
    name: asField(source.name),
    email: asField(source.email),
    phone: asField(source.phone),
    preferredDate: asField(source.preferredDate),
    duration: asField(source.duration),
    location: asField(source.location),
    referral: asField(source.referral),
    message: asField(source.message),
  };
}

export function validateInquiry(data: InquiryPayload): string | null {
  for (const field of INQUIRY_REQUIRED_FIELDS) {
    if (!data[field]) {
      return INQUIRY_VALIDATION_MESSAGE;
    }
  }

  if (!isValidEmail(data.email)) {
    return INQUIRY_VALIDATION_MESSAGE;
  }

  for (const field of Object.keys(
    INQUIRY_FIELD_MAX_LENGTHS,
  ) as (keyof typeof INQUIRY_FIELD_MAX_LENGTHS)[]) {
    if (data[field].length > INQUIRY_FIELD_MAX_LENGTHS[field]) {
      return INQUIRY_VALIDATION_MESSAGE;
    }
  }

  return null;
}

export async function processInquiry(
  raw: unknown,
  deliver: InquiryDeliver,
): Promise<InquiryProcessResult> {
  const data = normalizeInquiryInput(raw);
  const validationError = validateInquiry(data);
  if (validationError) {
    return { ok: false, status: 400, message: validationError };
  }

  const confirmationNumber = `INQ-${Date.now()}`;

  try {
    const receipt = await deliver(data, confirmationNumber);
    const receiptId = typeof receipt?.id === "string" ? receipt.id.trim() : "";
    if (!receiptId) {
      return {
        ok: false,
        status: 502,
        message: INQUIRY_DELIVERY_MESSAGE,
      };
    }

    return {
      ok: true,
      confirmationNumber,
      receiptId,
      message: INQUIRY_SUCCESS_MESSAGE,
    };
  } catch (error) {
    if (isConfigurationFailure(error)) {
      return {
        ok: false,
        status: 503,
        message: INQUIRY_CONFIG_MESSAGE,
      };
    }

    return {
      ok: false,
      status: 502,
      message: INQUIRY_DELIVERY_MESSAGE,
    };
  }
}

export function parseInquiryRequestBody(
  contentType: string | null,
  bodyText: string,
): unknown {
  const type = (contentType ?? "").split(";")[0].trim().toLowerCase();
  if (type === "application/json") {
    return JSON.parse(bodyText);
  }
  if (type === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(bodyText));
  }
  throw new Error("unsupported content type");
}

function jsonError(message: string, status: number): Response {
  return Response.json({ success: false, message }, { status });
}

export async function handleInquiryPostRequest(
  request: Request,
  deliver: InquiryDeliver,
): Promise<Response> {
  let raw: unknown;
  try {
    raw = parseInquiryRequestBody(
      request.headers.get("content-type"),
      await request.text(),
    );
  } catch {
    return jsonError(INQUIRY_INVALID_BODY_MESSAGE, 400);
  }

  try {
    const result = await processInquiry(raw, deliver);
    if (result.ok === false) {
      return jsonError(result.message, result.status);
    }

    return Response.json({
      success: true,
      confirmationNumber: result.confirmationNumber,
      receiptId: result.receiptId,
      message: result.message,
    });
  } catch {
    return jsonError(INQUIRY_DELIVERY_MESSAGE, 502);
  }
}
