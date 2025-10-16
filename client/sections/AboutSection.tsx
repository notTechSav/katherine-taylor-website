export default function AboutSection() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#fdfaf6]">
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center justify-center">
        {/* Image */}
        <img
          src="/about-me-hero.jpeg"
          alt="About"
          className="object-cover max-w-sm w-full mb-6"
        />

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-serif uppercase tracking-wide mb-6">
          About
        </h2>

        {/* CTA Button */}
        <a
          href="/about"
          className="text-sm uppercase border border-luxury-black px-4 py-2 transition-opacity duration-250 hover:opacity-70"
        >
          Discover
        </a>
      </div>
    </div>
  );
}
