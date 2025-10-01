import * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Gifts", href: "/gifts" },
  { label: "Journal", href: "/journal" },
  { label: "Rates", href: "/rates" },
  { label: "Frequently Asked Questions", href: "/faq" },
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

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full px-8 transition-all duration-luxury",
        scrolled
          ? "bg-white/95 py-4 backdrop-blur-sm shadow-luxury-sm"
          : "bg-transparent py-8",
      )}
    >
      <div className="mx-auto flex max-w-luxury items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <span className="text-3xl font-serif font-extralight uppercase tracking-[0.15em] leading-[1.1] text-luxury-black">
            KATHERINE TAYLOR
          </span>
        </a>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-sm font-light uppercase tracking-widest text-luxury-black transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <ul className="hidden items-center gap-12 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-extralight uppercase tracking-widest text-luxury-black transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
                  className="block py-4 text-2xl font-extralight tracking-tight text-luxury-black transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
