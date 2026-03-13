"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Container from "../layout/Container";

interface PropertyGalleryProps {
  images: string[];
  propertyTitle?: string;
  propertySubtitle?: string;
}

const THUMB_W = 96; // thumb width (88px) + gap (8px)

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images = [],
  propertyTitle = "Property",
  propertySubtitle = "",
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [lightboxFading, setLightboxFading] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Track container width to compute exactly how many thumbs fit
  const trackRef = useRef<HTMLDivElement>(null);
  const [visibleThumbs, setVisibleThumbs] = useState(6);

  const touchStartX = useRef(0);
  const thumbTouchX = useRef(0);
  const lightboxTouchX = useRef(0);
  const lightboxThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // ─── Measure track to get exact visible count ──────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const width = trackRef.current.clientWidth;
        // Each thumb is 88px wide + 8px gap = 96px, except the last has no trailing gap
        const count = Math.floor((width + 8) / THUMB_W);
        setVisibleThumbs(Math.max(1, count));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // ─── Derived slider bounds ─────────────────────────────────────────────────
  // maxOffset: how many steps we can shift before the last thumb aligns to the right edge.
  // If all images fit in view, maxOffset = 0 → arrows stay disabled.
  const maxOffset = Math.max(0, images.length - visibleThumbs);
  const canSlidePrev = sliderOffset > 0;
  const canSlideNext = sliderOffset < maxOffset;
  const showArrows = maxOffset > 0; // hide arrows entirely when not needed

  const slide = useCallback(
    (dir: number) => {
      setSliderOffset((prev) => Math.max(0, Math.min(maxOffset, prev + dir)));
    },
    [maxOffset]
  );

  // ─── Hero switcher — fade out → swap src → fade in ────────────────────────
  const selectImage = useCallback(
    (idx: number) => {
      if (idx === activeIdx) return;
      setFading(true);
      setTimeout(() => {
        setActiveIdx(idx);
        setFading(false);
      }, 180);
    },
    [activeIdx]
  );

  // ─── Thumbnail click: update hero + highlight, do NOT open lightbox ────────
  const handleThumbClick = useCallback(
    (i: number) => {
      selectImage(i);
    },
    [selectImage]
  );

  // ─── Lightbox ─────────────────────────────────────────────────────────────
  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    setZoomed(false);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomed(false);
  }, []);

  // Navigate inside lightbox AND sync hero + thumbnail highlight
  const lightboxNav = useCallback(
    (dir: number) => {
      if (zoomed) return;
      const next = (lightboxIdx + dir + images.length) % images.length;
      setLightboxFading(true);
      setTimeout(() => {
        setLightboxIdx(next);
        setLightboxFading(false);
        // ── Sync hero image and thumbnail highlight to lightbox position ──
        setActiveIdx(next);
        // Auto-scroll lightbox thumb strip so the active thumb stays visible
        if (lightboxThumbRef.current) {
          const thumbEl = lightboxThumbRef.current.children[next] as HTMLElement;
          thumbEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }, 160);
    },
    [lightboxIdx, images.length, zoomed]
  );

  // Lightbox thumb click — same sync
  const handleLightboxThumbClick = useCallback(
    (i: number) => {
      if (i === lightboxIdx) return;
      setLightboxFading(true);
      setTimeout(() => {
        setLightboxIdx(i);
        setActiveIdx(i); // keep hero in sync
        setLightboxFading(false);
      }, 160);
    },
    [lightboxIdx]
  );

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxNav(-1);
      if (e.key === "ArrowRight") lightboxNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, lightboxNav, closeLightbox]);

  // ─── Body scroll lock ─────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!isHydrated) {
    return (
      <section className="py-6 md:py-10" aria-label="Property gallery">
        <Container>
          <div
            className="rounded-2xl bg-gray-100"
            style={{ height: "clamp(280px, 48vw, 520px)" }}
          />
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="py-6 md:py-10" aria-label="Property gallery">
        <Container>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-md cursor-zoom-in"
            onClick={() => openLightbox(activeIdx)}
          >
            <img
              src={images[activeIdx]}
              alt={`${propertyTitle} - image ${activeIdx + 1}`}
              className="w-full object-cover"
              style={{
                height: "clamp(280px, 48vw, 520px)",
                transition: "opacity 0.35s ease",
                opacity: fading ? 0 : 1,
              }}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  // Touch swipe on hero: update hero only, no lightbox
                  selectImage(
                    diff > 0
                      ? Math.min(activeIdx + 1, images.length - 1)
                      : Math.max(activeIdx - 1, 0)
                  );
                }
              }}
            />

            {/* Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
              <div className="text-white drop-shadow-lg">
                {/* <p className="text-xl md:text-2xl font-medium leading-tight">
                  {propertyTitle}
                </p> */}
                {propertySubtitle && (
                  <p className="text-sm mt-0.5 opacity-90">{propertySubtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                {activeIdx + 1} / {images.length}
              </div>
            </div>

            {/* Expand hint */}
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white rounded-lg p-1.5 pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </div>
          </div>

          {/* ── Thumbnail Slider ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mt-3">
            {/* Left Arrow — hidden when not scrollable */}
            {showArrows ? (
              <button
                onClick={() => slide(-2)}
                disabled={!canSlidePrev}
                aria-label="Previous thumbnails"
                className="w-9 h-9 flex-shrink-0 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
            ) : (
              <div className="w-9 flex-shrink-0" /> // spacer keeps layout stable
            )}

            {/* Track */}
            <div ref={trackRef} className="flex-1 overflow-hidden">
              <div
                className="flex gap-2 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${sliderOffset * THUMB_W}px)` }}
                onTouchStart={(e) => {
                  thumbTouchX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const diff = thumbTouchX.current - e.changedTouches[0].clientX;
                  if (Math.abs(diff) > 40) slide(diff > 0 ? 2 : -2);
                }}
              >
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => handleThumbClick(i)}
                    className="flex-shrink-0 object-cover rounded-lg cursor-pointer transition-transform duration-150 hover:scale-105"
                    style={{
                      width: 88,
                      height: 68,
                      border:
                        i === activeIdx
                          ? "2.5px solid #3B82F6"
                          : "2.5px solid transparent",
                      boxShadow:
                        i === activeIdx ? "0 0 0 2px #BFDBFE" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right Arrow — hidden when not scrollable */}
            {showArrows ? (
              <button
                onClick={() => slide(2)}
                disabled={!canSlideNext}
                aria-label="Next thumbnails"
                className="w-9 h-9 flex-shrink-0 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            ) : (
              <div className="w-9 flex-shrink-0" />
            )}
          </div>
        </Container>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onTouchStart={(e) => {
            lightboxTouchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = lightboxTouchX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) lightboxNav(diff > 0 ? 1 : -1);
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
            <span className="text-white/80 text-sm font-medium">
              {propertyTitle}&nbsp;·&nbsp;{lightboxIdx + 1} / {images.length}
            </span>
            <div className="flex items-center gap-2">
              {/* Zoom toggle */}
              <button
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                {zoomed ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                )}
              </button>
              {/* Close */}
              <button
                onClick={closeLightbox}
                aria-label="Close gallery"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-14">
            {/* Prev */}
            <button
              onClick={() => lightboxNav(-1)}
              disabled={zoomed}
              aria-label="Previous image"
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition disabled:opacity-20 disabled:cursor-not-allowed z-10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ overflow: zoomed ? "auto" : "hidden" }}
            >
              <img
                src={images[lightboxIdx]}
                alt={`${propertyTitle} - image ${lightboxIdx + 1}`}
                style={{
                  maxWidth: zoomed ? "none" : "100%",
                  maxHeight: zoomed ? "none" : "100%",
                  width: zoomed ? "160%" : "auto",
                  objectFit: "contain",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: lightboxFading ? 0 : 1,
                  transform: lightboxFading ? "scale(0.97)" : "scale(1)",
                  borderRadius: 8,
                  cursor: zoomed ? "zoom-out" : "zoom-in",
                }}
                onClick={() => setZoomed((z) => !z)}
              />
            </div>

            {/* Next */}
            <button
              onClick={() => lightboxNav(1)}
              disabled={zoomed}
              aria-label="Next image"
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition disabled:opacity-20 disabled:cursor-not-allowed z-10"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex-shrink-0 px-5 py-4">
            <div
              ref={lightboxThumbRef}
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => handleLightboxThumbClick(i)}
                  className="flex-shrink-0 object-cover rounded-lg cursor-pointer transition-all duration-150 hover:scale-105"
                  style={{
                    width: 72,
                    height: 54,
                    border:
                      i === lightboxIdx
                        ? "2.5px solid #60A5FA"
                        : "2.5px solid rgba(255,255,255,0.15)",
                    boxShadow:
                      i === lightboxIdx
                        ? "0 0 0 2px rgba(96,165,250,0.4)"
                        : "none",
                    opacity: i === lightboxIdx ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;