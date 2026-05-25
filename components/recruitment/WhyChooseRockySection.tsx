"use client";

import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
// Rocky Blue    #0D365E  — primary structure
// Royal Blue    #1C4E80  — mid tone
// Midnight Blue #081F3A  — darkest surface
// White         #FFFFFF  — dominant (70%)
// Charcoal Gray #333333  — body text
// #C3AD95 / #9F8870 / #E7DCCD — icons, lines, borders ONLY (never text)

interface Feature {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconBrokerage = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M2 17V7.5L10 2l8 5.5V17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="7" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M10 11v6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
);
const IconExperience = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 5.5V10l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);
const IconAward = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 12.5 5.5 18l4.5-2 4.5 2L13 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
);
const IconTraining = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 17h6M10 13v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 8.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IconClients = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="14" cy="7" r="2.8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 17c0-2.8 2.4-5 5.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M18.5 17c0-2.8-2.4-5-5.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7.5 17c0-2 1-3.5 3-3.5s3 1.5 3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);
const IconMarketing = () => (
    <svg className="size-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14V9L10 4l7 5v5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 14v-2.5h4V14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="16" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14.3 5.7L10 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const features: Feature[] = [
    {
        number: "01",
        title: "Brokerage Built for Long-Term Success",
        description: "A foundation engineered to sustain and scale your career — with systems, culture, and leadership that endure.",
        icon: <IconBrokerage />,
    },
    {
        number: "02",
        title: "50+ Years of Market Experience",
        description: "Half a century navigating Dubai's property cycles gives our agents an unmatched edge in every negotiation.",
        icon: <IconExperience />,
    },
    {
        number: "03",
        title: "Award-Winning Industry Professionals",
        description: "Our roster of recognised experts brings credibility, trust, and proven performance to every client transaction.",
        icon: <IconAward />,
    },
    {
        number: "04",
        title: "Training Designed for Growth",
        description: "Structured mentorship, live workshops, and digital academies built to accelerate agents at every stage.",
        icon: <IconTraining />,
    },
    {
        number: "05",
        title: "Access to Active Clients & Listings",
        description: "Tap into a continuously refreshed pipeline of qualified buyers, investors, and exclusive off-market inventory.",
        icon: <IconClients />,
    },
    {
        number: "06",
        title: "Marketing Power That Drives Deals",
        description: "Premium photography, digital campaigns, and brand amplification that position your listings above the rest.",
        icon: <IconMarketing />,
    },
];

const stats = [
    { value: "50+", label: "Years of Experience" },
    { value: "500+", label: "Active Agents" },
    { value: "#1", label: "Dubai Brokerage" },
];

// ─── Motion Variants ──────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
});

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// ─── Feature Card (matches CareersIntroSection pillar styling) ─────────────────
const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
    <motion.article
        variants={cardAnim}
        className="group flex items-start gap-4 rounded-2xl bg-[#faf9f7] p-5 sm:p-6 transition-all duration-200 hover:border-[#0b2d4e]/20 hover:shadow-sm"
    >
        <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: "#f5f2ee", color: "#9f8870" }}
        >
            {feature.icon}
        </span>
        <div className="min-w-0 flex-1">
            {/* <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 tabular-nums">
                {feature.number}
            </p> */}
            <h3 className="mt-1 text-base font-medium text-charcoal">{feature.title}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-neutral-500 md:text-base">
                {feature.description}
            </p>
        </div>
    </motion.article>
);

// ─── Section ──────────────────────────────────────────────────────────────────
const WhyChooseRockySection: React.FC<{ className?: string }> = ({ className }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const leftInView = useInView(leftRef, { once: true, margin: "-80px" });
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            className={`relative overflow-hidden bg-white py-16 md:py-20 lg:py-24 ${className ?? ""}`}
            aria-labelledby="why-rocky-heading"
        >
            {/* Subtle radial vignette top-left */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 40% at 10% 0%, rgba(13,54,94,0.05) 0%, transparent 70%)",
                }}
            />

            {/* Very thin top border */}
            <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent 0%, #C3AD95 35%, #E7DCCD 65%, transparent 100%)" }}
            />

            <Container className="relative">
                {/* Two-column layout: stacks on mobile, side-by-side on lg+ */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 sm:gap-14 lg:gap-16 xl:gap-20 items-stretch">

                    {/* ════════════════════════
              LEFT — Heading + Stats + CTA
          ════════════════════════ */}
                    <div ref={leftRef} className="flex flex-col lg:sticky lg:top-24">
                        <motion.div
                            variants={fadeUp(0)}
                            initial="hidden"
                            animate={leftInView ? "visible" : "hidden"}
                            className="mb-4 h-0.5 w-12"
                            style={{ backgroundColor: "var(--sandstone-taupe)" }}
                            aria-hidden
                        />

                        <motion.h2
                            id="why-rocky-heading"
                            variants={fadeUp(0.07)}
                            initial="hidden"
                            animate={leftInView ? "visible" : "hidden"}
                            className="text-2xl font-medium leading-tight tracking-tight text-[#0d365e] sm:text-3xl md:text-4xl lg:text-[2.5rem]"
                        >
                            Why Choose Rocky Real Estate?
                        </motion.h2>

                        <motion.p
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate={leftInView ? "visible" : "hidden"}
                            className="mt-8 mb-10 max-w-md text-base leading-[1.7] text-neutral-600 md:text-lg"
                        >
                            We architect real estate careers built to last — pairing decades of market wisdom with the tools, network, and mentorship that transform ambition into sustained, measurable success across Dubai's most competitive districts.
                        </motion.p>

                        {/* Stats block */}
                        <motion.div
                            variants={fadeUp(0.28)}
                            initial="hidden"
                            animate={leftInView ? "visible" : "hidden"}
                            className="mb-10 w-full overflow-hidden rounded-2xl border border-neutral-100"
                        >
                            {stats.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-between px-5 py-4 sm:px-6 ${
                                        i < stats.length - 1 ? "border-b border-neutral-100" : ""
                                    }`}
                                >
                                    <span className="text-sm text-neutral-500 md:text-base">{s.label}</span>
                                    <span className="text-2xl font-medium leading-none text-[#0d365e] sm:text-3xl">
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ════════════════════════
              RIGHT — Feature grid
          ════════════════════════ */}
                    <motion.div
                        ref={gridRef}
                        variants={stagger}
                        initial="hidden"
                        animate={gridInView ? "visible" : "hidden"}
                        className="relative z-0 grid grid-cols-1 gap-5 bg-[#faf9f7] pl-6 py-12 -mx-6 sm:grid-cols-2 sm:pl-8 sm:-mx-8 md:pl-12 md:-mx-12 lg:mx-0 lg:min-h-full lg:bg-transparent lg:pl-8 lg:py-0 xl:pl-10 2xl:pl-12 before:pointer-events-none before:absolute before:hidden before:left-0 before:right-[calc(-50vw+50%)] before:-top-16 before:-bottom-16 before:-z-10 before:bg-[#faf9f7] md:before:-top-20 md:before:-bottom-20 lg:before:block lg:before:-top-24 lg:before:-bottom-24"
                    >
                        {features.map((f) => (
                            <FeatureCard key={f.number} feature={f} />
                        ))}
                    </motion.div>

                </div>
            </Container>
        </section>
    );
};

export default WhyChooseRockySection;