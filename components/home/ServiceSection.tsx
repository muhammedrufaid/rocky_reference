"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import type { Service, SubService } from "@/utils/data";
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
    data: Service[] | SubService[];
    hideHeading?: boolean;
    backgroundColor?: string;
    className?: string;
    /** Used when displaying subservices - fallback icon key from parent service */
    iconFallback?: string;
    /** When true, cards link to /services/[slug]. Only applies when data items have slug. */
    linkToService?: boolean;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ data, hideHeading = false, backgroundColor = "#faf9f7", className, iconFallback, linkToService = true }) => {
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
                    {data.map((item, index) => {
                        const hasSlug = "slug" in item && item.slug;
                        const href = linkToService && hasSlug ? `/services/${item.slug}` : undefined;
                        const iconKey = item.icon || iconFallback || (hasSlug ? item.slug : undefined);
                        const CardContent = (
                            <>
                                <div
                                    className="mb-4 flex size-12 items-center justify-center rounded-xl transition-colors duration-300"
                                    style={{
                                        backgroundColor: "#E7DCCD",
                                        color: "#081F3A",
                                    }}
                                    aria-hidden
                                >
                                    {serviceIcons[iconKey ?? "property-management"]}
                                </div>
                                <h3
                                    className="text-lg font-medium md:text-xl"
                                    style={{ color: "var(--rocky-blue)" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="mt-2 text-[15px] line-clamp-3 leading-relaxed md:text-base"
                                    style={{ color: "var(--charcoal)", opacity: 0.85 }}
                                >
                                    {item.description}
                                </p>
                            </>
                        );
                        const articleClass = "group cursor-pointer relative flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 bg-white border border-[var(--border-light)] hover:border-[var(--sandstone-taupe)]/40 hover:shadow-[0_12px_40px_rgba(13,54,94,0.08)]";
                        return (
                            <motion.article
                                key={item.id}
                                variants={fadeUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                custom={0.08 + index * 0.05}
                            >
                                {href ? (
                                    <Link href={href} className={`block h-full ${articleClass}`}>
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <div className={articleClass}>{CardContent}</div>
                                )}
                            </motion.article>
                        );
                    })}
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
