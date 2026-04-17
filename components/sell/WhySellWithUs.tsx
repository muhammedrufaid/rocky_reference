"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
        } as const,
    }),
};

export default function WhySellWithUs() {


    return (
        <section className="py-16 md:py-20 lg:py-24">
            <Container>
                <>
                </>
            </Container>
        </section>
    );
}

