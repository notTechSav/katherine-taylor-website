export type SectionLink = {
  href: string;
  label: string;
};

export type SectionAdjacent = {
  back?: SectionLink;
  next?: SectionLink;
};

const NEXT_BY_PATH: Record<string, SectionLink> = {
  "/": { href: "/about", label: "About Katherine" },
  "/about": { href: "/gallery", label: "Browse Gallery" },
  "/gallery": {
    href: "/film/a-brief-interruption",
    label: "A Brief Interruption",
  },
  "/film/a-brief-interruption": { href: "/gifts", label: "Gift Etiquette" },
  "/gifts": { href: "/faq", label: "Frequently Asked Questions" },
  "/faq": { href: "/film/please-stand-by", label: "Please Stand By" },
  "/film/please-stand-by": { href: "/inquire", label: "Private Inquiry" },
  "/rates": { href: "/gifts", label: "Browse Gifts" },
  "/journal": { href: "/gallery", label: "Browse Gallery" },
};

const BACK_BY_PATH: Record<string, SectionLink> = {
  "/about": { href: "/", label: "Home" },
  "/gallery": { href: "/about", label: "About Katherine" },
  "/film/a-brief-interruption": { href: "/gallery", label: "Browse Gallery" },
  "/gifts": { href: "/film/a-brief-interruption", label: "A Brief Interruption" },
  "/faq": { href: "/gifts", label: "Gift Etiquette" },
  "/film/please-stand-by": {
    href: "/faq",
    label: "Frequently Asked Questions",
  },
  "/inquire": { href: "/film/please-stand-by", label: "Please Stand By" },
  "/rates": { href: "/about", label: "About Katherine" },
  "/journal": { href: "/", label: "Home" },
  "/sacramento-escorts": { href: "/journal", label: "The Journal" },
};

const HOME_BACK: SectionLink = { href: "/", label: "Home" };
const JOURNAL_BACK: SectionLink = { href: "/journal", label: "The Journal" };

export function getSectionAdjacent(pathname: string): SectionAdjacent {
  if (pathname === "/") {
    return { next: NEXT_BY_PATH["/"] };
  }

  if (pathname.startsWith("/journal/") && pathname !== "/journal") {
    return { back: JOURNAL_BACK };
  }

  const back = BACK_BY_PATH[pathname] ?? HOME_BACK;
  const next = NEXT_BY_PATH[pathname];

  return next ? { back, next } : { back };
}
