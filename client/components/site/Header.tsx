import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Fragment } from "react";

const utilityLinks = ["United States", "Contact Us", "Services"];

const collectionLinks = [
  "High Jewelry",
  "Jewelry",
  "Watches",
  "Bags and Accessories",
  "Fragrances",
  "Home & Stationery",
  "News",
  "La Maison",
];

const iconButtons = [
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Favorites" },
  { icon: User, label: "Account" },
  { icon: ShoppingBag, label: "Bag" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur-md">
      <div className="hidden border-b border-border/60 bg-white/80 px-6 py-3 text-[0.6rem] uppercase tracking-[0.42em] text-muted-foreground/90 md:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div className="flex items-center gap-6">
            {utilityLinks.map((item) => (
              <button
                key={item}
                type="button"
                className="transition-colors hover:text-foreground"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 text-muted-foreground/80">
            <span>Newsletter</span>
            <span>Boutiques</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-6 pt-8">
        <div className="flex w-full items-center justify-between gap-6">
          <div className="hidden flex-1 md:flex" />
          <div className="flex flex-none items-center justify-center">
            <span className="font-brand text-5xl tracking-[0.08em] text-foreground">Cartier</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 text-foreground/80">
            {iconButtons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="hidden rounded-full p-2 transition-colors hover:bg-secondary/60 hover:text-foreground md:flex"
              >
                <Icon className="h-5 w-5" strokeWidth={1.2} />
              </button>
            ))}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-xs uppercase tracking-[0.3em] md:hidden"
            >
              Menu
            </button>
          </div>
        </div>

        <nav className="mt-6 hidden w-full items-center justify-center gap-8 text-[0.68rem] uppercase tracking-[0.38em] text-foreground/80 md:flex">
          {collectionLinks.map((item, index) => (
            <Fragment key={item}>
              <button
                type="button"
                className="transition-colors hover:text-foreground"
              >
                {item}
              </button>
              {index !== collectionLinks.length - 1 && (
                <span className="text-foreground/40">|</span>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
