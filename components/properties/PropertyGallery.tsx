"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../layout/Container";

interface PropertyGalleryProps {
  images: string[];
  propertyTitle?: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images = [],
  propertyTitle = "Property",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const currentImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [lightboxOpen, goNext, goPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  if (images.length === 0) {
    return (
      <section
        className="py-12 md:py-16"
        aria-labelledby="gallery-heading"
      >
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[var(--soft-sand)]/40 flex items-center justify-center">
          <p className="text-[var(--charcoal)]/60 font-medium">No images available</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-6 md:py-10"
      aria-labelledby="gallery-heading"
    >
      <Container>
        <h2 id="gallery-heading" className="sr-only">
          Property image gallery
        </h2>

        {/* Hero image */}
        <div
          ref={mainImageRef}
          className="relative w-full aspect-[16/10] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-[var(--soft-sand)]/30 group cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${propertyTitle} - Image ${activeIndex + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1296px"
                quality={90}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle gradient overlay for depth */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--rocky-blue)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            aria-hidden
          />

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/90 text-sm font-medium drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIcon />
            <span>Click to expand</span>
          </div>

          {/* Image counter badge */}
          {hasMultipleImages && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium bg-white/95 text-[var(--rocky-blue)] shadow-md">
              {activeIndex + 1} / {images.length}
            </span>
          )}

          {/* Nav arrows on hero (desktop) */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-[var(--rocky-blue)] hover:bg-white transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-[var(--rocky-blue)] hover:bg-white transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {hasMultipleImages && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1">
            {images.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rocky-blue)] focus-visible:ring-offset-2 ${activeIndex === idx
                  ? "ring-2 ring-[var(--rocky-blue)] ring-offset-2"
                  : "opacity-70 hover:opacity-100"
                  }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                  quality={80}
                />
              </button>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setLightboxOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery lightbox"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <CloseIcon />
              </button>

              <div
                className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center px-4 py-16"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={`lightbox-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-h-[85vh]"
                >
                  <Image
                    src={currentImage}
                    alt={`${propertyTitle} - Image ${activeIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={95}
                  />
                </motion.div>

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon />
                    </button>
                  </>
                )}

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  {activeIndex + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

    </section>
  );
};

const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export default PropertyGallery;
