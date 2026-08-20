/** Canonical production origin (apex, HTTPS). */
export const SITE_URL = "https://katherinetaylorescort.com";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/katherine-taylor-escort-video/image/upload/q_80,f_auto/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.jpg";

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
