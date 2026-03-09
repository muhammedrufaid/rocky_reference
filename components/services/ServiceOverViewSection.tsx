"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import type { Service } from "@/utils/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const DEFAULT_OVERVIEW_HEADING = "What We Bring to the Table";

interface ServiceOverviewSectionProps {
  service: Service;
}

const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({
  service,
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const heading = service.overviewHeading ?? DEFAULT_OVERVIEW_HEADING;
  const overviewParagraphs = service.overview ?? [];
  const hasOverviewContent = overviewParagraphs.length > 0;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="service-overview-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Detailed narrative content */}
          <motion.div
            className="flex flex-col justify-center order-1"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              className="mb-4 h-0.5 w-12"
              style={{ backgroundColor: "var(--sandstone-taupe)" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              aria-hidden
            />
            <motion.span
              className="block text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: "var(--rocky-blue)", opacity: 0.8 }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.05}
            >
              Service Overview
            </motion.span>
            <motion.h2
              id="service-overview-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] font-medium leading-tight tracking-tight"
              style={{ color: "var(--rocky-blue)" }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.08}
            >
              {heading}
            </motion.h2>
            <div className="mt-6 space-y-5">
              {overviewParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "var(--charcoal)", opacity: 0.85 }}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.1 + index * 0.04}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <motion.div
              className="mt-10"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.3}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,54,94,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--rocky-blue)]"
                style={{
                  backgroundColor: "var(--rocky-blue)",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(13, 54, 94, 0.2)",
                }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Image with decorative frame */}
          <motion.div
            className="relative order-2"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {service.image ? (
              <>
                <div
                  className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: "0 12px 40px rgba(13, 54, 94, 0.12)",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} - Rocky Real Estate professional service`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div
                  className="absolute -bottom-6 -right-6 w-28 h-28 md:w-36 md:h-36 rounded-2xl -z-10"
                  style={{
                    border: "2px solid var(--border-light)",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                  aria-hidden
                />
              </>
            ) : (
              <div
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "var(--soft-sand)",
                  boxShadow: "0 12px 40px rgba(13, 54, 94, 0.08)",
                }}
              >
                <Image
                  src="/assets/common/servicemain.webp"
                  alt={`${service.title} - Rocky Real Estate`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceOverviewSection;
