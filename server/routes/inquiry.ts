import express, { Request, Response } from "express";

const router = express.Router();

interface SimpleInquiryData {
  name: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  duration?: string;
  location?: string;
  referral?: string;
  message?: string;
}

router.post("/api/inquiry", async (req: Request, res: Response) => {
  try {
    const data = req.body as SimpleInquiryData;

    if (!data.name || !data.email) {
      res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
      return;
    }

    const confirmationNumber = `INQ-${Date.now()}`;

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

    res.status(200).json({
      success: true,
      confirmationNumber,
      message: "Your inquiry has been received.",
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
