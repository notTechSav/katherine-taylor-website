import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LuxuryHeader.css';

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Rates', path: '/rates' },
  { label: 'Journal', path: '/journal' },
  { label: 'Gifts', path: '/gifts' },
  { label: 'Inquire', path: '/inquire' },
];

export default function LuxuryHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection: Add 'scrolled' class when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll lock: Prevent background scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      <nav className="desktop-nav" role="navigation" aria-label="Main navigation">
        {navItems.map(({ label, path }) => (
          <Link key={label} to={path}>{label}</Link>
        ))}
      </nav>

      <nav
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navItems.map(({ label, path }) => (
          <Link key={label} to={path} onClick={() => setIsOpen(false)}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
