"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import { FilterFunnelIcon, ToolbarDropdownChevronIcon, ToolbarSearchIcon } from "@/utils/icons";

const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Penthouse",
  "Villa",
  "Townhouse",
  "Duplex",
  "Studio",
];

// Price options for rent (AED/year)
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

// Price options for buy (AED)
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

interface DropdownProps {
  value: string;
  options: { label: string; value: string }[] | string[];
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  panelRef: React.RefObject<HTMLDivElement | null>;
  usePortal?: boolean;
}

type FormattedOption = { label: string; value: string };

function FilterDropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
  label,
  open,
  onToggle,
  onClose,
  triggerRef,
  panelRef,
  usePortal = false,
}: DropdownProps) {
  const formattedOptions: FormattedOption[] =
    typeof options[0] === "string"
      ? (options as string[]).map((o) => ({
          label: o,
          value: o === "All Types" ? "" : o,
        }))
      : (options as FormattedOption[]);

  const displayValue = value
    ? (formattedOptions.find((o) => o.value === value)?.label ?? placeholder)
    : (placeholder || formattedOptions[0]?.label);

  return (
    <div className="relative" ref={panelRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${displayValue}`}
        className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{
          color: "var(--charcoal)",
          borderColor: "var(--border-light)",
        }}
      >
        <span className="truncate">
          {displayValue}
        </span>
        <ToolbarDropdownChevronIcon open={open} />
      </button>

      {open && (() => {
        const rect = usePortal && triggerRef.current
          ? triggerRef.current.getBoundingClientRect()
          : null;
        const portalStyle: React.CSSProperties =
          rect && usePortal
            ? {
                left: rect.left,
                top: rect.bottom + 6,
                width: rect.width,
                minWidth: rect.width,
              }
            : {};
        const listContent = (
          <ul
            role="listbox"
            className={`max-h-56 overflow-auto rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04] ${
              usePortal ? "fixed z-[9999]" : "absolute left-0 right-0 z-[100]"
            } ${!usePortal ? "top-full mt-1.5" : ""}`}
            style={portalStyle}
          >
            {formattedOptions.map((opt) => (
              <li
                key={opt.value || "any"}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  onClose();
                }}
                className={`cursor-pointer px-4 py-3 text-sm transition-colors duration-150 ${
                  value === opt.value
                    ? "bg-[var(--rocky-blue)]/8 font-medium"
                    : "hover:bg-[var(--soft-sand)]/40"
                }`}
                style={{
                  color:
                    value === opt.value ? "var(--rocky-blue)" : "var(--charcoal)",
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        );
        return usePortal && typeof document !== "undefined"
          ? createPortal(listContent, document.body)
          : listContent;
      })()}
    </div>
  );
}

interface PropertyFilterBarProps {
  type: "rent" | "buy";
}

export default function PropertyFilterBar({ type }: PropertyFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);
  const [listingDropdownOpen, setListingDropdownOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const typeRef = useRef<HTMLButtonElement>(null);
  const typePanelRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLButtonElement>(null);
  const minPanelRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLButtonElement>(null);
  const maxPanelRef = useRef<HTMLDivElement>(null);
  const listingRef = useRef<HTMLButtonElement>(null);
  const listingPanelRef = useRef<HTMLDivElement>(null);
  const listingRefMobile = useRef<HTMLButtonElement>(null);
  const listingPanelRefMobile = useRef<HTMLDivElement>(null);

  const priceOptions = type === "rent" ? RENT_PRICES : BUY_PRICES;

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
    setPropertyType(searchParams.get("type") ?? "");
    setMinPrice(searchParams.get("min") ?? "");
    setMaxPrice(searchParams.get("max") ?? "");
  }, [searchParams, type]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !typePanelRef.current?.contains(target) &&
        !typeRef.current?.contains(target)
      )
        setTypeDropdownOpen(false);
      if (
        !minPanelRef.current?.contains(target) &&
        !minRef.current?.contains(target)
      )
        setMinPriceOpen(false);
      if (
        !maxPanelRef.current?.contains(target) &&
        !maxRef.current?.contains(target)
      )
        setMaxPriceOpen(false);
      if (
        !listingPanelRef.current?.contains(target) &&
        !listingRef.current?.contains(target) &&
        !listingPanelRefMobile.current?.contains(target) &&
        !listingRefMobile.current?.contains(target)
      )
        setListingDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildFilterUrl = (overrides?: {
    q?: string;
    type?: string;
    min?: string;
    max?: string;
  }) => {
    const params = new URLSearchParams();
    const q = overrides?.q ?? searchQuery;
    const pType = overrides?.type ?? propertyType;
    const min = overrides?.min ?? minPrice;
    const max = overrides?.max ?? maxPrice;
    if (q) params.set("q", q);
    if (pType) params.set("type", pType);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    const query = params.toString();
    return `/properties/${type}/in-dubai${query ? `?${query}` : ""}`;
  };

  const applySearch = () => {
    router.push(buildFilterUrl());
    setFilterPanelOpen(false);
  };

  const applyFilterChange = (updates: { q?: string; type?: string; min?: string; max?: string }) => {
    router.push(buildFilterUrl(updates));
    setFilterPanelOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applySearch();
  };

  const hasActiveFilters = !!(
    propertyType ||
    minPrice ||
    maxPrice
  );

  const searchInput = (
    <>
      <label htmlFor="property-search" className="sr-only">
        Search properties by location or keyword
      </label>
      <input
        id="property-search"
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location, community, building..."
        className="h-11 w-full min-w-0 rounded-lg border bg-white px-4 py-2.5 text-left text-sm placeholder:text-[var(--charcoal)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{
          color: "var(--charcoal)",
          borderColor: "var(--border-light)",
        }}
        autoComplete="off"
      />
    </>
  );

  return (
    <section
      className="sticky top-0 z-30 py-4 md:py-6 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
      style={{ backgroundColor: "#faf9f7" }}
      aria-label="Property filters"
    >
      <Container>
        <form onSubmit={handleSearch} className="w-full">
          {/* Mobile & Tablet: Search + Filter icon */}
          <div className="relative flex items-center gap-2 lg:hidden">
            <div className="flex-1 min-w-0">{searchInput}</div>
            <button
              type="button"
              onClick={() => setFilterPanelOpen((p) => !p)}
              aria-expanded={filterPanelOpen}
              aria-label={filterPanelOpen ? "Close filters" : "Open filters"}
              aria-haspopup="dialog"
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1 ${
                filterPanelOpen || hasActiveFilters
                  ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)] text-white"
                  : "border-[var(--border-light)] bg-white text-[var(--charcoal)] hover:border-[var(--rocky-blue)]/50"
              }`}
            >
              <FilterFunnelIcon active={hasActiveFilters} />
              {hasActiveFilters && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--charcoal)]" aria-hidden />
              )}
            </button>

            {/* Mobile filter popup - full screen */}
            {filterPanelOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Filter properties"
                className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
              >
                  {/* Popup header */}
                  <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-light)] bg-white px-5 py-4">
                    <h3 className="text-base font-medium" style={{ color: "var(--rocky-blue)" }}>
                      Filters
                    </h3>
                    <button
                      type="button"
                      onClick={() => setFilterPanelOpen(false)}
                      aria-label="Close filters"
                      className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--soft-sand)]/30"
                      style={{ color: "var(--charcoal)" }}
                    >
                      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-5 p-5">
                  {/* Rent | Buy */}
              <div className="relative" ref={listingPanelRefMobile}>
                <button
                  ref={listingRefMobile}
                  type="button"
                  onClick={() => setListingDropdownOpen((p) => !p)}
                  aria-haspopup="listbox"
                  aria-expanded={listingDropdownOpen}
                  aria-label={`Listing type: ${type === "rent" ? "Rent" : "Buy"}`}
                  className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
                  style={{
                    color: "var(--rocky-blue)",
                    borderColor: "var(--rocky-blue)",
                  }}
                >
                  <span>{type === "rent" ? "Rent" : "Buy"}</span>
                  <ToolbarDropdownChevronIcon open={listingDropdownOpen} />
                </button>
                {listingDropdownOpen && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-30 mt-1.5 rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
                  >
                    <li>
                      <Link
                        href="/properties/rent/in-dubai"
                        className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--soft-sand)]/40"
                        style={{
                          color: "var(--charcoal)",
                          backgroundColor:
                            type === "rent" ? "rgba(13, 54, 94, 0.06)" : undefined,
                        }}
                        onClick={() => setListingDropdownOpen(false)}
                      >
                        Rent
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/properties/buy/in-dubai"
                        className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--soft-sand)]/40"
                        style={{
                          color: "var(--charcoal)",
                          backgroundColor:
                            type === "buy" ? "rgba(13, 54, 94, 0.06)" : undefined,
                        }}
                        onClick={() => setListingDropdownOpen(false)}
                      >
                        Buy
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              {/* Property type */}
              <FilterDropdown
                value={propertyType}
                options={PROPERTY_TYPES}
                onChange={(v) => {
                  setPropertyType(v);
                  applyFilterChange({ type: v });
                }}
                placeholder="Property type"
                label="Property type"
                open={typeDropdownOpen}
                usePortal
                onToggle={() => {
                  setMinPriceOpen(false);
                  setMaxPriceOpen(false);
                  setTypeDropdownOpen((p) => !p);
                }}
                onClose={() => setTypeDropdownOpen(false)}
                triggerRef={typeRef}
                panelRef={typePanelRef}
              />
              {/* Min & Max price row */}
              <div className="grid grid-cols-2 gap-3">
                <FilterDropdown
                  value={minPrice}
                  options={priceOptions}
                  onChange={(v) => {
                    setMinPrice(v);
                    applyFilterChange({ min: v });
                  }}
                  placeholder="Min price"
                  label="Minimum price"
                  open={minPriceOpen}
                  usePortal
                  onToggle={() => {
                    setMinPriceOpen((p) => !p);
                    setTypeDropdownOpen(false);
                    setMaxPriceOpen(false);
                  }}
                  onClose={() => setMinPriceOpen(false)}
                  triggerRef={minRef}
                  panelRef={minPanelRef}
                />
                <FilterDropdown
                  value={maxPrice}
                  options={priceOptions}
                  onChange={(v) => {
                    setMaxPrice(v);
                    applyFilterChange({ max: v });
                  }}
                  placeholder="Max price"
                  label="Maximum price"
                  open={maxPriceOpen}
                  usePortal
                  onToggle={() => {
                    setMaxPriceOpen((p) => !p);
                    setTypeDropdownOpen(false);
                    setMinPriceOpen(false);
                  }}
                  onClose={() => setMaxPriceOpen(false)}
                  triggerRef={maxRef}
                  panelRef={maxPanelRef}
                />
              </div>
              <button
                type="button"
                onClick={applySearch}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--rocky-blue)] text-white font-medium shadow-sm transition-all hover:bg-[var(--rocky-blue-hover)] hover:shadow-md"
              >
                <ToolbarSearchIcon /> Search
              </button>
                    </div>
                  </div>
                </div>
            )}
          </div>

          {/* Desktop: Full row */}
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-3">
            <div className="relative shrink-0" ref={listingPanelRef}>
              <button
                ref={listingRef}
                type="button"
                onClick={() => setListingDropdownOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={listingDropdownOpen}
                aria-label={`Listing type: ${type === "rent" ? "Rent" : "Buy"}`}
                className="flex h-11 min-w-[120px] items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
                style={{
                  color: "var(--rocky-blue)",
                  borderColor: "var(--rocky-blue)",
                }}
              >
                <span>{type === "rent" ? "Rent" : "Buy"}</span>
                <ToolbarDropdownChevronIcon open={listingDropdownOpen} />
              </button>
              {listingDropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute left-0 top-full z-30 mt-1 min-w-[120px] rounded-lg border bg-white py-1 shadow-[0_10px_40px_rgba(13,54,94,0.12)]"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  <li role="option" aria-selected={type === "rent"}>
                    <Link
                      href="/properties/rent/in-dubai"
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--soft-sand)]/30"
                      style={{
                        color: "var(--charcoal)",
                        backgroundColor:
                          type === "rent" ? "rgba(13, 54, 94, 0.06)" : undefined,
                      }}
                      onClick={() => setListingDropdownOpen(false)}
                    >
                      Rent
                    </Link>
                  </li>
                  <li role="option" aria-selected={type === "buy"}>
                    <Link
                      href="/properties/buy/in-dubai"
                      className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--soft-sand)]/30"
                      style={{
                        color: "var(--charcoal)",
                        backgroundColor:
                          type === "buy" ? "rgba(13, 54, 94, 0.06)" : undefined,
                      }}
                      onClick={() => setListingDropdownOpen(false)}
                    >
                      Buy
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="flex-1 min-w-0">{searchInput}</div>
            <div className="flex-shrink-0 lg:min-w-[140px]">
              <FilterDropdown
                value={propertyType}
                options={PROPERTY_TYPES}
                onChange={(v) => {
                  setPropertyType(v);
                  applyFilterChange({ type: v });
                }}
                placeholder="Property type"
                label="Property type"
                open={typeDropdownOpen}
                onToggle={() => {
                  setMinPriceOpen(false);
                  setMaxPriceOpen(false);
                  setTypeDropdownOpen((p) => !p);
                }}
                onClose={() => setTypeDropdownOpen(false)}
                triggerRef={typeRef}
                panelRef={typePanelRef}
              />
            </div>
            <div className="flex-shrink-0 lg:min-w-[120px]">
              <FilterDropdown
                value={minPrice}
                options={priceOptions}
                onChange={(v) => {
                  setMinPrice(v);
                  applyFilterChange({ min: v });
                }}
                placeholder="Min price"
                label="Minimum price"
                open={minPriceOpen}
                onToggle={() => {
                  setMinPriceOpen((p) => !p);
                  setTypeDropdownOpen(false);
                  setMaxPriceOpen(false);
                }}
                onClose={() => setMinPriceOpen(false)}
                triggerRef={minRef}
                panelRef={minPanelRef}
              />
            </div>
            <div className="flex-shrink-0 lg:min-w-[120px]">
              <FilterDropdown
                value={maxPrice}
                options={priceOptions}
                onChange={(v) => {
                  setMaxPrice(v);
                  applyFilterChange({ max: v });
                }}
                placeholder="Max price"
                label="Maximum price"
                open={maxPriceOpen}
                onToggle={() => {
                  setMaxPriceOpen((p) => !p);
                  setTypeDropdownOpen(false);
                  setMinPriceOpen(false);
                }}
                onClose={() => setMaxPriceOpen(false)}
                triggerRef={maxRef}
                panelRef={maxPanelRef}
              />
            </div>
            <button
              type="submit"
              aria-label="Search properties"
              className="flex h-11 min-w-[52px] items-center justify-center rounded-lg bg-[var(--rocky-blue)] text-white transition-colors hover:bg-[var(--rocky-blue-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
            >
              <ToolbarSearchIcon />
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
