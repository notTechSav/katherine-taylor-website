export default function AboutGalleryCombinedSection() {
  return (
    <div className="h-full w-full hidden md:grid md:grid-cols-2">
      {/* Left Column: About (Cream) */}
      <div className="h-full flex items-center justify-center bg-luxury-cream px-6">
        <div className="max-w-xl text-center flex flex-col items-center">
          {/* Image placeholder */}
          <img
            src="/about-image.jpg"
            alt="About"
            className="object-cover max-w-sm w-full mb-6"
          />

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-wide mb-6">
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

      {/* Right Column: Gallery (White) */}
      <div className="h-full flex items-center justify-center bg-white px-6">
        <div className="max-w-xl text-center flex flex-col items-center">
          {/* Image placeholder */}
          <img
            src="/gallery-image.jpg"
            alt="Gallery"
            className="object-cover max-w-sm w-full mb-6"
          />

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-serif uppercase tracking-wide mb-6">
            Gallery
          </h2>

          {/* CTA Button */}
          <a
            href="/gallery"
            className="text-sm uppercase border border-luxury-black px-4 py-2 transition-opacity duration-250 hover:opacity-70"
          >
            Explore
          </a>
        </div>
      </div>
    </div>
  );
}
