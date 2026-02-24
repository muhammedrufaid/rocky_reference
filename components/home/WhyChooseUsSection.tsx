"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  { icon: "◆", title: "Market-Leading Expertise", desc: "Deep knowledge of Dubai's real estate landscape" },
  { icon: "◆", title: "Off-Plan Access", desc: "Exclusive access to premium off-plan developments" },
  { icon: "◆", title: "Data-Driven Advisory", desc: "Investment decisions backed by market intelligence" },
  { icon: "◆", title: "Transparent Service", desc: "Honest, clear guidance you can trust" },
  { icon: "◆", title: "Dedicated Management", desc: "Personalised client relationship at every step" },
];

// Reusable variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WhyChooseUsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="why-choose-heading"
    // style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        {/* ROW 1: Small image + heading/text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Image — slides in from left */}
          <motion.figure
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-full max-w-xl mx-auto lg:mx-0 aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 6px 28px rgba(13, 54, 94, 0.10)" }}
          >
            {/* Shimmer overlay that sweeps away once loaded */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ backgroundPosition: "-100% 0", opacity: 1 }}
              animate={
                isInView
                  ? { backgroundPosition: "200% 0", opacity: 0 }
                  : { backgroundPosition: "-100% 0", opacity: 1 }
              }
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
            />
            <Image
              src="/assets/common/whychooseus.jpg"
              alt="Luxury Dubai real estate - Rocky Real Estate expertise"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 384px, 40vw"
              priority={false}
            />
          </motion.figure>

          {/* Text content — slides in from right, children stagger */}
          <motion.article
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            {/* Accent line */}
            <motion.div
              className="mb-4 h-0.5"
              style={{ backgroundColor: "#c3ad95", originX: 0 }}
              initial={{ scaleX: 0, width: 48 }}
              animate={isInView ? { scaleX: 1, width: 48 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
              aria-hidden
            />

            <motion.h2
              id="why-choose-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Why Choose Rocky Real Estate?
            </motion.h2>

            <motion.p
              className="mt-5 text-base md:text-lg leading-relaxed"
              style={{ color: "#555555" }}
              variants={fadeUp}
              custom={0.42}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              With over 5 decades of experience, an ever-growing portfolio, and a team of seasoned experts, we ensure every service is personalised as per the client’s needs.
            </motion.p>

            <motion.div
              className="mt-8"
              variants={fadeUp}
              custom={0.54}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,54,94,0.28)]"
                style={{
                  backgroundColor: "#0d365e",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(13, 54, 94, 0.2)",
                }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;