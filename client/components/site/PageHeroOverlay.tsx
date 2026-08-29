import { memo, type ElementType } from "react";

import { builderHeroAttrs } from "@/lib/builder-image";
import { cn } from "@/lib/utils";

type PageHeroOverlayProps = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  alignment?: "left" | "right";
  gradient?: "horizontal" | "vertical";
  headingAs?: "h1" | "h2" | "p";
  className?: string;
  imageClassName?: string;
};

const horizontalGradients = {
  left: "linear-gradient(90deg, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.5) 35%, rgba(17,17,17,0.1) 70%, rgba(17,17,17,0) 100%)",
  right:
    "linear-gradient(270deg, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.5) 35%, rgba(17,17,17,0.1) 70%, rgba(17,17,17,0) 100%)",
};

const verticalGradient =
  "linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.65) 100%)";

const PageHeroOverlay = memo(
  ({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    eyebrow,
    alignment = "left",
    gradient = "horizontal",
    headingAs = "h1",
    className,
    imageClassName,
  }: PageHeroOverlayProps) => {
    const Heading = headingAs as ElementType;
    const heroImage = builderHeroAttrs(imageSrc);
    const gradientStyle =
      gradient === "horizontal"
        ? {
            background:
              alignment === "right"
                ? horizontalGradients.right
                : horizontalGradients.left,
          }
        : { background: verticalGradient };

    const desktopJustify =
      alignment === "right" ? "sm:justify-end" : "sm:justify-start";
    const textAlignment = alignment === "right" ? "sm:text-right" : "text-left";
    const containerAlignment =
      alignment === "right" ? "sm:ml-auto sm:mr-0" : "sm:mr-auto sm:ml-0";

    return (
      <section className={cn("relative bg-luxury-white", className)}>
        <figure className="relative h-[48vh] min-h-[320px] w-full overflow-hidden bg-luxury-black sm:h-[56vh]">
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes={heroImage.sizes}
            alt={imageAlt}
            className={cn(
              "h-full w-full object-cover object-left sm:object-center",
              imageClassName,
            )}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0" style={gradientStyle} aria-hidden />

          <figcaption className="pointer-events-none absolute inset-0 flex items-end">
            <div
              className={cn(
                "w-full px-6 pb-10 sm:max-w-[1120px] sm:px-12 sm:pb-8 lg:px-16 lg:pb-10",
                containerAlignment,
              )}
            >
              <div className={cn("flex w-full", desktopJustify)}>
                <div
                  className={cn(
                    "max-w-xl text-luxury-white",
                    textAlignment,
                  )}
                >
                  {eyebrow ? (
                    <p
                      className="mb-2 text-xs font-light uppercase tracking-[0.12em] text-luxury-white/75 sm:mb-3"
                      style={{ letterSpacing: "0.12em" }}
                    >
                      {eyebrow}
                    </p>
                  ) : null}
                  <Heading
                    className="text-[32px] font-extralight leading-[1.15] tracking-[-0.02em] text-luxury-white sm:text-4xl sm:leading-[1.08] sm:text-[50px]"
                    style={{ fontWeight: 200 }}
                  >
                    {title}
                  </Heading>
                  <p className="mt-4 text-sm font-light leading-[1.8] text-luxury-white/80 sm:mt-5 sm:text-base">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </section>
    );
  },
);

PageHeroOverlay.displayName = "PageHeroOverlay";

export default PageHeroOverlay;
