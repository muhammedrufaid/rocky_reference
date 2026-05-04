"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import { openPositions } from "@/utils/data";
import type { JobPosition } from "@/utils/types";
import { slugify } from "@/utils/slugify";

const JOBS_PER_PAGE = 6;

interface OpenPositionsSectionProps {
    data?: JobPosition[];
}

const OpenPositionsSection: React.FC<OpenPositionsSectionProps> = ({
    data = openPositions,
}) => {
    const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);
    const jobs = Array.isArray(data) ? data : openPositions;
    const visibleJobs = jobs.slice(0, visibleCount);
    const hasMore = visibleCount < jobs.length;

    const loadMore = () => {
        setVisibleCount((prev) => Math.min(prev + JOBS_PER_PAGE, jobs.length));
    };

    return (
        <section
            id="open-positions"
            className="py-16 md:py-20 lg:py-24"
            aria-labelledby="open-positions-heading"
        >
            <Container>
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
                    <div>
                        <motion.h2
                            id="open-positions-heading"
                            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
                            style={{ color: "#0d365e" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                            Find the right job for you
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
                            Browse our current openings and take the next step in your real
                            estate career at Rocky Real Estate.
                        </motion.p>
                    </div>
                </header>

                {/* Job Cards Grid — 1 col mobile → 2 tablet → 3 desktop */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible"
                    role="list"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleJobs.map((job, index) => (
                            <Link
                                key={job.id}
                                href={`/careers/${slugify(job.title)}`}
                                className="block"
                                aria-label={`View ${job.title}`}
                            >
                                <motion.article
                                    role="listitem"
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay:
                                            index >= visibleCount - JOBS_PER_PAGE
                                                ? (index % JOBS_PER_PAGE) * 0.05
                                                : 0,
                                        ease: [0.22, 1, 0.36, 1] as const,
                                    }}
                                    className="group cursor-pointer relative rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(13,54,94,0.08)] hover:bg-[#fcfdfe]"
                                    style={{ borderColor: "#e8edf3" }}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">
                                            <h3
                                                className="text-lg font-semibold leading-snug mb-2"
                                                style={{ color: "#0d365e" }}
                                            >
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <span
                                                    className="px-2.5 py-1 rounded-full font-medium"
                                                    style={{
                                                        backgroundColor: "#eef3f9",
                                                        color: "#4a7fa8",
                                                    }}
                                                >
                                                    {job.department}
                                                </span>
                                                <span
                                                    className="px-2.5 py-1 rounded-full font-medium"
                                                    style={{
                                                        backgroundColor: "#f5f7fa",
                                                        color: "#555",
                                                    }}
                                                >
                                                    {job.location}
                                                </span>
                                                <span
                                                    className="px-2.5 py-1 rounded-full font-medium"
                                                    style={{
                                                        backgroundColor: "#f0f4f8",
                                                        color: "#0d365e",
                                                    }}
                                                >
                                                    {job.jobType}
                                                </span>
                                            </div>
                                        </div>

                                        <p
                                            className="text-sm leading-relaxed grow mb-5 line-clamp-2"
                                            style={{ color: "#6b7a8d" }}
                                        >
                                            {job.description}
                                        </p>

                                        <span
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group/btn w-fit"
                                            style={{
                                                backgroundColor: "#0d365e",
                                                color: "#fff",
                                            }}
                                            aria-hidden
                                        >
                                            View
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <motion.div
                        className="mt-12 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            type="button"
                            onClick={loadMore}
                            className="px-8 py-3 text-sm font-medium rounded-lg border transition-all duration-200 hover:bg-[#0d365e] hover:text-white! cursor-pointer hover:border-[#0d365e] focus:outline-none focus:ring-2 focus:ring-[#0d365e] focus:ring-offset-2"
                            style={{
                                borderColor: "#0d365e",
                                color: "#0d365e",
                            }}
                            aria-label={`Load more jobs. ${jobs.length - visibleCount} more positions available.`}
                        >
                            Load More
                        </button>
                    </motion.div>
                )}
            </Container>
        </section>
    );
};

export default OpenPositionsSection;
