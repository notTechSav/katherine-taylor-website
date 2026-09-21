import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  "text-sm font-light uppercase tracking-uppercase transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2";

const inquireButtonClass =
  "inline-flex items-center justify-center border px-4 py-2 text-sm font-light uppercase tracking-uppercase transition-colors duration-250 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2";

const Navigation = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inverseSurface =
    !isMenuOpen &&
    !scrolled &&
    (pathname === "/" || pathname.startsWith("/film/"));

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
  }, [pathname]);

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

  const linkTone = inverseSurface
    ? "text-white focus:ring-white/50 focus:ring-offset-0"
    : "text-luxury-black focus:ring-gray-300 focus:ring-offset-2";
  const inquireTone = inverseSurface
    ? "border-white/70 text-white hover:border-white hover:bg-white hover:text-luxury-black focus:ring-white/50 focus:ring-offset-0"
    : "border-luxury-black/25 text-luxury-black hover:border-luxury-black hover:bg-luxury-black hover:text-luxury-white focus:ring-gray-300 focus:ring-offset-2";

  return (
    <nav
      data-site-nav
      data-nav-inverse={inverseSurface ? "" : undefined}
      className={cn(
        "fixed top-0 z-50 w-full px-4 transition-colors duration-400 ease-out md:px-8",
        isMenuOpen
          ? "h-dvh overflow-y-auto bg-luxury-white py-5 md:h-auto md:overflow-visible"
          : inverseSurface
            ? "bg-transparent py-5 md:py-8"
            : "border-b border-luxury-black/10 bg-luxury-white py-3 md:py-4",
      )}
    >
      <div className="mx-auto flex max-w-luxury items-center justify-between gap-4 sm:gap-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/"
            className={cn(
              "flex items-center focus:outline-none focus:ring-2",
              linkTone,
            )}
          >
            <span
              className={cn(
                "font-helvetica whitespace-nowrap text-[clamp(0.95rem,4.2vw,1.5rem)] font-extralight uppercase leading-none tracking-uppercase md:text-2xl",
                inverseSurface ? "text-white" : "text-luxury-black",
              )}
            >
              KATHERINE TAYLOR
            </span>
          </Link>
          <a
            href="https://preferred411.com/admirer/register?ref=191346"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Preferred411.com"
            className={cn(
              "inline-flex shrink-0 opacity-90 transition-opacity duration-250 ease-out hover:opacity-100 focus:outline-none focus:ring-2",
              inverseSurface
                ? "drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] focus:ring-white/50 focus:ring-offset-0"
                : "focus:ring-gray-300 focus:ring-offset-2",
            )}
          >
            <img
              src="https://preferred411.com/a/preferredSeal-bw-1.png"
              alt=""
              width={22}
              height={24}
              className="h-6 w-[1.375rem]"
            />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className={cn(
            "inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm font-light uppercase tracking-uppercase transition-opacity duration-250 ease-out hover:opacity-60 focus:outline-none focus:ring-2 md:hidden",
            linkTone,
          )}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <div className="hidden items-center gap-6 md:flex lg:gap-10">
          <ul className="flex items-center gap-6 lg:gap-10">
            {navigationLinks.map((link) => (
              <li key={link.label} className={link.children ? "group relative" : undefined}>
                <Link
                  to={link.href}
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  className={cn(navLinkClass, linkTone)}
                >
                  {link.label}
                </Link>
                {link.children ? (
                  <ul className="pointer-events-none absolute left-0 top-full z-50 min-w-[11rem] pt-3 opacity-0 transition-opacity duration-250 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                    {link.children.map((child) => (
                      <li
                        key={child.href}
                        className="border border-luxury-black/10 bg-luxury-white py-2"
                      >
                        <Link
                          to={child.href}
                          onMouseEnter={() => handleMouseEnter(child.href)}
                          className={cn(
                            navLinkClass,
                            "block px-4 py-1.5 text-luxury-black focus:ring-gray-300 focus:ring-offset-2",
                          )}
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
            className={cn(inquireButtonClass, inquireTone)}
          >
            Inquire
          </Link>
        </div>
      </div>
      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="mt-4 flex flex-1 flex-col border-t border-gray-200 bg-luxury-white px-2 pt-6 md:hidden"
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
                className={cn(
                  inquireButtonClass,
                  "w-full border-luxury-black/25 py-3 text-luxury-black hover:border-luxury-black hover:bg-luxury-black hover:text-luxury-white focus:ring-gray-300",
                )}
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
