import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: {
    href: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  };
};

const baseClasses =
  "inline-flex items-center justify-center px-12 py-5 text-sm font-light uppercase tracking-[0.15em] rounded-[2px] bg-luxury-black text-white hover:bg-gray-900 transition-colors duration-300 ease-[cubic-bezier(0,0,0.58,1)] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const PrimaryButton = ({ asLink, className, children, ...props }: ButtonProps) => {
  const combined = cn(baseClasses, className);

  if (asLink) {
    const { href, target = "_self" } = asLink;

    return (
      <a href={href} target={target} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;
