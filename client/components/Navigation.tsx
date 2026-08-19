import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const routePrefetchMap: Record<string, () => Promise<unknown>> = {
  "/about": () => import("@/pages/About"),
  "/gifts": () => import("@/pages/Gifts"),
  "/journal": () => import("@/pages/Journal"),
  "/rates": () => import("@/pages/Rates"),
  "/gallery": () => import("@/pages/Gallery"),
  "/faq": () => import("@/pages/FAQ"),
  "/inquire": () => import("@/pages/Inquire"),
};

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gifts", href: "/gifts" },
  { label: "Journal", href: "/journal" },
  { label: "Rates", href: "/rates" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Inquire", href: "/inquire" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleMouseEnter = (href: string) => {
    const prefetch = routePrefetchMap[href];
    if (prefetch) {
      prefetch().catch(() => {});
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full px-4 transition-all duration-400 ease-out md:px-8",
        scrolled
          ? "bg-luxury-white/95 py-3 backdrop-blur-sm shadow-luxury-sm md:py-4"
          : "bg-luxury-white/80 py-5 backdrop-blur-sm md:py-8",
      )}
    >
      <div className="mx-auto flex max-w-luxury items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <span className="font-serif text-xl font-extralight uppercase leading-[1.1] tracking-uppercase text-luxury-black md:text-2xl">
            KATHERINE TAYLOR
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className="text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen ? (
        <div className="mt-4 border-t border-gray-200 px-2 pt-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
