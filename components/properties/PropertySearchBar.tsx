"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Container from "@/components/layout/Container";

// ─── Types ────────────────────────────────────────────────────────────────────

type TransactionType = "buy" | "rent";

interface PropertySearchBarProps {
  defaultType?: TransactionType;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = [
  { label: "All Types", value: "" },
  { label: "Apartment", value: "Apartment" },
  { label: "Penthouse", value: "Penthouse" },
  { label: "Villa", value: "Villa" },
  { label: "Townhouse", value: "Townhouse" },
  { label: "Duplex", value: "Duplex" },
  { label: "Studio", value: "Studio" },
];

const RENT_PRICES = [
  { label: "Any", value: "" },
  { label: "50,000", value: "50000" },
  { label: "100,000", value: "100000" },
  { label: "150,000", value: "150000" },
  { label: "200,000", value: "200000" },
  { label: "300,000", value: "300000" },
  { label: "500,000", value: "500000" },
  { label: "750,000", value: "750000" },
  { label: "1,000,000", value: "1000000" },
  { label: "1,500,000", value: "1500000" },
  { label: "2,000,000+", value: "2000000" },
];

const BUY_PRICES = [
  { label: "Any", value: "" },
  { label: "500,000", value: "500000" },
  { label: "1M", value: "1000000" },
  { label: "2M", value: "2000000" },
  { label: "3M", value: "3000000" },
  { label: "5M", value: "5000000" },
  { label: "7.5M", value: "7500000" },
  { label: "10M", value: "10000000" },
  { label: "15M", value: "15000000" },
  { label: "25M", value: "25000000" },
  { label: "50M+", value: "50000000" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="size-5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    className="size-5 shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

// ─── FilterDropdown ───────────────────────────────────────────────────────────

interface DropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

function FilterDropdown({ value, options, onChange, placeholder, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const displayValue = selected?.value ? selected.label : placeholder;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${displayValue}`}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-auto rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        >
          {options.map((opt) => (
            <li
              key={opt.value || "any"}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-3 text-sm transition-colors duration-150 ${
                value === opt.value
                  ? "bg-[var(--rocky-blue)]/8 font-medium"
                  : "hover:bg-[var(--soft-sand)]/40"
              }`}
              style={{
                color: value === opt.value ? "var(--rocky-blue)" : "var(--charcoal)",
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── ListingDropdown ──────────────────────────────────────────────────────────

function ListingDropdown({
  transactionType,
  onSelect,
}: {
  transactionType: TransactionType;
  onSelect: (tx: TransactionType) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--rocky-blue)", borderColor: "var(--rocky-blue)" }}
      >
        <span>{transactionType === "rent" ? "Rent" : "Buy"}</span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 min-w-full rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        >
          {(["rent", "buy"] as TransactionType[]).map((tx) => {
            const isSelected = transactionType === tx;
            return (
              <li
                key={tx}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setOpen(false);
                  onSelect(tx);
                }}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium capitalize transition-colors ${
                  isSelected
                    ? "bg-[var(--rocky-blue)]/8"
                    : "hover:bg-[var(--soft-sand)]/40"
                }`}
                style={{
                  color: isSelected ? "var(--rocky-blue)" : "var(--charcoal)",
                }}
              >
                {tx === "rent" ? "Rent" : "Buy"}
                {isSelected && (
                  <svg
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PropertySearchBar: React.FC<PropertySearchBarProps> = ({ defaultType = "buy" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Derive transaction type from URL path (e.g. /properties/rent/in-dubai)
  const transactionType: TransactionType =
    pathname.includes("/rent/") ? "rent" : pathname.includes("/buy/") ? "buy" : defaultType;
  const priceOptions = transactionType === "rent" ? RENT_PRICES : BUY_PRICES;

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false);
  const [isHiddenByFooter, setIsHiddenByFooter] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Sync URL params → state
  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
    setPropertyType(searchParams.get("type") ?? "");
    setMinPrice(searchParams.get("min") ?? "");
    setMaxPrice(searchParams.get("max") ?? "");
  }, [searchParams]);

  // Sticky sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Hide when footer visible
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setIsHiddenByFooter(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const buildUrl = useCallback(
    (tx: TransactionType = transactionType) => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (propertyType) params.set("type", propertyType);
      if (minPrice) params.set("min", minPrice);
      if (maxPrice) params.set("max", maxPrice);
      const query = params.toString();
      return `/properties/${tx}/in-dubai${query ? `?${query}` : ""}`;
    },
    [searchQuery, propertyType, minPrice, maxPrice, transactionType]
  );

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    router.push(buildUrl());
    setFilterPanelOpen(false);
  };

  const hasActiveFilters = !!(propertyType || minPrice || maxPrice);

  const handleListingSelect = (tx: TransactionType) => {
    router.push(`/properties/${tx}/in-dubai`);
  };

  const barContent = (
    <form onSubmit={handleSearch} className="w-full">
      {/* Mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex-1 min-w-0">
          <label htmlFor="property-search-mobile" className="sr-only">
            Search properties
          </label>
          <input
            id="property-search-mobile"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search location, community, building..."
            className="h-11 w-full rounded-lg border bg-white px-4 py-2.5 text-sm placeholder:text-[var(--charcoal)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
            style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterPanelOpen((p) => !p)}
          aria-expanded={filterPanelOpen}
          aria-label={filterPanelOpen ? "Close filters" : "Open filters"}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1 ${
            filterPanelOpen || hasActiveFilters
              ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)] text-white"
              : "border-[var(--border-light)] bg-white text-[var(--charcoal)]"
          }`}
        >
          <FilterIcon />
          {hasActiveFilters && (
            <span
              className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[var(--charcoal)]"
              aria-hidden
            />
          )}
        </button>

        {/* Mobile filter panel */}
        {filterPanelOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter properties"
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-light)] px-5 py-4">
              <h3 className="text-base font-medium" style={{ color: "var(--rocky-blue)" }}>
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setFilterPanelOpen(false)}
                aria-label="Close filters"
                className="flex size-8 items-center justify-center rounded-lg hover:bg-[var(--soft-sand)]/30"
                style={{ color: "var(--charcoal)" }}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-5">
                <ListingDropdown
                  transactionType={transactionType}
                  onSelect={handleListingSelect}
                />
                <FilterDropdown
                  value={propertyType}
                  options={PROPERTY_TYPES}
                  onChange={setPropertyType}
                  placeholder="Property type"
                  label="Property type"
                />
                <div className="grid grid-cols-2 gap-3">
                  <FilterDropdown
                    value={minPrice}
                    options={priceOptions}
                    onChange={setMinPrice}
                    placeholder="Min price"
                    label="Minimum price"
                  />
                  <FilterDropdown
                    value={maxPrice}
                    options={priceOptions}
                    onChange={setMaxPrice}
                    placeholder="Max price"
                    label="Maximum price"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--rocky-blue)] font-medium text-white shadow-sm transition-all hover:bg-[var(--rocky-blue-hover)] hover:shadow-md"
                >
                  <SearchIcon /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <div className="shrink-0 min-w-[120px]">
          <ListingDropdown
            transactionType={transactionType}
            onSelect={handleListingSelect}
          />
        </div>
        <div className="flex-1 min-w-0">
          <label htmlFor="property-search-desktop" className="sr-only">
            Search properties
          </label>
          <input
            id="property-search-desktop"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search location, community, building..."
            className="h-11 w-full rounded-lg border bg-white px-4 py-2.5 text-sm placeholder:text-[var(--charcoal)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
            style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
            autoComplete="off"
          />
        </div>
        <div className="shrink-0 min-w-[140px]">
          <FilterDropdown
            value={propertyType}
            options={PROPERTY_TYPES}
            onChange={setPropertyType}
            placeholder="Property type"
            label="Property type"
          />
        </div>
        <div className="shrink-0 min-w-[120px]">
          <FilterDropdown
            value={minPrice}
            options={priceOptions}
            onChange={setMinPrice}
            placeholder="Min price"
            label="Minimum price"
          />
        </div>
        <div className="shrink-0 min-w-[120px]">
          <FilterDropdown
            value={maxPrice}
            options={priceOptions}
            onChange={setMaxPrice}
            placeholder="Max price"
            label="Maximum price"
          />
        </div>
        <button
          type="submit"
          aria-label="Search properties"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--rocky-blue)] text-white transition-colors hover:bg-[var(--rocky-blue-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );

  const sectionClass = "py-4 md:py-6 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]";
  const sectionStyle = { backgroundColor: "#faf9f7" };

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Static bar */}
      <div
        ref={barRef}
        className={`w-full transition-opacity duration-300 ${
          isSticky ? "invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <section className={sectionClass} style={sectionStyle} aria-label="Property search">
          <Container>{barContent}</Container>
        </section>
      </div>

      {/* Sticky bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isSticky && !isHiddenByFooter
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        aria-hidden={!isSticky || isHiddenByFooter}
      >
        <section className={sectionClass} style={sectionStyle} aria-label="Property search">
          <Container>{barContent}</Container>
        </section>
      </div>
    </>
  );
};

export default PropertySearchBar;