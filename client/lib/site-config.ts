/** Canonical production origin (apex, HTTPS). */
export const SITE_URL = "https://katherinetaylorescort.com";

/** Sole public-facing Katherine Taylor business email. */
export const CONTACT_EMAIL = "private@katherinetaylorescort.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

export const DEFAULT_OG_IMAGE =
  "https://customer-xyp94kxe4za8b3w1.cloudflarestream.com/f17ef86e3e7fbfa3d2d58dd3bd3d9065/thumbnails/thumbnail.jpg?time=3s&height=1080";

/** Build an absolute URL for canonical/OG/sitemap use. */
export const absoluteUrl = (path = "/"): string => {
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
