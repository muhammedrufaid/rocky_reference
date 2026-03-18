"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  { title: "Market-Leading Expertise", desc: "Deep knowledge of Dubai's real estate landscape" },
  { title: "Off-Plan Access", desc: "Exclusive access to premium off-plan developments" },
  { title: "Data-Driven Advisory", desc: "Investment decisions backed by market intelligence" },
  { title: "Transparent Service", desc: "Honest, clear guidance you can trust" },
  { title: "Dedicated Management", desc: "Personalised client relationship at every step" },
];

const stats = [
  { value: "50+", label: "Years of expertise" },
  { value: "145 K", label: "Listed Properties" },
  { value: "1.1 k", label: "Properties Managed" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WhyChooseUsSection2: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="why-choose-heading"
    >
      <Container>

        {/* ── Header ── */}
        <header className="mb-12 text-center md:mb-16">
          <motion.h2
            id="why-choose-heading"
            className="text-2xl font-medium text-[var(--rocky-blue)] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Why Choose Rocky Real Estate?
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base text-[var(--charcoal)]/70 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            With over 5 decades of experience, an ever-growing portfolio, and a team of seasoned experts, we ensure every service is personalised as per the client's needs.
          </motion.p>
        </header>

        {/* ── Stats bar ── */}
        <motion.div
          className="grid grid-cols-3 rounded-2xl mb-12 md:mb-16 overflow-hidden"
          style={{
            border: "1px solid rgba(13,54,94,0.1)",
            backgroundColor: "rgba(13,54,94,0.02)",
          }}
          variants={fadeUp}
          custom={0.38}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-6 px-4"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(13,54,94,0.08)" : "none",
              }}
            >
              <span
                className="text-2xl sm:text-3xl font-medium leading-none tracking-tight"
                style={{ color: "#0d365e" }}
              >
                {s.value}
              </span>
              <span
                className="mt-1.5 text-xs font-medium uppercase tracking-wide"
                style={{ color: "#888888", letterSpacing: "0.1em" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Benefits list + CTA — two-column on lg ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Benefits list */}
          <motion.ul
            role="list"
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((b, i) => (
              <motion.li
                key={b.title}
                variants={itemVariant}
                className="group flex items-start gap-5 py-5"
                style={{
                  borderBottom: i < benefits.length - 1
                    ? "1px solid rgba(13,54,94,0.07)"
                    : "none",
                }}
              >
                {/* Step number */}
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 transition-colors duration-300"
                  style={{
                    backgroundColor: "rgba(13,54,94,0.07)",
                    color: "#0d365e",
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: "#0d365e" }}
                  >
                    {b.title}
                  </p>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "#666666" }}
                  >
                    {b.desc}
                  </p>
                </div>

                {/* Animated tick on hover */}
                <motion.div
                  className="flex-shrink-0 mt-0.5"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5L6.5 12L13 5"
                      stroke="#c3ad95"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right column — sticky summary + CTA */}
          <motion.div
            className="lg:sticky lg:top-28 flex flex-col gap-6"
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Pull-quote block */}
            <div
              className="rounded-2xl p-7"
              style={{
                backgroundColor: "#0d365e",
                boxShadow: "0 12px 40px rgba(13,54,94,0.18)",
              }}
            >
              {/* Quote mark */}
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                className="mb-4"
                aria-hidden
              >
                <path
                  d="M0 20V12C0 5.373 4.477 1.12 13.43 0L14.57 2.08C10.763 2.88 8.573 5.013 8 8.48H12V20H0ZM16 20V12C16 5.373 20.477 1.12 29.43 0L30.57 2.08C26.763 2.88 24.573 5.013 24 8.48H28V20H16Z"
                  fill="rgba(195,173,149,0.3)"
                />
              </svg>

              <p
                className="text-base md:text-lg font-medium leading-relaxed"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                Every client relationship is built on trust, transparency, and decades of on-the-ground expertise in Dubai's property market.
              </p>

              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-xs font-medium" style={{ color: "#c3ad95" }}>
                  Rocky Real Estate
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Established 1976 · Dubai, UAE
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between w-full px-6 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,54,94,0.16)]"
              style={{
                border: "1px solid rgba(13,54,94,0.12)",
                backgroundColor: "rgba(13,54,94,0.03)",
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: "#0d365e" }}
              >
                Get in Touch
              </span>
              <span
                className="flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 group-hover:translate-x-1"
                style={{ backgroundColor: "#0d365e" }}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8H13M9 4L13 8L9 12"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection2;