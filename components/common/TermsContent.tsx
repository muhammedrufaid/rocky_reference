"use client";

import React, { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Container from "@/components/layout/Container";

const sections = [
    {
        number: "01",
        title: "Introduction",
        content: (
            <>
                <p>
                    Welcome to Rocky Real Estate. By accessing or using our website, you
                    agree to be bound by the following Terms and Conditions. If you do not
                    agree with these terms, please refrain from using our services.
                </p>
            </>
        ),
    },
    {
        number: "02",
        title: "Use of Website",
        content: (
            <>
                <p>
                    This website is intended for informational purposes only. You may not
                    use this site for any unlawful or unauthorized purpose. You agree not
                    to reproduce, duplicate, copy, sell, resell, or exploit any portion of
                    the site without written permission from Rocky Real Estate.
                </p>
            </>
        ),
    },
    {
        number: "03",
        title: "Accuracy of Information",
        content: (
            <>
                <p>
                    We strive to ensure that all property listings, market data, and
                    service descriptions are accurate and up to date. However, we do not
                    guarantee the completeness or accuracy of information. All property
                    availability and prices are subject to change without prior notice.
                </p>
            </>
        ),
    },
    {
        number: "04",
        title: "Intellectual Property",
        content: (
            <>
                <p>
                    All content on this website, including logos, text, graphics, images,
                    and layout, is the property of Rocky Real Estate or its licensors. It
                    is protected by applicable copyright and trademark laws in the United
                    Arab Emirates and internationally.
                </p>
            </>
        ),
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
} satisfies Variants;

const TermsContent: React.FC = () => {
    return (
        <section
            className="py-16 md:py-20 lg:py-24"
            aria-labelledby="privacy-content-heading"
        >
            <Container>
                {/* Sections */}
                <div className="space-y-10">
                    {sections.map((section, i) => (
                        <motion.div
                            key={section.number}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeUp}
                            className="grid grid-cols-[3rem_1fr] gap-x-6 md:gap-x-8"
                        >
                            {/* Section number */}
                            <span className="text-xs font-mono opacity-35 pt-1 tabular-nums">
                                {section.number}
                            </span>

                            {/* Section body */}
                            <div>
                                <h2 className="text-base md:text-lg font-semibold mb-3">
                                    {section.title}
                                </h2>
                                <div className="prose prose-sm max-w-none opacity-75 leading-relaxed [&_p]:mb-3 [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_ul]:list-disc [&_a]:underline [&_a]:underline-offset-2">
                                    {section.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default TermsContent;