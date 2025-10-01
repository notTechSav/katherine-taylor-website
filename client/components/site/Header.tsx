import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Fragment } from "react";

const collectionLinks = [
  "Collections",
  "High Jewelry",
  "Jewelry",
  "Watches",
  "La Maison",
];

export const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white py-8 px-8">
      <div className="mx-auto flex max-w-luxury items-center justify-between">
        <a href="/" className="transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-70">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </a>
        <ul className="flex items-center gap-12">
          {collectionLinks.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-sm font-light uppercase tracking-widest transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60"
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="text-sm font-light uppercase tracking-widest transition-opacity duration-luxury-fast ease-luxury-in hover:opacity-60"
            >
              Book Appointment
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
