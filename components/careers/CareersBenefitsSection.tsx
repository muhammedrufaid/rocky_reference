"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
    tag?: string;
}

interface CareersBenefitsSectionProps {
    data?: any[];
}

const benefits: Benefit[] = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3C14 3 7 6.5 7 13C7 16.866 10.134 20 14 20C17.866 20 21 16.866 21 13C21 6.5 14 3 14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10.5 13.5L13 16L17.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 21H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 24H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: "Health Insurance",
        description: "Comprehensive medical, dental, and vision coverage for you and your family from day one.",
        tag: "Day One Coverage",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 8V14L18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        title: "Flexible Work Hours",
        description: "Structure your day around your peak performance hours and personal commitments.",
        tag: "Work-Life Balance",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 22L5 18C5 16.895 5.895 16 7 16L21 16C22.105 16 23 16.895 23 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14 16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 13L14 9L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: "Learning & Development",
        description: "Annual learning budget, certifications, and mentorship programs to accelerate your expertise.",
        tag: "Annual Budget",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="6" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 11H23" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M18 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 16H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 20H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: "Paid Time Off",
        description: "Generous annual leave, public holidays, and wellness days so you can recharge fully.",
        tag: "Generous Leave",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 4L16.5 10.5H23.5L17.5 14.5L20 21L14 17L8 21L10.5 14.5L4.5 10.5H11.5L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
        ),
        title: "Career Growth",
        description: "Clear promotion pathways, performance reviews, and leadership tracks built for ambitious professionals.",
        tag: "Leadership Tracks",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.07,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

const CareersBenefitsSection: React.FC<CareersBenefitsSectionProps> = ({ data }) => {
    const featured = benefits.slice(0, 2);
    const secondary = benefits.slice(2);

    return (
        <section className="pb-16 md:pb-20 lg:pb-24" aria-labelledby="careers-benefits-heading">
            <Container>
                {/* Header */}
                <header className="mb-12 md:mb-16 max-w-2xl">
                    <motion.h2
                        id="careers-benefits-heading"
                        className="text-3xl sm:text-4xl md:text-[2.6rem] font-medium leading-tight mb-4"
                        style={{ color: "#0d365e" }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Benefits of Working at<br className="hidden sm:block" /> Rocky Real Estate
                    </motion.h2>
                    <motion.p
                        className="text-sm md:text-base leading-relaxed font-medium"
                        style={{ color: "#6b7a8d" }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Grow your real estate career in Dubai's fast-moving market — without compromise.
                    </motion.p>
                </header>

                {/* Featured row — 2 large horizontal cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {featured.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative overflow-hidden rounded-2xl p-7 md:p-8 flex gap-5 items-start transition-all duration-300 hover:shadow-lg"
                            style={{ backgroundColor: "#0d365e", border: "1px solid #0d365e" }}
                        >
                            {/* Background accent */}
                            <div
                                className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-125"
                                style={{ backgroundColor: "#ffffff" }}
                            />

                            {/* Icon */}
                            <div
                                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
                                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#ffffff" }}
                            >
                                {benefit.icon}
                            </div>

                            {/* Text */}
                            <div className="relative z-10">
                                <span
                                    className="inline-block text-[10px] font-medium tracking-widest uppercase mb-2 px-2 py-0.5 rounded-full"
                                    style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
                                >
                                    {benefit.tag}
                                </span>
                                <h3 className="text-lg font-medium text-white mb-1.5 leading-snug">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Secondary row — 3 compact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {secondary.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            custom={i + 2}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            className="group relative overflow-hidden rounded-2xl p-6 bg-white border transition-all duration-300 hover:shadow-md hover:border-[#c8d6e5]"
                            style={{ borderColor: "#e8edf3" }}
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-6 right-6 h-px transition-all duration-300 group-hover:left-4 group-hover:right-4"
                                style={{ backgroundColor: "#0d365e", opacity: 0.15 }}
                            />

                            {/* Tag */}
                            <span
                                className="inline-block text-[10px] font-medium tracking-widest uppercase mb-4 px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: "#eef3f9", color: "#4a7fa8" }}
                            >
                                {benefit.tag}
                            </span>

                            {/* Icon */}
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                                style={{ backgroundColor: "#eef3f9", color: "#0d365e" }}
                            >
                                {benefit.icon}
                            </div>

                            {/* Text */}
                            <h3
                                className="text-base font-medium mb-2 leading-snug"
                                style={{ color: "#0d365e" }}
                            >
                                {benefit.title}
                            </h3>
                            <p className="text-sm leading-relaxed font-medium" style={{ color: "#6b7a8d" }}>
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CareersBenefitsSection;