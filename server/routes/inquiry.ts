import express, { Request, Response } from "express";
import { processInquiry, type InquiryPayload } from "../../shared/inquiry";

const router = express.Router();

function deliverInquiry(
  data: InquiryPayload,
  confirmationNumber: string,
) {
  console.log("=== New Inquiry Received ===");
  console.log("Confirmation:", confirmationNumber);
  console.log("From:", data.name, `<${data.email}>`);
  console.log("Phone:", data.phone ?? "—");
  console.log("Preferred date:", data.preferredDate ?? "—");
  console.log("Duration:", data.duration ?? "—");
  console.log("Location:", data.location ?? "—");
  console.log("Referral:", data.referral ?? "—");
  console.log("Message:", data.message ?? "—");
  console.log("============================");
}

router.post("/api/inquiry", async (req: Request, res: Response) => {
  try {
    const result = processInquiry(req.body, deliverInquiry);

    if (!result.ok) {
      res.status(400).json({
        success: false,
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      success: true,
      confirmationNumber: result.confirmationNumber,
      message: result.message,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
});

export default router;
