"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { services } from "@/utils/data";
import { motion, useInView } from "framer-motion";

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const serviceIcons: Record<number, React.ReactNode> = {
    1: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    2: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    3: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
    ),
    4: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    ),
    5: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    6: (
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
};

const ServiceSection: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 lg:py-24"
            style={{ backgroundColor: "#faf9f7" }}
            aria-labelledby="services-heading"
        >
            <Container>
                <header className="mb-12 text-center md:mb-16">
                    <motion.h2
                        id="services-heading"
                        className="text-2xl font-medium sm:text-3xl md:text-4xl lg:text-[2.5rem] tracking-tight"
                        style={{ color: "var(--rocky-blue)" }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.05}
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
                        style={{ color: "var(--charcoal)" }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.12}
                    >
                        End-to-end real estate solutions tailored for Dubai&apos;s dynamic market.
                    </motion.p>
                </header>

                <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.article
                            key={service.id}
                            className="group relative flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 bg-white border border-[var(--border-light)] hover:border-[var(--sandstone-taupe)]/40 hover:shadow-[0_12px_40px_rgba(13,54,94,0.08)]"
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.08 + index * 0.05}
                        >
                            <div
                                className="mb-4 flex size-12 items-center justify-center rounded-xl transition-colors duration-300"
                                style={{
                                    backgroundColor: "rgba(13, 54, 94, 0.06)",
                                    color: "var(--rocky-blue)",
                                }}
                                aria-hidden
                            >
                                {serviceIcons[service.id as keyof typeof serviceIcons]}
                            </div>
                            <h3
                                className="text-lg font-semibold md:text-xl"
                                style={{ color: "var(--rocky-blue)" }}
                            >
                                {service.title}
                            </h3>
                            <p
                                className="mt-2 text-[15px] line-clamp-3 leading-relaxed md:text-base"
                                style={{ color: "var(--charcoal)", opacity: 0.85 }}
                            >
                                {service.description}
                            </p>
                        </motion.article>
                    ))}
                </div>
{/* 
                <motion.div
                    className="mt-12 flex justify-center md:mt-16"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0.4}
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 rounded-lg border-1 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--rocky-blue)] hover:text-white!"
                        style={{
                            borderColor: "var(--rocky-blue)",
                            color: "var(--rocky-blue)",
                        }}
                    >
                        View All Services <ArrowIcon />
                    </Link>
                </motion.div> */}
            </Container>
        </section>
    );
};

export default ServiceSection;
