import * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Route prefetch mapping for lazy-loaded pages
const routePrefetchMap: Record<string, () => Promise<any>> = {
  "/about": () => import("@/pages/About"),
  "/journal": () => import("@/pages/Journal"),
  "/gallery": () => import("@/pages/Gallery"),
  "/rates": () => import("@/pages/Rates"),
  "/gifts": () => import("@/pages/Gifts"),
  "/faq": () => import("@/pages/FAQ"),
  "/san-francisco": () => import("@/pages/SanFrancisco"),
  "/inquire": () => import("@/pages/Inquire"),
};

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rates", href: "/rates" },
  { label: "Gifts", href: "/gifts" },
  { label: "FAQ", href: "/faq" },
  { label: "San Francisco", href: "/san-francisco" },
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

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Prefetch route on hover for instant navigation
  const handleMouseEnter = (href: string) => {
    const prefetch = routePrefetchMap[href];
    if (prefetch) {
      prefetch().catch(() => {
        // Silently fail if prefetch errors
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full pl-2 pr-8 transition-all duration-400 ease-out md:pl-4",
        scrolled
          ? "bg-luxury-white/95 py-4 backdrop-blur-sm shadow-luxury-sm"
          : "bg-luxury-white/80 py-8 backdrop-blur-sm",
      )}
    >
      <div className="flex w-full items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <span className="whitespace-nowrap text-3xl font-serif font-extralight uppercase tracking-display leading-[1.1] text-luxury-black">
            KATHERINE TAYLOR
          </span>
        </a>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <ul className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onMouseEnter={() => handleMouseEnter(link.href)}
                className="text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && (
        <div className="mt-6 border-t border-gray-200 px-2 pt-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-4 text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
