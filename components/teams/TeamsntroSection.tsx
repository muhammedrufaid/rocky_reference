"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const TeamsIntroSection: React.FC = () => {
    const contentRef = useRef(null);

    return (
        <section
            className="py-16 md:py-20 lg:py-24 bg-white"
            aria-labelledby="teams-intro-heading"
        >
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div ref={contentRef}>
                        <header className="mb-8">
                            <motion.h2
                                id="teams-intro-heading"
                                className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                                style={{ color: "#0d365e" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                Meet the People Behind Your Property Journey
                            </motion.h2>
                            <motion.p
                                className="mt-3 text-sm md:text-base leading-relaxed"
                                style={{ color: "#555" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1,
                                    ease: [0.22, 1, 0.36, 1] as const,
                                }}
                            >
                                With over 5 decades of experience in the United Arab Emirates across sales, leasing, property management, and more, our team of experts will guide you through every process – whether you’re a first-time buyer or investor.
                            </motion.p>
                        </header>

                        
                    </div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
                                alt="Professional real estate team working together"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gray-200 rounded-2xl -z-10" aria-hidden />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default TeamsIntroSection;