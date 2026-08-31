/**
 * Cloudflare Pages Function — API routes for production.
 * Static SPA is served from dist/spa; these handlers replace Express in serverless deploys.
 */

import {
  loadMobileOpeningManifest,
  OPENING_HLS_PROXY_PATH,
} from "../../client/lib/video-sections";
import { handleInquiryPostRequest } from "../../shared/inquiry";
import {
  createResendInquiryDeliver,
  type InquiryDeliveryEnv,
} from "../../shared/inquiry-delivery";

interface Env extends InquiryDeliveryEnv {
  PING_MESSAGE?: string;
}

type PagesContext = {
  request: Request;
  env: Env;
  params: { path?: string[] };
};

export async function onRequest(context: PagesContext): Promise<Response> {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (path === OPENING_HLS_PROXY_PATH && context.request.method === "GET") {
    try {
      const body = await loadMobileOpeningManifest();
      return new Response(body, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Cache-Control": "public, max-age=60",
        },
      });
    } catch {
      return new Response("Opening HLS manifest unavailable", { status: 502 });
    }
  }

  if (path === "/api/ping" && context.request.method === "GET") {
    return Response.json({
      message: context.env.PING_MESSAGE ?? "ping",
    });
  }

  if (path === "/api/inquiry" && context.request.method === "POST") {
    return handleInquiryPostRequest(
      context.request,
      createResendInquiryDeliver(context.env),
    );
  }

  if (path === "/api/luxury-inquiry/health" && context.request.method === "GET") {
    return Response.json({ status: "ok", service: "luxury-inquiry-api" });
  }

  if (path === "/api/content/health" && context.request.method === "GET") {
    return Response.json({ status: "ok", service: "content-ai" });
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}
