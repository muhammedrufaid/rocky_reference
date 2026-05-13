"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import type { Service } from "@/utils/types";

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
  const imageSrc = service.image ?? "/assets/common/servicemain.webp";

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="service-overview-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left: Detailed narrative content */}
          <motion.div
            className="flex flex-col justify-center lg:pr-2"
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Decorative line + heading grouped together for tighter visual unit */}
            <div className="mb-6">
              <motion.div
                className="mb-4 h-0.5 w-12"
                style={{ backgroundColor: "var(--sandstone-taupe)" }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                aria-hidden
              />
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
            </div>

            {/* Paragraphs with max-w-prose for comfortable line length */}
            <div className="space-y-5 max-w-prose">
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
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative lg:mt-1"
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl aspect-3/2 md:aspect-16/10 lg:aspect-video">
              <Image
                src={imageSrc}
                alt={`${service.title} - Rocky Real Estate professional service`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceOverviewSection;