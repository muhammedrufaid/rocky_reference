"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const COLORS = {
    rockyBlue: "#0D365E",
    midnightBlue: "#081F3A",
    sandstoneTaupe: "#C3AD95",
    warmTaupe: "#9F8870",
    softSand: "#E7DCCD",
    sectionBg: "#ffffff",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
interface Award {
    image: string;
    year: string;
    title: string;
}

const AWARDS: Award[] = [
    {
        image: "/assets/awards/bayut2025.webp",
        year: "2025",
        title: "Bayut Awards",
    },
    {
        image: "/assets/awards/dubaisouth2024.webp",
        year: "2024",
        title: "Dubai South Awards",
    },
    {
        image: "/assets/awards/bayut-sep-2023.webp",
        year: "Sep 2023",
        title: "Bayut Awards",
    },
    {
        image: "/assets/awards/bayutfinalist2022.webp",
        year: "2022",
        title: "Bayut finalist Awards",
    },
    {
        image: "/assets/awards/rkm-latifa.webp",
        year: "2022",
        title: "RKM Latifa Awards",
    },
    {
        image: "/assets/awards/bayut-aug-2020.webp",
        year: "Aug 2020",
        title: "Bayut Awards",
    },
    {
        image: "/assets/awards/arabianpropertyaward-2018-2019.webp",
        year: "2018-2019",
        title: "Arabian Property Awards",
    },
    {
        image: "/assets/awards/nakheel-award2018.webp",
        year: "2018",
        title: "Nakheel Awards",
    },
    {
        image: "/assets/awards/bayut-july-2018.webp",
        year: "Jul 2018",
        title: "Bayut Awards",
    },
    {
        image: "/assets/awards/forbes2017.webp",
        year: "2017",
        title: "Forbes Awards",
    },
    {
        image: "/assets/awards/forbes2016.webp",
        year: "2016",
        title: "Forbes Awards",
    },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const headingVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0 },
    },
};

const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
    },
};

const makeCardImageVariant = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
    },
});

const makeCardContentVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: delay + 0.18 },
    },
});

// ─── Dot Component ───────────────────────────────────────────────────────────
const TimelineDot: React.FC = () => (
    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
        {/* Ping animation */}
        <span
            className="absolute inline-flex w-5 h-5 rounded-full opacity-40 animate-ping"
            style={{ backgroundColor: COLORS.sandstoneTaupe, animationDuration: "2.4s" }}
        />
        {/* Outer ring */}
        <span
            className="relative inline-flex w-3.5 h-3.5 rounded-full border-2"
            style={{
                backgroundColor: "#fff",
                borderColor: COLORS.sandstoneTaupe,
                boxShadow: `0 0 0 3px ${COLORS.softSand}`,
            }}
        />
    </div>
);

// ─── Award Card ──────────────────────────────────────────────────────────────
const AwardCard: React.FC<{
    award: Award;
    index: number;
    showContent: boolean;
}> = ({ award, index, showContent }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const imageDelay = index * 0.12;
    const imageVariant = makeCardImageVariant(imageDelay);
    const contentVariant = makeCardContentVariant(imageDelay);

    return (
        <>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="group relative overflow-hidden rounded-xl"
            >
                {/* Natural size image */}
                <motion.div
                    variants={imageVariant}
                    className="w-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <Image
                        src={award.image}
                        alt={award.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto"
                    />
                </motion.div>
            </motion.div>

            {/* Card Body */}
            {showContent && (
                <motion.div
                    variants={contentVariant}
                    className="py-4"
                >
                    {/* Year + gradient rule */}
                    <div className="mb-3">
                        <span
                            className="block text-xs tracking-widest uppercase mb-2"
                            style={{ color: COLORS.rockyBlue }}
                        >
                            {award.year}
                        </span>
                        <div
                            className="h-px w-full"
                            style={{
                                background: `linear-gradient(to right, ${COLORS.sandstoneTaupe}, ${COLORS.midnightBlue}10)`,
                            }}
                        />
                    </div>

                    {/* Award Title */}
                    <h3
                        className="text-sm font-medium leading-snug"
                        style={{
                            color: COLORS.midnightBlue,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {award.title}
                    </h3>
                </motion.div>
            )}
        </>
    );
};

// ─── Timeline Row ─────────────────────────────────────────────────────────────
const TimelineRow: React.FC<{
    award: Award;
    index: number;
    showContent: boolean;
}> = ({ award, index, showContent }) => {
    const isLeft = index % 2 === 0;

    return (
        <>
            {/* Desktop: alternating layout */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 items-center w-full">
                {/* Left slot */}
                <div className={isLeft ? "block" : "invisible pointer-events-none"}>
                    {isLeft && <AwardCard award={award} index={index} showContent={showContent} />}
                </div>

                {/* Center dot */}
                <div className="flex items-center justify-center">
                    <TimelineDot />
                </div>

                {/* Right slot */}
                <div className={!isLeft ? "block" : "invisible pointer-events-none"}>
                    {!isLeft && <AwardCard award={award} index={index} showContent={showContent} />}
                </div>
            </div>

            {/* Mobile: single column */}
            <div className="flex md:hidden gap-4 items-start mb-8">
                <div className="flex flex-col items-center pt-1">
                    <TimelineDot />
                </div>
                <div className="flex-1">
                    <AwardCard award={award} index={index} showContent={showContent} />
                </div>
            </div>
        </>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
interface AwardsTimelineSectionProps {
    className?: string;
    showContent?: boolean;
}

const AwardsTimelineSection: React.FC<AwardsTimelineSectionProps> = ({
    className,
    showContent = false,
}) => {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    const isLineInView = useInView(lineRef, { once: true, margin: "-40px" });

    return (
        <section
            ref={sectionRef}
            className={className ?? "py-16 md:py-20 lg:py-24"}
            aria-labelledby="awards-heading"
            style={{ backgroundColor: COLORS.sectionBg }}
        >
            {/* Container */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={headingVariants}
                    className="text-center mb-14"
                >
                    <h2
                        id="awards-heading"
                        className="text-3xl md:text-4xl font-medium"
                        style={{
                            color: COLORS.midnightBlue,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Awards &amp; Achievements
                    </h2>
                </motion.div>

                {/* Timeline wrapper */}
                <div className="relative">

                    {/* Vertical line — desktop */}
                    <div
                        ref={lineRef}
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-px w-px"
                        style={{ zIndex: 0 }}
                    >
                        <motion.div
                            initial="hidden"
                            animate={isLineInView ? "visible" : "hidden"}
                            variants={lineVariants}
                            className="w-full h-full origin-top"
                            style={{
                                background: `linear-gradient(to bottom, ${COLORS.sandstoneTaupe}, transparent)`,
                            }}
                        />
                    </div>

                    {/* Vertical line — mobile */}
                    <div
                        className="md:hidden absolute left-[9px] top-0 bottom-0 w-px"
                        style={{ zIndex: 0 }}
                    >
                        <motion.div
                            initial="hidden"
                            animate={isLineInView ? "visible" : "hidden"}
                            variants={lineVariants}
                            className="w-full h-full origin-top"
                            style={{
                                background: `linear-gradient(to bottom, ${COLORS.sandstoneTaupe}, transparent)`,
                            }}
                        />
                    </div>

                    {/* Cards */}
                    <div className="relative" style={{ zIndex: 1 }}>
                        {AWARDS.map((award, i) => (
                            <TimelineRow
                                key={`${award.year}-${i}`}
                                award={award}
                                index={i}
                                showContent={showContent}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AwardsTimelineSection;