"use client";

import React, { useState } from "react";
import PropertyImage from "@/components/common/PropertyImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { PropertyListing } from "@/utils/types";
import {
  AreaIcon,
  BathIcon,
  BedIcon,
  CallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EmailIcon,
  LocationIcon,
  PhotosIcon,
  WhatsAppIcon,
  DirhamIcon,
} from "@/utils/icons";
import PropertiesPagination from "@/components/properties/PropertiesPagination";
import Container from "@/components/layout/Container";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Types                                                                     */
/* ═══════════════════════════════════════════════════════════════════════════ */
interface PropertyCardProps {
  listing: PropertyListing;
  index?: number;
  showListingType?: boolean;
  href?: string;
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
/*  Stat Chip                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
const StatChip = ({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label?: string }) => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
    style={{ backgroundColor: "#faf8f5" }}
  >
    <span style={{ color: "#c3ad95" }}>{icon}</span>
    <span className="text-xs font-medium" style={{ color: "#0d365e" }}>{value}</span>
    {label ? <span className="text-[10px] uppercase tracking-wide" style={{ color: "#b0a99e" }}>{label}</span> : null}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Property Card – Left image, right content                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
export const PropertyCard: React.FC<PropertyCardProps> = ({
  listing,
  index = 0,
  showListingType = true,
  href,
}) => {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const images = listing.images;
  const mainImage = images[activeImg] ?? images[0];
  const displayTitle = listing.towerName?.trim() || listing.subLocality?.trim() || listing.title;
  const propertyTitle = listing.propertyTitle?.trim();
  const listingHref = href ?? listing.path;
  const displayPrice = String(listing.price ?? "").replace(/^\s*aed\s*/i, "").trim();

  const nextImg = () => setActiveImg((p) => (p + 1) % images.length);
  const prevImg = () => setActiveImg((p) => (p - 1 + images.length) % images.length);

  return (
    <motion.article
      className="group flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-[0_10px_32px_rgba(13,54,94,.1)] cursor-pointer"
      style={{ boxShadow: "0 1px 3px rgba(13,54,94,.06), 0 0 0 1px rgba(13,54,94,.04)" }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
      role="link"
      tabIndex={0}
      onClick={() => router.push(listingHref)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(listingHref);
        }
      }}
    >
      {/* ── Image ── */}
      <div className="relative sm:w-48 md:w-52 lg:w-56 shrink-0 overflow-hidden bg-[#f0ede8]">
        <div className="relative w-full h-44 sm:h-[224px] md:h-[236px] lg:h-[246px]">
          <PropertyImage
            src={mainImage}
            alt={displayTitle}
            fill
            sizes="(min-width: 1024px) 224px, (min-width: 768px) 208px, (min-width: 640px) 192px, 100vw"
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />

          {/* Badge top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {listing.badge && (
              <span className={`text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded ${listing.badge === "New" ? "bg-emerald-500 text-white" : listing.badge === "Off Plan" ? "bg-amber-500 text-white" : "bg-[#0d365e] text-white"}`}>
                {listing.badge}
              </span>
            )}
            {showListingType ? (
              <span
                className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded"
                style={{ backgroundColor: "rgba(255,255,255,.93)", color: "#0d365e" }}
              >
                {listing.type}
              </span>
            ) : null}
          </div>

          {/* Photo count */}
          {images.length > 1 && (
            <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-medium text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded z-10">
              <PhotosIcon /> {images.length}
            </span>
          )}

          {/* Nav arrows – centered, appear on hover */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImg();
                }}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#0d365e] shadow-[0_2px_8px_rgba(0,0,0,.12)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-white hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImg();
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-md text-[#0d365e] shadow-[0_2px_8px_rgba(0,0,0,.12)] opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out hover:bg-white hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRightIcon width="12" height="12" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Property type tag */}
        {listing.propertyType && (
          <span className="self-start text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded mb-2.5" style={{ backgroundColor: "#f5f2ee", color: "#9f8870" }}>
            {listing.propertyType}
          </span>
        )}

        {/* Title */}
        <h3 className="text-base font-medium leading-snug line-clamp-1" style={{ color: "#0d365e" }}>
          {displayTitle}
        </h3>
        {propertyTitle && propertyTitle !== displayTitle && (
          <p className="mt-1.5 text-sm leading-snug line-clamp-2" style={{ color: "#6f7785" }}>
            {propertyTitle}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 mb-3">
          <span style={{ color: "#c3ad95" }}><LocationIcon /></span>
          <span className="text-xs line-clamp-1" style={{ color: "#999" }}>{listing.location}</span>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <StatChip icon={<BedIcon />} value={listing.beds ?? "—"} label="Beds" />
          <StatChip icon={<BathIcon />} value={listing.baths ?? "—"} label="Baths" />
          <StatChip icon={<AreaIcon />} value={listing.propertySize != null ? `${Number(listing.propertySize).toLocaleString()} ${(listing.propertySizeUnit ?? "SQFT").toLowerCase()}` : "—"} />
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ backgroundColor: "#f0ede8" }} />

        {/* Bottom row: Price + actions */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Price */}
          <p className="text-lg font-semibold tracking-tight leading-none" style={{ color: "#0d365e" }}>
            <span className="inline-flex items-end gap-0.5 whitespace-nowrap">
              <DirhamIcon className="w-[16px] h-[16px] shrink-0 mb-[2px]" aria-hidden />
              <span>{displayPrice}</span>
            </span>
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {listing.agent?.phone && (
              <a
                href={`tel:${listing.agent.phone.replace(/\s/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#0d365e] hover:text-white"
                style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }}
                title="Call"
                aria-label="Call agent"
              >
                <CallIcon />
              </a>
            )}
            {listing.agent?.whatsapp && (
              <a
                href={`https://wa.me/${listing.agent.whatsapp.replace(/\D/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#25D366] hover:text-white"
                style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }}
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            )}
            {listing.agent?.email && (
              <a
                href={`mailto:${listing.agent.email}`}
                onClick={(e) => e.stopPropagation()}
                className="grid place-items-center w-7 h-7 rounded-lg transition-colors duration-200 hover:bg-[#0d365e] hover:text-white"
                style={{ color: "#0d365e", backgroundColor: "#f5f2ee" }}
                title="Email"
                aria-label="Email agent"
              >
                <EmailIcon />
              </a>
            )}
            <Link
              href={listingHref}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-white text-xs font-medium tracking-wide px-3.5 py-2 rounded-lg transition-all duration-200 hover:opacity-90 group/btn"
              style={{ backgroundColor: "#0d365e" }}
            >
              View
              <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                <ChevronRightIcon />
              </span>
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
  showListingType?: boolean;
  isOffPlan?: boolean;
}

export const PropertyListingGrid: React.FC<PropertyListingGridProps> = ({
  listings,
  isLoading = false,
  pagination,
  showListingType = true,
  isOffPlan = false,
}) => {
  const getListingHref = (listing: PropertyListing) =>
    isOffPlan ? `/off-plan-properties/in-dubai/${encodeURIComponent(String(listing.id))}` : listing.path;

  const keyCounts = new Map<string, number>();
  const getListingKey = (listing: PropertyListing) => {
    const base = String(listing.path ?? listing.id ?? getListingHref(listing) ?? "listing");
    const next = (keyCounts.get(base) ?? 0) + 1;
    keyCounts.set(base, next);
    return next === 1 ? base : `${base}::${next}`;
  };

  return (
    <section
      className="pt-8 md:pt-12"
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
            {isOffPlan ? "Off Plan Property Listings" : "Property Listings"}
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
                <PropertyCard
                  key={getListingKey(listing)}
                  listing={listing}
                  index={idx}
                  showListingType={showListingType}
                  href={getListingHref(listing)}
                />
              ))}
              {listings.length === 0 && (
                <div
                  className="lg:col-span-2 text-center py-14 rounded-xl"
                  style={{ backgroundColor: "#fff", color: "#999", boxShadow: "0 1px 3px rgba(13,54,94,.06), 0 0 0 1px rgba(13,54,94,.04)" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#0d365e" }}>No properties found</p>
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