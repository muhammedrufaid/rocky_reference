"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type DeveloperGlobalPresenceSectionProps = {
  heading?: string;
  description?: string;
  whyHeading?: string;
  points?: string[];
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

const defaultDescription = `Founded in 1997 by Mohamed Alabbar, Emaar Properties is headquartered in Dubai and operates across several sectors.

Currently one of the largest real estate developers in the country, Emaar has now expanded internationally with properties in the Middle East, North America, Europe, North Africa, and Asia.

Emaar is known for its iconic landmarks across Dubai, including the Burj Khalifa, Dubai Mall, Dubai Hills Estate, and more, in prime locations such as Dubai Marina, Arabian Ranches, Emaar Beachfront, and more.`;

const defaultPoints = [
  "Prime locations across Dubai’s most prestigious communities",
  "Premium quality, exceptional design, and reliable delivery",
  "Master-planned communities with schools, retail, and healthcare",
  "Ideal for families, global buyers, and long-term investors",
  "Strong rental yields and high resale demand",
];

export default function DeveloperGlobalPresenceSection({
  heading = "Who is Emaar?",
  description = defaultDescription,
  whyHeading = "Why Choose Emaar?",
  points = defaultPoints,
}: DeveloperGlobalPresenceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const whoHeadingId = "developer-global-presence-heading";
  const whyHeadingId = "developer-why-choose-heading";

  return (
    <section
      ref={ref}
      className="pb-16 md:pb-20 lg:pb-24 bg-white"
      aria-labelledby={`${whoHeadingId} ${whyHeadingId}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start lg:items-center">
          <motion.article
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col justify-center"
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
              id={whoHeadingId}
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {heading}
            </motion.h2>

            <motion.div
              className="mt-5 text-sm leading-[1.85] text-[#555555] md:text-[15px]"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.32}
            >
              {description.split("\n\n").map((para) => (
                <p key={para} className="mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </motion.div>
          </motion.article>

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
              id={whyHeadingId}
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {whyHeading}
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
