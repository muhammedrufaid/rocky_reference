"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import AchievementsStatsGrid from "@/components/who-we-are/AchievementsStatsGrid";
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

const imageReveal = {
    hidden: { opacity: 0, y: 16, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

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