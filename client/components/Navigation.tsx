import * as React from "react";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white px-8 py-8">
      <div className="mx-auto flex max-w-luxury items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Cartier" className="h-8 w-auto" />
          <span className="sr-only">Cartier</span>
        </a>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                  className="block text-sm font-extralight uppercase tracking-widest text-muted-foreground transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60"
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
