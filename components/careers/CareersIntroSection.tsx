"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const featuredRoles = [
  { title: "Senior Sales Agent", department: "Sales" },
  { title: "Buyer's Specialist", department: "Client Relations" },
  { title: "Marketing Lead", department: "Marketing" },
];

const pillars = [
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 6.75 14.25 10.5 20.25 4.5M3.75 13.5H9m-5.25 0V19.5" />
      </svg>
    ),
    title: "Performance Culture",
    desc: "Transparent commissions, real-time rankings, merit over tenure.",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: "Market Intelligence",
    desc: "Proprietary data, live pricing tools, and AI-assisted prospecting.",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: "Global Network",
    desc: "38 nationalities, 123+ agents, and cross-border referral pipelines.",
  },
];

const CareersIntroSection: React.FC = () => {
  const sectionRef = useRef(null);
  // Require ~25% of section visible before animating (prevents early trigger when just a sliver is on screen)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24"
      aria-labelledby="careers-intro-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 lg:gap-10 xl:gap-16 items-stretch">

          {/* ── LEFT PANEL: Editorial block ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative flex flex-col justify-between rounded-3xl border border-[#faf9f7] bg-neutral-50 p-10 md:p-12 xl:p-14 overflow-hidden min-h-[540px]"
          >
            <div className="flex flex-col gap-8">

              <header>
                {/* Eyebrow */}
                <motion.div
                  className="mb-4 h-0.5 w-12"
                  style={{ backgroundColor: "var(--sandstone-taupe)" }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  aria-hidden
                />
                <motion.h2
                  id="careers-intro-heading"
                  variants={slideUp}
                  className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-tight tracking-tight text-charcoal"
                >
                  Join Dubai’s Leading Real Estate Team
                </motion.h2>

                <motion.p variants={slideUp} className="mt-8 max-w-md text-base md:text-lg leading-[1.7] text-neutral-600">
                At Rocky Real Estate, you get the brand reputation, market insights, and the experienced team to accelerate your real estate career in Dubai.
                </motion.p>
              </header>

              {/* Pillar list */}
              <motion.ul variants={stagger} className="flex flex-col gap-5">
                {pillars.map((p) => (
                  <motion.li
                    key={p.title}
                    variants={slideUp}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2d4e]/10 text-[#0b2d4e]">
                      {p.icon}
                    </span>
                    <div>
                      <p className="text-base font-medium text-charcoal">{p.title}</p>
                      <p className="mt-0.5 text-sm md:text-base text-neutral-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Bottom: CTAs */}
            {/* <motion.div variants={slideUp} className="flex flex-wrap items-center gap-4 pt-6">
              <Link
                href="/careers/apply"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0b2d4e] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#0b2d4e]/90"
              >
                View Open Roles
                <svg className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/about/culture"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-neutral-400 hover:text-charcoal"
              >
                Our Culture
              </Link>
            </motion.div> */}
          </motion.div>

          {/* ── RIGHT PANEL: Image + metrics ── */}
          <div className="flex flex-col gap-5 mt-8 lg:mt-0">

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-1 overflow-hidden rounded-3xl bg-neutral-100 min-h-[280px]"
            >
              <Image
                src="/assets/common/careers.webp"
                alt="Rocky Real Estate team"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 50%, rgba(11,45,78,0.45) 100%)",
                }}
              />

              {/* Hiring badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium text-charcoal">Actively Hiring</span>
              </motion.div>

              {/* Location pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b2d4e]/10">
                  <svg className="size-3.5 text-[#0b2d4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-neutral-400">Where we operate</p>
                  <p className="text-[13px] font-medium text-charcoal">Dubai & UAE</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Featured open roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                Open positions
              </p>
              <div className="flex flex-col gap-2">
                {featuredRoles.map((role, i) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href="/careers/apply"
                      className="group flex items-center justify-between rounded-xl border border-neutral-100 bg-white px-4 py-3.5 text-left transition-all duration-200 hover:border-[#0b2d4e]/20 hover:shadow-sm"
                    >
                      <div>
                        <p className="text-sm font-medium text-charcoal group-hover:text-[#0b2d4e] transition-colors">
                          {role.title}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">{role.department}</p>
                      </div>
                      <svg className="size-4 text-neutral-400 group-hover:text-[#0b2d4e] group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() =>
                  document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-1 text-sm font-medium text-[#0b2d4e] hover:underline cursor-pointer"
              >
                View all open roles →
              </button>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CareersIntroSection;