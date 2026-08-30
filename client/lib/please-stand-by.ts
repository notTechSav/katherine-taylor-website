import { pageSeo } from "./page-seo";
import { SITE_URL, absoluteUrl } from "./site-config";
import { sitePages } from "./site-pages";

/** Route-specific assets for /film/please-stand-by. Loaded only on that page. */
export const pleaseStandByVideo = {
  src: "/film/please-stand-by.mp4",
  poster: "/film/please-stand-by.jpg",
  width: 1920,
  height: 1080,
  /** Derived from the supplied MP4 (33.242s). */
  duration: "PT33S",
} as const;

export const pleaseStandBySponsor = {
  href: "https://trudoco.com/",
  heading: "This Interruption Brought to You By ↗",
} as const;

export function soundControlAriaLabel(isMuted: boolean): "Play audio" | "Mute video" {
  return isMuted ? "Play audio" : "Mute video";
}

/** Apply mute preference and return the element's truthful muted state. */
export function applyVideoMute(
  video: Pick<HTMLVideoElement, "muted">,
  muted: boolean,
): boolean {
  video.muted = muted;
  return video.muted;
}

export const pleaseStandByJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Please Stand By",
  description: pageSeo.pleaseStandBy.description,
  thumbnailUrl: absoluteUrl(pleaseStandByVideo.poster),
  duration: pleaseStandByVideo.duration,
  contentUrl: absoluteUrl(pleaseStandByVideo.src),
  width: pleaseStandByVideo.width,
  height: pleaseStandByVideo.height,
  encodingFormat: "video/mp4",
  author: {
    "@type": "Person",
    name: "Katherine Taylor",
    url: `${SITE_URL}/`,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${sitePages.pleaseStandBy.path}`,
  },
};
