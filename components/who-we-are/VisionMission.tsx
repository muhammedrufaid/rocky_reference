"use client";

import React from "react";
import Container from "@/components/layout/Container";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.35, ease, when: "beforeChildren", staggerChildren: 0.12, delayChildren: 0.08 },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 14, scale: 0.985 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease },
    },
};

const items = [
    {
        key: "vision",
        number: "01",
        title: "Our Vision",
        description:
            "Rocky Real Estate's vision is to deliver comprehensive property solutions, demonstrate industry leadership, and cultivate long-term relationships through integrity and innovation.",
    },
    {
        key: "mission",
        number: "02",
        title: "Our Mission",
        description:
            "Our mission is to deliver expert guidance, transparency, and personalised services to our clients. At Rocky Real Estate, we simplify your property journey and aim to exceed expectations through integrity, market expertise, and professionalism.",
    },
] as const;

const VisionMissionSection: React.FC<{ className?: string }> = ({ className }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.section
            className={className ?? "py-16 md:py-20 lg:py-24"}
            aria-labelledby="vision-heading"
            variants={prefersReducedMotion ? undefined : sectionReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
        >
            <Container>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2"
                    style={{
                        borderTop: "0.5px solid rgba(13,54,94,0.12)",
                        borderBottom: "0.5px solid rgba(13,54,94,0.12)",
                    }}
                    initial={prefersReducedMotion ? { opacity: 1 } : undefined}
                >
                    {items.map((item, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === items.length - 1;

                        return (
                            <motion.div
                                key={item.key}
                                className={
                                    isFirst
                                        ? "py-10 md:py-14 md:pr-12 lg:pr-20"
                                        : "py-10 md:py-14 md:pl-12 lg:pl-20"
                                }
                                style={{
                                    borderRight: isFirst ? "0.5px solid rgba(13,54,94,0.12)" : undefined,
                                    borderTop: !isFirst ? "0.5px solid rgba(13,54,94,0.12)" : undefined,
                                    borderBottom: !isLast ? undefined : undefined,
                                }}
                                variants={prefersReducedMotion ? undefined : cardReveal}
                            >
                                <span
                                    className="block text-[10px] tracking-[0.18em] uppercase mb-7"
                                    style={{ color: "rgba(13,54,94,0.3)" }}
                                >
                                    {item.number}
                                </span>

                                {isFirst ? (
                                    <h2
                                        id="vision-heading"
                                        className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-5"
                                        style={{ color: "#0D365E" }}
                                    >
                                        {item.title}
                                    </h2>
                                ) : (
                                    <h3
                                        className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight mb-5"
                                        style={{ color: "#0D365E" }}
                                    >
                                        {item.title}
                                    </h3>
                                )}

                                <div
                                    className="mb-5"
                                    style={{ width: "32px", height: "2px", backgroundColor: "#C3AD95" }}
                                    aria-hidden
                                />

                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(51,51,51,0.65)" }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </motion.section>
    );
};

export default VisionMissionSection;