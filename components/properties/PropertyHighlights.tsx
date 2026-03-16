import Container from "@/components/layout/Container";
import {
  Building2,
  HandCoins,
  BedDouble,
  Bath,
  Maximize2,
  Sofa,
  BadgeCheck,
} from "lucide-react";

interface PropertyHighlightsProps {
  data?: {
    propertyType?: string;
    propertyPurpose?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertySize?: string;
    propertySizeUnit?: string;
    furnished?: string;
    offPlan?: boolean | string;
  };
}

interface HighlightItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function formatPurpose(purpose?: string): string {
  if (!purpose) return "";
  const normalized = purpose.trim().toLowerCase();
  if (normalized === "buy" || normalized === "sale" || normalized === "sell") return "Buy";
  if (normalized === "rent" || normalized === "rental") return "Rent";
  return purpose;
}

function formatBedrooms(bedrooms?: string): string {
  if (bedrooms === undefined || bedrooms === null || bedrooms === "") return "";
  const numericBedrooms = Number(bedrooms);
  if (!Number.isNaN(numericBedrooms) && numericBedrooms === 0) return "Studio";
  return bedrooms;
}

function formatPropertySize(size?: string, unit?: string): string {
  if (!size) return "";
  const trimmedUnit = unit?.trim();
  return trimmedUnit ? `${size} ${trimmedUnit.toLowerCase()}` : size;
}

function formatFurnished(value?: string): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (["yes", "y", "true", "1", "furnished"].includes(normalized)) return "Furnished";
  if (["no", "n", "false", "0", "unfurnished", "not furnished"].includes(normalized)) return "Unfurnished";
  return value;
}

function formatOffPlan(value?: boolean | string): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "y", "offplan", "off-plan"].includes(normalized)) return "Yes";
  if (["false", "0", "no", "n"].includes(normalized)) return "No";
  return value;
}

function buildHighlights(data?: PropertyHighlightsProps["data"]): HighlightItem[] {
  if (!data) return [];

  const purposeValue = formatPurpose(data.propertyPurpose);
  const bedroomsValue = formatBedrooms(data.bedrooms);
  const propertySizeValue = formatPropertySize(data.propertySize, data.propertySizeUnit);
  const furnishedValue = formatFurnished(data.furnished);
  const offPlanValue = formatOffPlan(data.offPlan);

  const items: Array<HighlightItem | null> = [
    data.propertyType
      ? { label: "Property Type", value: data.propertyType, icon: <Building2 size={18} aria-hidden="true" /> }
      : null,
    purposeValue
      ? { label: "Purpose", value: purposeValue, icon: <HandCoins size={18} aria-hidden="true" /> }
      : null,
    bedroomsValue
      ? { label: "Bedrooms", value: bedroomsValue, icon: <BedDouble size={18} aria-hidden="true" /> }
      : null,
    data.bathrooms
      ? { label: "Bathrooms", value: data.bathrooms, icon: <Bath size={18} aria-hidden="true" /> }
      : null,
    propertySizeValue
      ? { label: "Property Size", value: propertySizeValue, icon: <Maximize2 size={18} aria-hidden="true" /> }
      : null,
    furnishedValue
      ? { label: "Furnishing", value: furnishedValue, icon: <Sofa size={18} aria-hidden="true" /> }
      : null,
    offPlanValue
      ? { label: "Off Plan", value: offPlanValue, icon: <BadgeCheck size={18} aria-hidden="true" /> }
      : null,
  ];

  return items.filter((item): item is HighlightItem => Boolean(item));
}

export default function PropertyHighlights({ data }: PropertyHighlightsProps) {
  const highlights = buildHighlights(data);

  if (highlights.length === 0) return null;

  return (
    <section
      className="pb-8 md:pb-10 lg:pb-12"
      aria-label="Property highlights"
    >
      <Container>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4"
          role="list"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              role="listitem"
              className="
                group relative overflow-hidden
                rounded-2xl border border-gray-200/80 bg-white/95
                p-4 backdrop-blur-sm md:p-5
                shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.10)]
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                hover:border-[var(--rocky-blue)]/30
                hover:shadow-[0_10px_24px_rgba(15,23,42,0.10),0_4px_8px_rgba(15,23,42,0.06)]
              "
            >
              <span
                className="
                  pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full
                  bg-[var(--rocky-blue)]/[0.08] opacity-0 blur-2xl
                  transition-opacity duration-300 group-hover:opacity-100
                "
              />

              <div className="relative flex items-start gap-3">
                <span
                  className="
                    inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                    border border-gray-200/80 bg-gradient-to-b from-white to-gray-50
                    text-[var(--rocky-blue)]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,24,40,0.08)]
                    transition-all duration-300 group-hover:scale-[1.03]
                    group-hover:border-[var(--rocky-blue)]/25 group-hover:bg-[var(--rocky-blue)]/[0.06]
                  "
                >
                  {item.icon}
                </span>

                <div className="min-w-0">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500">
                    {item.label}
                  </p>
                  <p className="truncate text-[15px] font-semibold leading-snug text-gray-900 md:text-base">
                    {item.value}
                  </p>
                </div>
              </div>

              <span
                className="
                  pointer-events-none absolute inset-x-5 bottom-0 h-[2px] rounded-full
                  bg-gradient-to-r from-transparent via-[var(--rocky-blue)] to-transparent
                  opacity-0 transition-opacity duration-300 group-hover:opacity-100
                "
              >
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}