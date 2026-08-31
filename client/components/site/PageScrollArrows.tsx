import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  type ArrowState,
  getDocumentArrowState,
  nextDocumentScrollTop,
  readFullpageArrowStateFromDocument,
  requestFullpageNavigate,
} from "@/lib/page-scroll";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current";

const INITIAL_STATE: ArrowState = { canGoUp: false, canGoDown: true };

function ScrollChevron({ direction }: { direction: "up" | "down" }) {
  const d =
    direction === "up"
      ? "M4.5 15.75 12 8.25l7.5 7.5"
      : "M19.5 8.25 12 15.75l-7.5-7.5";

  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="white"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function scrollDocumentBy(direction: 1 | -1) {
  const top = nextDocumentScrollTop(
    direction,
    window.scrollY,
    window.innerHeight,
    document.documentElement.scrollHeight,
  );
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, left: 0, behavior: reduced ? "auto" : "smooth" });
}

const PageScrollArrows = () => {
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";
  const [arrows, setArrows] = useState<ArrowState>(INITIAL_STATE);
  const [menuOpen, setMenuOpen] = useState(false);

  const syncDocument = useCallback(() => {
    setArrows(
      getDocumentArrowState(
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
      ),
    );
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const syncMenu = () => {
      setMenuOpen(html.hasAttribute("data-menu-open"));
    };

    syncMenu();
    const observer = new MutationObserver(syncMenu);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHomepage) {
      syncDocument();
      window.addEventListener("scroll", syncDocument, { passive: true });
      window.addEventListener("resize", syncDocument);
      return () => {
        window.removeEventListener("scroll", syncDocument);
        window.removeEventListener("resize", syncDocument);
      };
    }

    const syncFullpage = (event?: WindowEventMap["fullpage:change"]) => {
      if (event?.detail.canGoUp != null && event.detail.canGoDown != null) {
        setArrows({
          canGoUp: event.detail.canGoUp,
          canGoDown: event.detail.canGoDown,
        });
        return;
      }

      setArrows(
        readFullpageArrowStateFromDocument() ?? {
          canGoUp: false,
          canGoDown: true,
        },
      );
    };

    syncFullpage();
    window.addEventListener("fullpage:change", syncFullpage);
    return () => {
      window.removeEventListener("fullpage:change", syncFullpage);
    };
  }, [isHomepage, pathname, syncDocument]);

  const go = (direction: 1 | -1) => {
    if (isHomepage) {
      requestFullpageNavigate(direction);
      return;
    }

    scrollDocumentBy(direction);
  };

  if (menuOpen || (!arrows.canGoUp && !arrows.canGoDown)) {
    return null;
  }

  return (
    <nav
      aria-label="Scroll page"
      className="pointer-events-none fixed z-40 flex flex-col items-center gap-12 md:gap-16 right-[max(0.35rem,env(safe-area-inset-right))] bottom-[max(10rem,calc(env(safe-area-inset-bottom)+9.25rem))] md:right-5 md:bottom-44"
    >
      {(["up", "down"] as const).map((direction) => {
        const enabled = direction === "up" ? arrows.canGoUp : arrows.canGoDown;

        return (
          <button
            key={direction}
            type="button"
            aria-label={direction === "up" ? "Scroll up" : "Scroll down"}
            aria-hidden={enabled ? undefined : true}
            tabIndex={enabled ? 0 : -1}
            disabled={!enabled}
            onClick={() => go(direction === "up" ? -1 : 1)}
            className={cn(
              "pointer-events-auto inline-flex h-11 w-11 touch-manipulation items-center justify-center bg-transparent text-luxury-black transition-opacity duration-300",
              "focus:outline-none",
              focusRing,
              enabled
                ? "hover:opacity-60"
                : "pointer-events-none invisible opacity-0",
            )}
          >
            <ScrollChevron direction={direction} />
          </button>
        );
      })}
    </nav>
  );
};

export default PageScrollArrows;
