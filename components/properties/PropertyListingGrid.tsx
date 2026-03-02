"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PropertyListing } from "@/utils/data";

// ─── Types ───────────────────────────────────────────────────────────────────
interface PropertyCardProps {
  listing: PropertyListing;
  index?: number;
}

// ─── Skeleton Shimmer Block ───────────────────────────────────────────────────
const ShimmerBlock = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-gray-200 w-full h-full min-h-full ${className}`}
  >
    <motion.div
      className="absolute inset-y-0 w-[60%]"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
      }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const PropertyCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.08 }}
  >
    <div className="relative md:w-[58%] shrink-0 flex gap-1.5 bg-gray-100" style={{ minHeight: 280 }}>
      <div className="flex-1 rounded-none overflow-hidden" style={{ minHeight: 280 }}>
        <ShimmerBlock />
      </div>
      <div className="hidden lg:flex flex-col gap-1.5 shrink-0" style={{ width: 200 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 rounded-xl overflow-hidden" style={{ minHeight: 0 }}>
            <ShimmerBlock className="rounded-xl" />
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col flex-1 p-5 gap-4">
      <div className="h-5 w-3/4 rounded-lg overflow-hidden">
        <ShimmerBlock />
      </div>
      <div className="h-4 w-1/2 rounded-lg overflow-hidden">
        <ShimmerBlock />
      </div>
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="h-4 w-12 rounded overflow-hidden">
              <ShimmerBlock />
            </div>
            <div className="h-3 w-8 rounded overflow-hidden">
              <ShimmerBlock />
            </div>
          </div>
        ))}
      </div>
      <div className="h-px bg-gray-100" />
      <div className="h-7 w-32 rounded-lg overflow-hidden">
        <ShimmerBlock />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <ShimmerBlock />
          </div>
          <div className="h-4 w-24 rounded overflow-hidden">
            <ShimmerBlock />
          </div>
        </div>
        <div className="h-9 w-28 rounded-xl overflow-hidden">
          <ShimmerBlock />
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M10 8v6"/>
  </svg>
);

const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
    <line x1="3" y1="13" x2="21" y2="13"/>
  </svg>
);

const AreaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <path d="M3 9h18M9 3v18"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhotosIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const CallIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ label }: { label: string }) => {
  const styles: Record<string, string> = {
    New: "bg-emerald-500 text-white",
    "Off Plan": "bg-amber-500 text-white",
  };
  return (
    <span className={`text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${styles[label] ?? "bg-gray-800 text-white"}`}>
      {label}
    </span>
  );
};

// ─── Property Card ────────────────────────────────────────────────────────────
export const PropertyCard: React.FC<PropertyCardProps> = ({ listing, index = 0 }) => {
  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const images = listing.images;
  const mainImage = images[activeImg] ?? images[0];
  // Up to 3 additional thumbnails for the mosaic
  const mosaicImgs = images.filter((_, i) => i !== activeImg).slice(0, 3);

  return (
    <motion.div
      className="group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -24px 0px" }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >

      {/* ── LEFT: Image Gallery ── */}
      <div className="relative md:w-[58%] shrink-0 flex gap-1.5 bg-gray-100" style={{ minHeight: 280 }}>

        {/* Main image — takes left 2/3 */}
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: 280 }}>
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 cursor-pointer"
            style={{ minHeight: 280 }}
          />

          {/* Gradient overlay bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {listing.badge && <Badge label={listing.badge} />}
            <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 text-gray-700 backdrop-blur-sm">
              {listing.type}
            </span>
          </div>

          {/* Property type pill — bottom left */}
          {listing.propertyType && (
            <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm z-10">
              {listing.propertyType}
            </span>
          )}

          {/* Photo count pill — bottom right */}
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full z-10">
              <PhotosIcon />
              {images.length} photos
            </span>
          )}
        </div>

        {/* Mosaic strip — right 1/3, three equal rows */}
        {mosaicImgs.length > 0 && (
          <div className="hidden lg:flex flex-col gap-1.5 shrink-0" style={{ width: 200 }}>
            {mosaicImgs.map((img, i) => {
              const originalIdx = images.findIndex((src) => src === img && images.indexOf(src) !== activeImg);
              // compute actual index in original images array
              const imgIdx = (() => {
                let count = 0;
                for (let j = 0; j < images.length; j++) {
                  if (j === activeImg) continue;
                  if (count === i) return j;
                  count++;
                }
                return i + 1;
              })();

              const isLast = i === mosaicImgs.length - 1;
              const extraCount = images.length - 4;

              return (
                <button
                  key={i}
                  onClick={() => setActiveImg(imgIdx)}
                  className={`relative flex-1 overflow-hidden rounded-xl transition-all duration-200 cursor-pointer ${
                    activeImg === imgIdx
                      ? "ring-2 ring-blue-500"
                      : "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  style={{ minHeight: 0 }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {/* More overlay on last */}
                  {isLast && extraCount > 0 && (
                    <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-0.5">
                      <span className="text-white text-base font-bold leading-none">+{extraCount}</span>
                      <span className="text-white/80 text-[9px] font-medium uppercase tracking-wider">more</span>
                    </div>
                  )}
                  {/* Active indicator */}
                  {activeImg === imgIdx && (
                    <div className="absolute inset-0 ring-2 ring-inset ring-blue-500 rounded-xl pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── RIGHT: Details ── */}
      <div className="flex flex-col justify-between flex-1 p-5">
        {/* Top */}
        <div>
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1.5 line-clamp-2">
            {listing.title}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
            <LocationIcon />
            <span className="line-clamp-1">{listing.location}</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            {[
              { icon: <BedIcon />, value: listing.beds ?? "—", label: "Beds" },
              { icon: <BathIcon />, value: listing.baths ?? "—", label: "Baths" },
              { icon: <AreaIcon />, value: listing.area != null ? `${listing.area.toLocaleString()} sqft` : "—", label: "Area" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1 text-gray-400">{icon}</div>
                <span className="text-sm font-semibold text-gray-800">{value}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4" />

          {/* Price */}
          <p className="text-xl font-extrabold text-gray-900 tracking-tight mb-4">
            {listing.price}
          </p>
        </div>

        {/* Bottom: Agent + Contact + CTA */}
        <div className="flex flex-col gap-3">
          {listing.agent && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <img
                  src={listing.agent.image}
                  alt={listing.agent.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-800 leading-none mb-0.5">{listing.agent.name}</p>
                  {listing.agent.language && <p className="text-[10px] text-gray-400">{listing.agent.language}</p>}
                </div>
              </div>

              {/* Call, WhatsApp, Email */}
              <div className="flex items-center gap-2">
                {listing.agent.phone && (
                  <a
                    href={`tel:${listing.agent.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-emerald-500 hover:text-white text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                    title="Call"
                    aria-label="Call agent"
                  >
                    <CallIcon />
                  </a>
                )}
                {listing.agent.whatsapp && (
                  <a
                    href={`https://wa.me/${listing.agent.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#25D366] hover:text-white text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                    title="WhatsApp"
                    aria-label="WhatsApp agent"
                  >
                    <WhatsAppIcon />
                  </a>
                )}
                {listing.agent.email && (
                  <a
                    href={`mailto:${listing.agent.email}`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                    title="Email"
                    aria-label="Email agent"
                  >
                    <EmailIcon />
                  </a>
                )}
              </div>
            </div>
          )}

          <Link
            href={listing.path}
            className="inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 w-fit hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/btn"
          >
            View Details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Listing Grid ─────────────────────────────────────────────────────────────
interface PropertyListingGridProps {
  listings: PropertyListing[];
  isLoading?: boolean;
}

export const PropertyListingGrid: React.FC<PropertyListingGridProps> = ({ listings, isLoading = false }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Property Listings</h2>
        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? "Loading..." : `${listings.length} properties found`}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <PropertyCardSkeleton key={i} index={i} />
            ))}
          </>
        ) : (
          <>
            {listings.map((listing, index) => (
              <PropertyCard key={listing.id} listing={listing} index={index} />
            ))}
            {listings.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-semibold">No properties match your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyListingGrid;