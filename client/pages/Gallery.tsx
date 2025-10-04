'use client';

import { useCallback, useMemo, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  aspect: "landscape" | "portrait";
  size: "large" | "medium" | "tall";
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/gallery/pool-hero.webp",
    alt: "Pool setting golden hour",
    aspect: "landscape",
    size: "large",
  },
  {
    src: "/gallery/window-bw.webp",
    alt: "Natural light portrait",
    aspect: "portrait",
    size: "medium",
  },
  {
    src: "/gallery/red-stairs.webp",
    alt: "Formal elegance",
    aspect: "portrait",
    size: "tall",
  },
  {
    src: "/gallery/evening-pool.webp",
    alt: "Evening setting",
    aspect: "landscape",
    size: "medium",
  },
  {
    src: "/gallery/business-bw.webp",
    alt: "Professional portrait",
    aspect: "portrait",
    size: "medium",
  },
  {
    src: "/gallery/bathroom-pink.webp",
    alt: "Intimate setting",
    aspect: "portrait",
    size: "tall",
  },
  {
    src: "/gallery/pool-robe.webp",
    alt: "Movement and elegance",
    aspect: "landscape",
    size: "large",
  },
  {
    src: "/gallery/leather-jacket.webp",
    alt: "Contemporary style",
    aspect: "portrait",
    size: "medium",
  },
  {
    src: "/gallery/fur-bw.webp",
    alt: "Timeless elegance",
    aspect: "portrait",
    size: "medium",
  },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalImages = GALLERY_IMAGES.length;

  const heroImage = useMemo(() => GALLERY_IMAGES[0], []);
  const gridImages = useMemo(() => GALLERY_IMAGES.slice(1), []);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const showPreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto mb-16 max-w-2xl text-left">
          <h1 className="mb-8 text-[2.75rem] font-extralight leading-[1.15] tracking-[0.02em] text-neutral-900 md:text-6xl">
            Gallery
          </h1>
          <p className="text-[1.0625rem] font-light leading-[1.85] tracking-[0.01em] text-neutral-700">
            A curated visual narrative. Each image represents a moment of refined companionship—from intimate settings to formal elegance.
          </p>
        </div>

        <div className="mx-auto mb-20 max-w-6xl">
          <div
            className="group relative w-full cursor-pointer overflow-hidden"
            style={{ height: "70vh", minHeight: "500px", maxHeight: "800px" }}
            onClick={() => openLightbox(0)}
            aria-label={heroImage.alt}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "Space" ||
                event.key === "Spacebar"
              ) {
                event.preventDefault();
                openLightbox(0);
              }
            }}
          >
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)" }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {gridImages.map((image, index) => {
              const actualIndex = index + 1;

              return (
                <div
                  key={image.src}
                  className={`
                    group relative cursor-pointer overflow-hidden
                    ${image.size === "tall" ? "md:row-span-2" : ""}
                    ${image.size === "large" ? "md:col-span-2" : ""}
                  `}
                  style={{
                    aspectRatio: image.aspect === "landscape" ? "16 / 9" : "3 / 4",
                    minHeight: image.size === "tall" ? "600px" : "400px",
                  }}
                  onClick={() => openLightbox(actualIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " " ||
                      event.key === "Space" ||
                      event.key === "Spacebar"
                    ) {
                      event.preventDefault();
                      openLightbox(actualIndex);
                    }
                  }}
                  aria-label={image.alt}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)" }}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-5"
                    style={{ boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.1)" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-8 top-8 z-[60] text-4xl font-extralight text-white transition-opacity duration-300 hover:opacity-70"
            aria-label="Close lightbox"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-8 z-[60] text-4xl font-extralight text-white transition-opacity duration-300 hover:opacity-70"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className="relative flex h-full w-full max-w-7xl items-center justify-center px-6 md:px-20"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={GALLERY_IMAGES[currentImageIndex].src}
              src={GALLERY_IMAGES[currentImageIndex].src}
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="max-h-[90vh] w-auto object-contain"
              style={{ animation: "gallery-fade-in 0.5s ease-in-out" }}
              loading="eager"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="absolute right-8 z-[60] text-4xl font-extralight text-white transition-opacity duration-300 hover:opacity-70"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-sm font-light tracking-[0.08em] text-white">
            {currentImageIndex + 1} / {totalImages}
          </div>
        </div>
      ) : null}

      <style>{`
        @keyframes gallery-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
