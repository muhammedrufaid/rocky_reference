"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
};

const ValuationCTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className="pb-16 md:pb-20 lg:pb-24"
            aria-labelledby="valuation-heading"
        >
            <Container>
                <motion.article
                    className="relative min-h-[320px] overflow-hidden rounded-2xl"
                    style={{ boxShadow: "0 8px 40px rgba(13, 54, 94, 0.12)" }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                >
                    {/* Background image — fills the entire card */}
                    <Image
                        src="https://images.pexels.com/photos/13620067/pexels-photo-13620067.jpeg"
                        alt="Luxury Dubai property — professional home valuation service"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={false}
                    />

                    {/* Dark overlay — covers entire background */}
                    <div
                        className="absolute inset-0 z-[1]"
                        style={{
                            background:
                                "linear-gradient(to right, rgba(13, 54, 94, 0.88) 0%, rgba(13, 54, 94, 0.65) 50%, rgba(13, 54, 94, 0.35) 100%)",
                        }}
                        aria-hidden
                    />

                    {/* Text content — sits above image and overlay */}
                    <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14 lg:w-1/2 lg:px-14 lg:py-16">
                        <motion.h2
                            id="valuation-heading"
                            className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem]"
                            style={{ color: "#ffffff" }}
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.1}
                        >
                            Know What Your Home Is Worth
                        </motion.h2>

                        <motion.p
                            className="mt-4 max-w-lg text-base leading-relaxed text-white/85 md:text-lg"
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.18}
                        >
                            Wondering what your property is truly worth? Our specialists provide strategic, data-driven caluations tailored to the luxury market
                        </motion.p>

                        <motion.div
                            className="mt-8"
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.25}
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                                style={{
                                    backgroundColor: "#c3ad95",   // Sandstone Taupe
                                    color: "#081f3a",              // Midnight Blue text for contrast
                                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                Book a Valuation
                            </Link>
                        </motion.div>
                    </div>
                </motion.article>
            </Container>
        </section>
    );
};

export default ValuationCTA;