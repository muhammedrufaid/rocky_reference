"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import { whyChooseAgentsData } from "@/utils/data";

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

const WhychooseAgentsSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 lg:py-24"
            style={{ backgroundColor: "#faf9f7" }}
            aria-labelledby="why-choose-agents-heading"
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
                        id="why-choose-agents-heading"
                        className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                        style={{ color: "var(--rocky-blue)" }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0}
                    >
                        Why choose Rocky real estate agents in Dubai?
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-sm md:text-base leading-relaxed"
                        style={{ color: "var(--charcoal)", opacity: 0.8 }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.08}
                    >
                        We deliver clarity, integrity, and results — backed by deep market expertise and a commitment to your success.
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
                        {whyChooseAgentsData.map((item, index) => (
                            <motion.li
                                key={item.id}
                                className="relative flex gap-6 md:gap-8 items-start"
                                variants={listItemVariants}
                            >
                                <motion.div
                                    className="relative z-10 flex size-7 md:size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
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
                                    <h3
                                        className="text-base font-semibold md:text-lg"
                                        style={{ color: "var(--rocky-blue)" }}
                                    >
                                        {item.title}
                                    </h3>
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

export default WhychooseAgentsSection;
