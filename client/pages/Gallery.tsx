'use client';

import { useCallback, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface GalleryImage {
  src: string;
  collection: "september" | "october" | "november" | "all";
  aspectRatio: number;
}

// Generate image list from your actual photos
const generateImageList = (): GalleryImage[] => {
  const september = [
    "07E9A486-7181-4B03-883D-70ABE83536A4_1_201_a-min-1125x1536.jpeg.jpeg",
    "0F8B1850-8CEA-4F9F-BB0C-1E4F3A6F2339-min-1024x1536.jpeg.jpeg",
    "1CA72454-1E5B-4AD2-8704-DEE0D30C9139-1024x1536.jpeg.jpeg",
    "340CB14F-D012-40A0-8644-7928C205C337-1024x1536.jpeg.jpeg",
    "34E15453-C3C6-43A9-9F09-1B393326A503-1024x1536.jpeg.jpeg",
    "3EE7AF93-6754-42E8-BA73-0DD6861C2DCA-min-1024x1536.jpeg.jpeg",
    "45621B08-EC99-41C6-BB68-5C21E14C3E15-min-1366x2048.jpeg.jpeg",
    "5131CDA7-003C-408E-A16E-152471F897C5-min-1024x1536.jpeg.jpeg",
    "53ABCECB-5A5B-455A-BA16-B048EA52675A-min-1365x2048.jpeg.jpeg",
    "5E31700D-65AA-48E6-A2AD-621330224F1C-1024x1536.jpeg.jpeg",
    "70C00768-4908-4B32-822D-DFC11359553B-min-1-2048x1366.jpeg.jpeg",
    "747793C5-79E3-41D5-B1A8-BCEFDE448537-min-1024x1536.jpeg.jpeg",
    "769E797F-26DF-444B-9621-1F3633F1CDEC-min-1366x2048.jpeg.jpeg",
    "80C5738F-B77B-420F-9E23-B0B9CCAF4B372-min-1536x1024.jpeg.jpeg",
    "86186649-3656-4891-B026-CF89AAD42882-min-1024x1536.jpeg.jpeg",
    "877F634C-3596-4BC8-998E-4325E2027EED-min-1366x2048.jpeg.jpeg",
    "93355EC9-560E-4CD5-8B4D-89055E98BC37-1024x1536.jpeg.jpeg",
    "B7624A51-E11F-44C7-81B4-78E8930388C4-min-1365x2048.jpeg.jpeg",
    "BD318A36-5D58-4052-8342-F9213E36A07E-min-1024x1536.jpeg.jpeg",
    "CE282613-EEA4-4A9C-BFB0-7DF37A398669-min-1024x1536.jpeg.jpeg",
    "E2F3183E-3A2D-4A28-ABE5-7E6D24CF086B-min-1365x2048.jpeg.jpeg",
    "E9B60B18-B0DC-4A4E-8141-7BA81C0B4AA9-min-1365x2048.jpeg.jpeg",
    "F37E0445-8D5A-4479-93AC-2948F12F4117-min-1365x2048.jpeg.jpeg",
    "FBA9C3EE-279D-49AD-A5A2-702403E09F61-min-1365x2048.jpeg.jpeg",
    "Kat-Taylor1-scaled.jpeg",
    "Kat-Taylor10-1365x2048.jpeg",
    "Kat-Taylor11-1365x2048.jpeg",
    "Kat-Taylor12-scaled-600x900.jpeg",
    "Kat-Taylor13-1365x2048.jpeg",
    "Kat-Taylor14-1365x2048.jpeg",
    "Kat-Taylor16-1024x1536.jpeg",
    "Kat-Taylor17-1024x1536.jpeg",
    "Kat-Taylor18-1365x2048.jpeg",
    "Kat-Taylor19-1024x1536.jpeg",
    "Kat-Taylor2-1024x683.jpeg",
    "Kat-Taylor20-1365x2048.jpeg",
    "Kat-Taylor21-1024x1536.jpeg",
    "Kat-Taylor22-1365x2048.jpeg",
    "Kat-Taylor24-683x1024.jpeg",
    "Kat-Taylor25-scaled-600x900.jpeg",
    "Kat-Taylor26-700x700.jpeg",
    "Kat-Taylor3-683x1024.jpeg",
    "Kat-Taylor4-1024x683.jpeg",
    "Kat-Taylor5-1024x683.jpeg",
    "Kat-Taylor6-1365x2048.jpeg",
    "Kat-Taylor7-scaled-600x900.jpeg",
    "Kat-Taylor8-1024x683.jpeg",
    "Kat-Taylor9-1024x1536.jpeg"
  ].map(name => ({
    src: `/gallery/september-2025/${name}`,
    collection: "september" as const,
    aspectRatio: name.includes("1536x1024") || name.includes("2048x1366") || name.includes("683x1024") || name.includes("1024x683") ? 3/2 : 2/3
  }));

  const october = [
    "MayaGala0527202440596-1024x1536.jpg.jpeg",
    "MayaGala0527202440631-scaled.jpg.jpeg",
    "MayaGala0527202440689-1024x1536.jpg.jpeg",
    "MayaGala0527202440739-1366x2048.jpg.jpeg",
    "MayaGala0527202441004-1024x1536.jpg.jpeg",
    "MayaGala0527202441102-1024x1536.jpg.jpeg",
    "MayaGala0527202441132-1365x2048.jpg.jpeg",
    "MayaGala0527202441156-1024x1536.jpg.jpeg",
    "MayaGala0527202441169-1024x1536.jpg.jpeg",
    "MayaGala0527202441215-1024x1536.jpg.jpeg",
    "MayaGala0527202441245-1024x1536.jpg.jpeg",
    "MayaGala0527202441311-1024x1536.jpg.jpeg",
    "MayaGala0527202441348-683x1024.jpg.jpeg",
    "MayaGala0527202441387-1024x1536.jpg.jpeg",
    "MayaGala0527202441414-1024x1536.jpg.jpeg",
    "MayaGala0527202441445-scaled.jpg.jpeg",
    "MayaGala0527202441506-scaled.jpg.jpeg"
  ].map(name => ({
    src: `/gallery/october-2025/${name}`,
    collection: "october" as const,
    aspectRatio: name.includes("683x1024") ? 3/2 : 2/3
  }));

  const november = [
    "Kat-Taylor15.jpeg",
    "Kat-Taylor16.jpeg",
    "Kat-Taylor17.jpeg",
    "Kat-Taylor18.jpeg",
    "Kat-Taylor19.jpeg",
    "Kat-Taylor21.jpeg"
  ].map(name => ({
    src: `/gallery/november-2023/${name}`,
    collection: "november" as const,
    aspectRatio: 2/3
  }));

  return [...september, ...october, ...november];
};

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "september" | "october" | "november">("all");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const allImages = useMemo(() => generateImageList(), []);

  const filteredImages = useMemo(() => {
    if (selectedFilter === "all") return allImages;
    return allImages.filter(img => img.collection === selectedFilter);
  }, [allImages, selectedFilter]);

  useEffect(() => {
    document.title = "Gallery | Katherine Taylor";
  }, []);

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
                  transition={{ duration: 0.3, delay: index * 0.02 }}
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
      {imagesLoaded < filteredImages.length && (
        <div className="fixed bottom-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-light text-[#737373]">
          Loading {imagesLoaded} / {filteredImages.length}
        </div>
      )}
    </div>
  );
};

export default Gallery;
