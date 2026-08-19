import { type RefObject, useEffect } from "react";

const TRANSFORM_MS = 800;
const OPACITY_MS = 500;
const REDUCED_MOTION_MS = 120;
const TRANSFORM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const OPACITY_EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const INCOMING_OPACITY = 0.96;
const WHEEL_THRESHOLD = 100;
const WHEEL_IDLE_MS = 180;
const WHEEL_COOLDOWN_MS = 320;
const SWIPE_THRESHOLD = 48;

const SECTION_ALIASES: Record<string, string[]> = {
  "about-slide": ["about-gallery-combined"],
  "gallery-slide": ["about-gallery-combined"],
  "about-gallery-combined": ["about-slide", "gallery-slide"],
};

type GoToOptions = {
  instant?: boolean;
  fromKeyboard?: boolean;
  fromPointer?: boolean;
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

function wheelDeltaPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
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

function cancelSectionAnimations(section: HTMLElement) {
  section.getAnimations().forEach((animation) => animation.cancel());
}

function applySettledTransforms(sections: HTMLElement[], activeIndex: number) {
  sections.forEach((section, index) => {
    const isActive = index === activeIndex;
    cancelSectionAnimations(section);
    section.classList.toggle("is-active", isActive);
    section.classList.toggle("is-passed", index < activeIndex);
    section.classList.toggle("is-upcoming", index > activeIndex);
    section.classList.remove("is-transitioning");
    section.dataset.active = isActive ? "true" : "false";
    section.style.opacity = "1";
    section.style.pointerEvents = isActive ? "auto" : "none";

    if (isActive) {
      section.tabIndex = -1;
      section.style.zIndex = "2";
      section.style.visibility = "visible";
      section.style.transform = "translate3d(0, 0, 0)";
    } else if (index < activeIndex) {
      section.style.zIndex = "0";
      section.style.visibility = "hidden";
      section.style.transform = "translate3d(0, 0, 0)";
    } else {
      section.scrollTop = 0;
      section.style.zIndex = "0";
      section.style.visibility = "hidden";
      section.style.transform = "translate3d(0, 100%, 0)";
    }

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
    let cooldownTimer = 0;
    let idleTimer = 0;
    let wheelResetTimer = 0;

    const setViewportHeight = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      html.style.setProperty("--fullpage-height", `${height}px`);
    };

    setViewportHeight();

    const state = {
      index: 0,
      locked: false,
      pointerCooling: false,
      cooldownElapsed: false,
      internalGesture: false,
      sections: querySections(root),
      wheelAccum: 0,
      touchStartY: 0,
      touchStartX: 0,
      animations: [] as Animation[],
      targetIndex: 0,
      queuedIndex: null as number | null,
      queuedOptions: undefined as GoToOptions | undefined,
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

    const clearPointerCooling = () => {
      state.pointerCooling = false;
      state.cooldownElapsed = false;
      state.internalGesture = false;
      state.wheelAccum = 0;
    };

    const armIdleRelease = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!alive || state.locked) {
          return;
        }

        state.internalGesture = false;
        state.wheelAccum = 0;

        if (state.cooldownElapsed || !state.pointerCooling) {
          clearPointerCooling();
        }
      }, WHEEL_IDLE_MS);
    };

    const beginPointerCooldown = () => {
      state.pointerCooling = true;
      state.cooldownElapsed = false;
      state.wheelAccum = 0;
      window.clearTimeout(cooldownTimer);
      window.clearTimeout(idleTimer);
      cooldownTimer = window.setTimeout(() => {
        if (!alive) {
          return;
        }
        state.cooldownElapsed = true;
        armIdleRelease();
      }, WHEEL_COOLDOWN_MS);
    };

    const finishMove = (toEl: HTMLElement, nextIndex: number, options?: GoToOptions) => {
      state.animations.forEach((animation) => {
        animation.commitStyles();
        animation.cancel();
      });
      state.animations = [];
      state.index = nextIndex;
      state.targetIndex = nextIndex;
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
      state.locked = false;

      if (options?.fromPointer) {
        beginPointerCooldown();
      }

      if (queuedIndex !== null && queuedIndex !== state.index && !queuedOptions?.fromPointer) {
        void goTo(queuedIndex, queuedOptions);
      }
    };

    const goTo = async (nextIndex: number, options?: GoToOptions) => {
      if (nextIndex < 0 || nextIndex >= state.sections.length) {
        return;
      }

      if (state.locked) {
        if (!options?.fromPointer) {
          state.queuedIndex = nextIndex;
          state.queuedOptions = options;
        }
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
      const reduced = prefersReducedMotion() || Boolean(options?.instant);

      state.sections.forEach((section) => {
        const participating = section === fromEl || section === toEl;
        section.classList.toggle("is-transitioning", participating);
        if (!participating) {
          section.style.visibility = "hidden";
          section.style.pointerEvents = "none";
          section.style.zIndex = "0";
          setInert(section, true);
        }
      });

      fromEl.style.visibility = "visible";
      toEl.style.visibility = "visible";
      fromEl.style.pointerEvents = "none";
      toEl.style.pointerEvents = "none";
      setInert(toEl, false);

      if (reduced) {
        toEl.style.zIndex = "2";
        toEl.style.transform = "translate3d(0, 0, 0)";
        const fade = toEl.animate(
          [
            { transform: "translate3d(0, 0, 0)", opacity: 0 },
            { transform: "translate3d(0, 0, 0)", opacity: 1 },
          ],
          { duration: options?.instant ? 1 : REDUCED_MOTION_MS, easing: "linear", fill: "forwards" },
        );
        state.animations = [fade];
        await fade.finished.catch(() => undefined);
        if (!alive) {
          return;
        }
        finishMove(toEl, nextIndex, options);
        return;
      }

      try {
        if (direction === "down") {
          fromEl.style.zIndex = "1";
          toEl.style.zIndex = "2";
          toEl.style.transform = "translate3d(0, 100%, 0)";
          toEl.style.opacity = String(INCOMING_OPACITY);
          state.animations = [
            toEl.animate(
              [
                { transform: "translate3d(0, 100%, 0)" },
                { transform: "translate3d(0, 0, 0)" },
              ],
              { duration: TRANSFORM_MS, easing: TRANSFORM_EASE, fill: "forwards" },
            ),
            toEl.animate(
              [{ opacity: INCOMING_OPACITY }, { opacity: 1 }],
              { duration: OPACITY_MS, easing: OPACITY_EASE, fill: "forwards" },
            ),
          ];
        } else {
          toEl.style.zIndex = "1";
          toEl.style.transform = "translate3d(0, 0, 0)";
          toEl.style.opacity = String(INCOMING_OPACITY);
          fromEl.style.zIndex = "2";
          state.animations = [
            fromEl.animate(
              [
                { transform: "translate3d(0, 0, 0)" },
                { transform: "translate3d(0, 100%, 0)" },
              ],
              { duration: TRANSFORM_MS, easing: TRANSFORM_EASE, fill: "forwards" },
            ),
            toEl.animate(
              [{ opacity: INCOMING_OPACITY }, { opacity: 1 }],
              { duration: OPACITY_MS, easing: OPACITY_EASE, fill: "forwards" },
            ),
          ];
        }

        await Promise.all(state.animations.map((animation) => animation.finished.catch(() => undefined)));
        if (!alive) {
          return;
        }
        finishMove(toEl, nextIndex, options);
      } catch {
        if (alive) {
          finishMove(toEl, nextIndex, options);
        }
      }
    };

    const goBy = (delta: number, options?: GoToOptions) => {
      if (options?.fromPointer && (state.locked || state.pointerCooling)) {
        return;
      }

      const base = options?.fromPointer
        ? state.index
        : (state.queuedIndex ?? state.targetIndex);
      void goTo(base + delta, options);
    };

    const onWheel = (event: WheelEvent) => {
      if (isMenuOpen() || event.ctrlKey) {
        return;
      }

      const delta = wheelDeltaPixels(event);

      if (state.locked || state.pointerCooling) {
        event.preventDefault();
        if (state.cooldownElapsed) {
          armIdleRelease();
        }
        return;
      }

      const activeSection = state.sections[state.index];
      const scrollable =
        getScrollableAncestor(event.target, root) ??
        (activeSection &&
        activeSection.scrollHeight > activeSection.clientHeight + 1
          ? activeSection
          : null);
      if (scrollable && canScrollInDirection(scrollable, delta)) {
        state.internalGesture = true;
        state.wheelAccum = 0;
        return;
      }

      if (state.internalGesture) {
        event.preventDefault();
        state.wheelAccum = 0;
        armIdleRelease();
        return;
      }

      event.preventDefault();

      if (Math.abs(delta) < 1) {
        return;
      }

      state.wheelAccum += delta;
      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => {
        state.wheelAccum = 0;
      }, WHEEL_IDLE_MS);

      if (state.wheelAccum >= WHEEL_THRESHOLD) {
        state.wheelAccum = 0;
        goBy(1, { fromPointer: true });
      } else if (state.wheelAccum <= -WHEEL_THRESHOLD) {
        state.wheelAccum = 0;
        goBy(-1, { fromPointer: true });
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

      if (state.locked || state.pointerCooling) {
        event.preventDefault();
        return;
      }

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        state.internalGesture = true;
        return;
      }

      if (state.internalGesture) {
        event.preventDefault();
        return;
      }

      if (Math.abs(deltaY) > 8) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isMenuOpen() || state.locked || state.pointerCooling || !event.changedTouches.length) {
        return;
      }

      const deltaY = state.touchStartY - event.changedTouches[0].clientY;
      const deltaX = state.touchStartX - event.changedTouches[0].clientX;
      const scrollable = getScrollableAncestor(event.target, root);

      if (scrollable && canScrollInDirection(scrollable, deltaY)) {
        return;
      }

      if (state.internalGesture) {
        armIdleRelease();
        return;
      }

      if (Math.abs(deltaY) < SWIPE_THRESHOLD || Math.abs(deltaY) < Math.abs(deltaX)) {
        return;
      }

      goBy(deltaY > 0 ? 1 : -1, { fromPointer: true });
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
      state.animations.forEach((animation) => animation.cancel());
      window.clearTimeout(wheelResetTimer);
      window.clearTimeout(cooldownTimer);
      window.clearTimeout(idleTimer);
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
