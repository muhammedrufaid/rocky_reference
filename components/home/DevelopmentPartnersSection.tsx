"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { developers } from "@/utils/data";
import { motion } from "framer-motion";

function createDevelopersLoop<T>(arr: T[], repeatCount: number): T[] {
  return Array(repeatCount)
    .fill(arr)
    .flat();
}

const FEATURED_DEVELOPER_COUNT = 10;
const featuredDevelopers = developers.slice(0, FEATURED_DEVELOPER_COUNT);
const developersLoop = createDevelopersLoop(featuredDevelopers, 4);

const LogoCard = ({
  developer,
  index,
  priority,
}: {
  developer: (typeof developers)[0];
  index: number;
  priority?: boolean;
}) => (
  <Link
    href={developer.path ?? "#"}
    className="group flex shrink-0 items-center justify-center"
  >
    <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg bg-[rgba(8,31,58,0.05)] px-2 py-1 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[rgba(8,31,58,0.1)]">
      <div className="relative h-14 w-full">
        <Image
          src={developer.logo}
          alt={developer.name}
          fill
          className="object-contain object-center brightness-100 opacity-40 transition-all duration-300 group-hover:brightness-100 group-hover:opacity-100"
          sizes="144px"
          priority={priority}
        />
      </div>
    </div>
  </Link>
);

const DevelopmentPartnersSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  return (
    <section
      className="pb-16 md:pb-20 lg:pb-24 "
      style={{ backgroundColor: "#ffffff" }}
      aria-labelledby="development-partners-heading"
    >
      <style>{`
        @keyframes developer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .developer-marquee-track {
          animation: developer-marquee 40s linear infinite;
        }
        .developer-marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>
      <Container>
        <header className="mb-12 text-center md:mb-16">
          <motion.h2
            id="development-partners-heading"
            className="text-2xl font-medium text-[#0D365E] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Development Partners
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base text-[#555] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            Collaborating with the UAE&apos;s most prestigious and award-winning
            developers
          </motion.p>
        </header>

        {/* Continuous Scrolling Marquee */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient Overlays */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
            style={{
              background:
                "linear-gradient(to right, #ffffff, rgba(255,255,255,0.95), transparent)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
            style={{
              background:
                "linear-gradient(to left, #ffffff, rgba(255,255,255,0.95), transparent)",
            }}
            aria-hidden
          />

          <div
            className={`developer-marquee-track flex gap-8 md:gap-10 lg:gap-12 ${
              isPaused ? "paused" : ""
            }`}
            style={{ width: "max-content" }}
          >
            {developersLoop.map((developer, index) => (
              <LogoCard
                key={`${developer.id}-${index}`}
                developer={developer}
                index={index}
                priority={index < featuredDevelopers.length}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DevelopmentPartnersSection;
