"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import PropertyImage from "@/components/common/PropertyImage";
import type { PropertyListing } from "@/utils/types";
import type { TeamMember } from "@/utils/types";
import {
  AreaIcon,
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DirhamIcon,
  LocationIcon,
  PhotosIcon,
} from "@/utils/icons";

type DubaiSouthListingSectionProps = {
  member: TeamMember;
  listings: PropertyListing[];
};

function formatBedLabel(beds: PropertyListing["beds"]): string {
  if (beds == null) return "—";
  const value = Number(beds);
  if (!Number.isNaN(value) && value === 0) return "Studio";
  return String(beds);
}

function formatArea(listing: PropertyListing): string {
  if (listing.propertySize == null) return "—";
  const unit = (listing.propertySizeUnit ?? "SQFT").toLowerCase();
  return `${Number(listing.propertySize).toLocaleString()} ${unit}`;
}

type ListingCardProps = {
  listing: PropertyListing;
  index: number;
};

function ListingCard({ listing, index }: ListingCardProps) {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const images =
    listing.images.length > 0
      ? listing.images
      : ["https://placehold.co/400x300/f0ede8/0d365e?text=Property"];
  const mainImage = images[activeImg] ?? images[0];
  const displayTitle =
    listing.towerName?.trim() ||
    listing.subLocality?.trim() ||
    listing.title;
  const propertyTitle = listing.propertyTitle?.trim();
  const displayPrice = String(listing.price ?? "")
    .replace(/^\s*aed\s*/i, "")
    .trim();

  const nextImg = () =>
    setActiveImg((prev) => (prev + 1) % images.length);
  const prevImg = () =>
    setActiveImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,54,94,0.10),0_2px_8px_rgba(13,54,94,0.06)]"
      style={{
        boxShadow:
          "0 1px 2px rgba(13,54,94,0.04), 0 0 0 0.5px rgba(13,54,94,0.07)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      role="link"
      tabIndex={0}
      onClick={() => router.push(listing.path)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(listing.path);
        }
      }}
    >
      {/* ── Image ────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0ede8]">
        <PropertyImage
          src={mainImage}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Type badge */}
        <span
          className="absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{
            backgroundColor:
              listing.type === "Buy" ? "#0d365e" : "#c3ad95",
            color: listing.type === "Buy" ? "#fff" : "#081f3a",
          }}
        >
          {listing.type}
        </span>

        {/* Photo count */}
        {images.length > 1 && (
          <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
            <PhotosIcon width="12" height="12" />
            {images.length}
          </span>
        )}

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImg();
              }}
              className="absolute left-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#0d365e] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon width="12" height="12" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImg();
              }}
              className="absolute right-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-[#0d365e] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon width="12" height="12" />
            </button>
          </>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Property type tag */}
        {listing.propertyType && (
          <span
            className="mb-2.5 self-start rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em]"
            style={{ backgroundColor: "#f5f0ea", color: "#9f8870" }}
          >
            {listing.propertyType}
          </span>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-[15px] font-medium leading-snug text-[#0d365e]">
          {displayTitle}
        </h3>

        {/* Subtitle */}
        {propertyTitle && propertyTitle !== displayTitle && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6f7785]">
            {propertyTitle}
          </p>
        )}

        {/* Location */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#9ca3af]">
          <span className="shrink-0 text-[#c3ad95]">
            <LocationIcon width="12" height="12" />
          </span>
          <span className="line-clamp-1">{listing.location}</span>
        </div>

        {/* Stats pills */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <StatPill
            icon={<BedIcon width="13" height="13" />}
            label={formatBedLabel(listing.beds)}
          />
          <StatPill
            icon={<BathIcon width="13" height="13" />}
            label={String(listing.baths ?? "—")}
          />
          <StatPill
            icon={<AreaIcon width="13" height="13" />}
            label={formatArea(listing)}
          />
        </div>

        {/* Separator */}
        <div className="my-3.5 h-px w-full bg-[#f0ede8]" />

        {/* Footer: price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-base font-semibold leading-none tracking-tight text-[#0d365e]">
            <span className="inline-flex items-end gap-0.5 whitespace-nowrap">
              <DirhamIcon
                className="mb-[2px] h-4 w-4 shrink-0"
                aria-hidden
              />
              <span>{displayPrice}</span>
            </span>
          </p>

          <Link
            href={listing.path}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: "#0d365e" }}
          >
            View
            <ChevronRightIcon width="12" height="12" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function StatPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-[#faf8f5] px-2 py-1">
      <span className="text-[#c3ad95]">{icon}</span>
      <span className="text-[11px] font-medium text-[#0d365e]">{label}</span>
    </div>
  );
}

const DubaiSouthListingSection: React.FC<DubaiSouthListingSectionProps> = ({
  member,
  listings,
}) => {
  if (listings.length === 0) return null;

  const firstName =
    member.name.trim().split(/\s+/)[0] ?? member.name;

  return (
    <section
      id="agent-listings"
      aria-labelledby="agent-listings-heading"
      className="border-t border-[#0d365e]/8 bg-[#faf9f7] py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* ── Header ───────────────────────────────────── */}
        <header className="mb-10 md:mb-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#c3ad95]">
            Dubai South
          </p>
          <motion.h2
            id="agent-listings-heading"
            className="text-2xl font-medium leading-tight tracking-tight text-[#0d365e] sm:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Listings by {firstName}
          </motion.h2>
          <motion.p
            className="mt-3 max-w-xl text-sm text-[#6f7785] md:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {listings.length} propert
            {listings.length === 1 ? "y" : "ies"} available across Dubai
            South
          </motion.p>
          <motion.div
            className="mt-6 h-px w-12 bg-[#c3ad95]/60"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            style={{ transformOrigin: "left" }}
            aria-hidden
          />
        </header>

        {/* ── Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {listings.map((listing, index) => (
            <ListingCard
              key={listing.path}
              listing={listing}
              index={index}
            />
          ))}
        </div>

        {/* ── View all ─────────────────────────────────── */}
        <div className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/properties/buy/in-dubai?search=Dubai+South"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0d365e] transition-colors duration-200 hover:text-[#c3ad95]"
          >
            View all Dubai South properties
            <ArrowRightIcon width="16" height="16" strokeWidth={1.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default DubaiSouthListingSection;