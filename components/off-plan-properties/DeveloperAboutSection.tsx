"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type DeveloperAboutSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  body?: string;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  /** Stable id for `aria-labelledby` (unique per developer route). */
  headingId?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay,
    },
  }),
};

export default function DeveloperAboutSection({
  heading = "About Emaar",
  intro = "The developers behind the Burj Khalifa — the tallest tower in the world — Emaar Properties has redefined and transformed Dubai's skyline.",
  body = "Be it master communities or iconic landmarks, Emaar has earned international recognition. Designed to redefine modern living, Emaar has developed properties across residential, retail, hospitality, entertainment, and more.",
  headingId = "developer-about-heading",
}: DeveloperAboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="py-8 md:py-12 lg:py-16 bg-white"
      aria-labelledby={headingId}
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            id={headingId}
            className="text-2xl font-medium leading-[1.12] tracking-[-0.025em] text-[#081F3A] sm:text-3xl md:text-4xl"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.12}
          >
            {heading}
          </motion.h2>

          <motion.div
            className="mx-auto mt-6 mb-6 h-px w-12 bg-[#C3AD95]"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.18}
            aria-hidden
          />

          <motion.p
            className="text-sm leading-[1.85] text-[#333333]/70 md:text-[15px]"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.24}
          >
            {intro}
            {body ? ` ${body}` : ""}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}