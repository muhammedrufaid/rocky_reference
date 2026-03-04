"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

const ServiceIntroSection: React.FC = () => {
    const contentRef = useRef(null);
    const isInView = useInView(contentRef, { once: true, margin: "-50px" });
    return (
        <section
            className="py-16 md:py-20 lg:py-24 bg-white"
            aria-labelledby="services-intro-heading"
        >
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <header className="mb-8">
                            <motion.h2
                                id="services-intro-heading"
                                className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                                style={{ color: "#0d365e" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                            >
                                Real Estate, Simplified For You
                            </motion.h2>
                            <motion.p
                                className="mt-3 text-sm md:text-base max-w-lg"
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
                                At Rocky Real Estate, we provide end-to-end services, including property listings, property management, and more, and ensure our buyers, sellers, investors, and property owners capitalize on the ever-changing marketplace.
                            </motion.p>
                        </header>

                        <motion.div
                            ref={contentRef}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.5,
                                delay: 0.15,
                                ease: [0.22, 1, 0.36, 1] as const,
                            }}
                        >
                            <h3 className="text-lg md:text-xl font-medium" style={{ color: "#333" }}>
                                What do we offer?
                            </h3>

                            <p className="mt-4 text-sm md:text-base max-w-lg leading-relaxed" style={{ color: "#555" }}>
                            With over five decades of experience, our team ensures that it delivers strategic and seamless real estate solutions, while being completely transparent and professional – whether you are purchasing a new home or need professional property management.

                            </p>

                            {/* <p className="mt-4 text-sm md:text-base max-w-lg leading-relaxed" style={{ color: "#555" }}>
                                Every interaction is handled with clarity, integrity, and
                                professionalism. Explore our core services below and discover how
                                we can support your real estate journey.
                            </p> */}

                            {/* <div className="mt-8">
                                <motion.div
                                    className="h-1 w-12"
                                    style={{ backgroundColor: "#c3ad95", transformOrigin: "left" }}
                                    initial={{ scaleX: 0 }}
                                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
                                    aria-hidden
                                />
                            </div> */}
                        </motion.div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/assets/common/servicemain.webp"
                                alt="Luxury real estate consultation in Dubai with professional property advisor"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        {/* Subtle Decorative Element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gray-200 rounded-2xl -z-10"></div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default ServiceIntroSection;