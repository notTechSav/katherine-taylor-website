import { Link } from "react-router-dom";

type FooterLink = {
  label: string;
  to: string;
};

type FooterGroup = {
  id: string;
  label: string;
  links: FooterLink[];
};

/**
 * Covers every indexable route so no page dead-ends. Labels stay short and
 * conventional except where the destination is not obvious from its name.
 */
const footerGroups: FooterGroup[] = [
  {
    id: "footer-practice",
    label: "The Practice",
    links: [
      { label: "About", to: "/about" },
      { label: "Rates", to: "/rates" },
      { label: "Services", to: "/services" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    id: "footer-writing",
    label: "Writing",
    links: [
      { label: "The Journal", to: "/journal" },
      { label: "Memoirs in the City", to: "/journal/memoirs-in-the-city" },
      { label: "Sacramento", to: "/sacramento-escorts" },
    ],
  },
  {
    id: "footer-collections",
    label: "Collections",
    links: [
      { label: "Private Collections", to: "/gallery" },
      { label: "Gifts", to: "/gifts" },
      { label: "Maison", to: "/maison" },
    ],
  },
];

/** Matches the outline treatment used by .homepage-cta elsewhere on the site. */
const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current";

const linkClass = `text-sm font-light leading-[1.5] text-gray-600 underline-offset-4 transition-colors duration-300 hover:text-luxury-black hover:underline focus-visible:text-luxury-black ${focusRing}`;

const Footer = () => {
  return (
    <footer
      data-fullpage-footer
      tabIndex={-1}
      // Explicit because the homepage renders this inside <main>, where a bare
      // <footer> would not expose a contentinfo landmark.
      role="contentinfo"
      aria-label="Site footer"
      className="border-t border-gray-100 bg-luxury-white py-9 focus:outline-none md:py-16"
    >
      <div className="homepage-rail flex max-w-luxury flex-col gap-7 md:gap-14">
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-[22rem] space-y-2 md:space-y-3">
            <Link
              to="/"
              className={`inline-block text-base font-extralight tracking-[0.14em] text-luxury-black transition-colors duration-300 hover:text-gray-600 ${focusRing}`}
            >
              KATHERINE TAYLOR
            </Link>
            <p className="text-sm font-light leading-[1.6] text-gray-600">
              Private companionship in San Francisco and Sacramento, by
              appointment.
            </p>
            <Link
              to="/inquire"
              className={`inline-block text-sm font-light text-luxury-black underline-offset-4 transition-colors duration-300 hover:text-gray-600 hover:underline ${focusRing}`}
            >
              Inquire <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3 md:gap-x-14">
            {footerGroups.map((group) => (
              <div key={group.id}>
                <p
                  id={group.id}
                  className="text-[10px] font-light uppercase tracking-[0.18em] text-luxury-black sm:text-[11px]"
                >
                  {group.label}
                </p>
                {/* Links wrap inline on narrow screens and become a column at sm+,
                    keeping one DOM order while limiting height on small viewports. */}
                <nav aria-labelledby={group.id} className="mt-3">
                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5 sm:flex-col sm:gap-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>

        <p className="border-t border-gray-100 pt-5 text-xs font-light tracking-[0.08em] text-gray-500 md:pt-6">
          © {new Date().getFullYear()} Katherine Taylor
        </p>
      </div>
    </footer>
  );
};

export default Footer;
