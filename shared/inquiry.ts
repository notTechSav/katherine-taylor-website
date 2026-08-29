/**
 * Shared inquiry payload handling for the Inquire form.
 * JSON (JavaScript fetch) and urlencoded (native form POST) normalize into
 * the same record, then share one validation pass and one delivery callback.
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

export const INQUIRY_VALIDATION_MESSAGE = "Name and email are required.";
export const INQUIRY_SUCCESS_MESSAGE = "Your inquiry has been received.";
export const INQUIRY_INVALID_BODY_MESSAGE = "Invalid request body.";

export type InquiryDeliver = (
  data: InquiryPayload,
  confirmationNumber: string,
) => void;

export type InquiryProcessResult =
  | {
      ok: true;
      confirmationNumber: string;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asField(value: unknown): string {
  return typeof value === "string" ? value : "";
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
  if (!data.name || !data.email) {
    return INQUIRY_VALIDATION_MESSAGE;
  }
  return null;
}

export function processInquiry(
  raw: unknown,
  deliver: InquiryDeliver,
): InquiryProcessResult {
  const data = normalizeInquiryInput(raw);
  const validationError = validateInquiry(data);
  if (validationError) {
    return { ok: false, message: validationError };
  }

  const confirmationNumber = `INQ-${Date.now()}`;
  deliver(data, confirmationNumber);

  return {
    ok: true,
    confirmationNumber,
    message: INQUIRY_SUCCESS_MESSAGE,
  };
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

export async function handleInquiryPostRequest(
  request: Request,
  deliver: InquiryDeliver,
): Promise<Response> {
  try {
    const raw = parseInquiryRequestBody(
      request.headers.get("content-type"),
      await request.text(),
    );
    const result = processInquiry(raw, deliver);
    if (!result.ok) {
      return Response.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }
    return Response.json({
      success: true,
      confirmationNumber: result.confirmationNumber,
      message: result.message,
    });
  } catch {
    return Response.json(
      { success: false, message: INQUIRY_INVALID_BODY_MESSAGE },
      { status: 400 },
    );
  }
}
