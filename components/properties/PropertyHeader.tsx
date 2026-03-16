"use client";

import Container from "@/components/layout/Container";
import {
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
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
    offPlan?: boolean | string;
    permitNumber?: string;
    listingAgent?: string;
    listingAgentPhone?: string;
    listingAgentEmail?: string;
  };
}

function formatPrice(price?: string): string {
  if (!price) return "";
  const num = parseFloat(price.replace(/,/g, ""));
  if (isNaN(num)) return price;
  return num.toLocaleString("en-AE");
}

function buildLocation(data: PropertyHeaderProps["data"]): string {
  const parts = [data?.subLocality, data?.locality, data?.city].filter(Boolean);
  return parts.join(", ");
}

function formatPurpose(purpose?: string): string {
  if (!purpose) return "";
  return purpose.charAt(0).toUpperCase() + purpose.slice(1).toLowerCase();
}

function normalizePhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

function getWhatsAppHref(phone?: string): string {
  const normalized = normalizePhone(phone).replace(/^\+/, "");
  return normalized ? `https://wa.me/${normalized}` : "";
}

function isTruthyOffPlan(offPlan?: boolean | string): boolean {
  if (typeof offPlan === "boolean") return offPlan;
  if (!offPlan) return false;
  const normalized = offPlan.trim().toLowerCase();
  return ["true", "1", "yes", "y", "offplan", "off-plan"].includes(normalized);
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

function StatItem({ icon, label, value }: StatItemProps) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-[var(--border-light)] bg-white px-4 py-3">
      <div className="flex items-center gap-2 text-gray-700">
        <span className="shrink-0 text-[var(--rocky-blue)]">{icon}</span>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      </div>
      <p className="mt-1 text-base font-medium text-gray-900">{value}</p>
    </div>
  );
}

function ContactButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--rocky-blue)] px-4 py-2.5 text-sm font-medium text-[var(--rocky-blue)] transition hover:bg-[var(--rocky-blue)] hover:text-white"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

export default function PropertyHeader({ data }: PropertyHeaderProps) {
  const location = buildLocation(data);
  const formattedPrice = formatPrice(data?.price);
  const sizeLabel = data?.propertySizeUnit ?? "sqft";
  const propertySummary = [data?.propertyType, data?.propertyPurpose ? `for ${formatPurpose(data.propertyPurpose)}` : ""]
    .filter(Boolean)
    .join(" ");

  const bedroomsValue =
    data?.bedrooms !== undefined && data?.bedrooms !== null
      ? Number(data.bedrooms) === 0
        ? "Studio"
        : data.bedrooms
      : undefined;
  const bedroomsLabel =
    bedroomsValue === "Studio"
      ? "Bedrooms"
      : Number(data?.bedrooms) === 1
        ? "Bedroom"
        : "Bedrooms";
  const bathroomsLabel = Number(data?.bathrooms) === 1 ? "Bathroom" : "Bathrooms";

  const phone = normalizePhone(data?.listingAgentPhone);
  const whatsappHref = getWhatsAppHref(data?.listingAgentPhone);
  const emailHref = data?.listingAgentEmail ? `mailto:${data.listingAgentEmail}` : "";
  const showOffPlan = isTruthyOffPlan(data?.offPlan);

  return (
    <section className="py-6 md:py-8 lg:py-10" aria-label="Property Header">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5 rounded-2xl border border-[var(--border-light)] bg-white p-5 md:p-7">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {data?.propertyTitle && (
                  <h1 className="text-2xl font-medium leading-snug text-gray-900 md:text-3xl">
                    {data.propertyTitle}
                  </h1>
                )}
                {showOffPlan && (
                  <span className="rounded-full bg-[var(--soft-sand)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--rocky-blue)]">
                    Off Plan
                  </span>
                )}
              </div>

              {formattedPrice && (
                <p className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                  <span className="mr-1 text-xl font-medium text-[var(--rocky-blue)] md:text-2xl">AED</span>
                  {formattedPrice}
                </p>
              )}

              {location && (
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--rocky-blue)]" aria-hidden="true" />
                  <span className="text-sm md:text-base">{location}</span>
                </div>
              )}

              {propertySummary && (
                <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--soft-sand)]/30 px-3 py-2 text-sm font-medium text-[var(--charcoal)]">
                  <Building2 size={16} className="text-[var(--rocky-blue)]" aria-hidden="true" />
                  <span>{propertySummary}</span>
                </div>
              )}
            </div>

            <hr className="border-[var(--border-light)]" />

            <div className="grid gap-3 sm:grid-cols-3">
              <StatItem
                icon={<BedDouble size={17} aria-hidden="true" />}
                label={bedroomsLabel}
                value={bedroomsValue}
              />
              <StatItem
                icon={<Bath size={17} aria-hidden="true" />}
                label={bathroomsLabel}
                value={data?.bathrooms}
              />
              <StatItem
                icon={<Maximize2 size={17} aria-hidden="true" />}
                label={sizeLabel}
                value={data?.propertySize}
              />
            </div>

            {data?.permitNumber && (
              <>
                <hr className="border-[var(--border-light)]" />
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <ShieldCheck size={16} className="text-[var(--rocky-blue)]" aria-hidden="true" />
                  <span className="font-medium">Permit Number:</span>
                  <span>{data.permitNumber}</span>
                </div>
              </>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-[var(--border-light)] bg-white p-5 md:p-6">
            <h2 className="text-lg font-medium text-gray-900">Contact Agent</h2>
            <p className="mt-1 text-sm text-gray-500">
              {data?.listingAgent || "Our Property Specialist"}
            </p>

            <div className="mt-4 grid gap-2.5">
              {phone && (
                <ContactButton
                  href={`tel:${phone}`}
                  icon={<Phone size={16} aria-hidden="true" />}
                  label="Call"
                />
              )}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--rocky-blue)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--rocky-blue-hover)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              )}
              {emailHref && (
                <ContactButton
                  href={emailHref}
                  icon={<Mail size={16} aria-hidden="true" />}
                  label="Email"
                />
              )}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}