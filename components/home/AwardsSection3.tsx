"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ─── Award list data ──────────────────────────────────────────────────────────
const awards = [
  {
    id: 1,
    title: "Best Real Estate Agency Dubai",
    year: "2024",
  },
  {
    id: 2,
    title: "Arabian Property Awards — Highly Commended",
    year: "2023",
  },
  {
    id: 3,
    title: "Forbes Top 10 Brokerages MENA",
    year: "2024",
  },
  {
    id: 4,
    title: "Cityscape Excellence Award",
    year: "2023",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease },
});

// ─── Component ────────────────────────────────────────────────────────────────
const AwardsSection3: React.FC = () => {
  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="awards-section-heading"
    >
      {/* ── Container ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT: Content ── */}
          <div className="flex flex-col gap-8">

            {/* Section label */}
            <motion.p
              {...fadeUp(0)}
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#9F8870", fontFamily: "'Poppins', sans-serif" }}
            >
              Our Achievements
            </motion.p>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.08)}
              id="awards-section-heading"
              className="text-3xl md:text-4xl font-semibold leading-tight"
              style={{ color: "#081F3A", fontFamily: "'Poppins', sans-serif" }}
            >
              Awards &amp;{" "}
              <span style={{ color: "#1C4E80" }}>Recognition</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              {...fadeUp(0.14)}
              className="text-sm md:text-base leading-relaxed max-w-md"
              style={{ color: "#333333", fontFamily: "'Poppins', sans-serif" }}
            >
              Celebrating excellence and industry achievements in real estate.
              Our commitment to quality and client service has been recognised
              by the region's most prestigious institutions.
            </motion.p>

            {/* Award list */}
            <motion.ul
              {...fadeUp(0.2)}
              className="flex flex-col gap-4"
              aria-label="Award list"
            >
              {awards.map((award, i) => (
                <motion.li
                  key={award.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease }}
                  className="flex items-center justify-between gap-4 pb-4 border-b"
                  style={{ borderColor: "#E7DCCD" }}
                >
                  <span
                    className="text-sm md:text-base font-medium"
                    style={{ color: "#081F3A", fontFamily: "'Poppins', sans-serif" }}
                  >
                    {award.title}
                  </span>
                  <span
                    className="text-xs font-semibold shrink-0 px-3 py-1 rounded-full"
                    style={{
                      color: "#1C4E80",
                      backgroundColor: "#EBF0F7",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {award.year}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Button */}
            <motion.div {...fadeUp(0.46)}>
              <Link
                href="/awards"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 group"
                style={{
                  backgroundColor: "#081F3A",
                  color: "#FFFFFF",
                  fontFamily: "'Poppins', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1C4E80";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#081F3A";
                }}
              >
                View All Awards
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Award image ── */}
          <motion.div
            {...fadeIn(0.3)}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 32px 64px -16px rgba(8,31,58,0.18)" }}
            >
              {/* Soft sand background fallback */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#E7DCCD" }}
              />

              <Image
                src="/publicassets/awards/awards1.avif"
                alt="Awards and Recognition — prestigious real estate accolades"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 480px"
                priority
              />

              {/* Subtle overlay gradient at bottom for polish */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,31,58,0.08), transparent)",
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AwardsSection3;