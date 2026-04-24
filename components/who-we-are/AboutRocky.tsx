"use client";

import React, { useRef } from "react";
import Image from "next/image";
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

const AboutRockySection: React.FC<{ className?: string }> = ({ className }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className={className ?? "py-16 md:py-20 lg:py-24"}
            aria-labelledby="valuation-heading"
        >
            <Container>
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT: Text Content */}
                    <div className="flex flex-col gap-6">

                        {/* Heading */}
                        <motion.h2
                            id="valuation-heading"
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.1}
                            className="text-4xl md:text-5xl font-medium leading-tight tracking-tight"
                            style={{
                                color: "#0D365E",
                            }}
                        >
                            About Rocky
                        </motion.h2>

                        {/* Description */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.2}
                            className="flex flex-col gap-4 text-base leading-relaxed"
                            style={{ color: "#333333" }}
                        >
                            <p>
                                Rocky Real Estate has been a trusted leader in Dubai's real estate
                                market since 1976. With over five decades of experience, the company
                                is built on{" "}
                                <span
                                    style={{ color: "#0D365E" }}
                                >
                                    transparency, excellence, and integrity
                                </span>
                                .
                            </p>
                            <p>
                                The company specialises in exclusive listings, a diverse property
                                portfolio, and end-to-end support for clients and agents. Through
                                continuous professional training, advanced tools, and industry
                                systems, Rocky Real Estate ensures expert guidance at every step.
                            </p>
                            <p>
                                Their goal is to connect the right property with the right client by
                                combining deep market knowledge with a client-first approach.
                            </p>
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.25}
                            className="w-12 h-px"
                            style={{ backgroundColor: "#C3AD95" }}
                        />

                        {/* Highlights Grid */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={0.3}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                            {[
                                { icon: "◈", label: "50+ Years of Experience" },
                                { icon: "◈", label: "Trusted Market Leader in Dubai" },
                                { icon: "◈", label: "Exclusive Property Listings" },
                                { icon: "◈", label: "End-to-End Property Solutions" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    custom={0.35 + i * 0.07}
                                    className="group flex items-center gap-3 rounded-xl px-4 py-3 border transition-all duration-300"
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        borderColor: "#E7DCCD",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#E7DCCD";
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "#C3AD95";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#FFFFFF";
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "#E7DCCD";
                                    }}
                                >
                                    {/* Icon in light color only */}
                                    <span
                                        className="text-base shrink-0 font-medium"
                                        style={{ color: "#C3AD95" }}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: "#0D365E" }}
                                    >
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT: Visual Panel */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={0.15}
                        className="relative w-full"
                    >
                        {/* Background accent block — Rocky Navy */}
                        <div
                            className="absolute -bottom-5 -right-5 w-full h-full rounded-2xl"
                            style={{ backgroundColor: "#0D365E", zIndex: 0 }}
                        />

                        {/* Main image card */}
                        <div
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full shadow-2xl"
                            style={{ zIndex: 1 }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                                alt="Rocky Real Estate — Dubai Property"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay: deep navy gradient */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(to top, #081F3A 0%, #0D365Eaa 35%, transparent 70%)",
                                }}
                            />

                            {/* Bottom content */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                {/* Year stamp */}
                                <div>
                                    <p
                                        className="text-xs font-medium tracking-[0.2em] uppercase mb-0.5"
                                        style={{ color: "#C3AD95" }}
                                    >
                                        Est.
                                    </p>
                                    <p
                                        className="text-6xl font-medium leading-none"
                                        style={{
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        1976
                                    </p>
                                </div>

                                {/* Trust badge */}
                                <div
                                    className="rounded-xl px-4 py-3 text-center"
                                    style={{ backgroundColor: "#1C4E80" }}
                                >
                                    <p
                                        className="text-xs font-medium tracking-widest uppercase leading-snug"
                                        style={{ color: "#C3AD95" }}
                                    >
                                        Dubai's
                                    </p>
                                    <p
                                        className="text-xs font-medium tracking-widest uppercase leading-snug"
                                        style={{ color: "#FFFFFF" }}
                                    >
                                        Trusted
                                    </p>
                                    <p
                                        className="text-xs font-medium tracking-widest uppercase leading-snug"
                                        style={{ color: "#FFFFFF" }}
                                    >
                                        Leader
                                    </p>
                                </div>
                            </div>

                            {/* Top-left brand tag */}
                            <div
                                className="absolute top-5 left-5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-widest uppercase"
                                style={{
                                    backgroundColor: "#081F3Acc",
                                    color: "#C3AD95",
                                    backdropFilter: "blur(6px)",
                                    border: "1px solid #C3AD9540",
                                }}
                            >
                                Rocky Real Estate
                            </div>
                        </div>

                        {/* Floating stat card — top right */}
                        <motion.div
                            initial={{ opacity: 0, x: 16, y: -8 }}
                            animate={
                                isInView
                                    ? { opacity: 1, x: 0, y: 0 }
                                    : { opacity: 0, x: 16, y: -8 }
                            }
                            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute -top-5 -right-4 rounded-2xl shadow-xl px-5 py-4 flex flex-col gap-0.5"
                            style={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E7DCCD",
                                zIndex: 2,
                            }}
                        >
                            <span
                                className="text-3xl font-medium leading-none"
                                style={{
                                    color: "#0D365E",
                                }}
                            >
                                50
                                <span style={{ color: "#9F8870" }}>+</span>
                            </span>
                            <span
                                className="text-xs font-medium tracking-widest uppercase"
                                style={{ color: "#9F8870" }}
                            >
                                Years Active
                            </span>
                        </motion.div>

                        {/* Dot grid decoration — light taupe */}
                        <div
                            className="absolute -bottom-8 -left-8 w-28 h-28 pointer-events-none"
                            style={{
                                backgroundImage: "radial-gradient(circle, #C3AD95 1.2px, transparent 1.2px)",
                                backgroundSize: "9px 9px",
                                opacity: 0.35,
                                zIndex: 0,
                            }}
                        />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
};

export default AboutRockySection;