export default function GallerySection() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#fdfaf6] px-6">
      <div className="flex flex-col items-center justify-center">
        {/* Image */}
        <img
          src="/katherinewindow.png"
          alt="Gallery"
          className="object-cover max-w-sm w-full mb-6"
        />

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-serif uppercase tracking-wide mb-6">
          Gallery
        </h2>

        {/* CTA Button */}
        <a
          href="/gallery"
          className="text-sm uppercase border border-luxury-black px-4 py-2 mb-6 transition-opacity duration-250 hover:opacity-70"
        >
          Explore
        </a>
      </div>
    </div>
  );
}
