import { pageSeo } from "./page-seo";
import { SITE_URL, absoluteUrl } from "./site-config";
import { sitePages } from "./site-pages";

/** Route-specific assets for /film/a-brief-interruption. Loaded only on that page. */
export const briefInterruptionVideo = {
  src: "/film/a-brief-interruption.mp4",
  poster: "/film/a-brief-interruption.jpg",
  width: 1920,
  height: 1080,
  /** Derived from the supplied MP4 (30.197s). */
  duration: "PT30S",
  uploadDate: "2026-08-29",
} as const;

export const briefInterruptionSponsor = {
  href: "https://www.cigarsinternational.com/cigars.html",
  heading: "A Word From Our Sponsors",
  accessibleName: "A Word From Our Sponsors — Cigars International",
} as const;

export const briefInterruptionJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "A Brief Interruption",
  description: pageSeo.briefInterruption.description,
  thumbnailUrl: absoluteUrl(briefInterruptionVideo.poster),
  uploadDate: briefInterruptionVideo.uploadDate,
  duration: briefInterruptionVideo.duration,
  contentUrl: absoluteUrl(briefInterruptionVideo.src),
  width: briefInterruptionVideo.width,
  height: briefInterruptionVideo.height,
  encodingFormat: "video/mp4",
  author: {
    "@type": "Person",
    name: "Katherine Taylor",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${sitePages.briefInterruption.path}`,
  },
};
