export default function GallerySection() {
  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto px-6 py-8">
      {/* Image */}
      <img
        src="/katherinewindow.png"
        alt="Gallery"
        className="object-cover max-w-sm w-full mb-6"
      />

      {/* Heading */}
      <h2 className="text-2xl font-serif uppercase tracking-wide mb-6">
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
  );
}
