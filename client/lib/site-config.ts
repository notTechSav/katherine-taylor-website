/** Canonical production origin (apex, HTTPS). */
export const SITE_URL = "https://katherinetaylorescort.com";

/** Build an absolute URL for canonical/OG/sitemap use. */
export const absoluteUrl = (path = "/"): string => {
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
