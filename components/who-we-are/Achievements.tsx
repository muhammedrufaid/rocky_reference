"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.35,
            ease,
            when: "beforeChildren",
            staggerChildren: 0.08,
            delayChildren: 0.08,
        },
    },
};

const titleReveal = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const gridReveal = {
    hidden: { opacity: 0, y: 14, scale: 0.995 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const statCardReveal = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

const imageReveal = {
    hidden: { opacity: 0, y: 16, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const stats = [
    { number: "60,000+", label: "Properties Rented to Date" },
    { number: "50+", label: "Years of Market Experience" },
    { number: "AED 7B", label: "Worth of Assets Under Portfolio" },
    { number: "99%", label: "Occupancy Rate Across Portfolio" },
    { number: "AED 7.5B", label: "Cumulative Value of Properties Sold" },
    { number: "1,000+", label: "Properties Managed and Leased" },
];

const Achievements: React.FC<{ className?: string }> = ({ className }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.section
            ref={sectionRef}
            className={className ?? "pb-16 md:pb-20 lg:pb-24 bg-white"}
            aria-labelledby="achievements-heading"
            variants={prefersReducedMotion ? undefined : sectionReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            animate={prefersReducedMotion ? undefined : isInView ? "visible" : "hidden"}
        >
            <Container>
                {/* Title */}
                <motion.h2
                    id="achievements-heading"
                    variants={prefersReducedMotion ? undefined : titleReveal}
                    className="text-[clamp(26px,3vw,36px)] font-medium text-[#0D365E] tracking-[-0.3px] mb-12"
                >
                    Our Achievements
                </motion.h2>

                <motion.div
                    variants={prefersReducedMotion ? undefined : imageReveal}
                    className="border border-[#EFE7DE] overflow-hidden bg-[#FAF7F4] rounded-2xl"
                >
                    <div className="relative w-full aspect-3/1">
                        <motion.div
                            className="absolute inset-0"
                            initial={prefersReducedMotion ? false : { scale: 1.04 }}
                            animate={
                                prefersReducedMotion
                                    ? undefined
                                    : isInView
                                        ? { scale: 1 }
                                        : { scale: 1.04 }
                            }
                            transition={{ duration: 1.1, ease }}
                        >
                            <Image
                                src="/assets/common/awards.webp"
                                alt="Rocky Real Estate Awards and Accolades"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 80vw"
                                priority={false}
                            />
                        </motion.div>
                    </div>
                    {/* <div
                        style={{
                            padding: "14px 20px",
                            borderTop: "1px solid #EFE7DE",
                            fontSize: "11px",
                            color: "#9F8870",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            background: "#ffffff",
                        }}
                    >
                        Rocky Real Estate — Recognized for Excellence Since 1976
                    </div> */}
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    variants={prefersReducedMotion ? undefined : gridReveal}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#EFE7DE] rounded-2xl overflow-hidden mt-16 bg-white"
                >
                    {stats.map((stat, idx) => {
                        const baseRight = idx % 2 === 0 ? "border-r" : "";
                        const baseBottom = idx < stats.length - 2 ? "border-b" : "";

                        const mdRight = idx % 3 !== 2 ? "md:border-r" : "md:border-r-0";
                        const mdBottom = idx < stats.length - 3 ? "md:border-b" : "md:border-b-0";

                        const lgRight = idx < stats.length - 1 ? "lg:border-r" : "lg:border-r-0";

                        return (
                        <motion.div
                            key={stat.label}
                            variants={prefersReducedMotion ? undefined : statCardReveal}
                            className={[
                                "bg-white px-6 py-7 flex flex-col gap-2 border-[#EFE7DE]",
                                baseRight,
                                baseBottom,
                                mdRight,
                                mdBottom,
                                "lg:border-b-0",
                                lgRight,
                                // reset base borders where needed
                                "md:[&]:border-r-0 md:[&]:border-b-0",
                            ].join(" ")}
                        >
                            <span className="text-[clamp(24px,2.5vw,32px)] font-normal text-[#0D365E] leading-none">
                                {stat.number}
                            </span>
                            <span className="text-[11px] font-normal text-[#9F8870] tracking-[0.08em] uppercase leading-snug max-w-[140px]">
                                {stat.label}
                            </span>
                        </motion.div>
                        );
                    })}
                </motion.div>

                {/* Divider */}
                {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
          style={{
            width: "40px",
            height: "1px",
            background: "#EFE7DE",
            marginBottom: "32px",
          }}
        /> */}


            </Container>
        </motion.section>
    );
};

export default Achievements;