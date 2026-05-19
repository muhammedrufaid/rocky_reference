"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
// ServiceCard sub-component
// ---------------------------------------------------------------------------

interface CardProps {
  item: ServiceCard;
  index: number;
}

const ServiceCardItem: React.FC<CardProps> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  const href = item.slug ? `/services/${item.slug}` : undefined;

  const imageSrc =
    typeof item.image === "string"
      ? item.image
      : item.image?.src ??
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
  const imageAlt =
    typeof item.image === "string" ? item.title : item.image?.alt ?? item.title;

  const cardShell = (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ paddingBottom: "58%" }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={65}
        className="object-cover will-change-transform"
        style={{
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "scale(1.07)" : "scale(1.01)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,18,30,0.08) 0%, transparent 40%, rgba(5,18,30,0.72) 100%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,18,30,0.88) 0%, rgba(5,18,30,0.48) 50%, rgba(5,18,30,0.10) 100%)",
          transition: "opacity 0.5s ease",
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden
      />

      <div
        className="absolute top-4 right-4 flex items-center justify-center rounded-full"
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.18)",
          transition:
            "transform 0.45s cubic-bezier(0.22,1,0.36,1), background-color 0.3s ease",
          transform: hovered ? "rotate(0deg)" : "rotate(-45deg)",
        }}
        aria-hidden
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.30)",
            marginBottom: "10px",
            transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
            width: hovered ? "100%" : "32px",
          }}
          aria-hidden
        />

        <h3
          className="text-white font-medium"
          style={{
            fontSize: "1.35rem",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            overflow: "hidden",
            transition:
              "max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, margin-top 0.45s ease",
            maxHeight: hovered ? "80px" : "0px",
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "8px" : "0px",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)", maxWidth: "300px" }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );

  const interactiveProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className:
      "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e] focus-visible:ring-offset-4 rounded-xl",
    "aria-label": `${item.title} — ${item.description}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {href ? (
        <Link href={href} {...interactiveProps}>
          {cardShell}
        </Link>
      ) : (
        <article {...interactiveProps}>{cardShell}</article>
      )}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main section component
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
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
          <motion.div
            className="text-center sm:text-left w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-tight"
              style={{ color: "#0D365E" }}
            >
              {heading}
            </h2>
            <p className="mt-3 text-base text-[#555] md:text-lg max-w-2xl mx-auto sm:mx-0">
              {subheading}
            </p>

            {cta?.href && cta?.label && (
              <motion.div
                className="mt-7 flex justify-center sm:justify-start"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0D365E] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e] focus-visible:ring-offset-2"
                >
                  {cta.label}
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
                </Link>
              </motion.div>
            )}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {data.map((item, index) => (
            <ServiceCardItem key={String(item.id)} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceSectionv2;
