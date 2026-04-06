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
  /** Background image path. When provided, image shows with overlay. Otherwise uses gradient background. */
  image?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const gradientBg =
  "linear-gradient(135deg, rgba(13, 54, 94, 0.97) 0%, rgba(8, 31, 58, 0.95) 50%, rgba(13, 54, 94, 0.88) 100%)";
const imageOverlay =
  "linear-gradient(135deg, rgba(13, 54, 94, 0.82) 0%, rgba(8, 31, 58, 0.78) 50%, rgba(13, 54, 94, 0.75) 100%)";

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  breadcrumb,
  image,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const sectionStyle = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#081f3a",
      }
    : {
        background: gradientBg,
        backgroundColor: "#081f3a",
      };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      aria-labelledby="page-hero-heading"
      style={sectionStyle}
    >
      {/* Semi-transparent overlay when image is used — image shows through, text stays readable */}
      {image && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: imageOverlay }}
          aria-hidden
        />
      )}
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
            className="mb-6 flex items-center gap-1.5 text-xs font-medium tracking-widest capitalize"
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
