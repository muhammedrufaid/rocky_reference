"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import { blogPosts } from "@/utils/data";

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
    }),
};

const PropertyGallery: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
    return (
        <section
            className="py-16 md:py-20 lg:py-24 bg-white"
            aria-labelledby="blog-section-heading"
        >
            <Container>
                <div>
                    <h2>
                        property gallery
                    </h2>
                </div>
            </Container>
        </section>
    );
};

export default PropertyGallery;
