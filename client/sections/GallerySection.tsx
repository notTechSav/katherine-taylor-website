export default function GallerySection() {
  return (
    <div className="gallery-placeholder mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-6 py-8 text-center" aria-hidden="true">
      {/* Image */}
      <img
        src="/katherinewindow.webp"
        alt="Gallery"
        className="object-cover max-w-sm w-full mb-6"
        loading="lazy"
        decoding="async"
      />

      {/* Heading */}
      <h2 className="section-heading text-2xl font-serif uppercase tracking-wide mb-6">
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
