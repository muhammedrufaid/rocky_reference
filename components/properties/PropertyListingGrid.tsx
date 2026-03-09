"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PropertyListing } from "@/utils/data";
import PropertiesPagination from "@/components/properties/PropertiesPagination";
import Container from "@/components/layout/Container";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Types                                                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
interface PropertyCardProps {
  listing: PropertyListing;
  index?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Shimmer                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-linear-to-r from-[#f5f2ee] to-[#ebe7e1] ${className}`}>
    <motion.div
      className="absolute inset-y-0 w-1/2"
      style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)" }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Skeleton – horizontal card                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */
const PropertyCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    className="flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white"
    style={{ boxShadow: "0 1px 3px rgba(13,54,94,.06), 0 0 0 1px rgba(13,54,94,.04)" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.06 }}
  >
    <div className="sm:w-48 md:w-52 lg:w-56 shrink-0">
      <Shimmer className="w-full h-44 sm:h-full" />
    </div>
    <div className="flex flex-col flex-1 p-4 gap-2.5">
      <div className="flex items-center gap-2">
        <Shimmer className="h-4 w-11 rounded" />
        <Shimmer className="h-4 w-14 rounded" />
      </div>
      <Shimmer className="h-4 w-4/5 rounded" />
      <Shimmer className="h-3 w-2/5 rounded" />
      <div className="flex items-center gap-3 mt-1">
        {[1, 2, 3].map((i) => <Shimmer key={i} className="h-7 w-14 rounded-lg" />)}
      </div>
      <Shimmer className="h-px w-full mt-1" />
      <div className="flex items-center justify-between mt-auto">
        <Shimmer className="h-5 w-28 rounded" />
        <Shimmer className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Icons                                                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
const BedIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M10 8v6" /></svg>
);
const BathIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="3" y1="13" x2="21" y2="13" /></svg>
);
const AreaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 3v18" /></svg>
);
const LocationIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const PhotosIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
);
const CallIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
const EmailIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const WhatsAppIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);
const ChevronRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Stat Chip                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
const StatChip = ({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
    style={{ backgroundColor: "#faf8f5" }}
  >
    <span style={{ color: "#c3ad95" }}>{icon}</span>
    <span className="text-[11px] font-bold" style={{ color: "#0d365e" }}>{value}</span>
    <span className="text-[9px] uppercase tracking-wide" style={{ color: "#b0a99e" }}>{label}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Property Card – Left image, right content                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export const PropertyCard: React.FC<PropertyCardProps> = ({ listing, index = 0 }) => {
  const [activeImg, setActiveImg] = useState(0);
  const images = listing.images;
  const mainImage = images[activeImg] ?? images[0];

  const nextImg = () => setActiveImg((p) => (p + 1) % images.length);
  const prevImg = () => setActiveImg((p) => (p - 1 + images.length) % images.length);

  return (
    <motion.article
      className="group flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_10px_32px_rgba(13,54,94,.1)]"
      style={{ boxShadow: "0 1px 3px rgba(13,54,94,.06), 0 0 0 1px rgba(13,54,94,.04)" }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      {/* ── Image ── */}
      <div className="relative sm:w-48 md:w-52 lg:w-56 shrink-0 overflow-hidden bg-[#f0ede8]">
        <div className="relative w-full h-44 sm:h-full sm:min-h-56">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />

          {/* Badge top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {listing.badge && (
              <span className={`text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${listing.badge === "New" ? "bg-emerald-500 text-white" : listing.badge === "Off Plan" ? "bg-amber-500 text-white" : "bg-[#0d365e] text-white"}`}>
                {listing.badge}
              </span>
            )}
            <span
              className="text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
              style={{ backgroundColor: "rgba(255,255,255,.93)", color: "#0d365e" }}
            >
              {listing.type}
            </span>
          </div>

          {/* Photo count */}
          {images.length > 1 && (
            <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[8px] font-semibold text-white bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded z-10">
              <PhotosIcon /> {images.length}
            </span>
          )}

          {/* Nav arrows – centered, appear on hover */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#0d365e] shadow-[0_2px_8px_rgba(0,0,0,.12)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-white hover:scale-110"
                aria-label="Previous image"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                onClick={nextImg}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#0d365e] shadow-[0_2px_8px_rgba(0,0,0,.12)] opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-white hover:scale-110"
                aria-label="Next image"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Property type tag */}
        {listing.propertyType && (
          <span className="self-start text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-2" style={{ backgroundColor: "#f5f2ee", color: "#9f8870" }}>
            {listing.propertyType}
          </span>
        )}

        {/* Title */}
        <h3 className="text-[13px] font-bold leading-snug line-clamp-1" style={{ color: "#0d365e" }}>
          {listing.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1 mb-3">
          <span style={{ color: "#c3ad95" }}><LocationIcon /></span>
          <span className="text-[10px] line-clamp-1" style={{ color: "#999" }}>{listing.location}</span>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <StatChip icon={<BedIcon />} value={listing.beds ?? "—"} label="Beds" />
          <StatChip icon={<BathIcon />} value={listing.baths ?? "—"} label="Baths" />
          <StatChip icon={<AreaIcon />} value={listing.area != null ? listing.area.toLocaleString() : "—"} label="sqft" />
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ backgroundColor: "#f0ede8" }} />

        {/* Bottom row: Price + actions */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Price */}
          <p className="text-sm font-extrabold tracking-tight" style={{ color: "#0d365e" }}>
            {listing.price}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {listing.agent?.phone && (
              <a href={`tel:${listing.agent.phone.replace(/\s/g, "")}`} className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#0d365e] hover:text-white" style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }} title="Call" aria-label="Call agent"><CallIcon /></a>
            )}
            {listing.agent?.whatsapp && (
              <a href={`https://wa.me/${listing.agent.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#25D366] hover:text-white" style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }} title="WhatsApp" aria-label="WhatsApp"><WhatsAppIcon /></a>
            )}
            {listing.agent?.email && (
              <a href={`mailto:${listing.agent.email}`} className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#0d365e] hover:text-white" style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }} title="Email" aria-label="Email agent"><EmailIcon /></a>
            )}
            <Link
              href={listing.path}
              className="inline-flex items-center gap-1 text-white text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-90 group/btn"
              style={{ backgroundColor: "#0d365e" }}
            >
              Details
              <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5"><ChevronRight /></span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Listing Grid                                                              */
/* ═══════════════════════════════════════════════════════════════════════════ */
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  basePath: string;
}

interface PropertyListingGridProps {
  listings: PropertyListing[];
  isLoading?: boolean;
  pagination?: PaginationInfo;
}

export const PropertyListingGrid: React.FC<PropertyListingGridProps> = ({
  listings,
  isLoading = false,
  pagination,
}) => {
  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      // style={{ backgroundColor: "#faf9f7" }}
      aria-labelledby="properties-listing-heading"
    >
      <Container>
        {/* ── Header ── */}
        <header className="mb-6 md:mb-10">
          <motion.h2
            id="properties-listing-heading"
            className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight tracking-tight"
            style={{ color: "#0d365e" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Property Listings
          </motion.h2>
          <motion.p
            className="mt-1.5 text-xs md:text-sm"
            style={{ color: "#999" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {isLoading
              ? "Loading available properties..."
              : pagination?.totalItems != null
                ? `Showing ${listings.length} of ${pagination.totalItems} available properties`
                : `${listings.length} properties available`}
          </motion.p>
        </header>

        {/* ── Grid — 1 col mobile, 2 col laptop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {isLoading ? (
            <>
              {[0, 1, 2, 3].map((i) => (
                <PropertyCardSkeleton key={i} index={i} />
              ))}
            </>
          ) : (
            <>
              {listings.map((listing, idx) => (
                <PropertyCard key={listing.id} listing={listing} index={idx} />
              ))}
              {listings.length === 0 && (
                <div
                  className="lg:col-span-2 text-center py-14 rounded-xl"
                  style={{ backgroundColor: "#fff", color: "#999", boxShadow: "0 1px 3px rgba(13,54,94,.06), 0 0 0 1px rgba(13,54,94,.04)" }}
                >
                  <p className="text-sm font-semibold" style={{ color: "#0d365e" }}>No properties found</p>
                  <p className="text-xs mt-1">Try adjusting your search criteria.</p>
                </div>
              )}
            </>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <PropertiesPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            basePath={pagination.basePath}
          />
        )}
      </Container>
    </section>
  );
};

export default PropertyListingGrid;