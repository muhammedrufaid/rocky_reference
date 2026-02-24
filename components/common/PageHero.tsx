"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  breadcrumb,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24"
      aria-labelledby="page-hero-heading"
      style={{
        background:
          "linear-gradient(135deg, rgba(13, 54, 94, 0.97) 0%, rgba(8, 31, 58, 0.95) 50%, rgba(13, 54, 94, 0.88) 100%)",
        backgroundColor: "#081f3a",
      }}
    >
      {/* Subtle radial glow — matches Hero overlay depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(195, 173, 149, 0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Noise texture layer for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
        aria-hidden
      />

      <Container>
        <div className="relative z-10 max-w-xl">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-6 flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(195, 173, 149, 0.75)" }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span
                    aria-hidden
                    style={{ color: "rgba(195, 173, 149, 0.4)" }}
                  >
                    —
                  </span>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[#c3ad95]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>

          {/* Heading */}
          <motion.h1
            id="page-hero-heading"
            className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            {title}
          </motion.h1>

          {/* Subheading */}
          {description && (
            <motion.p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(255,255,255,0.72)" }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.18}
            >
              {description}
            </motion.p>
          )}

          {/* Divider accent */}
          <motion.div
            className="mt-8 h-px w-12"
            style={{ backgroundColor: "#c3ad95", opacity: 0.6 }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.26}
            aria-hidden
          />
        </div>
      </Container>
    </section>
  );
};

export default PageHero;
