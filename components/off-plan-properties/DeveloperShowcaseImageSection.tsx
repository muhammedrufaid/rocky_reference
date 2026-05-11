"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type DeveloperShowcaseImageSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
  /** Tailwind aspect ratio on the frame (image uses object-contain so it is never cropped). */
  aspectClassName?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function DeveloperShowcaseImageSection({
  imageSrc = "/assets/developers/featured/emaar-about.webp",
  imageAlt = "Dubai skyline and developments",
}: DeveloperShowcaseImageSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <section ref={ref} className="bg-white pb-4 md:pb-6" aria-label={imageAlt}>
      <Container>
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative mx-auto w-full overflow-hidden rounded-2xl h-[260px] sm:h-[288px] md:h-[320px] lg:h-[380px]"
          style={{ boxShadow: "0 6px 28px rgba(13, 54, 94, 0.10)" }}
        >
          <Image
            src="/assets/developers/featured/emaar-hero.webp"
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            priority={false}
          />
        </motion.figure>
      </Container>
    </section>
  );
}
