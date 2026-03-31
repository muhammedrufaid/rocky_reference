"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
    { value: 1100, suffix: "+", label: "Properties Managed", prefix: "" },
    { value: 4, suffix: "B+", label: "In Transactions", prefix: "AED " },
    { value: 50, suffix: " Yrs", label: "UAE Expertise", prefix: "" },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
});

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number | null>(null);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!start || hasRun.current) return;
        hasRun.current = true;

        const startTime = performance.now();
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.round(easeOutQuart(progress) * target));
            if (progress < 1) rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [start, target, duration]);

    return count;
}

// ─── Stat Item ────────────────────────────────────────────────────────────────
const StatItem: React.FC<{
    stat: (typeof stats)[0];
    shouldAnimate: boolean;
    index: number;
    isLast: boolean;
}> = ({ stat, shouldAnimate, index, isLast }) => {
    const durations = [1600, 1900, 1500];
    const count = useCountUp(stat.value, durations[index], shouldAnimate);

    return (
        <div
            className="flex flex-col gap-2"
            style={{
                paddingRight: isLast ? 0 : "clamp(20px, 4vw, 36px)",
                paddingLeft: index === 0 ? 0 : "clamp(20px, 4vw, 36px)",
                borderRight: isLast ? "none" : "0.5px solid #D8D3CC",
            }}
        >
            <span
                style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    color: "#0D2B4A",
                    lineHeight: 1,
                    letterSpacing: "-0.5px",
                }}
            >
                {stat.prefix}{count}{stat.suffix}
            </span>
            <span
                style={{
                    fontSize: "11px",
                    color: "#9A9890",
                    textTransform: "uppercase",
                    letterSpacing: "0.13em",
                    fontWeight: 400,
                }}
            >
                {stat.label}
            </span>
        </div>
    );
};

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
        <>
            {/* Google Font — Cormorant Garamond for stat numerals & heading */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');
            `}</style>

            <section
                ref={sectionRef}
                className="py-20 md:py-28 lg:py-32"
                style={{ background: "" }}
                aria-labelledby="awards-section-heading"
            >
                <Container>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 items-center"
                        style={{ gap: "clamp(40px, 6vw, 80px)" }}
                    >

                        {/* ── LEFT: Copy & Stats ── */}
                        <div className="flex flex-col justify-center order-1">

                            {/* Heading */}
                            <motion.h2
                                id="awards-section-heading"
                                {...fadeUp(0.06)}
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 300,
                                    fontSize: "clamp(34px, 4.5vw, 52px)",
                                    lineHeight: 1.08,
                                    color: "#0D2B4A",
                                    letterSpacing: "-0.5px",
                                    margin: "0 0 20px",
                                }}
                            >
                                Rocky Real Estate —{" "}
                                <span style={{ fontWeight: 500 }}>
                                    Dubai&apos;s Trusted<br />Property Experts
                                </span>
                            </motion.h2>

                            {/* Supporting line */}
                            <motion.p
                                {...fadeUp(0.14)}
                                style={{
                                    fontSize: "clamp(13.5px, 1.5vw, 15px)",
                                    color: "#7A7A72",
                                    lineHeight: 1.75,
                                    maxWidth: "400px",
                                    margin: "0 0 40px",
                                    fontWeight: 300,
                                    letterSpacing: "0.01em",
                                }}
                            >
                                Five decades of market intelligence, billions in closed
                                transactions, and a reputation built on results — not promises.
                            </motion.p>

                            {/* Divider */}
                            <motion.div
                                {...fadeUp(0.2)}
                                style={{
                                    width: "100%",
                                    height: "0.5px",
                                    background: "#D8D3CC",
                                    marginBottom: "32px",
                                }}
                            />

                            {/* Stats */}
                            <motion.div
                                {...fadeUp(0.26)}
                                className="flex flex-row"
                            >
                                {stats.map((stat, i) => (
                                    <StatItem
                                        key={stat.label}
                                        stat={stat}
                                        shouldAnimate={shouldAnimate}
                                        index={i}
                                        isLast={i === stats.length - 1}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* ── RIGHT: Award Image ── */}
                        <div className="order-2 flex items-center justify-center lg:justify-end">
                            <motion.div
                                {...fadeUp(0.18)}
                                className="relative w-full overflow-hidden"
                                style={{
                                    maxWidth: "clamp(320px, 48vw, 580px)",
                                    borderRadius: "16px",
                                    border: "0.5px solid #E2DDD6",
                                    aspectRatio: "4 / 3",
                                    background: "#F0EDE7",
                                    boxShadow: "0 24px 60px rgba(13,43,74,0.08)",
                                }}
                            >
                                <Image
                                    src="/assets/common/award1.webp"
                                    alt="Rocky Real Estate awards and industry recognition"
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 580px, 100vw"
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                    }}
                                />
                                {/* Soft vignette overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(135deg, rgba(250,248,245,0.18) 0%, transparent 55%, rgba(13,43,74,0.06) 100%)",
                                        pointerEvents: "none",
                                        borderRadius: "16px",
                                    }}
                                />
                            </motion.div>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
};

export default AwardsSection;