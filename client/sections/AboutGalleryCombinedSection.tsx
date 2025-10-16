export default function AboutGalleryCombinedSection() {
  return (
    <div className="h-full w-full hidden md:grid md:grid-cols-2">
      {/* Left Column: About */}
      <div className="h-full flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-xl mx-auto">
          {/* Image container with padding */}
          <div className="flex justify-center pt-12 mb-8">
            <img
              src="/about-me-hero.jpeg"
              alt="About"
              className="object-cover max-w-sm w-full max-h-[80vh]"
            />
          </div>

          {/* Text block - centered */}
          <div className="text-center pb-12">
            {/* Heading */}
            <h2 className="text-xl sm:text-3xl font-serif uppercase tracking-wide mb-6">
              About
            </h2>

            {/* CTA Button */}
            <a
              href="/about"
              className="inline-block text-sm uppercase border border-luxury-black px-4 py-2 mb-6 transition-opacity duration-250 hover:opacity-70"
            >
              Discover
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Gallery */}
      <div className="h-full flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-xl mx-auto">
          {/* Image container with padding */}
          <div className="flex justify-center pt-12 mb-8">
            <img
              src="/katherinewindow.png"
              alt="Gallery"
              className="object-cover max-w-sm w-full max-h-[80vh]"
            />
          </div>

          {/* Text block - centered */}
          <div className="text-center pb-12">
            {/* Heading */}
            <h2 className="text-xl sm:text-3xl font-serif uppercase tracking-wide mb-6">
              Gallery
            </h2>

            {/* CTA Button */}
            <a
              href="/gallery"
              className="inline-block text-sm uppercase border border-luxury-black px-4 py-2 mb-6 transition-opacity duration-250 hover:opacity-70"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
