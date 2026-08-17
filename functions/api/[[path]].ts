/**
 * Cloudflare Pages Function — API routes for production.
 * Static SPA is served from dist/spa; these handlers replace Express in serverless deploys.
 */

interface Env {
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

  if (path === "/api/ping" && context.request.method === "GET") {
    return Response.json({
      message: context.env.PING_MESSAGE ?? "ping",
    });
  }

  if (path === "/api/inquiry" && context.request.method === "POST") {
    try {
      const data = (await context.request.json()) as Record<string, string>;
      if (!data.name || !data.email) {
        return Response.json(
          { success: false, message: "Name and email are required." },
          { status: 400 },
        );
      }
      const confirmationNumber = `INQ-${Date.now()}`;
      console.log("Inquiry received:", confirmationNumber, data.email);
      return Response.json({
        success: true,
        confirmationNumber,
        message: "Your inquiry has been received.",
      });
    } catch {
      return Response.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }
  }

  if (path === "/api/luxury-inquiry/health" && context.request.method === "GET") {
    return Response.json({ status: "ok", service: "luxury-inquiry-api" });
  }

  if (path === "/api/content/health" && context.request.method === "GET") {
    return Response.json({ status: "ok", service: "content-ai" });
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}
