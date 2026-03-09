"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PropertyListing } from "@/utils/data";
import PropertiesPagination from "@/components/properties/PropertiesPagination";
import Container from "@/components/layout/Container";

// ─── Types ───────────────────────────────────────────────────────────────────
interface PropertyCardProps {
  listing: PropertyListing;
  index?: number;
}

// ─── Shimmer ──────────────────────────────────────────────────────────────────
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-[#f0ede8] ${className}`}>
    <motion.div
      className="absolute inset-y-0 w-1/2"
      style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)" }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const PropertyCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    className="flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white border border-[#f0ede8]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.06 }}
  >
    <div className="md:w-85 lg:w-100 shrink-0">
      <Shimmer className="w-full h-52 md:h-full" />
    </div>
    <div className="flex flex-col flex-1 p-4 lg:p-5 gap-3">
      <div className="flex items-center gap-2">
        <Shimmer className="h-4 w-12 rounded-full" />
        <Shimmer className="h-4 w-14 rounded-full" />
      </div>
      <Shimmer className="h-4 w-3/4 rounded-md" />
      <Shimmer className="h-3 w-2/5 rounded-md" />
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((i) => <Shimmer key={i} className="h-3.5 w-16 rounded-md" />)}
      </div>
      <Shimmer className="h-px w-full" />
      <div className="flex items-center justify-between">
        <Shimmer className="h-5 w-32 rounded-md" />
        <div className="flex items-center gap-2">
          <Shimmer className="h-7 w-7 rounded-full shrink-0" />
          <Shimmer className="h-3 w-20 rounded-md" />
        </div>
      </div>
      <div className="flex gap-2 mt-auto">
        <Shimmer className="h-8 w-24 rounded-lg" />
        <Shimmer className="h-8 w-8 rounded-lg" />
        <Shimmer className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  </motion.div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M10 8v6" /></svg>
);
const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><line x1="3" y1="13" x2="21" y2="13" /></svg>
);
const AreaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 3v18" /></svg>
);
const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const PhotosIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
);
const CallIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
);
const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const WhatsAppIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ label }: { label: string }) => {
  const map: Record<string, string> = {
    New: "bg-emerald-500 text-white",
    "Off Plan": "bg-amber-500 text-white",
  };
  return (
    <span className={`text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full ${map[label] ?? "bg-[#0d365e] text-white"}`}>
      {label}
    </span>
  );
};

// ─── Property Card — Horizontal single-col ────────────────────────────────────
export const PropertyCard: React.FC<PropertyCardProps> = ({ listing, index = 0 }) => {
  const [activeImg, setActiveImg] = useState(0);
  const images = listing.images;
  const mainImage = images[activeImg] ?? images[0];

  const nextImg = () => setActiveImg((p) => (p + 1) % images.length);
  const prevImg = () => setActiveImg((p) => (p - 1 + images.length) % images.length);

  return (
    <motion.article
      className="group flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white border border-[#f0ede8] transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(13,54,94,.08)]"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      {/* ── Image ── */}
      <div className="relative md:w-85 lg:w-100 shrink-0 overflow-hidden bg-[#f0ede8]">
        <div className="relative w-full h-52 md:h-full md:min-h-60">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(13,54,94,.35) 0%, transparent 55%)" }} />

          {/* Badges — top left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 z-10">
            {listing.badge && <Badge label={listing.badge} />}
            <span className="text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,.9)", color: "#0d365e" }}>
              {listing.type}
            </span>
          </div>

          {/* Photo count — top right */}
          {images.length > 1 && (
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[9px] font-medium text-white bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full z-10">
              <PhotosIcon /> {images.length}
            </span>
          )}

          {/* Property type — bottom left */}
          {listing.propertyType && (
            <span className="absolute bottom-2.5 left-2.5 text-[9px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm z-10" style={{ color: "#0d365e" }}>
              {listing.propertyType}
            </span>
          )}

          {/* Prev / Next arrows — bottom right */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 z-10">
              <button onClick={prevImg} className="grid place-items-center w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm text-[#0d365e] hover:bg-white transition-colors" aria-label="Previous image">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button onClick={nextImg} className="grid place-items-center w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm text-[#0d365e] hover:bg-white transition-colors" aria-label="Next image">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Details ── */}
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug line-clamp-1 mb-1" style={{ color: "#0d365e" }}>
          {listing.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-[11px] mb-3" style={{ color: "#999" }}>
          <span className="shrink-0" style={{ color: "#c3ad95" }}><LocationIcon /></span>
          <span className="line-clamp-1">{listing.location}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          {[
            { icon: <BedIcon />, value: listing.beds ?? "—", label: "Beds" },
            { icon: <BathIcon />, value: listing.baths ?? "—", label: "Baths" },
            { icon: <AreaIcon />, value: listing.area != null ? `${listing.area.toLocaleString()} sqft` : "—", label: "Area" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="flex items-center gap-1">
              <span className="shrink-0" style={{ color: "#c3ad95" }}>{icon}</span>
              <span className="text-xs font-semibold" style={{ color: "#0d365e" }}>{value}</span>
              <span className="text-[9px] uppercase tracking-wider" style={{ color: "#bbb" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ backgroundColor: "#f0ede8" }} />

        {/* Price */}
        <p className="text-base font-bold tracking-tight mb-3" style={{ color: "#0d365e" }}>
          {listing.price}
        </p>

        {/* Agent + contact + CTA row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          {/* Agent */}
          {listing.agent && (
            <div className="flex items-center gap-2 min-w-0">
              <img src={listing.agent.image} alt={listing.agent.name} className="w-7 h-7 rounded-full object-cover border border-[#f0ede8] shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold leading-tight truncate" style={{ color: "#0d365e" }}>{listing.agent.name}</p>
                {listing.agent.language && <p className="text-[9px] leading-tight truncate" style={{ color: "#bbb" }}>{listing.agent.language}</p>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {listing.agent?.phone && (
              <a href={`tel:${listing.agent.phone.replace(/\s/g, "")}`} className="grid place-items-center w-7 h-7 rounded-lg border border-[#e7dccd] transition-colors duration-200 hover:bg-[#0d365e] hover:text-white hover:border-[#0d365e]" style={{ color: "#0d365e" }} title="Call" aria-label="Call agent"><CallIcon /></a>
            )}
            {listing.agent?.whatsapp && (
              <a href={`https://wa.me/${listing.agent.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="grid place-items-center w-7 h-7 rounded-lg border border-[#e7dccd] transition-colors duration-200 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]" style={{ color: "#0d365e" }} title="WhatsApp" aria-label="WhatsApp agent"><WhatsAppIcon /></a>
            )}
            {listing.agent?.email && (
              <a href={`mailto:${listing.agent.email}`} className="grid place-items-center w-7 h-7 rounded-lg border border-[#e7dccd] transition-colors duration-200 hover:bg-[#0d365e] hover:text-white hover:border-[#0d365e]" style={{ color: "#0d365e" }} title="Email" aria-label="Email agent"><EmailIcon /></a>
            )}
            <Link
              href={listing.path}
              className="inline-flex items-center gap-1.5 text-white text-[11px] font-semibold tracking-wide px-3.5 py-1.5 rounded-lg transition-colors duration-200 hover:opacity-90 group/btn"
              style={{ backgroundColor: "#0d365e" }}
            >
              View Details
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover/btn:translate-x-0.5"><path d="m9 18 6-6-6-6" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Listing Grid ─────────────────────────────────────────────────────────────
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
      className="py-16 bg-white"
      aria-labelledby="properties-listing-heading"
    >
      <Container>
        {/* ── Section Header ── */}
        <header className="mb-10 md:mb-14">
          <motion.h2
            id="properties-listing-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
            style={{ color: "#0d365e" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Property Listings
          </motion.h2>
          <motion.p
            className="mt-3 text-sm md:text-base max-w-lg"
            style={{ color: "#555" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {isLoading
              ? "Loading available properties..."
              : pagination?.totalItems != null
                ? `Showing ${listings.length} of ${pagination.totalItems} available properties`
                : `${listings.length} properties available`}
          </motion.p>
        </header>

        {/* ── Cards — single column ── */}
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <>
              {[0, 1, 2].map((i) => (
                <PropertyCardSkeleton key={i} index={i} />
              ))}
            </>
          ) : (
            <>
              {listings.map((listing, index) => (
                <PropertyCard key={listing.id} listing={listing} index={index} />
              ))}
              {listings.length === 0 && (
                <div
                  className="text-center py-16 rounded-2xl border border-[#f0ede8]"
                  style={{ backgroundColor: "#faf9f7", color: "#888" }}
                >
                  <p className="text-sm font-medium">No properties match your filters.</p>
                  <p className="text-xs mt-1.5">Try adjusting your search criteria.</p>
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