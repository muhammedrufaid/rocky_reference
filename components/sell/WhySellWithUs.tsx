"use client";

import React from "react";
import { TrendingUp, Clock, ShieldCheck, Users } from "lucide-react";
import Container from "@/components/layout/Container";

type WhySellWithUsProps = { className?: string };

const features = [
    {
        num: "01",
        icon: TrendingUp,
        title: "Maximum Market Value",
        description:
            "We use live market data to price your property competitively and attract serious buyers who are ready to close.",
    },
    {
        num: "02",
        icon: Clock,
        title: "Fast & Simple Process",
        description:
            "A seamless process where we handle the entire journey, from valuation to handover",
    },
    {
        num: "03",
        icon: ShieldCheck,
        title: "Fully Confidential",
        description:
            "Your property details are never shared without your explicit consent. Privacy is built into every step.",
    },
    {
        num: "04",
        icon: Users,
        title: "1,000+ Sellers Trusted Us",
        description:
            "Over a 1000+ homeowners have achieved their asking price through Rocky Real Estate",
    },
] as const;

export default function WhySellWithUs({ className }: WhySellWithUsProps) {
    return (
        <section className={`py-16 md:py-20 lg:py-24 bg-[#faf9f7] ${className ?? ""}`}>
            <Container>
                {/* Eyebrow */}
                {/* <p className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-charcoal/50">
          <span className="h-px w-7 bg-(--sandstone-taupe)" aria-hidden />
          Why sell with us
        </p> */}

                {/* Headline (match SellPropertyForm typography) */}
                <h2 className="text-2xl font-medium leading-tight tracking-tight text-[#0D365E] sm:text-3xl md:text-4xl lg:text-[2.5rem]">
                    Why Sell With Us?
                </h2>
                {/* <div className="mt-4 h-[2px] w-10 bg-[#C3AD95]" aria-hidden /> */}
                <p className="mt-3 mb-14 max-w-2xl text-base leading-[1.7] text-[#555] md:text-lg">
                    Everything you need to sell your property in Dubai faster, smarter, and at the right price.
                </p>

                {/* 2×2 Grid */}
                <div className="grid grid-cols-1 divide-x divide-y divide-(--border-light) overflow-hidden rounded-2xl border border-(--border-light) sm:grid-cols-2">
                    {features.map(({ num, icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="group bg-white p-7 transition-colors hover:bg-(--soft-sand)/20 sm:p-8"
                        >
                            <p className="mb-3 text-3xl font-medium leading-none text-(--sandstone-taupe)/30 sm:text-4xl">
                                {num}
                            </p>
                            {/* <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-(--border-light) text-[#C3AD95]">
                                <Icon className="h-5 w-5" aria-hidden />
                            </div> */}
                            <h3 className="mb-2 text-base font-medium leading-snug text-(--midnight-blue) sm:text-lg">
                                {title}
                            </h3>
                            <p className="text-base leading-relaxed text-[#333333]/70 sm:text-[17px]">{description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats strip */}
                {/* <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-(--border-light) pt-10">
                    {stats.map(({ value, label }) => (
                        <div key={label}>
                            <p className=" text-3xl font-medium text-(--midnight-blue)">{value}</p>
                            <p className="mt-1 text-xs uppercase tracking-wide text-charcoal/50">{label}</p>
                        </div>
                    ))}
                </div> */}
            </Container>
        </section>
    );
}