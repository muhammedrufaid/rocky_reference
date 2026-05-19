"use client";

import React, { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const gridReveal = {
    hidden: { opacity: 0, y: 14, scale: 0.995 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};

const statCardReveal = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

export const achievementStats = [
    { value: 60000, suffix: "+", label: "Properties Rented to Date", useGrouping: true, countUp: true },
    { value: 50, suffix: "+", label: "Years of Market Experience", countUp: true },
    {
        value: 7,
        prefix: "AED ",
        suffix: "B",
        label: "Worth of Assets Under Portfolio",
        countUp: true,
    },
    { value: 99, suffix: "%", label: "Occupancy Rate Across Portfolio", countUp: true },
    {
        value: 7.5,
        prefix: "AED ",
        suffix: "B",
        label: "Cumulative Value of Properties Sold",
        decimals: 1,
        countUp: true,
    },
    { value: 1000, suffix: "+", label: "Properties Managed and Leased", useGrouping: true, countUp: true },
] as const;

export type AchievementStat = (typeof achievementStats)[number];

function formatStatValue(
    value: number,
    options: { decimals?: number; useGrouping?: boolean }
) {
    const { decimals = 0, useGrouping = false } = options;
    if (decimals > 0) {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    }
    if (useGrouping) {
        return Math.round(value).toLocaleString("en-US");
    }
    return String(Math.round(value));
}

function useCountUp(
    target: number,
    duration: number,
    start: boolean,
    decimals = 0
) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) {
            setCount(0);
            return;
        }

        let rafId = 0;
        const startTime = performance.now();
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const next = easeOutQuart(progress) * target;
            setCount(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
            if (progress < 1) rafId = requestAnimationFrame(step);
        };

        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [start, target, duration, decimals]);

    return count;
}

const COUNT_UP_DURATIONS: Record<number, number> = {
    2: 2200,
    3: 2400,
    4: 2600,
};

const StatCard: React.FC<{
    stat: AchievementStat;
    index: number;
    shouldAnimate: boolean;
    prefersReducedMotion: boolean | null;
    borderClassName: string;
}> = ({ stat, index, shouldAnimate, prefersReducedMotion, borderClassName }) => {
    const decimals = "decimals" in stat ? stat.decimals : 0;
    const useGrouping = "useGrouping" in stat ? stat.useGrouping : false;
    const countUp = "countUp" in stat && stat.countUp;
    const animate = countUp && shouldAnimate && !prefersReducedMotion;
    const count = useCountUp(
        stat.value,
        COUNT_UP_DURATIONS[index] ?? 2200,
        animate,
        decimals
    );

    const displayValue =
        !countUp || prefersReducedMotion
            ? formatStatValue(stat.value, { decimals, useGrouping })
            : formatStatValue(count, { decimals, useGrouping });

    const prefix = "prefix" in stat ? stat.prefix : "";

    return (
        <motion.div
            variants={prefersReducedMotion ? undefined : statCardReveal}
            className={[
                "bg-white px-6 py-7 flex flex-col gap-2 border-[#EFE7DE]",
                borderClassName,
            ].join(" ")}
        >
            <span className="text-[clamp(24px,2.5vw,32px)] font-normal text-[#0D365E] leading-none tabular-nums">
                {prefix}
                {displayValue}
                {stat.suffix}
            </span>
            <span className="text-[11px] font-normal text-[#9F8870] tracking-[0.08em] uppercase leading-snug max-w-[140px]">
                {stat.label}
            </span>
        </motion.div>
    );
};

function getStatBorderClasses(idx: number, total: number) {
    const baseRight = idx % 2 === 0 ? "border-r" : "";
    const baseBottom = idx < total - 2 ? "border-b" : "";
    const mdRight = idx % 3 !== 2 ? "md:border-r" : "md:border-r-0";
    const mdBottom = idx < total - 3 ? "md:border-b" : "md:border-b-0";
    const lgRight = idx < total - 1 ? "lg:border-r" : "lg:border-r-0";

    return [
        baseRight,
        baseBottom,
        mdRight,
        mdBottom,
        "lg:border-b-0",
        lgRight,
        "md:[&]:border-r-0 md:[&]:border-b-0",
    ].join(" ");
}

const AchievementsStatsGrid: React.FC<{ className?: string }> = ({ className }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(gridRef, { once: true, margin: "-60px" });
    const prefersReducedMotion = useReducedMotion();

    return (
        <Container className={className}>
            <motion.div
                ref={gridRef}
                variants={prefersReducedMotion ? undefined : gridReveal}
                initial={prefersReducedMotion ? false : "hidden"}
                animate={prefersReducedMotion ? undefined : isInView ? "visible" : "hidden"}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#EFE7DE] rounded-2xl overflow-hidden bg-white"
            >
                {achievementStats.map((stat, idx) => (
                    <StatCard
                        key={stat.label}
                        stat={stat}
                        index={idx}
                        shouldAnimate={isInView}
                        prefersReducedMotion={prefersReducedMotion}
                        borderClassName={getStatBorderClasses(idx, achievementStats.length)}
                    />
                ))}
            </motion.div>
        </Container>
    );
};

export default AchievementsStatsGrid;
