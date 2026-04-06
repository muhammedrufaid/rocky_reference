import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ServiceCard {
  id: string | number;
  slug?: string;
  title: string;
  description: string;
  image?:
    | string
    | {
        src: string;
        alt: string;
      };
}

interface ServiceSectionv3Props {
  data?: ServiceCard[];
  heading?: React.ReactNode;
  subheading?: string;
  backgroundColor?: string;
  className?: string;
  cta?: { label: string; href: string };
}

// ---------------------------------------------------------------------------
// Tag map — maps slug to a short category label
// ---------------------------------------------------------------------------

const TAG_MAP: Record<string, string> = {
  "property-management": "Management",
  "professional-inspection": "Inspection",
  brokerage: "Brokerage",
  mortgage: "Finance",
  "listing-marketing": "Marketing",
  "after-sales": "Support",
};

// ---------------------------------------------------------------------------
// ArrowRight icon
// ---------------------------------------------------------------------------

const ArrowRight = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ---------------------------------------------------------------------------
// ServiceCard sub-component — REDESIGNED
// ---------------------------------------------------------------------------

interface CardProps {
  item: ServiceCard;
}

const ServiceCard: React.FC<CardProps> = ({ item }) => {
  const href = item.slug ? `/services/${item.slug}` : undefined;

  const imageSrc =
    typeof item.image === "string"
      ? item.image
      : item.image?.src ??
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
  const imageAlt =
    typeof item.image === "string" ? item.title : item.image?.alt ?? item.title;

  const tag = item.slug ? TAG_MAP[item.slug] : undefined;

  const inner = (
    <>
      {/* ── Image ── */}
      <div className="relative h-[204px] overflow-hidden bg-[#E7DCCD]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Softer modern overlay + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" aria-hidden />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />

      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-6">
        {/* Title */}
        <h3
          className="text-[16.5px] font-medium leading-snug tracking-[-0.2px] md:text-[18px] lg:text-[19px]"
          style={{ color: "#0D365E" }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="mt-2.5 flex-1 text-[13.5px] leading-[1.7] md:text-[14px]"
          style={{ color: "#333333", opacity: 0.82 }}
        >
          {item.description}
        </p>

        {/* Footer */}
        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: "rgba(13,54,94,0.10)" }}
        >
          {/* Animated accent bar */}
          <div
            className="h-[2px] w-7 rounded-full transition-all duration-300 group-hover:w-11"
            style={{ background: "#C3AD95" }}
            aria-hidden
          />

          {/* Learn more link */}
          {href && (
            <span className="flex items-center gap-[6px] text-[12.5px] font-medium leading-none tracking-[0.14px] text-[#1C4E80] transition-all duration-200 group-hover:gap-2.5">
              Learn more
              <ArrowRight />
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article className="h-full">
      {href ? (
        <Link
          href={href}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(13,54,94,0.09)] bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(28,78,128,0.22)] hover:shadow-[0_18px_50px_rgba(13,54,94,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C4E80]/40 focus-visible:ring-offset-2"
        >
          {inner}
        </Link>
      ) : (
        <div
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(13,54,94,0.09)] bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(28,78,128,0.22)] hover:shadow-[0_18px_50px_rgba(13,54,94,0.12)]"
        >
          {/* Top accent bar */}
          <div
            className="h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#0D365E] via-[#1C4E80] to-[#C3AD95] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            aria-hidden
          />
          {inner}
        </div>
      )}
    </article>
  );
};

// ---------------------------------------------------------------------------
// Main section component — UNCHANGED
// ---------------------------------------------------------------------------

const ServiceSectionv2: React.FC<ServiceSectionv3Props> = ({
  data = [],
  heading = "Our Services",
  subheading = "Paperwork to handover, our experienced team offers solutions tailored for Dubai's dynamic market",
  backgroundColor = "#faf9f7",
  className,
  cta,
}) => {
  return (
    <section
      className={className ?? "py-16 md:py-20 lg:py-24"}
      style={{ backgroundColor }}
      aria-labelledby="services-heading"
    >
      <Container>
        <header className="mb-12 text-center md:mb-16">
          <h2
            id="services-heading"
            className="text-2xl font-medium sm:text-3xl md:text-4xl lg:text-[2.5rem] tracking-tight"
            style={{ color: "var(--rocky-blue)" }}
          >
            {heading}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
            style={{ color: "var(--charcoal)" }}
          >
            {subheading}
          </p>

          {cta?.href && cta?.label && (
            <div className="mt-7 flex justify-center">
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#0D365E] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C4E80]/40 focus-visible:ring-offset-2"
              >
                {cta.label}
                <ArrowRight />
              </Link>
            </div>
          )}
        </header>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <ServiceCard
              key={String(item.id)}
              item={item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceSectionv2;