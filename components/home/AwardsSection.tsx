"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
    { value: 12, suffix: "+", label: "Industry Awards", prefix: "" },
    { value: 4, suffix: "B+", label: "Properties Sold", prefix: "AED " },
    { value: 8, suffix: " Yrs", label: "Market Expertise", prefix: "" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, delay, ease },
});

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, start = false) {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!start || hasRun.current) return;
        hasRun.current = true;

        const startTime = performance.now();

        const easeOutQuad = (t: number) => t * (2 - t);

        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuad(progress);
            setCount(Math.round(eased * target));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [start, target, duration]);

    return count;
}

// ─── Animated Stat Item ───────────────────────────────────────────────────────
const StatItem: React.FC<{
    stat: (typeof stats)[0];
    shouldAnimate: boolean;
    index: number;
}> = ({ stat, shouldAnimate, index }) => {
    const durations = [1600, 1800, 1400];
    const count = useCountUp(stat.value, durations[index], shouldAnimate);

    return (
        <div className="flex flex-col gap-1">
            <span
                className="text-2xl md:text-3xl font-medium"
                style={{ color: "#0d365e", letterSpacing: "-0.01em" }}
            >
                {stat.prefix}{count}{stat.suffix}
            </span>
            <span
                className="text-xs font-normal uppercase tracking-widest"
                style={{ color: "#999", letterSpacing: "0.14em" }}
            >
                {stat.label}
            </span>
        </div>
    );
};

// ─── Award Image Card (single card, reusable) ─────────────────────────────────
interface AwardImageCardProps {
    src: string;
    alt: string;
}

const AwardImageCard: React.FC<AwardImageCardProps> = ({
    src,
    alt,
}) => (
    <motion.div
        {...fadeUp(0.2)}
        className="relative w-full overflow-hidden rounded-2xl border border-[#E7DCCD] bg-gradient-to-br from-white via-[#E7DCCD]/55 to-[#C3AD95]/60 shadow-[0_18px_55px_rgba(8,31,58,0.16)] ring-1 ring-[#0D365E]/5 aspect-[16/9]"
    >
        <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-contain p-7 md:p-9 drop-shadow-[0_18px_22px_rgba(8,31,58,0.18)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0D365E]/10 via-transparent to-white/40" />
    </motion.div>
);

// ─── Award image data ─────────────────────────────────────────────────────────
const awardImages = [
    {
        src: "/assets/common/award1.webp",
        alt: "Rocky award recognition",
    },
];

// ─── Main Section ─────────────────────────────────────────────────────────────
const AwardsSection: React.FC<{ data?: any }> = () => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldAnimate(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-20 lg:py-24"
            style={{ background: "#ffffff" }}
            aria-labelledby="awards-section-heading"
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">

                    {/* ── LEFT: Copy & Stats ── */}
                    <div className="flex flex-col justify-center order-1 lg:order-1">
                        {/* Heading */}
                        <motion.h2
                            id="awards-section-heading"
                            {...fadeUp(0.08)}
                            className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] mb-6"
                            style={{ color: "#0d365e" }}
                        >
                            Award-Winning <br />
                            Real Estate Excellence
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            {...fadeUp(0.16)}
                            className="text-sm md:text-base leading-relaxed max-w-md mb-12"
                            style={{ color: "#666", lineHeight: "1.75" }}
                        >
                            Our commitment to unmatched client experiences and market-leading
                            expertise has earned us recognition from the industry's most
                            prestigious institutions across the UAE and MENA region.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            {...fadeUp(0.22)}
                            className="flex flex-wrap gap-x-10 gap-y-7 pt-8"
                            style={{ borderTop: "1px solid #ece8e1" }}
                        >
                            {stats.map((stat, i) => (
                                <StatItem
                                    key={stat.label}
                                    stat={stat}
                                    shouldAnimate={shouldAnimate}
                                    index={i}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Single Award Image ── */}
                    <div className="order-2 lg:order-2 flex items-center justify-center lg:justify-end">
                        <div className="w-full max-w-none lg:w-[520px] xl:w-[620px]">
                            <AwardImageCard {...awardImages[0]} />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default AwardsSection;