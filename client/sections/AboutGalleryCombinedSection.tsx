export default function AboutGalleryCombinedSection() {
  return (
    <div className="h-full w-full grid grid-cols-2">
      {/* Left Column: About */}
      <div className="h-full flex flex-col justify-between bg-white px-6 py-12">
        <div className="max-w-xl mx-auto flex flex-col justify-between h-full">
          {/* Image container with top padding */}
          <div className="flex justify-center pt-12">
            <img
              src="/about-me-hero.jpeg"
              alt="About"
              className="object-cover max-w-sm w-full max-h-[70vh]"
            />
          </div>

          {/* Text block - centered with bottom padding */}
          <div className="text-center pb-12">
            {/* Heading */}
            <h2 className="text-xl font-serif uppercase tracking-wider mb-6 leading-tight">
              About
            </h2>

            {/* CTA Button */}
            <a
              href="/about"
              className="inline-block text-sm uppercase border border-luxury-black px-4 py-2 mb-12 transition-opacity duration-250 hover:opacity-70"
            >
              Discover
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Gallery */}
      <div className="h-full flex flex-col justify-between bg-white px-6 py-12">
        <div className="max-w-xl mx-auto flex flex-col justify-between h-full">
          {/* Image container with top padding */}
          <div className="flex justify-center pt-12">
            <img
              src="/katherinewindow.png"
              alt="Gallery"
              className="object-cover max-w-sm w-full max-h-[70vh]"
            />
          </div>

          {/* Text block - centered with bottom padding */}
          <div className="text-center pb-12">
            {/* Heading */}
            <h2 className="text-xl font-serif uppercase tracking-wider mb-6 leading-tight">
              Gallery
            </h2>

            {/* CTA Button */}
            <a
              href="/gallery"
              className="inline-block text-sm uppercase border border-luxury-black px-4 py-2 mb-12 transition-opacity duration-250 hover:opacity-70"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
