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
  "/journal/memoirs-in-the-city": () => import("@/pages/JournalArticle"),
  "/sacramento-escorts": () => import("@/pages/Sacramento"),
};

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const navigationLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Rates", href: "/rates" },
  { label: "Gifts", href: "/gifts" },
  {
    label: "Journal",
    href: "/journal",
    children: [{ label: "Sacramento", href: "/sacramento-escorts" }],
  },
  { label: "FAQ", href: "/faq" },
];

const inquireHref = "/inquire";

const navLinkClass =
  "text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2";

const inquireButtonClass =
  "inline-flex items-center justify-center border border-luxury-black/25 px-4 py-2 text-sm font-light uppercase tracking-uppercase text-luxury-black transition-colors duration-250 ease-out hover:border-luxury-black hover:bg-luxury-black hover:text-luxury-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleFullPage = (event: WindowEventMap["fullpage:change"]) => {
      setScrolled(event.detail.index > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("fullpage:change", handleFullPage);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("fullpage:change", handleFullPage);
    };
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.documentElement.removeAttribute("data-menu-open");
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
      <div className="mx-auto flex max-w-luxury items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <span className="font-helvetica text-xl font-extralight uppercase leading-[1.1] tracking-uppercase text-luxury-black md:text-2xl">
            KATHERINE TAYLOR
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm font-light uppercase tracking-uppercase text-luxury-black transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <div className="hidden items-center gap-8 md:flex lg:gap-12">
          <ul className="flex items-center gap-8 lg:gap-12">
            {navigationLinks.map((link) => (
              <li key={link.label} className={link.children ? "group relative" : undefined}>
                <Link
                  to={link.href}
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  className={navLinkClass}
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <ul className="pointer-events-none absolute left-0 top-full z-50 min-w-[11rem] pt-3 opacity-0 transition-opacity duration-250 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    {link.children.map((child) => (
                      <li
                        key={child.href}
                        className="bg-luxury-white/95 py-2 shadow-luxury-sm backdrop-blur-sm"
                      >
                        <Link
                          to={child.href}
                          onMouseEnter={() => handleMouseEnter(child.href)}
                          className={cn(navLinkClass, "block px-4 py-1.5")}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <Link
            to={inquireHref}
            onMouseEnter={() => handleMouseEnter(inquireHref)}
            className={inquireButtonClass}
          >
            Inquire
          </Link>
        </div>
      </div>
      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="mt-4 border-t border-gray-200 px-2 pt-4 md:hidden"
        >
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
                {link.children ? (
                  <ul className="mb-1 ml-4 border-l border-gray-200">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 pl-4 text-sm font-light uppercase tracking-uppercase text-luxury-black/70 transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-2">
              <Link
                to={inquireHref}
                onClick={() => setIsMenuOpen(false)}
                className={cn(inquireButtonClass, "w-full py-3")}
              >
                Inquire
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
