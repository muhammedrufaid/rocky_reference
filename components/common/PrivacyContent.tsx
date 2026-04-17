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
                    Rocky Real Estate ("Company," "we," "us," or "our") is committed to
                    protecting your privacy. This Privacy Policy outlines how we collect,
                    use, store, share, and protect your personal data in compliance with
                    the UAE Personal Data Protection Law (PDPL) and other applicable laws.
                </p>
                <p>
                    By using our website{" "}
                    <a
                        href="https://rockyrealestate.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://rockyrealestate.com
                    </a>{" "}
                    ("Website") or engaging with our services, you consent to the
                    practices described in this Policy.
                </p>
            </>
        ),
    },
    {
        number: "02",
        title: "What Data We Collect",
        content: (
            <>
                <p>We may collect the following categories of personal data:</p>
                <ul>
                    <li>
                        <strong>Contact Information:</strong> Name, phone number, email
                        address
                    </li>
                    <li>
                        <strong>Property Interests:</strong> Type of property, location
                        preferences, budget
                    </li>
                    <li>
                        <strong>Identification Documents:</strong> Passport, Emirates ID
                        (for transactions where required by law)
                    </li>
                    <li>
                        <strong>Transactional Information:</strong> Payments, contracts,
                        bookings
                    </li>
                    <li>
                        <strong>Device and Usage Data:</strong> IP address, browser type,
                        interaction logs, cookies
                    </li>
                </ul>
            </>
        ),
    },
    {
        number: "03",
        title: "How We Use Your Data",
        content: (
            <>
                <p>We use your personal data for the following purposes:</p>
                <ul>
                    <li>
                        To provide property advisory, buying, selling, leasing, and
                        management services
                    </li>
                    <li>To respond to your inquiries and process transactions</li>
                    <li>
                        To send property recommendations, newsletters, and updates (with
                        your consent)
                    </li>
                    <li>
                        To comply with legal obligations under UAE laws, including
                        anti-money laundering (AML) requirements
                    </li>
                    <li>To improve our website and user experience</li>
                </ul>
            </>
        ),
    },
    {
        number: "04",
        title: "Legal Basis for Processing",
        content: (
            <>
                <p>We collect and process your data based on:</p>
                <ul>
                    <li>Your consent</li>
                    <li>The need to perform a contractual obligation</li>
                    <li>Compliance with legal requirements</li>
                    <li>Our legitimate interest in providing real estate services</li>
                </ul>
            </>
        ),
    },
    {
        number: "05",
        title: "Data Sharing and Disclosure",
        content: (
            <>
                <p>We may share your data with:</p>
                <ul>
                    <li>
                        Property developers, landlords, or buyers, as necessary for
                        completing real estate transactions
                    </li>
                    <li>
                        Third-party service providers (e.g., IT, CRM, email marketing
                        tools) under strict confidentiality agreements
                    </li>
                    <li>
                        Government or regulatory bodies to comply with UAE legal
                        obligations
                    </li>
                </ul>
                <p>We do not sell your personal data.</p>
            </>
        ),
    },
    {
        number: "06",
        title: "International Data Transfers",
        content: (
            <p>
                Where data may be transferred outside the UAE, we ensure adequate
                safeguards are in place, in accordance with Article 22 of the PDPL.
            </p>
        ),
    },
    {
        number: "07",
        title: "Your Rights",
        content: (
            <>
                <p>Under UAE data protection law, you have the right to:</p>
                <ul>
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction or deletion of your data</li>
                    <li>
                        Withdraw your consent at any time (where processing is based on
                        consent)
                    </li>
                    <li>
                        Object to or restrict processing in certain circumstances
                    </li>
                </ul>
                <p>
                    To exercise your rights, please contact us at{" "}
                    <a href="mailto:info@rockyrealestate.com">
                        info@rockyrealestate.com
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        number: "08",
        title: "Cookies and Tracking",
        content: (
            <>
                <p>We use cookies and similar technologies to:</p>
                <ul>
                    <li>Improve site performance</li>
                    <li>Personalize your browsing experience</li>
                    <li>Analyze usage patterns</li>
                </ul>
                <p>
                    You can control cookie preferences through your browser settings.
                </p>
            </>
        ),
    },
    {
        number: "09",
        title: "Data Retention",
        content: (
            <p>
                We retain your personal data only as long as necessary for the purposes
                outlined in this policy and to comply with applicable legal requirements.
            </p>
        ),
    },
    {
        number: "10",
        title: "Data Security",
        content: (
            <p>
                We implement robust administrative, technical, and physical security
                measures to protect your data from unauthorized access, disclosure, or
                misuse.
            </p>
        ),
    },
    {
        number: "11",
        title: "Children's Privacy",
        content: (
            <p>
                Our services are not directed to children under the age of 18. We do not
                knowingly collect data from minors.
            </p>
        ),
    },
    {
        number: "12",
        title: "Updates to this Policy",
        content: (
            <p>
                We may update this Privacy Policy from time to time. Any changes will be
                posted on this page with the "Effective Date" updated accordingly.
            </p>
        ),
    },
    {
        number: "13",
        title: "Contact Us",
        content: (
            <>
                <p>
                    If you have any questions, requests, or complaints regarding this
                    Privacy Policy, please contact:
                </p>
                <p>
                    <strong>Rocky Real Estate</strong>
                    <br />
                    Email:{" "}
                    <a href="mailto:info@rockyrealestate.com">
                        info@rockyrealestate.com
                    </a>
                    <br />
                    Phone: <a href="tel:+971444764">+971 4 447 6444</a>
                    <br />
                    Address: Al Khaimah 2, Al Barsha 1, Dubai, UAE
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

const PrivacyContent: React.FC = () => {
    return (
        <section
            className="py-16 md:py-20 lg:py-24"
            aria-labelledby="privacy-content-heading"
        >
            <Container>
                {/* Header */}
                {/* <div className="mb-10 border-b border-current pb-6">
                    <p className="text-sm opacity-50 mb-1">Effective Date: 22 December 2025</p>
                    <h1
                        id="privacy-content-heading"
                        className="text-3xl md:text-4xl font-semibold tracking-tight"
                    >
                        Privacy Policy
                    </h1>
                </div> */}

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

export default PrivacyContent;