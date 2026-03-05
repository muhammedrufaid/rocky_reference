"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

interface Benefit {
    id: number;
    title: string;
    description: string;
    tag: string;
}

const benefits: Benefit[] = [
    {
        id: 1,
        title: "Health Insurance",
        description: "Comprehensive medical, dental, and vision coverage for you and your family from day one.",
        tag: "Day One Coverage",
    },
    {
        id: 2,
        title: "Flexible Work Hours",
        description: "Structure your day around your peak performance hours and personal commitments.",
        tag: "Work-Life Balance",
    },
    {
        id: 3,
        title: "Learning & Development",
        description: "Annual learning budget, certifications, and mentorship programs to accelerate your expertise.",
        tag: "Annual Budget",
    },
    {
        id: 4,
        title: "Paid Time Off",
        description: "Generous annual leave, public holidays, and wellness days so you can recharge fully.",
        tag: "Generous Leave",
    },
    {
        id: 5,
        title: "Career Growth",
        description: "Clear promotion pathways, performance reviews, and leadership tracks built for ambitious professionals.",
        tag: "Leadership Tracks",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
};

const listItemVariants = {
    hidden: { opacity: 0, x: -24, y: 12 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const numberCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const CareersBenefitsSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 lg:py-24"
            style={{ backgroundColor: "#faf9f7" }}
            aria-labelledby="careers-benefits-heading"
        >
            <Container>
                {/* Header */}
                <header className="mb-12 md:mb-16 max-w-2xl">
                    <motion.div
                        className="mb-4 h-0.5 w-12"
                        style={{ backgroundColor: "var(--sandstone-taupe)" }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        aria-hidden
                    />
                    <motion.h2
                        id="careers-benefits-heading"
                        className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                        style={{ color: "var(--rocky-blue)" }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0}
                    >
                        Benefits of Working at Rocky Real Estate
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-sm md:text-base leading-relaxed"
                        style={{ color: "var(--charcoal)", opacity: 0.8 }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.08}
                    >
                        Grow your real estate career in Dubai's fast-moving market — without compromise.
                    </motion.p>
                </header>

                {/* Numbered list with vertical connector line */}
                <motion.div
                    className="relative"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                            },
                        },
                    }}
                >
                    <motion.div
                        className="absolute left-[11px] md:left-[15px] top-6 bottom-6 w-px hidden md:block origin-top"
                        style={{ backgroundColor: "var(--sandstone-taupe)", opacity: 0.35 }}
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                        aria-hidden
                    />

                    <ul className="space-y-10 md:space-y-12">
                        {benefits.map((item, index) => (
                            <motion.li
                                key={item.id}
                                className="relative flex gap-6 md:gap-8 items-start"
                                variants={listItemVariants}
                            >
                                <motion.div
                                    className="relative z-10 flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                                    style={{
                                        backgroundColor: "var(--rocky-blue)",
                                        color: "white",
                                    }}
                                    variants={numberCircleVariants}
                                    aria-hidden
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </motion.div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3
                                            className="text-base font-medium md:text-lg"
                                            style={{ color: "var(--rocky-blue)" }}
                                        >
                                            {item.title}
                                        </h3>
                                        {/* <span
                                            className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
                                            style={{ backgroundColor: "var(--sandstone-taupe)", color: "var(--rocky-blue)", opacity: 0.9 }}
                                        >
                                            {item.tag}
                                        </span> */}
                                    </div>
                                    <p
                                        className="mt-1.5 text-[15px] leading-relaxed"
                                        style={{ color: "var(--charcoal)", opacity: 0.85 }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </Container>
        </section>
    );
};

export default CareersBenefitsSection;
