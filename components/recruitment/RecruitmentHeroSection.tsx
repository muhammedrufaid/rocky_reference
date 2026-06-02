"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

// Rocky Blue    #0D365E — primary structure
// Royal Blue    #1C4E80 — mid tone
// Midnight Blue #081F3A — darkest surface

const MIDNIGHT_BLUE = "#081F3A";
const SAND = "#C3AD95";

type RecruitmentHeroSectionProps = {
  title: React.ReactNode;
  description?: string;
  image?: string;
  /** Shown below `md` when set; otherwise `image` is used on all breakpoints. */
  mobileImage?: string;
  ctaLabel?: string;
  ctaTargetId?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
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

const heroImageClass = "absolute inset-0 z-0 object-cover";

export default function RecruitmentHeroSection({
  title,
  description,
  image = "/assets/recruitment/recruiterai.webp",
  mobileImage,
  ctaLabel = "Apply now",
  ctaTargetId = "join-our-team",
}: RecruitmentHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const scrollToApply = () => {
    document.getElementById(ctaTargetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[580px] items-center overflow-hidden md:min-h-[660px] lg:min-h-[740px]"
      aria-labelledby="recruitment-hero-heading"
    >
      {mobileImage ? (
        <>
          <Image
            src={mobileImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${heroImageClass} md:hidden`}
          />
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${heroImageClass} hidden md:block`}
          />
        </>
      ) : (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className={heroImageClass}
        />
      )}

      {/* Rocky Blue → Royal Blue gradient — text side only */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, rgba(8, 31, 58, 0.88) 0%, rgba(13, 54, 94, 0.8) 32%, rgba(28, 78, 128, 0.18) 58%, transparent 78%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, rgba(8, 31, 58, 0.32) 0%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "170px",
        }}
      />

      <Container>
        <div className="relative z-20 w-full py-28 md:py-32 lg:py-36">
          <div className="max-w-xl text-center md:text-left">
            <motion.h1
              id="recruitment-hero-heading"
              className="text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.08}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm leading-[1.75] text-white/68 md:text-base"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.16}
            >
              {description ??
                "For 50 years, we've been guiding the Dubai real estate market. Join the next generation of leaders driving our vision forward."}
            </motion.p>

           
          </div>
        </div>
      </Container>
    </section>
  );
}
