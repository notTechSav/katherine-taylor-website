import { INQUIRY_ENDPOINT, type InquiryPayload } from "@shared/inquiry";

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
): Promise<Response> {
  event.preventDefault();
  return postInquiryJson(formData, fetchImpl);
}
