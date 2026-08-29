import { useEffect, useState, type RefObject } from "react";

function visibleFullpageSections(section: HTMLElement) {
  const root = section.parentElement;
  if (!root) {
    return [] as HTMLElement[];
  }

  return Array.from(
    root.querySelectorAll<HTMLElement>(":scope > [data-fullpage-section]"),
  ).filter((element) => window.getComputedStyle(element).display !== "none");
}

/**
 * Load media for the active full-page section and the next one.
 * Hidden breakpoint-only sections never enter that list, so their
 * images stay unloaded.
 */
export function useNearbyFullpageMedia(
  containerRef: RefObject<HTMLElement>,
  priority = false,
) {
  const [allow, setAllow] = useState(priority);

  useEffect(() => {
    if (priority) {
      setAllow(true);
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const section = node.closest<HTMLElement>("[data-fullpage-section]");
    if (!section) {
      setAllow(true);
      return;
    }

    const sync = () => {
      if (section.classList.contains("is-transitioning")) {
        setAllow(true);
        return;
      }

      const sections = visibleFullpageSections(section);
      const index = sections.indexOf(section);
      if (index < 0) {
        return;
      }

      const activeIndex = sections.findIndex((item) =>
        item.classList.contains("is-active"),
      );
      if (activeIndex < 0) {
        return;
      }

      if (index === activeIndex || index === activeIndex + 1) {
        setAllow(true);
      }
    };

    sync();
    window.addEventListener("fullpage:change", sync);
    const observer = new MutationObserver(sync);
    observer.observe(section, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("fullpage:change", sync);
      observer.disconnect();
    };
  }, [containerRef, priority]);

  return allow;
}
