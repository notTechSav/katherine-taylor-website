import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGenerateContent,
  handleBatchGenerate,
  handleSeasonalRefresh,
  handleHealthCheck,
} from "./routes/content-ai";
import luxuryInquiryRouter from "./routes/luxury-inquiry";
import inquiryRouter, { handleInquiryParseError } from "./routes/inquiry";
import {
  loadMobileOpeningManifest,
  OPENING_HLS_PROXY_PATH,
} from "../client/lib/video-sections";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get(OPENING_HLS_PROXY_PATH, async (_req, res) => {
    try {
      const body = await loadMobileOpeningManifest();
      res.status(200);
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      res.setHeader("Cache-Control", "public, max-age=60");
      res.end(body);
    } catch {
      res.status(502).type("text/plain").send("Opening HLS manifest unavailable");
    }
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // AI Content Generation routes
  app.get("/api/content/health", handleHealthCheck);
  app.post("/api/content/generate", handleGenerateContent);
  app.post("/api/content/batch-generate", handleBatchGenerate);
  app.post("/api/content/refresh-seasonal", handleSeasonalRefresh);

  // Luxury Inquiry routes
  app.use(luxuryInquiryRouter);

  // Simple inquiry form (Inquire page)
  app.use(inquiryRouter);
  app.use(handleInquiryParseError);

  return app;
}
