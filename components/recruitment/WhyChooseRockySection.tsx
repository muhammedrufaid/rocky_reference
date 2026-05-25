"use client";

import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Rocky Brand Tokens ───────────────────────────────────────────────────────
// Primary blues
// Rocky Blue   #0D365E   (hero/structure)
// Royal Blue   #1C4E80   (mid tone)
// Midnight Blue #081F3A  (darkest bg)
// Light accents
// Sandstone Taupe #C3AD95  (icons, lines, 10% accents)
// Warm Taupe   #9F8870
// Soft Sand    #E7DCCD   (cards, soft surfaces)
// Supporting
// White #FFFFFF  (70% — dominant surface)
// Charcoal Gray #333333  (body text)

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBrokerage = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M3 22V9l10-7 10 7v13" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <rect x="9" y="14" width="8" height="8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M13 14v8" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
);
const IconExperience = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M13 7v6l4 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconAward = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="13" cy="10" r="6" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M9 15.5 7 22l6-2.5L19 22l-2-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);
const IconTraining = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <rect x="3" y="4" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M9 21h8M13 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 10.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconClients = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="19" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 22c0-3.5 3-6 7-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M24 22c0-3.5-3-6-7-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M10 22c0-2.5 1.2-4.5 4-4.5s4 2 4 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const IconMarketing = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M3 18V12l10-8 10 8v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M10 18v-3h6v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    <circle cx="21" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M18.7 7.3L13 9.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const features: Feature[] = [
  {
    number: "01",
    title: "Brokerage Built for Long-Term Success",
    description: "A foundation engineered to sustain and scale your career — with systems, culture, and leadership that endure.",
    icon: <IconBrokerage />,
  },
  {
    number: "02",
    title: "50+ Years of Market Experience",
    description: "Half a century of navigating Dubai's property cycles gives our agents an unmatched edge in every negotiation.",
    icon: <IconExperience />,
  },
  {
    number: "03",
    title: "Award-Winning Industry Professionals",
    description: "Our roster of recognised experts brings credibility, trust, and proven performance to every transaction.",
    icon: <IconAward />,
  },
  {
    number: "04",
    title: "Training Designed for Growth",
    description: "Structured mentorship, live workshops, and digital academies built to accelerate agents at every stage.",
    icon: <IconTraining />,
  },
  {
    number: "05",
    title: "Access to Active Clients & Listings",
    description: "Tap into a continuously refreshed pipeline of qualified buyers, investors, and exclusive off-market inventory.",
    icon: <IconClients />,
  },
  {
    number: "06",
    title: "Marketing Power That Drives Deals",
    description: "Premium photography, digital campaigns, and brand amplification that position your listings above the rest.",
    icon: <IconMarketing />,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: d },
  }),
};

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -5, scale: 1.012 }}
    transition={{ type: "spring", stiffness: 300, damping: 24 }}
    className="group relative flex flex-col gap-5 rounded-2xl border border-[#C3AD95]/20 bg-white p-7 overflow-hidden cursor-default"
    style={{ boxShadow: "0 2px 12px rgba(8,31,58,0.07), 0 8px 32px rgba(8,31,58,0.05)" }}
  >
    {/* Top accent bar — Rocky Blue */}
    <div
      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      style={{ background: "linear-gradient(90deg, #0D365E, #1C4E80, #C3AD95)" }}
    />

    {/* Soft sand fill on hover */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ background: "linear-gradient(160deg, #E7DCCD18 0%, transparent 60%)" }}
    />

    {/* Number + Icon */}
    <div className="flex items-start justify-between">
      <span
        className="font-serif text-[42px] font-light leading-none tracking-tight select-none"
        style={{ color: "#C3AD95" }}
      >
        {feature.number}
      </span>
      <span
        className="mt-1 transition-colors duration-300"
        style={{ color: "#C3AD95" }}
        aria-hidden="true"
      >
        {feature.icon}
      </span>
    </div>

    {/* Text */}
    <div className="flex flex-col gap-2">
      <h3
        className="text-[15px] font-semibold leading-snug tracking-wide transition-colors duration-200"
        style={{ color: "#0D365E" }}
      >
        {feature.title}
      </h3>
      <p
        className="text-[13.5px] leading-relaxed"
        style={{ color: "#9F8870" }}
      >
        {feature.description}
      </p>
    </div>

    {/* Bottom-right corner dot accent */}
    <div
      className="absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      style={{ background: "#0D365E" }}
    />
  </motion.div>
);

// ─── Section ──────────────────────────────────────────────────────────────────
const WhyChooseRockySection: React.FC<{ className?: string }> = ({ className }) => {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section
      className={`relative overflow-hidden ${className ?? "py-24 md:py-32 lg:py-36"}`}
      aria-labelledby="why-rocky-heading"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Background: deep navy left panel ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[38%] hidden lg:block"
        style={{
          background: "linear-gradient(160deg, #0D365E 0%, #081F3A 100%)",
        }}
      />

      {/* Subtle diagonal cut on navy panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[38%] w-24 hidden lg:block"
        style={{
          background: "linear-gradient(160deg, #081F3A 0%, transparent 100%)",
          transform: "skewX(-4deg) translateX(-48px)",
        }}
      />

      {/* Top border line */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, #0D365E 0%, #C3AD95 40%, #E7DCCD 100%)" }}
      />

      {/* ── Content ── */}
      <Container className="relative">

        {/* ── Header: two-column on desktop ── */}
        <div
          ref={headRef}
          className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-stretch gap-0"
        >
          {/* Left column — navy bg on desktop */}
          <div className="lg:w-[38%] lg:pr-12 flex flex-col justify-center pb-0 lg:pb-0">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={headInView ? "visible" : "hidden"}
              className="mb-5 inline-flex items-center gap-2.5"
            >
              <span className="h-px w-7" style={{ background: "#C3AD95" }} />
              <span
                className="text-[10.5px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: "#C3AD95" }}
              >
                Rocky Real Estate
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              id="why-rocky-heading"
              custom={0.08}
              variants={fadeUp}
              initial="hidden"
              animate={headInView ? "visible" : "hidden"}
              className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-[1.1] tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              Why Choose{" "}
              <span className="italic" style={{ color: "#C3AD95" }}>Rocky</span>
              <br />
              Real Estate?
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="origin-left mt-7 mb-6 h-px w-16"
              style={{ background: "linear-gradient(90deg, #C3AD95, transparent)" }}
            />

            {/* Descriptor */}
            <motion.p
              custom={0.22}
              variants={fadeUp}
              initial="hidden"
              animate={headInView ? "visible" : "hidden"}
              className="text-[14.5px] leading-[1.75]"
              style={{ color: "#C3AD95", opacity: 0.8 }}
            >
              We architect real estate careers built to last — pairing decades of market wisdom with the tools, network, and mentorship that transform ambition into sustained success.
            </motion.p>
          </div>

          {/* Right column — stats strip on white */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={headInView ? "visible" : "hidden"}
            className="lg:w-[62%] lg:pl-14 flex items-end pt-12 lg:pt-0"
          >
            <div
              className="w-full grid grid-cols-3 gap-0 rounded-2xl overflow-hidden"
              style={{ border: "1px solid #E7DCCD" }}
            >
              {[
                { value: "50+", label: "Years of Experience" },
                { value: "500+", label: "Active Agents" },
                { value: "#1", label: "Dubai Brokerage" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-8 px-4 text-center"
                  style={{
                    borderRight: i < 2 ? "1px solid #E7DCCD" : undefined,
                    background: i === 1 ? "#0D365E" : "#FFFFFF",
                  }}
                >
                  <span
                    className="font-serif text-[2.2rem] font-light leading-none mb-1"
                    style={{ color: i === 1 ? "#C3AD95" : "#0D365E" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.16em] font-medium"
                    style={{ color: i === 1 ? "#E7DCCD" : "#9F8870" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Feature Grid ── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {features.map((f) => (
            <FeatureCard key={f.number} feature={f} />
          ))}
        </motion.div>

        {/* ── CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            background: "linear-gradient(135deg, #0D365E 0%, #081F3A 100%)",
          }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#C3AD95" }}
            >
              Join the Network
            </span>
            <p
              className="text-[14px] leading-relaxed"
              style={{ color: "#E7DCCD", opacity: 0.85 }}
            >
              Over <strong style={{ color: "#FFFFFF", fontWeight: 500 }}>500 agents</strong> trust Rocky across every Dubai district.
            </p>
          </div>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-7 py-3.5 text-[13.5px] font-semibold tracking-wide transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] shrink-0"
            style={{
              background: "#FFFFFF",
              color: "#0D365E",
              boxShadow: "0 0 24px rgba(195,173,149,0.25)",
            }}
          >
            <span>Start Your Journey</span>
            <svg
              width="15" height="15" viewBox="0 0 15 15" fill="none"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#C3AD95]/20 to-transparent skew-x-12" />
          </a>
        </motion.div>

      </Container>
    </section>
  );
};

export default WhyChooseRockySection;