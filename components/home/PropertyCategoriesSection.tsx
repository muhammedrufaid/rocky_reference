"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const categories = [
    {
        id: "buy",
        title: "Buy",
        label: "For Sale",
        description:
            "Get access to Dubai’s finest listings with expert guidance, whether you want to find your ideal home or next investment.",
        href: "/properties/buy/in-dubai",
        // Luxury modern villa with pool — popular Unsplash architecture photo
        image: "/assets/common/buy.webp",
    },
    {
        id: "rent",
        title: "Rent",
        label: "For Rent",
        description:
            "Find your ideal rental home through our curated selection that matches your lifestyle, budget, and more.",
        href: "/properties/rent/in-dubai",
        // Contemporary apartment building exterior
        image: "/assets/common/rent.webp",
    },
    {
        id: "sell",
        title: "Sell",
        label: "Valuation",
        description:
            "Maximise your property’s value through our extensive network of qualified buyers and curated strategies.",
        href: "/sell-your-property",
        // Bright white luxury villa with pool and palm trees
        image: "/assets/common/sell.webp",
    },
    {
        id: "commercial",
        title: "Commercial",
        label: "Offices & Retail",
        description:
            "Find your ideal office space, retail units, or mixed-use developments across Dubai.",
        href: "/properties/buy/in-dubai?type=Commercial%20Full%20Building%2CCommercial%20Land%2CLabour%20Camp%2COffice%2CRetail%2CShop%2CShowroom%2CWarehouse",
        // Dubai skyline glass towers at dusk
        image: "/assets/common/commercial.webp",
    },
];

const CategoryCard: React.FC<{
    category: (typeof categories)[number];
    index: number;
}> = ({ category, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <Link
                href={category.href}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e] focus-visible:ring-offset-4 rounded-xl"
                aria-label={`${category.title} — ${category.description}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* ── Card shell ── */}
                <div
                    className="relative overflow-hidden rounded-xl"
                    style={{ height: "440px" }}
                >
                    {/* Photo */}
                    <Image
                        src={category.image}
                        alt={`${category.title} properties in Dubai`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        quality={65}
                        className="object-cover will-change-transform"
                        style={{
                            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                            transform: hovered ? "scale(1.07)" : "scale(1.01)",
                        }}
                    />

                    {/* Permanent soft vignette */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(160deg, rgba(5,18,30,0.08) 0%, transparent 40%, rgba(5,18,30,0.72) 100%)",
                        }}
                        aria-hidden
                    />

                    {/* Hover overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(5,18,30,0.88) 0%, rgba(5,18,30,0.48) 50%, rgba(5,18,30,0.10) 100%)",
                            transition: "opacity 0.5s ease",
                            opacity: hovered ? 1 : 0,
                        }}
                        aria-hidden
                    />

                    {/* ── Arrow button — top right, rotates on hover ── */}
                    <div
                        className="absolute top-4 right-4 flex items-center justify-center rounded-full"
                        style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), background-color 0.3s ease",
                            transform: hovered ? "rotate(0deg)" : "rotate(-45deg)",
                        }}
                        aria-hidden
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="rgba(255,255,255,0.9)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* ── Bottom content ── */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        {/* Expanding divider line */}
                        <div
                            style={{
                                height: "1px",
                                backgroundColor: "rgba(255,255,255,0.30)",
                                marginBottom: "14px",
                                transition: "width 0.55s cubic-bezier(0.22,1,0.36,1)",
                                width: hovered ? "100%" : "32px",
                            }}
                            aria-hidden
                        />

                        {/* Title */}
                        <h3
                            className="text-white font-medium"
                            style={{
                                // fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: "1.75rem",
                                lineHeight: 1.1,
                                letterSpacing: "-0.01em",
                                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                            }}
                        >
                            {category.title}
                        </h3>

                        {/* Description — slides in on hover */}
                        <div
                            style={{
                                overflow: "hidden",
                                transition:
                                    "max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, margin-top 0.45s ease",
                                maxHeight: hovered ? "100px" : "0px",
                                opacity: hovered ? 1 : 0,
                                marginTop: hovered ? "10px" : "0px",
                            }}
                        >
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.78)", maxWidth: "240px" }}
                            >
                                {category.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const PropertyCategoriesSection: React.FC<{ data: any }> = ({ data }) => {
    return (
        <section
            className="pb-16 md:pb-20 lg:pb-24"
            aria-labelledby="explore-properties-heading"
        >
            <Container>
                {/* Header — preserved exactly */}
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
                    <div>
                        <motion.h2
                            id="explore-properties-heading"
                            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                            style={{ color: "#0d365e" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                            Explore Dubai Properties
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
                            Discover premium properties across Dubai with expert guidance from Rocky Real Estate.
                        </motion.p>
                    </div>
                </header>

                {/* 4-column card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {categories.map((cat, index) => (
                        <CategoryCard key={cat.id} category={cat} index={index} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default PropertyCategoriesSection;