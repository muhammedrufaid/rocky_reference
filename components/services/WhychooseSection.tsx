"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Container from "@/components/layout/Container";
import { whyChooseServicesData } from "@/utils/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const listItemVariants = {
  hidden: { opacity: 0, x: -24, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const numberCircleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WhychooseSection: React.FC = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef<HTMLDivElement>(null);
  // Require ~25% of section visible before animating (prevents early trigger when just a sliver is on screen)
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const [yearsCount, setYearsCount] = useState(0);
  const [transparencyCount, setTransparencyCount] = useState(0);

  useEffect(() => {
    if (!isStatsInView) return;
    const yearsControl = animate(0, 50, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setYearsCount(Math.round(v)),
    });
    const transparencyControl = animate(0, 100, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setTransparencyCount(Math.round(v)),
    });
    return () => {
      yearsControl.stop();
      transparencyControl.stop();
    };
  }, [isStatsInView]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#faf9f7" }}
      aria-labelledby="why-choose-services-heading"
    >
      <Container>
        {/* Header */}
        <header className="mb-12 md:mb-16 max-w-2xl">
          <motion.div
            className="mb-4 h-0.5 w-12"
            style={{ backgroundColor: "var(--sandstone-taupe)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            aria-hidden
          />
          <motion.h2
            id="why-choose-services-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
            style={{ color: "var(--rocky-blue)" }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            Why Choose Our Services?
          </motion.h2>
          <motion.p
            className="mt-4 text-sm md:text-base leading-relaxed"
            style={{ color: "var(--charcoal)", opacity: 0.8 }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.08}
          >
            From paperwork to handover, we deliver clarity, integrity, and results — backed by deep market expertise and a commitment to your success.
          </motion.p>
        </header>

        {/* Numbered list with vertical connector line */}
        <motion.div
          className="relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {/* Vertical line - animates downward when in view */}
          <motion.div
            className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-px hidden md:block origin-top"
            style={{ backgroundColor: "var(--sandstone-taupe)", opacity: 0.35 }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            aria-hidden
          />

          <ul className="space-y-10 md:space-y-12">
            {whyChooseServicesData.map((item, index) => (
              <motion.li
                key={item.id}
                className="relative flex gap-6 md:gap-8 items-start"
                variants={listItemVariants}
              >
                {/* Number circle - pops in */}
                <motion.div
                  className="relative z-10 flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--rocky-blue)",
                    color: "white",
                  }}
                  variants={numberCircleVariants}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3
                    className="text-base font-semibold md:text-lg"
                    style={{ color: "var(--rocky-blue)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-1.5 text-[15px] leading-relaxed"
                    style={{ color: "var(--charcoal)", opacity: 0.85 }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Trust line */}
        <motion.div
          ref={statsRef}
          className="mt-14 md:mt-16 pt-8 border-t border-[var(--charcoal)]/10 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.85}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: "var(--rocky-blue)" }}>{yearsCount}+</span>
            <span className="text-sm md:text-base" style={{ color: "var(--charcoal)", opacity: 0.8 }}>Years of experience</span>
          </div>
          <div className="hidden sm:block w-px h-8" style={{ backgroundColor: "var(--charcoal)", opacity: 0.15 }} />
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-semibold tabular-nums" style={{ color: "var(--rocky-blue)" }}>{transparencyCount}%</span>
            <span className="text-sm md:text-base" style={{ color: "var(--charcoal)", opacity: 0.8 }}>Transparent service</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhychooseSection;
