export default function GallerySection() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-luxury-cream px-6 py-12">
      <div className="max-w-xl text-center flex flex-col items-center">
        {/* Image placeholder */}
        <img
          src="/gallery-image.jpg"
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
          className="text-sm uppercase border border-luxury-black px-4 py-2 transition-opacity duration-250 hover:opacity-70"
        >
          Explore
        </a>
      </div>
    </div>
  );
}
