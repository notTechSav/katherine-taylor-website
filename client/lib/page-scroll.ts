export type ArrowState = {
  canGoUp: boolean;
  canGoDown: boolean;
};

export const FULLPAGE_NAVIGATE_EVENT = "fullpage:navigate";

export type FullpageNavigateDetail = {
  delta: 1 | -1;
};

export function getFullpageArrowState(input: {
  index: number;
  sectionCount: number;
  footerRevealed: boolean;
  hasFooter: boolean;
}): ArrowState {
  if (input.sectionCount <= 0) {
    return { canGoUp: false, canGoDown: false };
  }

  const lastIndex = input.sectionCount - 1;

  return {
    canGoUp: input.index > 0 || input.footerRevealed,
    canGoDown:
      input.index < lastIndex || (input.hasFooter && !input.footerRevealed),
  };
}

export function getDocumentArrowState(
  scrollY: number,
  viewportHeight: number,
  scrollHeight: number,
  epsilon = 2,
): ArrowState {
  const max = Math.max(0, scrollHeight - viewportHeight);
  if (max <= epsilon) {
    return { canGoUp: false, canGoDown: false };
  }

  return {
    canGoUp: scrollY > epsilon,
    canGoDown: scrollY < max - epsilon,
  };
}

export function nextDocumentScrollTop(
  direction: 1 | -1,
  scrollY: number,
  viewportHeight: number,
  scrollHeight: number,
): number {
  const max = Math.max(0, scrollHeight - viewportHeight);
  const step = Math.max(viewportHeight * 0.92, 1);

  if (direction > 0) {
    return Math.min(max, scrollY + step);
  }

  return Math.max(0, scrollY - step);
}

export function requestFullpageNavigate(delta: 1 | -1) {
  window.dispatchEvent(
    new CustomEvent<FullpageNavigateDetail>(FULLPAGE_NAVIGATE_EVENT, {
      detail: { delta },
    }),
  );
}

export function readFullpageArrowStateFromDocument(
  root: HTMLElement = document.documentElement,
): ArrowState | null {
  if (!root.classList.contains("fullpage-is-ready")) {
    return null;
  }

  if (
    root.dataset.fullpageCanGoUp != null &&
    root.dataset.fullpageCanGoDown != null
  ) {
    return {
      canGoUp: root.dataset.fullpageCanGoUp === "true",
      canGoDown: root.dataset.fullpageCanGoDown === "true",
    };
  }

  const index = Number(root.dataset.fullpageIndex ?? 0);
  const footerRevealed = root.dataset.fullpageFooterRevealed === "true";
  const sections = document.querySelectorAll<HTMLElement>(
    ".fullpage-root > [data-fullpage-section]",
  );
  const visible = Array.from(sections).filter(
    (element) => window.getComputedStyle(element).display !== "none",
  );
  const hasFooter = Boolean(
    document.querySelector(".fullpage-root > [data-fullpage-footer]"),
  );

  return getFullpageArrowState({
    index: Number.isFinite(index) ? index : 0,
    sectionCount: visible.length,
    footerRevealed,
    hasFooter,
  });
}
