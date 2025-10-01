import type {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "className">;

const createHeading = <TDefault extends ElementType>(
  defaultTag: TDefault,
  baseClasses: string,
) => {
  return <TExtends extends ElementType = TDefault>(
    { as, className, ...props }: PolymorphicProps<TExtends>,
  ) => {
    const Component = (as ?? defaultTag) as ElementType;

    return (
      <Component className={cn(baseClasses, className)} {...props} />
    );
  };
};

export const H2 = createHeading(
  "h2",
  "text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.02em] leading-[1.15] mb-6 md:mb-8 text-luxury-black dark:text-luxury-black",
);

export const H3 = createHeading(
  "h3",
  "text-2xl md:text-3xl font-light tracking-[-0.01em] leading-[1.25] mb-4 md:mb-6 text-luxury-black dark:text-luxury-black",
);
