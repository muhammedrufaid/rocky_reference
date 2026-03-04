"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface Benefit {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    tag: string;
    variant: "blue" | "sand" | "white" | "royal" | "softSand";
}

const benefits: Benefit[] = [
    {
        number: "01",
        variant: "blue",
        icon: (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3C14 3 7 6.5 7 13C7 16.866 10.134 20 14 20C17.866 20 21 16.866 21 13C21 6.5 14 3 14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10.5 13.5L13 16L17.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 21H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 24H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Health Insurance",
        description: "Comprehensive medical, dental, and vision coverage for you and your family from day one.",
        tag: "Day One Coverage",
    },
    {
        number: "02",
        variant: "sand",
        icon: (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 8V14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Flexible Work Hours",
        description: "Structure your day around your peak performance hours and personal commitments.",
        tag: "Work-Life Balance",
    },
    {
        number: "03",
        variant: "white",
        icon: (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 22L5 18C5 16.895 5.895 16 7 16L21 16C22.105 16 23 16.895 23 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 13L14 9L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Learning & Development",
        description: "Annual learning budget, certifications, and mentorship programs to accelerate your expertise.",
        tag: "Annual Budget",
    },
    {
        number: "04",
        variant: "royal",
        icon: (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="6" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 11H23" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 16H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 20H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Paid Time Off",
        description: "Generous annual leave, public holidays, and wellness days so you can recharge fully.",
        tag: "Generous Leave",
    },
    {
        number: "05",
        variant: "softSand",
        icon: (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4L16.5 10.5H23.5L17.5 14.5L20 21L14 17L8 21L10.5 14.5L4.5 10.5H11.5L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        ),
        title: "Career Growth",
        description: "Clear promotion pathways, performance reviews, and leadership tracks built for ambitious professionals.",
        tag: "Leadership Tracks",
    },
];

/* ── Variant token map — strictly brand colors ── */
const variantStyles = {
    blue: {
        bg: "#edf2f8",
        border: "#cfdcea",
        accentBar: "#0d365e",
        iconBg: "#d3e1ef",
        iconColor: "#0d365e",
        tagBg: "#d3e1ef",
        tagColor: "#1c4e80",
        titleColor: "#081f3a",
        descColor: "#0d365e",
        ghostNum: "rgba(13,54,94,0.07)",
    },
    sand: {
        bg: "#f5f0ea",
        border: "#e2d5c3",
        accentBar: "#c3ad95",
        iconBg: "#e7dccd",
        iconColor: "#9f8870",
        tagBg: "#e7dccd",
        tagColor: "#9f8870",
        titleColor: "#081f3a",
        descColor: "#333333",
        ghostNum: "rgba(195,173,149,0.15)",
    },
    white: {
        bg: "#ffffff",
        border: "#e7dccd",
        accentBar: "#1c4e80",
        iconBg: "#edf2f8",
        iconColor: "#1c4e80",
        tagBg: "#edf2f8",
        tagColor: "#0d365e",
        titleColor: "#081f3a",
        descColor: "#333333",
        ghostNum: "rgba(13,54,94,0.05)",
    },
    royal: {
        bg: "#e8eef5",
        border: "#c8d6e6",
        accentBar: "#1c4e80",
        iconBg: "#cddae8",
        iconColor: "#1c4e80",
        tagBg: "#cddae8",
        tagColor: "#0d365e",
        titleColor: "#081f3a",
        descColor: "#0d365e",
        ghostNum: "rgba(28,78,128,0.07)",
    },
    softSand: {
        bg: "#f9f5f0",
        border: "#ddd0bf",
        accentBar: "#9f8870",
        iconBg: "#e7dccd",
        iconColor: "#9f8870",
        tagBg: "#e2d5c3",
        tagColor: "#9f8870",
        titleColor: "#081f3a",
        descColor: "#333333",
        ghostNum: "rgba(159,136,112,0.12)",
    },
} as const;

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

const BenefitCard: React.FC<{
    benefit: Benefit;
    index: number;
    className?: string;
}> = ({ benefit, index, className = "" }) => {
    const s = variantStyles[benefit.variant];

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={`group relative overflow-hidden rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${className}`}
            style={{ backgroundColor: s.bg, borderColor: s.border }}
        >
            {/* Ghost number */}
            <span
                className="absolute top-4 right-5 text-[5rem] font-bold select-none pointer-events-none leading-none"
                style={{ color: s.ghostNum }}
            >
                {benefit.number}
            </span>

            {/* Accent bar */}
            <div className="w-7 h-[2px] mb-5 rounded-full" style={{ backgroundColor: s.accentBar }} />

            {/* Icon */}
            <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: s.iconBg, color: s.iconColor }}
            >
                {benefit.icon}
            </div>

            {/* Tag */}
            <span
                className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-3 px-2.5 py-1 rounded-full"
                style={{ backgroundColor: s.tagBg, color: s.tagColor }}
            >
                {benefit.tag}
            </span>

            {/* Title & description */}
            <h3 className="text-base font-semibold mb-2 leading-snug" style={{ color: s.titleColor }}>
                {benefit.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: s.descColor, opacity: 0.82 }}>
                {benefit.description}
            </p>
        </motion.div>
    );
};

const CareersBenefitsSection: React.FC = () => {
    return (
        <section className="pb-16 md:pb-20 lg:pb-24" aria-labelledby="careers-benefits-heading">
            <Container>

                {/* Header */}
                <header className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="max-w-xl">
                        <motion.h2
                            id="careers-benefits-heading"
                            className="text-3xl sm:text-4xl md:text-[2.6rem] font-medium leading-tight"
                            style={{ color: "#0d365e" }}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Benefits of Working at<br className="hidden sm:block" /> Rocky Real Estate
                        </motion.h2>
                    </div>
                    <motion.p
                        className="text-sm leading-relaxed max-w-xs sm:text-right hidden sm:block"
                        style={{ color: "#9f8870" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        Grow your real estate career in Dubai's fast-moving market — without compromise.
                    </motion.p>
                </header>

                {/*
                  Bento grid — lg: 3 columns
                    Row 1: [card0 col-span-2] [card1]
                    Row 2: [card2]            [card3 col-span-2]
                    Row 3: [card4 col-span-3]
                  sm: 2 columns  |  xs: 1 column
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BenefitCard benefit={benefits[0]} index={0} className="lg:col-span-2" />
                    <BenefitCard benefit={benefits[1]} index={1} />
                    <BenefitCard benefit={benefits[2]} index={2} />
                    <BenefitCard benefit={benefits[3]} index={3} className="lg:col-span-2" />
                    <BenefitCard benefit={benefits[4]} index={4} className="sm:col-span-2 lg:col-span-3" />
                </div>

            </Container>
        </section>
    );
};

export default CareersBenefitsSection;