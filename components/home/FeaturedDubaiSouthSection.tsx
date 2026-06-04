

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const FeaturedDubaiSouthSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="featured-dubai-south-heading"
      style={{
        background:
          "linear-gradient(135deg, rgba(13, 54, 94, 0.97) 0%, rgba(8, 31, 58, 0.95) 50%, rgba(13, 54, 94, 0.88) 100%)",
        backgroundColor: "#081f3a",
      }}
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
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.28)" }}
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
              src="/assets/common/venicecommunity.webp"
              alt="Dubai South master-planned community - Rocky Real Estate"
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
            <motion.p
              className="mb-3 text-xs font-medium uppercase tracking-widest"
              style={{ color: "rgba(195, 173, 149, 0.75)" }}
              variants={fadeUp}
              custom={0.28}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Featured Community
            </motion.p>

            <motion.h2
              id="featured-dubai-south-heading"
              className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem]"
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Dubai South
            </motion.h2>

            <motion.div
              className="mt-6 h-px w-12"
              style={{ backgroundColor: "#c3ad95", opacity: 0.6 }}
              variants={fadeUp}
              custom={0.36}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              aria-hidden
            />

            <motion.p
              className="mt-5 text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(255, 255, 255, 0.72)" }}
              variants={fadeUp}
              custom={0.42}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Dubai South, the master-planned city, is built around growth, innovation, and opportunity. Designed to shape the future business, living, and connectivity of Dubai, this master community is home to a diverse range of residential communities, lifestyle destinations, commercial districts, and a thriving aviation and logistics hub.
            </motion.p>

            <motion.div
              className="mt-8"
              variants={fadeUp}
              custom={0.54}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="https://dubaisouth.rockyrealestate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(195,173,149,0.35)]"
                style={{
                  backgroundColor: "#c3ad95",
                  color: "#081f3a",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                }}
              >
                Explore Dubai South
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedDubaiSouthSection;
