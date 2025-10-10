'use client';

import { useCallback, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface GalleryImage {
  src: string;
  collection: "september" | "october" | "november";
}

// Dynamically generate image paths - includes ALL files
const generateImagePaths = (): GalleryImage[] => {
  const images: GalleryImage[] = [];

  // Generate all september images (1-231)
  for (let i = 1; i <= 231; i++) {
    images.push({
      src: `/gallery/september-2025/image-${i}.jpeg`,
      collection: "september"
    });
  }

  // Generate all october images (1-51)
  for (let i = 1; i <= 51; i++) {
    images.push({
      src: `/gallery/october-2025/image-${i}.jpeg`,
      collection: "october"
    });
  }

  // Generate all november images (1-6)
  for (let i = 1; i <= 6; i++) {
    images.push({
      src: `/gallery/november-2023/image-${i}.jpeg`,
      collection: "november"
    });
  }

  return images;
};

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "september" | "october" | "november">("all");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [imageFiles, setImageFiles] = useState<GalleryImage[]>([]);

  // Load actual image files dynamically
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch('/gallery/gallery-manifest.json');
        const manifest = await response.json();

        const allImages: GalleryImage[] = [
          ...(manifest.september || []).map((file: string) => ({
            src: `/gallery/september-2025/${file}`,
            collection: "september" as const
          })),
          ...(manifest.october || []).map((file: string) => ({
            src: `/gallery/october-2025/${file}`,
            collection: "october" as const
          })),
          ...(manifest.november || []).map((file: string) => ({
            src: `/gallery/november-2023/${file}`,
            collection: "november" as const
          }))
        ];

        setImageFiles(allImages);
      } catch (error) {
        console.error('Failed to load gallery manifest:', error);
      }
    };

    loadImages();
    document.title = "Gallery | Katherine Taylor";
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedFilter === "all") return imageFiles;
    return imageFiles.filter(img => img.collection === selectedFilter);
  }, [imageFiles, selectedFilter]);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const showPreviousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPreviousImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, showNextImage, showPreviousImage]);

  if (imageFiles.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#737373] font-light">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-12 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-thin text-[#1a1a1a] mb-6 tracking-tight"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-light text-[#4a4a4a] leading-relaxed max-w-2xl mx-auto mb-8"
          >
            A curated visual narrative spanning intimate portraits, elegant settings,
            and moments of refined companionship.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-light text-[#737373] uppercase tracking-wider"
          >
            {filteredImages.length} Images
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-[#737373]" />
            {[
              { label: "All Collections", value: "all" as const },
              { label: "September 2025", value: "september" as const },
              { label: "October 2025", value: "october" as const },
              { label: "November 2023", value: "november" as const }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                  selectedFilter === filter.value
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white border border-[#e8e8e5] text-[#4a4a4a] hover:border-[#1a1a1a]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.5) }}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.src}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onLoad={() => setImagesLoaded(prev => prev + 1)}
                      onError={(e) => {
                        // Hide broken images
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                      style={{ display: 'block' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#737373] font-light">No images in this collection</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-60 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
              className="absolute left-6 z-60 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[currentImageIndex]?.src}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain mx-auto"
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-6 z-60 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-light tracking-wider">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator */}
      {imagesLoaded < filteredImages.length && imagesLoaded > 0 && (
        <div className="fixed bottom-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-light text-[#737373]">
          Loading {imagesLoaded} / {filteredImages.length}
        </div>
      )}
    </div>
  );
};

export default Gallery;
