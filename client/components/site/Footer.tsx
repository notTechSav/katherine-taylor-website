import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      data-fullpage-footer
      tabIndex={-1}
      className="border-t border-gray-100 bg-luxury-white py-16 focus:outline-none"
    >
      <div className="homepage-rail flex max-w-luxury flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm font-light tracking-wide text-gray-600">
          © 2026 Katherine Taylor
        </p>
        <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <Link
            to="/inquire"
            className="text-sm font-light tracking-wide text-gray-600 transition-colors hover:text-gray-900 focus-visible:text-gray-900"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
