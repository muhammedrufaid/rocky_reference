"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type DeveloperGlobalPresenceSectionProps = {
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

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

export default function DeveloperGlobalPresenceSection({
  heading = "Who is Emaar?",
  description = `Founded in 1997 by Mohamed Alabbar, Emaar Properties is headquartered in Dubai and operates across several sectors.

Currently one of the largest real estate developers in the country, Emaar has now expanded internationally with properties in the Middle East, North America, Europe, North Africa, and Asia.

Emaar is known for its iconic landmarks across Dubai, including the Burj Khalifa, Dubai Mall, Dubai Hills Estate, and more, in prime locations such as Dubai Marina, Arabian Ranches, Emaar Beachfront, and more.`,
  imageSrc = "/assets/developers/featured/emaar-about.webp",
  imageAlt = "Downtown Dubai skyline",
}: DeveloperGlobalPresenceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const headingId = "developer-global-presence-heading";

  return (
    <section
      ref={ref}
      className="pb-16 md:pb-20 lg:pb-24 bg-white"
      aria-labelledby={headingId}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Text (left on desktop) */}
          <motion.article
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center order-1 lg:order-1"
          >
            <motion.div
              className="mb-4 h-0.5"
              style={{ backgroundColor: "#c3ad95", originX: 0 }}
              initial={{ scaleX: 0, width: 48 }}
              animate={inView ? { scaleX: 1, width: 48 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
              aria-hidden
            />

            <motion.h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {heading}
            </motion.h2>

            <motion.p
              className="mt-5 text-sm leading-[1.85] text-[#555555] md:text-[15px]"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.32}
            >
              {description.split("\n\n").map((para) => (
                <span key={para} className="block">
                  {para}
                </span>
              ))}
            </motion.p>
          </motion.article>

          {/* Image (right on desktop) */}
          <motion.figure
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative w-full max-w-xl mx-auto lg:mx-0 aspect-4/3 overflow-hidden rounded-2xl order-2 lg:order-2"
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
        </div>
      </Container>
    </section>
  );
}

