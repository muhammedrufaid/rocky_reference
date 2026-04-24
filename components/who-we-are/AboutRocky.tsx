"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, delay },
    }),
};

const highlights = [
    { label: "50+", sub: "Years Active" },
    { label: "1976", sub: "Est. Dubai" },
    { label: "100%", sub: "Client Focus" },
    { label: "1st", sub: "Market Tier" },
];

const pillars = [
    "Exclusive Listings",
    "End-to-End Support",
    "Deep Market Knowledge",
    "Transparent Advisory",
];

const AboutRockySection: React.FC<{ className?: string }> = ({ className }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    const bodyParagraphClass =
        "mt-3 max-w-2xl text-base leading-relaxed text-[#333333]/60 md:text-lg";

    return (
        <section
            ref={sectionRef}
            className={className ?? "py-16 md:py-20 lg:py-24 bg-white"}
            aria-labelledby="about-heading"
        >
            <Container>
                {/* Body: two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* RIGHT: Copy */}
                    <div className="lg:col-span-6 flex flex-col justify-start pt-2">
                        {/* Title (inside grid) */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.08}
                            className="mb-6"
                        >
                            <div className="flex items-center gap-3">
                            </div>
                            <h2
                                id="about-heading"
                                className="mt-2 text-2xl font-medium leading-tight text-[#081F3A] sm:text-3xl md:text-4xl"
                            >
                                About Rocky Real Estate
                            </h2>
                            <div className="mt-4 h-[2px] w-10 bg-[#C3AD95]" aria-hidden />
                        </motion.div>

                        {/* Body paragraphs */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.26}
                            className="mb-12 max-w-[520px]"
                        >
                            <p className={bodyParagraphClass}>
                                Since 1976, Rocky Real Estate has been a long-standing and trusted
                                leader in Dubai’s real estate market. With over 5 decades of
                                experience, the company delivers transparency, excellence, and
                                integrity.
                            </p>
                            <p className={bodyParagraphClass}>
                                Rocky Real Estate specialises in exclusive listings, a diverse
                                property portfolio, and end-to-end support for clients and agents.
                            </p>
                            <p className={bodyParagraphClass}>
                                Through continuous professional training, industry-leading tools,
                                and advanced systems, the company ensures the team is well-equipped
                                with knowledge to guide our clients and bridge the gap between the
                                right property for the right person.
                            </p>
                        </motion.div>

                        {/* Pillars grid */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.32}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {pillars.map((item, i) => (
                                <motion.div
                                    key={item}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    custom={0.36 + i * 0.06}
                                    className="flex items-center gap-3 rounded-xl border border-[#EFE7DE] bg-white px-4 py-3.5"
                                >
                                    <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#C3AD95]" />
                                    <span className="text-[13px] text-[#0D365E] tracking-[0.01em]">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA link */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.56}
                            className="mt-10"
                        >
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] uppercase text-[#0D365E] border-b border-[#C3AD95] pb-0.5 hover:text-[#C3AD95] transition-colors duration-200"
                            >
                                Get in touch
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                    {/* LEFT: Image stack */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.16}
                        className="lg:col-span-6 relative"
                    >
                        {/* Main image */}
                        <div className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full overflow-hidden rounded-2xl">
                            <Image
                                src="https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg"
                                alt="Rocky Real Estate — Dubai skyline property"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                priority
                            />
                        </div>

                        {/* Stat strip pinned to bottom of image */}
                        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-px overflow-hidden rounded-xl border border-[rgba(255,255,255,0.14)] bg-[rgba(8,31,58,0.28)] backdrop-blur-md">
                            {highlights.map(({ label, sub }) => (
                                <div key={label} className="flex flex-col items-center bg-[rgba(8,31,58,0.72)] py-3 backdrop-blur-md">
                                    <span className="text-xl font-light tracking-tight text-white leading-none">
                                        {label}
                                    </span>
                                    <span className="mt-1 text-[9px] font-medium tracking-[0.14em] uppercase text-[#C3AD95]">
                                        {sub}
                                    </span>
                                </div>
                            ))}
                        </div>

                      
                    </motion.div>


                </div>
            </Container>
        </section>
    );
};

export default AboutRockySection;