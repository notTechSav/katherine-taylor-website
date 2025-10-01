const Footer = () => {
  return (
    <footer className="bg-white py-14">
      <div className="mx-auto flex max-w-luxury flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:gap-0 md:text-left">
        <div className="flex flex-col items-center gap-1 text-xs font-light uppercase tracking-[0.35em] text-gray-600 md:flex-row md:gap-4">
          <span>T&amp;Co. 2025</span>
          <span className="flex items-center gap-1">
            <span>Change Location:</span>
            <a href="#" className="underline underline-offset-4 hover:text-gray-900">
              United States
            </a>
          </span>
        </div>
        <div className="text-3xl font-serif text-gray-900">TC</div>
        <nav aria-label="Social links">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-xs font-light uppercase tracking-[0.35em] text-gray-600">
            {[
              "Instagram",
              "Twitter",
              "Facebook",
              "YouTube",
              "Pinterest",
            ].map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-gray-900">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
