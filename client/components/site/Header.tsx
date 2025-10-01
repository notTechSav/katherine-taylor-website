import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

const utilityLinks = [
  { label: "United States", href: "/country/united-states" },
  { label: "Contact Us", href: "/contact" },
  { label: "Services", href: "/services" },
];

const collectionLinks = [
  { label: "High Jewelry", href: "/collections/high-jewelry" },
  { label: "Jewelry", href: "/collections/jewelry" },
  { label: "Watches", href: "/collections/watches" },
  { label: "Bags and Accessories", href: "/collections/bags-and-accessories" },
  { label: "Fragrances", href: "/collections/fragrances" },
  { label: "Home & Stationery", href: "/collections/home-and-stationery" },
  { label: "News", href: "/maison/news" },
  { label: "La Maison", href: "/maison" },
];

const iconButtons = [
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: User, label: "Account", href: "/account" },
  { icon: ShoppingBag, label: "Bag", href: "/bag" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return ({
    <header className="relative sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur">
      <div className="hidden border-b border-border/40 bg-muted/20 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground md:block">
        <div className="mx-auto flex max-w-luxury items-center justify-between px-10 py-3">
          <ul className="flex items-center gap-6">
            {utilityLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/appointments"
            className="tracking-[0.45em] transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70"
          >
            Book an Appointment
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-luxury items-center justify-between px-6 py-6 md:px-10">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition duration-200 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <a
          href="/"
          className="text-xl font-light uppercase tracking-[0.65em] text-foreground transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70"
        >
          Cartier
        </a>
        <nav className="hidden items-center gap-10 uppercase tracking-[0.45em] md:flex">
          {collectionLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-light transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 md:gap-4">
          {iconButtons.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-muted-foreground transition duration-200 hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <nav className="md:hidden">
        <div className="mx-auto max-w-luxury px-6 pb-6">
          {mobileMenuOpen && (
            <ul className="flex flex-col gap-4 border-t border-border/60 pt-6 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              {collectionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-1 transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;