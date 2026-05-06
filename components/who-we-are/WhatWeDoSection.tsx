"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/Container";

const values = [
    {
        title: "Integrity",
        description: "Complete transparency and honesty in every transaction.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C3AD95" strokeWidth="1.2">
                <path d="M16 4L4 10v8c0 6 5.4 11.6 12 13 6.6-1.4 12-7 12-13v-8L16 4z" strokeLinejoin="round" />
                <polyline points="11,16 14.5,19.5 21,13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Professionalism",
        description: "Excellence and the highest standards in every service we deliver.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C3AD95" strokeWidth="1.2">
                <rect x="6" y="10" width="20" height="16" rx="1.5" />
                <path d="M11 10V8a5 5 0 0110 0v2" strokeLinecap="round" />
                <line x1="10" y1="18" x2="22" y2="18" strokeLinecap="round" />
                <line x1="10" y1="22" x2="18" y2="22" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Customer Commitment",
        description: "Client-focused service with tailored real estate solutions.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C3AD95" strokeWidth="1.2">
                <circle cx="16" cy="12" r="5" />
                <path d="M6 26c0-4.4 4.5-8 10-8s10 3.6 10 8" strokeLinecap="round" />
                <path d="M23 6l1.5 1.5L28 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Teamwork",
        description: "Collaborating within the organisation and with clients to achieve success.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C3AD95" strokeWidth="1.2">
                <circle cx="11" cy="13" r="4" />
                <circle cx="21" cy="13" r="4" />
                <path d="M4 26c0-3.9 3.1-7 7-7h10c3.9 0 7 3.1 7 7" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: "Innovation",
        description: "Modern technologies and strategies to lead Dubai's dynamic market.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#C3AD95" strokeWidth="1.2">
                <path d="M16 5a9 9 0 00-4 17.1V24h8v-1.9A9 9 0 0016 5z" strokeLinejoin="round" />
                <line x1="12" y1="27" x2="20" y2="27" strokeLinecap="round" />
                <line x1="13" y1="29.5" x2="19" y2="29.5" strokeLinecap="round" />
                <line x1="16" y1="5" x2="16" y2="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: easeOut, delay },
    }),
};

const gridStagger = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.04,
            staggerChildren: 0.05,
        },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: easeOut },
    },
};

const WhatWeDoSection: React.FC = () => {
    const prefersReducedMotion = useReducedMotion();
    const viewport = { once: true, amount: 0.25 } as const;

    return (
        <section
            className="py-16 md:py-20 lg:py-24"
            style={{ backgroundColor: "#faf9f7" }}
            aria-labelledby="values-heading"
        >
            <Container>
                {/* Header */}
                <header className="mb-10 md:mb-12">
                    <motion.div
                        className="mb-4 h-px w-10"
                        style={{ backgroundColor: "#C3AD95" }}
                        initial={prefersReducedMotion ? { opacity: 1 } : { scaleX: 0.6, opacity: 0 }}
                        whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
                        viewport={viewport}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: easeOut, delay: 0.05 }}
                        aria-hidden
                    />
                    <motion.h2
                        id="values-heading"
                        className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                        style={{ color: "#0D365E" }}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        custom={0.15}
                    >
                        What We Do
                    </motion.h2>
                    <motion.p
                        className="mt-3 text-sm md:text-base leading-relaxed"
                        style={{ color: "rgba(51,51,51,0.7)" }}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        custom={0.22}
                    >
                        Five decades of trust built on principles that guide every client interaction.
                    </motion.p>
                </header>

                {/* Divider */}
                <motion.div
                    style={{
                        borderTop: "0.5px solid rgba(13,54,94,0.12)",
                        transformOrigin: "left",
                    }}
                    initial={prefersReducedMotion ? { opacity: 1 } : { scaleX: 0.98, opacity: 0 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
                    viewport={viewport}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: easeOut, delay: 0.1 }}
                    aria-hidden
                />

                {/* Cards grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                    variants={gridStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            className="py-8 px-6"
                            style={{
                                borderRight: i < values.length - 1
                                    ? "0.5px solid rgba(13,54,94,0.12)"
                                    : "none",
                                borderBottom: "0.5px solid rgba(13,54,94,0.12)",
                            }}
                            variants={prefersReducedMotion ? undefined : cardReveal}
                            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
                            animate={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
                        >
                            {/* Icon */}
                            <div className="mb-6">{value.icon}</div>

                            {/* Title */}
                            <p
                                className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3"
                                style={{ color: "#0D365E" }}
                            >
                                {value.title}
                            </p>

                            {/* Description */}
                            <p
                                className="text-sm md:text-base leading-relaxed"
                                style={{ color: "rgba(13,54,94,0.55)" }}
                            >
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer strip */}
                {/* <div className="flex items-center justify-between pt-5">
                    <span
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "#9F8870" }}
                    >
                        Rocky Real Estate · Est. 1976
                    </span>
                    <span
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(13,54,94,0.3)" }}
                    >
                        Dubai's trusted property experts
                    </span>
                </div> */}
            </Container>
        </section>
    );
};

export default WhatWeDoSection;