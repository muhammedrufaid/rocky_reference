"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { propertyListings } from "@/utils/data";
import type { PropertyListing } from "@/utils/types";
import {
  ListingCardMapPinIcon,
  ListingCardPhoneIcon,
  ToolbarDropdownChevronIcon,
  WhatsAppIcon,
} from "@/utils/icons";

const SORT_OPTIONS = ["Most Recent", "Price: Low to High", "Price: High to Low", "Newest First"];

const PAGE_DESCRIPTION =
  "Discover premium properties across Dubai's most sought-after communities. From waterfront apartments to luxury villas.";

interface PropertyListingCardProps {
  property: PropertyListing;
}

function PropertyListingCard({ property }: PropertyListingCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { images, title, location, price, beds, baths, area, agent, path, propertyType, badge } = property;
  const mainImg = images[0];

  const phoneNumber = "+971501234567";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\+/g, "")}`;

  return (
    <Link
      href={path}
      className="group flex flex-col md:flex-row overflow-hidden rounded-2xl bg-white border border-[#eee] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/20 focus:ring-offset-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image section - left, large */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] min-h-[220px] md:min-h-[280px] aspect-[4/3] md:aspect-auto shrink-0 overflow-hidden">
        <Image
          src={mainImg}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ease-out rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ${
            isHovering ? "scale-105" : "scale-100"
          }`}
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        {/* Badge - top left */}
        {badge && (
          <span className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-[var(--charcoal)] shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* Content section - right */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        {/* Price - bold, largest */}
        <p className="text-2xl lg:text-3xl font-bold text-[var(--charcoal)]">{price}</p>

        {/* Location with icon */}
        <div className="mt-2 flex items-center gap-2 text-sm text-[var(--charcoal)]/70">
          <ListingCardMapPinIcon />
          <span className="truncate">{location}</span>
        </div>

        {/* Property title - primary accent */}
        <h3 className="mt-3 line-clamp-2 text-lg font-medium text-[var(--rocky-blue)] group-hover:text-[var(--rocky-blue-hover)] transition-colors">
          {title}
        </h3>

        {/* Meta details row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-[var(--charcoal)]/65">
          {propertyType && <span>{propertyType}</span>}
          {beds != null && <span>{beds} Beds</span>}
          {baths != null && <span>{baths} Baths</span>}
          {area != null && <span>{area.toLocaleString()} sq.ft BUA</span>}
        </div>

        {/* Agent section + Actions - pushed to bottom */}
        <div className="mt-auto pt-6">
          {agent && (
            <div className="mb-4 flex items-center gap-3">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#eee] bg-[var(--soft-sand)]/30">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--charcoal)]">{agent.name}</p>
                {agent.language && (
                  <p className="text-xs text-[var(--charcoal)]/55">{agent.language}</p>
                )}
              </div>
            </div>
          )}

          {/* Action buttons row */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#eee]">
          <a
            href={`tel:${phoneNumber}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#eee] bg-white px-4 py-2.5 text-sm font-medium text-[var(--charcoal)] shadow-sm transition-all hover:border-[var(--rocky-blue)]/30 hover:bg-[var(--rocky-blue)]/5 hover:shadow"
          >
            <ListingCardPhoneIcon /> Call
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-medium text-[#25D366] shadow-sm transition-all hover:bg-[#25D366]/20"
          >
            <WhatsAppIcon className="size-4 shrink-0" /> WhatsApp
          </a>
          <span className="inline-flex items-center gap-2 rounded-xl bg-[var(--rocky-blue)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors group-hover:bg-[var(--rocky-blue-hover)]">
            Book a Viewing
          </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface PropertiesListProps {
  type: "rent" | "buy";
  searchParams?: { q?: string; type?: string; min?: string; max?: string };
}

function parsePrice(priceStr: string): number {
  const match = priceStr.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function PropertiesList({ type, searchParams }: PropertiesListProps) {
  const [sortBy, setSortBy] = useState("Most Recent");
  const listingType = type === "buy" ? "Buy" : "Rent";

  let filtered = propertyListings.filter((p) => p.type === listingType);

  if (searchParams?.q) {
    const q = searchParams.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }
  if (searchParams?.type) {
    const pt = searchParams.type;
    filtered = filtered.filter((p) => p.propertyType === pt || p.title.toLowerCase().includes(pt.toLowerCase()));
  }
  if (searchParams?.min) {
    const min = parseInt(searchParams.min, 10);
    filtered = filtered.filter((p) => parsePrice(p.price) >= min);
  }
  if (searchParams?.max) {
    const max = parseInt(searchParams.max, 10);
    filtered = filtered.filter((p) => parsePrice(p.price) <= max);
  }

  const count = filtered.length;
  const title = type === "buy" ? "Properties for sale in Dubai" : "Properties for rent in Dubai";

  return (
    <section className="py-10 md:py-14 lg:py-16" aria-label="Property listings">
      <Container>
        {/* Page Header Section */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--charcoal)] md:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-[var(--charcoal)]/60 max-w-xl">
              {PAGE_DESCRIPTION}{" "}
              <Link href="/about" className="text-[var(--rocky-blue)]/80 hover:text-[var(--rocky-blue)] underline-offset-2 hover:underline">
                Read more
              </Link>
            </p>
            <p className="mt-3 text-sm font-medium text-[var(--charcoal)]/70">
              {count.toLocaleString()} results
            </p>
          </div>
          {/* Sort dropdown - right aligned */}
          <div className="relative flex shrink-0">
            <label htmlFor="sort-select" className="sr-only">
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-xl border border-[#eee] bg-white pl-4 pr-10 py-3 text-sm font-medium text-[var(--charcoal)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/20 focus:ring-offset-2 min-w-[180px]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--charcoal)]/50">
              <ToolbarDropdownChevronIcon open={false} />
            </span>
          </div>
        </div>

        {/* Property cards - vertical stack */}
        <div className="flex flex-col gap-6">
          {filtered.map((property) => (
            <PropertyListingCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
