"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type DeveloperWhyChooseSectionProps = {
  heading?: string;
  subheading?: string;
  points?: string[];
  imageSrc?: string;
  imageAlt?: string;
};

// Reusable variants (kept consistent with home WhyChooseUsSection)
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

export default function DeveloperWhyChooseSection({
  heading = "Why Choose Emaar?",
  points = [
    "Prime locations across Dubai’s most prestigious communities",
    "Premium quality, exceptional design, and reliable delivery",
    "Master-planned communities with schools, retail, and healthcare",
    "Ideal for families, global buyers, and long-term investors",
    "Strong rental yields and high resale demand",
  ],
  imageSrc = "/assets/developers/featured/emaar-about.webp",
  imageAlt = "Burj Khalifa — Dubai skyline",
}: DeveloperWhyChooseSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const headingId = "developer-why-choose-heading";

  return (
    <section
      ref={ref}
      className="pb-16 md:pb-20 lg:pb-24 bg-white"
      aria-labelledby={headingId}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Image — slides in from left (same wrapper as home WhyChooseUsSection) */}
          <motion.figure
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative w-full max-w-xl mx-auto lg:mx-0 aspect-4/3 overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 6px 28px rgba(13, 54, 94, 0.10)" }}
          >
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ backgroundPosition: "-100% 0", opacity: 1 }}
              animate={
                inView
                  ? { backgroundPosition: "200% 0", opacity: 0 }
                  : { backgroundPosition: "-100% 0", opacity: 1 }
              }
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              aria-hidden
            />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 384px, 40vw"
              priority={false}
            />
          </motion.figure>

          {/* Text content — slides in from right */}
          <motion.article
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
          >
            <motion.div
              className="mb-4 h-0.5"
              style={{ backgroundColor: "#c3ad95", originX: 0 }}
              initial={{ scaleX: 0, width: 48 }}
              animate={inView ? { scaleX: 1, width: 48 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
              aria-hidden
            />

            <motion.h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {heading}
            </motion.h2>

            <motion.ul
              className="mt-7 space-y-4"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.42}
              role="list"
            >
              {points.map((point, i) => (
                <motion.li
                  key={`${i}-${point}`}
                  className="flex gap-3"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={0.5 + i * 0.06}
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C3AD95]" aria-hidden />
                  <span className="text-sm leading-[1.85] text-[#555555] md:text-[15px]">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>



        </div>
      </Container>
    </section>
  );
}