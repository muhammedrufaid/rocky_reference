"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { featuredProperties } from "@/utils/data";

const LocationIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const ExplorePropertySection: React.FC = () => {
    return (
        <section
            className="pb-16 md:pb-20 lg:pb-24"
            aria-labelledby="explore-properties-heading"
        >
            <Container>
                {/* Header — left-aligned editorial layout */}
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
                    <div>
                        <motion.h2
                            id="off-plan-section-heading"
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
                            Handpicked properties for sale and rent across Dubai&apos;s most sought-after neighbourhoods.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.5,
                            delay: 0.15,
                            ease: [0.22, 1, 0.36, 1] as const,
                        }}
                        className="self-start sm:self-auto"
                    >
                        <Link
                            href="/off-plan"
                            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold pb-0.5 transition-colors"
                            style={{ color: "#0d365e"}}
                        >
                            View All Projects <ArrowIcon />
                        </Link>
                    </motion.div>
                </header>

                {/* Divider */}
                {/* <div style={{ height: "1px", backgroundColor: "#e5e0d8", marginBottom: "40px" }} /> */}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredProperties.map((property, index) => (
                        <motion.article
                            key={property.id}
                            className="group flex flex-col"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{
                                duration: 0.55,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <Link href={property.path} className="flex flex-col flex-1">
                                {/* Image */}
                                <figure
                                    className="relative overflow-hidden rounded-xl"
                                    style={{ aspectRatio: "3/2" }}
                                >
                                    <Image
                                        src={property.image}
                                        alt={property.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Subtle gradient overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: "linear-gradient(to top, rgba(13,30,50,0.5) 0%, transparent 50%)",
                                        }}
                                    />

                                    {/* Type badge — minimal pill */}
                                    <span
                                        className="absolute top-4 left-4 text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                                        style={{
                                            backgroundColor:
                                                property.type === "Buy"
                                                    ? "#1c4e80"
                                                    : "#e7dccd",
                                            color:
                                            property.type === "Buy"
                                                    ? "#ffffff"
                                                    : "#000000",
                                            backdropFilter: "blur(6px)",
                                        }}
                                    >
                                        {property.type}
                                    </span>

                                    {/* Price overlaid on image bottom */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 px-5 py-4"
                                    >
                                        <p
                                            className="text-base font-semibold"
                                            style={{
                                                color: "#fff",
                                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                                fontSize: "1.1rem",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {property.price}
                                        </p>
                                    </div>
                                </figure>

                                {/* Card body — clean and spacious */}
                                <div className="pt-4 pb-1 flex flex-col flex-1">
                                    <h3
                                        className="text-base font-medium leading-snug line-clamp-1 mb-1.5"
                                        style={{ color: "#0d1f2d" }}
                                    >
                                        {property.title}
                                    </h3>

                                    <div
                                        className="flex items-center gap-1.5 text-xs mb-3"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        <span style={{ color: "#c3ad95" }}>
                                            <LocationIcon />
                                        </span>
                                        <span className="line-clamp-1">{property.location}</span>
                                    </div>

                                    {/* Specs row */}
                                    {(property.beds != null || property.baths != null) && (
                                        <div className="flex items-center gap-4 mt-auto">
                                            {property.beds != null && (
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-[10px] uppercase tracking-widest"
                                                        style={{ color: "#c3ad95" }}
                                                    >
                                                        Bed
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium"
                                                        style={{ color: "#0d365e" }}
                                                    >
                                                        {property.beds}
                                                    </span>
                                                </div>
                                            )}
                                            {property.beds != null && property.baths != null && (
                                                <div style={{ width: "1px", height: "28px", backgroundColor: "#e5e0d8" }} />
                                            )}
                                            {property.baths != null && (
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-[10px] uppercase tracking-widest"
                                                        style={{ color: "#c3ad95" }}
                                                    >
                                                        Bath
                                                    </span>
                                                    <span
                                                        className="text-sm font-medium"
                                                        style={{ color: "#0d365e" }}
                                                    >
                                                        {property.baths}
                                                    </span>
                                                </div>
                                            )}

                                            {/* View Details — inline right */}
                                            <span
                                                className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase transition-all duration-200 group-hover:gap-2.5"
                                                style={{ color: "#0d365e" }}
                                            >
                                                View <ArrowIcon />
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom line accent */}
                                <div
                                    className="mt-3 h-px transition-all duration-300 group-hover:opacity-100 opacity-30"
                                    style={{ backgroundColor: "#c3ad95" }}
                                />
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ExplorePropertySection;