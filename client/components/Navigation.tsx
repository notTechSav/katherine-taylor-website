import * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const navigationLinks = [
  { label: "Collections", href: "/collections" },
  { label: "High Jewelry", href: "/collections/high-jewelry" },
  { label: "Jewelry", href: "/collections/jewelry" },
  { label: "Watches", href: "/collections/watches" },
  { label: "Bags & Accessories", href: "/collections/bags-and-accessories" },
  { label: "Fragrances", href: "/collections/fragrances" },
  { label: "La Maison", href: "/maison" },
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
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Cartier" className="h-8" />
          <span className="sr-only">Cartier</span>
        </a>
        <button
          type="button"
          onClick={toggleMenu}
          className="text-sm font-light uppercase tracking-widest text-foreground transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60 md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <ul className="hidden items-center gap-12 md:flex">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-extralight uppercase tracking-widest text-foreground transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && (
        <div className="mt-6 border-t border-border/60 px-2 pt-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-4 text-2xl font-extralight tracking-tight text-foreground transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60"
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
