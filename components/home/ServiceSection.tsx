"use client";

import React, { useRef } from "react";
import Container from "@/components/layout/Container";
import type { Service } from "@/utils/data";
import { serviceIcons } from "@/utils/icons";
import { motion, useInView } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
};

interface ServiceSectionProps {
    data: Service[];
    hideHeading?: boolean;
    backgroundColor?: string;
    className?: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ data, hideHeading = false, backgroundColor = "#faf9f7", className }) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className={className ?? "py-16 md:py-20 lg:py-24"}
            style={{ backgroundColor: backgroundColor }}
            aria-labelledby={hideHeading ? undefined : "services-heading"}
        >
            <Container>
                {!hideHeading && (
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
                            Paperwork to handover, our experienced team offers solutions tailored for Dubai’s dynamic market
                        </motion.p>
                    </header>
                )}

                <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((service, index) => (
                        <motion.article
                            key={service.id}
                            className="group cursor-pointer relative flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 bg-white border border-[var(--border-light)] hover:border-[var(--sandstone-taupe)]/40 hover:shadow-[0_12px_40px_rgba(13,54,94,0.08)]"
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
                                {serviceIcons[service.icon ?? service.slug]}
                            </div>
                            <h3
                                className="text-lg font-medium md:text-xl"
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
                        className="inline-flex items-center gap-2 rounded-lg border-1 px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--rocky-blue)] hover:text-white!"
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
