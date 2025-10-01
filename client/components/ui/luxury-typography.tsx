import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const H2 = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[-0.02em] leading-[1.15] mb-6 md:mb-8 text-luxury-black dark:text-luxury-black",
        className,
      )}
      {...props}
    />
  );
};

export const H3 = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        "text-2xl md:text-3xl font-light tracking-[-0.01em] leading-[1.25] mb-4 md:mb-6 text-luxury-black dark:text-luxury-black",
        className,
      )}
      {...props}
    />
  );
};
