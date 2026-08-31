import express, { NextFunction, Request, Response } from "express";
import { createResendInquiryDeliver } from "../../shared/inquiry-delivery";
import {
  INQUIRY_INVALID_BODY_MESSAGE,
  processInquiry,
} from "../../shared/inquiry";

const router = express.Router();

function contentTypeOf(req: Request): string {
  const header = req.headers["content-type"];
  return typeof header === "string" ? header : "";
}

router.post("/api/inquiry", async (req: Request, res: Response) => {
  const type = contentTypeOf(req).split(";")[0].trim().toLowerCase();
  if (
    type !== "application/json" &&
    type !== "application/x-www-form-urlencoded"
  ) {
    res.status(400).json({
      success: false,
      message: INQUIRY_INVALID_BODY_MESSAGE,
    });
    return;
  }

  const result = await processInquiry(
    req.body,
    createResendInquiryDeliver({
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      INQUIRY_TO_EMAIL: process.env.INQUIRY_TO_EMAIL,
      INQUIRY_FROM_EMAIL: process.env.INQUIRY_FROM_EMAIL,
    }),
  );

  if (result.ok === false) {
    res.status(result.status).json({
      success: false,
      message: result.message,
    });
    return;
  }

  res.status(200).json({
    success: true,
    confirmationNumber: result.confirmationNumber,
    receiptId: result.receiptId,
    message: result.message,
  });
});

export function handleInquiryParseError(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.path !== "/api/inquiry") {
    next(err);
    return;
  }

  if (err instanceof SyntaxError) {
    res.status(400).json({
      success: false,
      message: INQUIRY_INVALID_BODY_MESSAGE,
    });
    return;
  }

  next(err);
}

export default router;
