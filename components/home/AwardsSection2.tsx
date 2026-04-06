"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

// ─── Award data ───────────────────────────────────────────────────────────────
const awards = [
    {
        id: 1,
        title: "Best Real Estate Agency Dubai 2024",
        image: "/images/awards/award-1.png",
        year: "2024",
    },
    {
        id: 2,
        title: "Arabian Property Awards — Highly Commended",
        image: "/images/awards/award-2.png",
        year: "2023",
    },
    {
        id: 3,
        title: "Forbes Top 10 Brokerages MENA",
        image: "/images/awards/award-3.png",
        year: "2024",
    },
    {
        id: 4,
        title: "Cityscape Excellence Award",
        image: "/images/awards/award-4.png",
        year: "2023",
    },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
    { value: "12+", label: "Industry Awards" },
    { value: "AED 4B+", label: "Properties Sold" },
    { value: "8 Yrs", label: "Market Expertise" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
});

// ─── Award Card ───────────────────────────────────────────────────────────────
const AwardCard: React.FC<{ award: (typeof awards)[0]; index: number }> = ({
    award,
    index,
}) => (
    <motion.div
        {...fadeUp(0.1 + index * 0.08)}
        whileHover={{ scale: 1.04, boxShadow: "0 20px 48px rgba(13,54,94,0.10)" }}
        transition={{ duration: 0.35, ease }}
        className="group relative flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
            background: "#f7f6f4",
            aspectRatio: "1 / 1",
            cursor: "default",
        }}
        aria-label={award.title}
    >
        {/* Year pill */}
        <span
            className="absolute top-3 right-3 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
                background: "rgba(255,255,255,0.85)",
                color: "#0d365e",
                backdropFilter: "blur(6px)",
                letterSpacing: "0.12em",
            }}
        >
            {award.year}
        </span>

        {/* Award image */}
        <div className="relative w-3/4 h-3/4 flex items-center justify-center">
            <Image
                src={award.image}
                alt={award.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 45vw, 20vw"
            />
        </div>
    </motion.div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const AwardsSection2: React.FC<{ data?: any }> = () => {
    return (
        <section
            className="py-20 md:py-28 lg:py-32"
            style={{ background: "#ffffff" }}
            aria-labelledby="awards-section-heading"
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* ── LEFT: Copy & Stats ── */}
                    <div className="flex flex-col justify-center">

                        {/* Eyebrow */}
                        <motion.p
                            {...fadeUp(0)}
                            className="text-xs font-semibold uppercase tracking-[0.2em] mb-5"
                            style={{ color: "#b08d57" }}
                        >
                            Recognition & Excellence
                        </motion.p>

                        {/* Heading */}
                        <motion.h2
                            id="awards-section-heading"
                            {...fadeUp(0.08)}
                            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] mb-6"
                            style={{ color: "#0d365e" }}
                        >
                            Award-Winning <br />
                            Real Estate Excellence
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            {...fadeUp(0.16)}
                            className="text-sm md:text-base leading-relaxed max-w-md mb-12"
                            style={{ color: "#666", lineHeight: "1.75" }}
                        >
                            Our commitment to unmatched client experiences and market-leading
                            expertise has earned us recognition from the industry's most
                            prestigious institutions across the UAE and MENA region.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            {...fadeUp(0.22)}
                            className="flex flex-wrap gap-x-10 gap-y-7 pt-8"
                            style={{ borderTop: "1px solid #ece8e1" }}
                        >
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col gap-1">
                                    <span
                                        className="text-2xl md:text-3xl font-semibold"
                                        style={{
                                            color: "#0d365e",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="text-xs font-medium uppercase tracking-widest"
                                        style={{ color: "#999", letterSpacing: "0.14em" }}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Awards Grid ── */}
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {awards.map((award, i) => (
                            <AwardCard key={award.id} award={award} index={i} />
                        ))}
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default AwardsSection2;