import { INQUIRY_ENDPOINT, type InquiryPayload } from "@shared/inquiry";

export class InquirySubmitVerificationError extends Error {
  constructor() {
    super("Submission failed");
    this.name = "InquirySubmitVerificationError";
  }
}

export type VerifiedInquirySubmit = {
  confirmationNumber: string;
  receiptId: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function readInquirySubmitResult(
  response: Response,
): Promise<VerifiedInquirySubmit> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new InquirySubmitVerificationError();
  }

  if (!response.ok || !isRecord(body) || body.success !== true) {
    throw new InquirySubmitVerificationError();
  }

  const confirmationNumber =
    typeof body.confirmationNumber === "string"
      ? body.confirmationNumber.trim()
      : "";
  const receiptId =
    typeof body.receiptId === "string" ? body.receiptId.trim() : "";

  if (!confirmationNumber || !receiptId) {
    throw new InquirySubmitVerificationError();
  }

  return { confirmationNumber, receiptId };
}

export async function postInquiryJson(
  formData: InquiryPayload,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  return fetchImpl(INQUIRY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

export async function submitInquiryFromForm(
  event: { preventDefault: () => void },
  formData: InquiryPayload,
  fetchImpl: typeof fetch = fetch,
): Promise<VerifiedInquirySubmit> {
  event.preventDefault();
  const response = await postInquiryJson(formData, fetchImpl);
  return readInquirySubmitResult(response);
}
