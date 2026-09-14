/**
 * Host-level 301 for www. The matching rule in public/_redirects only
 * runs after www is served by this Pages project; this Function makes
 * the same hop even when both hostnames share one deployment.
 */

type MiddlewareContext = {
  request: Request;
  next: () => Promise<Response>;
};

export async function onRequest(
  context: MiddlewareContext,
): Promise<Response> {
  const url = new URL(context.request.url);
  if (url.hostname === "www.katherinetaylorescort.com") {
    url.hostname = "katherinetaylorescort.com";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
