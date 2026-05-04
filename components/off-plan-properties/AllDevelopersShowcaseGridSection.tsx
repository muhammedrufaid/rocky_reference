"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Container from "@/components/layout/Container";
import { developers } from "@/utils/data";

const easing = [0.22, 1, 0.36, 1] as const;

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easing },
  },
};

function shouldGlow(index: number) {
  return index % 7 === 0 || index % 7 === 3;
}

function Glow({ index }: { index: number }) {
  if (!shouldGlow(index)) return null;

  const variant = index % 2 === 0 ? "a" : "b";
  const gradient =
    variant === "a"
      ? "radial-gradient(80% 80% at 30% 20%, rgba(195,173,149,0.22) 0%, rgba(195,173,149,0.08) 35%, transparent 70%)"
      : "radial-gradient(70% 70% at 70% 25%, rgba(13,54,94,0.14) 0%, rgba(195,173,149,0.06) 40%, transparent 72%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-6 -z-10 blur-2xl"
      style={{ background: gradient }}
    />
  );
}

const AllDevelopersShowcaseGridSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <section
      className={className ?? "pt-16 md:pt-20 lg:pt-24"}
      aria-labelledby="all-developers-showcase-heading"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        <header className="mb-10 md:mb-14">
          <motion.h2
            id="all-developers-showcase-heading"
            className="text-2xl font-medium text-[var(--rocky-blue)] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: easing }}
          >
            Top Real Estate Developers in Dubai
          </motion.h2>
          <motion.p
            className="mt-3 max-w-3xl text-sm md:text-base"
            style={{ color: "rgba(17, 24, 39, 0.7)" }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.06, ease: easing }}
          >
            Browse Dubai’s leading real estate developers offering luxury residences, off-plan projects, and high-return investment opportunities in prime locations.
          </motion.p>
        </header>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {developers.map((dev, index) => (
            <motion.div key={dev.id} variants={cardVariants} className="relative">
              <Glow index={index} />

              <Link
                href={dev.path ?? "#"}
                aria-label={`View developer: ${dev.name}`}
                className="group relative block overflow-hidden rounded-2xl border bg-white transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/60"
                style={{
                  borderColor: "rgba(13, 54, 94, 0.10)",
                  boxShadow: "0 2px 14px rgba(13,54,94,0.06)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(231,220,205,0.28) 100%)",
                  }}
                />

                <div className="relative flex min-h-[140px] items-center justify-center p-6">
                  <div className="relative aspect-5/2 w-full max-w-[180px] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5">
                    <Image
                      src={dev.logo}
                      alt={`${dev.name} logo`}
                      fill
                      sizes="180px"
                      className="object-contain opacity-70 grayscale transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default AllDevelopersShowcaseGridSection;

