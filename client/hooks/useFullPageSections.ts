import { type RefObject, useEffect } from "react";

const TRANSITION_MS = 800;
const REDUCED_MOTION_MS = 120;
const WHEEL_THRESHOLD = 72;
const WHEEL_RESET_MS = 180;
const SWIPE_THRESHOLD = 48;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

const SECTION_ALIASES: Record<string, string[]> = {
  "about-slide": ["about-gallery-combined"],
  "gallery-slide": ["about-gallery-combined"],
  "about-gallery-combined": ["about-slide", "gallery-slide"],
};

type FullPageChangeDetail = {
  id: string;
  index: number;
};

declare global {
  interface WindowEventMap {
    "fullpage:change": CustomEvent<FullPageChangeDetail>;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isVisibleSection(element: HTMLElement) {
  return window.getComputedStyle(element).display !== "none";
}

function querySections(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(":scope > [data-fullpage-section]"),
  ).filter(isVisibleSection);
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

function isMenuOpen() {
  return document.documentElement.hasAttribute("data-menu-open");
}

function getScrollableAncestor(start: EventTarget | null, root: HTMLElement) {
  let current = start instanceof Element ? start : null;

  while (current && current !== root) {
    if (current instanceof HTMLElement) {
      const style = window.getComputedStyle(current);
      const overflowY = style.overflowY;
      const canScroll =
        (overflowY === "auto" || overflowY === "scroll") &&
        current.scrollHeight > current.clientHeight + 1;

      if (canScroll) {
        return current;
      }
    }

    current = current.parentElement;
  }

  return null;
}

function canScrollInDirection(element: HTMLElement, deltaY: number) {
  if (deltaY > 0) {
    return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  }

  if (deltaY < 0) {
    return element.scrollTop > 1;
  }

  return false;
}

function setInert(element: HTMLElement, inert: boolean) {
  if (inert) {
    element.setAttribute("inert", "");
    element.setAttribute("aria-hidden", "true");
    return;
  }

  element.removeAttribute("inert");
  element.removeAttribute("aria-hidden");
}

function applySettledTransforms(sections: HTMLElement[], activeIndex: number) {
  sections.forEach((section, index) => {
    const isActive = index === activeIndex;
    const isPassed = index < activeIndex;

    section.classList.toggle("is-active", isActive);
    section.classList.toggle("is-passed", isPassed);
    section.classList.toggle("is-upcoming", index > activeIndex);
    section.dataset.active = isActive ? "true" : "false";
    if (isActive) {
      section.tabIndex = -1;
    }
    section.style.zIndex = isActive ? String(index + 10) : String(index + 1);
    section.style.pointerEvents = isActive ? "auto" : "none";
    if (index > activeIndex) {
      section.scrollTop = 0;
    }
    section.style.transform = isPassed || isActive
      ? "translate3d(0, 0, 0)"
      : "translate3d(0, 100%, 0)";
    setInert(section, !isActive);
  });
}

function dispatchChange(id: string, index: number) {
  document.documentElement.dataset.fullpageIndex = String(index);
  document.documentElement.dataset.fullpageId = id;
  window.dispatchEvent(
    new CustomEvent<FullPageChangeDetail>("fullpage:change", {
      detail: { id, index },
    }),
  );
}

function syncHash(id: string) {
  const nextHash = `#${id}`;
  if (window.location.hash === nextHash) {
    return;
  }

  const url = `${window.location.pathname}${window.location.search}${nextHash}`;
  window.history.replaceState(null, "", url);
}

function resolveSectionIndex(sections: HTMLElement[], requestedId: string) {
  const direct = sections.findIndex((section) => section.id === requestedId);
  if (direct >= 0) {
    return direct;
  }

  const aliases = SECTION_ALIASES[requestedId] ?? [];
  return sections.findIndex((section) => aliases.includes(section.id));
}

export function useFullPageSections(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const html = document.documentElement;
    html.classList.add("fullpage-is-ready");
    let alive = true;
    let unlockTimer = 0;

    const setViewportHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      html.style.setProperty("--fullpage-height", `${height}px`);
    };

    setViewportHeight();

    const state = {
      index: 0,
      locked: false,
      sections: querySections(root),
      wheelAccum: 0,
      touchStartY: 0,
      touchStartX: 0,
      animation: null as Animation | null,
      targetIndex: 0,
      queuedIndex: null as number | null,
      queuedOptions: undefined as { instant?: boolean; fromKeyboard?: boolean } | undefined,
    };

    const hashId = window.location.hash.replace(/^#/, "");
    if (hashId) {
      const hashIndex = resolveSectionIndex(state.sections, hashId);
      if (hashIndex >= 0) {
      state.index = hashIndex;
      state.targetIndex = hashIndex;
      }
    }

    applySettledTransforms(state.sections, state.index);
    if (state.sections[state.index]) {
      dispatchChange(state.sections[state.index].id, state.index);
    }

    const unlockSoon = () => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        if (alive) {
          state.locked = false;
        }
      }, 40);
    };

    const goTo = async (nextIndex: number, options?: { instant?: boolean; fromKeyboard?: boolean }) => {
      if (nextIndex < 0 || nextIndex >= state.sections.length) {
        return;
      }

      if (state.locked) {
        state.queuedIndex = nextIndex;
        state.queuedOptions = options;
        return;
      }

      if (nextIndex === state.index) {
        return;
      }

      const fromEl = state.sections[state.index];
      const toEl = state.sections[nextIndex];
      if (!fromEl || !toEl) {
        return;
      }

      state.locked = true;
      state.wheelAccum = 0;
      state.targetIndex = nextIndex;
      const direction = nextIndex > state.index ? "down" : "up";
      const instant = Boolean(options?.instant);
      const reduced = prefersReducedMotion();

      toEl.classList.remove("is-upcoming");
      toEl.classList.add("is-active");
      toEl.style.pointerEvents = "auto";
      setInert(toEl, false);

      if (instant) {
        state.animation?.cancel();
        state.index = nextIndex;
        applySettledTransforms(state.sections, state.index);
        syncHash(toEl.id);
        dispatchChange(toEl.id, state.index);
        if (options?.fromKeyboard) {
          toEl.focus({ preventScroll: true });
        }
        const queuedIndex = state.queuedIndex;
        const queuedOptions = state.queuedOptions;
        state.queuedIndex = null;
        state.queuedOptions = undefined;
        if (queuedIndex !== null && queuedIndex !== state.index) {
          state.locked = false;
          void goTo(queuedIndex, queuedOptions);
          return;
        }
        unlockSoon();
        return;
      }

      const duration = reduced ? REDUCED_MOTION_MS : TRANSITION_MS;

      try {
        if (reduced) {
          toEl.style.zIndex = "100";
          toEl.style.transform = "translate3d(0, 0, 0)";
          state.animation = toEl.animate(
            [
              { transform: "translate3d(0, 0, 0)", opacity: 0 },
              { transform: "translate3d(0, 0, 0)", opacity: 1 },
            ],
            { duration, easing: "linear", fill: "forwards" },
          );
        } else if (direction === "down") {
          toEl.style.zIndex = "100";
          toEl.style.transform = "translate3d(0, 100%, 0)";
          toEl.style.opacity = "0.92";
          state.animation = toEl.animate(
            [
              { transform: "translate3d(0, 100%, 0)", opacity: 0.92 },
              { transform: "translate3d(0, 0, 0)", opacity: 1 },
            ],
            { duration, easing: EASE, fill: "forwards" },
          );
        } else {
          fromEl.style.zIndex = "100";
          state.animation = fromEl.animate(
            [
              { transform: "translate3d(0, 0, 0)", opacity: 1 },
              { transform: "translate3d(0, 100%, 0)", opacity: 1 },
            ],
            { duration, easing: EASE, fill: "forwards" },
          );
        }

        if (!state.animation) {
          return;
        }

        await state.animation.finished.catch(() => undefined);
        if (!alive) {
          return;
        }
        state.animation?.commitStyles();
        state.animation?.cancel();
      } finally {
        if (!alive) {
          return;
        }
        state.animation = null;
        state.index = nextIndex;
        applySettledTransforms(state.sections, state.index);
        syncHash(toEl.id);
        dispatchChange(toEl.id, state.index);
        if (options?.fromKeyboard) {
          toEl.focus({ preventScroll: true });
        }
        const queuedIndex = state.queuedIndex;
        const queuedOptions = state.queuedOptions;
        state.queuedIndex = null;
        state.queuedOptions = undefined;
        if (queuedIndex !== null && queuedIndex !== state.index) {
          state.locked = false;
          void goTo(queuedIndex, queuedOptions);
          return;
        }
        unlockSoon();
      }
    };

    const goBy = (delta: number, options?: { fromKeyboard?: boolean }) => {
      const base = state.queuedIndex ?? state.targetIndex;
      void goTo(base + delta, options);
    };

    let wheelResetTimer = 0;
    const onWheel = (event: WheelEvent) => {
      if (isMenuOpen() || event.ctrlKey) {
        return;
      }

      if (state.locked) {
        event.preventDefault();
        return;
      }

      const scrollable = getScrollableAncestor(event.target, root);
      if (scrollable && canScrollInDirection(scrollable, event.deltaY)) {
        state.wheelAccum = 0;
        return;
      }

      event.preventDefault();

      if (Math.abs(event.deltaY) < 1) {
        return;
      }

      state.wheelAccum += event.deltaY;
      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => {
        state.wheelAccum = 0;
      }, WHEEL_RESET_MS);

      if (state.wheelAccum >= WHEEL_THRESHOLD) {
        state.wheelAccum = 0;
        goBy(1);
      } else if (state.wheelAccum <= -WHEEL_THRESHOLD) {
        state.wheelAccum = 0;
        goBy(-1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        return;
      }

      state.touchStartY = event.touches[0].clientY;
      state.touchStartX = event.touches[0].clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isMenuOpen() || event.touches.length !== 1) {
        return;
      }

      const deltaY = state.touchStartY - event.touches[0].clientY;
      const scrollable = getScrollableAncestor(event.target, root);

      if (state.locked) {
        event.preventDefault();
        return;
      }

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        return;
      }

      if (Math.abs(deltaY) > 8) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isMenuOpen() || state.locked || !event.changedTouches.length) {
        return;
      }

      const deltaY = state.touchStartY - event.changedTouches[0].clientY;
      const deltaX = state.touchStartX - event.changedTouches[0].clientX;
      const scrollable = getScrollableAncestor(event.target, root);

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        return;
      }

      if (Math.abs(deltaY) < SWIPE_THRESHOLD || Math.abs(deltaY) < Math.abs(deltaX)) {
        return;
      }

      goBy(deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || isMenuOpen() || isEditableTarget(event.target)) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          event.preventDefault();
          goBy(1, { fromKeyboard: true });
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          goBy(-1, { fromKeyboard: true });
          break;
        case "Home":
          event.preventDefault();
          void goTo(0, { fromKeyboard: true });
          break;
        case "End":
          event.preventDefault();
          void goTo(state.sections.length - 1, { fromKeyboard: true });
          break;
        default:
          break;
      }
    };

    const goToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) {
        return;
      }

      const nextIndex = resolveSectionIndex(state.sections, id);
      if (nextIndex >= 0) {
        void goTo(nextIndex);
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const id = decodeURIComponent(anchor.hash.replace(/^#/, ""));
      const nextIndex = resolveSectionIndex(state.sections, id);
      if (nextIndex < 0) {
        return;
      }

      event.preventDefault();
      void goTo(nextIndex);
    };

    const refreshSections = () => {
      const previousId = state.sections[state.index]?.id;
      state.sections = querySections(root);
      let nextIndex = previousId
        ? resolveSectionIndex(state.sections, previousId)
        : 0;
      if (nextIndex < 0) {
        nextIndex = Math.min(state.index, Math.max(state.sections.length - 1, 0));
      }
      state.index = nextIndex;
      state.targetIndex = nextIndex;
      applySettledTransforms(state.sections, state.index);
      if (state.sections[state.index]) {
        dispatchChange(state.sections[state.index].id, state.index);
      }
    };

    const onResize = () => {
      setViewportHeight();
      if (!state.locked) {
        refreshSections();
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      applySettledTransforms(state.sections, state.index);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("hashchange", goToHash);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      alive = false;
      state.animation?.cancel();
      window.clearTimeout(wheelResetTimer);
      window.clearTimeout(unlockTimer);
      html.classList.remove("fullpage-is-ready");
      html.style.removeProperty("--fullpage-height");
      delete html.dataset.fullpageIndex;
      delete html.dataset.fullpageId;
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("hashchange", goToHash);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [rootRef]);
}
