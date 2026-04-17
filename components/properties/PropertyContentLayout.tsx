"use client";

import React, { useMemo, useState } from "react";
import type { ApiPropertyDetail } from "@/utils/getServices";
import {
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Sparkles,
  Check,
  Info,
} from "lucide-react";

export interface PropertyContentLayoutProps {
  property: ApiPropertyDetail;
  className?: string;
}

function buildLocation(data: ApiPropertyDetail): string {
  const parts = [data.subLocality, data.locality, data.city].filter(Boolean);
  return parts.join(", ");
}

function toNumber(value?: string): number | null {
  if (!value) return null;
  const cleaned = String(value).replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatCompactNumber(value: number): string {
  return value.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

function formatMoneyAED(value?: string): string {
  const num = toNumber(value);
  if (num == null) return value ?? "";
  return `AED ${num.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
}

function safeText(value?: string): string {
  return String(value ?? "").trim();
}

function StatPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#F6F6F6] bg-[#F6F6F6] px-3 py-1.5 text-sm text-[#333333]">
      <span className="text-[#C3AD95]">{icon}</span>
      <span className="text-[#333333]/60">{label}</span>
      <span className="font-medium text-[#333333]">{value}</span>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#F6F6F6] bg-white text-[#333333] shadow-[0_18px_40px_rgba(8,31,58,0.06)]">
      <div className="flex items-center gap-3 border-b border-[#F6F6F6] px-5 py-4 sm:px-6">
        {icon ? (
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F6F6F6] bg-[#F6F6F6] text-[#C3AD95]">
            {icon}
          </span>
        ) : null}
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-[#081F3A] sm:text-base">
          {title}
        </h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function FeaturesAmenitiesSection({ features }: { features: string[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const shown = features.slice(0, visibleCount);
  const canLoadMore = visibleCount < features.length;

  return (
    <SectionCard title="Features & Amenities" icon={<Sparkles size={18} aria-hidden="true" />}>
      {features.length ? (
        <div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 rounded-xl border border-[#F6F6F6] bg-[#F6F6F6] px-4 py-3"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#F6F6F6] bg-white text-[#C3AD95]">
                  <Check size={18} aria-hidden="true" />
                </span>
                <span className="text-sm text-[#333333]">{f}</span>
              </div>
            ))}
          </div>

          {canLoadMore ? (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => Math.min(c + 6, features.length))}
                className="cursor-pointer text-sm font-medium text-[#0D365E] underline underline-offset-4 transition hover:text-[#1C4E80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D365E]/30 focus-visible:ring-offset-2"
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[#333333]/60">Features will be updated soon.</p>
      )}
    </SectionCard>
  );
}

function DescriptionSection({ description }: { description?: string }) {
  const clean = description?.trim() ?? "";
  const [isExpanded, setIsExpanded] = useState(false);

  const COLLAPSED_LENGTH = 420;
  const isLongDescription = clean.length > COLLAPSED_LENGTH;
  const previewText = useMemo(() => {
    if (!isLongDescription) return clean;
    return `${clean.slice(0, COLLAPSED_LENGTH).trimEnd()}...`;
  }, [clean, isLongDescription]);

  return (
    <SectionCard title="Description" icon={<Info size={18} aria-hidden="true" />}>
      {clean ? (
        <div>
          <p className="whitespace-pre-line text-sm leading-7 text-gray-700 md:text-base">
            {isExpanded ? clean : previewText}
          </p>

          {isLongDescription ? (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="mt-4 inline-flex cursor-pointer items-center text-sm font-medium text-[var(--rocky-blue)] transition hover:text-[var(--rocky-blue-hover)]"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[#333333]/60">Description is not available for this listing.</p>
      )}
    </SectionCard>
  );
}

function ListingDetailsSection({
  detailRows,
}: {
  detailRows: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <SectionCard title="Listing Details">
      <div className="overflow-hidden rounded-xl border border-[#F6F6F6]">
        <table className="w-full text-left text-sm">
          <tbody>
            {detailRows.map((row) => (
              <tr key={row.label} className="border-b border-[#F6F6F6] last:border-b-0">
                <th className="w-[46%] bg-[#F6F6F6] px-4 py-3 font-medium text-[#333333]/60">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-[#333333]">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

function LocationSection({ mapQuery }: { mapQuery: string }) {
  return (
    <SectionCard title="Location">
      <div className="overflow-hidden rounded-xl border border-[#F6F6F6] bg-[#F6F6F6]">
        <iframe
          title="Location map"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-[320px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </SectionCard>
  );
}

export default function PropertyContentLayout({ property, className }: PropertyContentLayoutProps) {
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");

  const location = useMemo(() => buildLocation(property), [property]);
  const title = property.propertyTitle ?? property.towerName ?? `Property ${property.propertyRefNo}`;
  const features = Array.isArray(property.features) ? property.features.filter(Boolean) : [];

  const sizeSqft = useMemo(() => {
    const n = toNumber(property.propertySize);
    return n;
  }, [property.propertySize]);

  const sizeDisplay = useMemo(() => {
    if (sizeSqft == null) return property.propertySize ?? "";
    if (unit === "sqft") return `${formatCompactNumber(sizeSqft)} sqft`;
    const sqm = sizeSqft * 0.092903;
    return `${sqm.toLocaleString("en-AE", { maximumFractionDigits: 0 })} sqm`;
  }, [property.propertySize, sizeSqft, unit]);

  const pricePerSqm = useMemo(() => {
    const price = toNumber(property.price);
    const sqft = sizeSqft;
    if (price == null || sqft == null || sqft <= 0) return "";
    const sqm = sqft * 0.092903;
    if (sqm <= 0) return "";
    const v = price / sqm;
    return `AED ${v.toLocaleString("en-AE", { maximumFractionDigits: 0 })}`;
  }, [property.price, sizeSqft]);

  const mapQuery = useMemo(() => {
    const q = safeText(location) || safeText(property.city) || "Dubai";
    return encodeURIComponent(q);
  }, [location, property.city]);

  const detailRows = useMemo(() => {
    return [
      { label: "Location", value: location || "Dubai" },
      { label: "Furnishing", value: safeText(property.furnished) || "-" },
      { label: "Price per sqm", value: pricePerSqm || "-" },
      { label: "Property Type", value: safeText(property.propertyType) || "-" },
      { label: "Reference No.", value: safeText(property.propertyRefNo) || "-" },
      { label: "DLD Permit Number", value: safeText(property.permitNumber) || "-" },
    ];
  }, [
    location,
    pricePerSqm,
    property.furnished,
    property.permitNumber,
    property.propertyRefNo,
    property.propertyType,
  ]);

  return (
    <div className={["space-y-6", className ?? ""].join(" ")} aria-label="Property content">

      <FeaturesAmenitiesSection features={features} />
      <DescriptionSection description={property.propertyDescription} />
      <ListingDetailsSection detailRows={detailRows} />
      {/* <LocationSection mapQuery={mapQuery} /> */}
    </div>
  );
}

