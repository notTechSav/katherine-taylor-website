import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type HomepageVeilTone = "light" | "standard" | "strong" | "lower" | "lower-strong" | "center";

export function HomepageVeil({ tone }: { tone: HomepageVeilTone }) {
  return (
    <div className={cn("homepage-veil", `homepage-veil-${tone}`)} aria-hidden="true" />
  );
}

export function HomepageRail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("homepage-rail", className)}>{children}</div>;
}

export function HomepageEditorialStack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("homepage-editorial-stack", className)}>{children}</div>
  );
}

export function HomepageEditorialOverlay({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "homepage-overlay-bottom pointer-events-none text-white",
        className,
      )}
    >
      <HomepageRail>
        <div className="pointer-events-auto">
          <HomepageEditorialStack>{children}</HomepageEditorialStack>
        </div>
      </HomepageRail>
    </div>
  );
}
