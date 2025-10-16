const galleryImages = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5b9cc53f5f324d22a1f8c88faaaa270c%2Feb43c94d56914a3e9070f0803602ba8e?format=webp&width=800",
    alt: "Portrait of Katherine Taylor in tailored attire",
  },
  {
    src: "/gallery-third.png",
    alt: "Katherine Taylor in elegant red evening gown",
  },
  {
    src: "/katherinewindow.png",
    alt: "Katherine Taylor in elegant white shirt and black attire",
  },
  {
    src: "/glam2.jpeg",
    alt: "Katherine Taylor glamour portrait",
  },
];

export default function GalleryPreviewSection() {
  return (
    <div className="h-full w-full flex items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full">
        {galleryImages.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
