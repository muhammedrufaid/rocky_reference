"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease, delay },
    }),
};

const VisionMissionSection: React.FC<{ className?: string }> = ({ className }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    const bodyParagraphClass =
        "mt-3 max-w-2xl text-base leading-relaxed text-[#333333]/60 md:text-lg";

    return (
        <section
            ref={sectionRef}
            className={className ?? "py-16 md:py-20 lg:py-24"}
            aria-labelledby="vision-mission-heading"
        >
            <Container>
                <>
                </>
            </Container>
        </section>
    );
};

export default VisionMissionSection;