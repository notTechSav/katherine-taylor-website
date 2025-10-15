export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 text-white">
      <nav
        className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="text-lg font-serif tracking-wide uppercase">
          Katherine Taylor
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-sm uppercase tracking-wider">
          <li>
            <a
              href="#about"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#rates"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              Rates
            </a>
          </li>
          <li>
            <a
              href="#journal"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="#gifts"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              Gifts
            </a>
          </li>
          <li>
            <a
              href="#sf"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              San Francisco
            </a>
          </li>
          <li>
            <a
              href="#inquiry"
              className="hover:opacity-80 transition-opacity duration-300 ease-out"
            >
              Inquiry
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </nav>
    </header>
  );
}
