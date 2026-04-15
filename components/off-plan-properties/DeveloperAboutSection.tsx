"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type HighlightItem = {
  label: string;
  value: string;
};

type LandmarkItem = {
  name: string;
  location: string;
};

type DeveloperAboutSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  tag1?: string;
  tag2?: string;
  tag3?: string;
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
  heading = "About Emaar Properties",
  intro = "The developers behind the Burj Khalifa — the tallest tower in the world — Emaar Properties has redefined and transformed Dubai's skyline.",
  body = "Be it master communities or iconic landmarks, Emaar has earned international recognition. Designed to redefine modern living, Emaar has developed properties across residential, retail, hospitality, entertainment, and more.",
  imageSrc = "/assets/developers/featured/emaar-about.webp",
  imageAlt = "Emaar Properties — Dubai skyline",
}: DeveloperAboutSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="emaar-about-heading"
    >
      <Container>

        {/* Main grid: image left, text right */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">

          {/* Image */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            <div className="group relative overflow-hidden rounded-3xl bg-[#F2EEE8]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle inner border overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)" }}
                  aria-hidden
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h2
              id="emaar-about-heading"
              className="text-2xl font-medium leading-[1.12] tracking-[-0.025em] text-[#081F3A] sm:text-3xl md:text-4xl"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.15}
            >
              {heading}
            </motion.h2>

            {/* Decorative line */}
            <motion.div
              className="mt-6 mb-6 h-px w-12 bg-[#C3AD95]"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.2}
              aria-hidden
            />

            <motion.p
              className="text-base font-medium leading-[1.8] text-[#081F3A] md:text-[17px]"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.25}
            >
              {intro}
            </motion.p>

            <motion.p
              className="mt-4 text-sm leading-[1.85] text-[#333333]/60 md:text-[15px]"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3}
            >
              {body}
            </motion.p>
          </div>

        </div>
      </Container>
    </section>
  );
}