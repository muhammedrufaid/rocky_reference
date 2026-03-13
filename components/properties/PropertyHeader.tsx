"use client";

import Container from "@/components/layout/Container";
import {
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  Tag,
  MapPin,
} from "lucide-react";

interface PropertyHeaderProps {
  data?: {
    propertyTitle?: string;
    towerName?: string;
    subLocality?: string;
    locality?: string;
    city?: string;
    price?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertySize?: string;
    propertySizeUnit?: string;
    propertyType?: string;
    propertyPurpose?: string;
  };
}

function formatPrice(price?: string): string {
  if (!price) return "";
  const num = parseFloat(price.replace(/,/g, ""));
  if (isNaN(num)) return price;
  return num.toLocaleString("en-AE");
}

function buildLocation(data: PropertyHeaderProps["data"]): string {
  const parts = [
    data?.towerName,
    data?.subLocality,
    data?.locality,
    data?.city,
  ].filter(Boolean);
  return parts.join(", ");
}

interface MetaItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

function MetaItem({ icon, label, value }: MetaItemProps) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 text-gray-700">
      <span className="text-teal-600 shrink-0">{icon}</span>
      <span className="text-sm font-medium whitespace-nowrap">
        {value}{" "}
        <span className="text-gray-400 font-normal">{label}</span>
      </span>
    </div>
  );
}

export default function PropertyHeader({ data }: PropertyHeaderProps) {
  const location = buildLocation(data);
  const formattedPrice = formatPrice(data?.price);
  const sizeLabel = data?.propertySizeUnit ?? "sqft";

  return (
    <section className="py-6 md:py-8 lg:py-10" aria-label="Property Header">
      <Container>
        <div className="space-y-5">

          {/* Title & Location */}
          <div className="space-y-2">
            {data?.propertyTitle && (
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
                {data.propertyTitle}
              </h1>
            )}
            {location && (
              <div className="flex items-start gap-1.5 text-gray-500">
                <MapPin size={16} className="mt-0.5 shrink-0 text-teal-500" aria-hidden="true" />
                <span className="text-sm md:text-base">{location}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Price */}
          {formattedPrice && (
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-medium">
                Price
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                <span className="text-teal-600 text-xl md:text-2xl font-semibold mr-1">
                  AED
                </span>
                {formattedPrice}
              </p>
            </div>
          )}

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <MetaItem
              icon={<BedDouble size={17} aria-hidden="true" />}
              label={Number(data?.bedrooms) === 1 ? "Bed" : "Beds"}
              value={data?.bedrooms}
            />

            {data?.bedrooms && data?.bathrooms && (
              <span className="text-gray-200 text-lg select-none" aria-hidden="true">|</span>
            )}

            <MetaItem
              icon={<Bath size={17} aria-hidden="true" />}
              label={Number(data?.bathrooms) === 1 ? "Bath" : "Baths"}
              value={data?.bathrooms}
            />

            {(data?.bedrooms || data?.bathrooms) && data?.propertySize && (
              <span className="text-gray-200 text-lg select-none" aria-hidden="true">|</span>
            )}

            <MetaItem
              icon={<Maximize2 size={17} aria-hidden="true" />}
              label={sizeLabel}
              value={data?.propertySize}
            />

            {data?.propertySize && data?.propertyType && (
              <span className="text-gray-200 text-lg select-none" aria-hidden="true">|</span>
            )}

            <MetaItem
              icon={<Building2 size={17} aria-hidden="true" />}
              label=""
              value={data?.propertyType}
            />

            {data?.propertyType && data?.propertyPurpose && (
              <span className="text-gray-200 text-lg select-none" aria-hidden="true">|</span>
            )}

            <MetaItem
              icon={<Tag size={17} aria-hidden="true" />}
              label=""
              value={data?.propertyPurpose ? `For ${data.propertyPurpose}` : undefined}
            />
          </div>

        </div>
      </Container>
    </section>
  );
}