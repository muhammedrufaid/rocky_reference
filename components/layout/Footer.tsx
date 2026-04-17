"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const footerServices = [
    { title: "Professional Inspection", path: "/professional-inspection" },
    { title: "Property Listing", path: "/property-listing" },
    { title: "Property Management", path: "/property-management" },
    { title: "Mortgage", path: "/mortgage" },
    { title: "Brokerage", path: "/brokerage" },
    { title: "After Sales Support", path: "/after-sales-support" },
];

const footerCompany = [
    { title: "About Us", path: "/about" },
    { title: "Areas We Serve", path: "/areas" },
    { title: "Blog", path: "/blog" },
    { title: "FAQs", path: "/faqs" },
    { title: "Contact", path: "/contact" },
    { title: "Careers", path: "/careers" },
];

const popularSearches = [
    "Dubai Marina",
    "Downtown Dubai",
    "Palm Jumeirah",
    "Business Bay",
    "JBR",
    "Dubai Hills",
    "Jumeirah Village Circle",
    "Jumeirah Village Triangle",
    "Al Barsha",
    "Arabian Ranches",
    "Dubai Creek Harbour",
    "Dubai Silicon Oasis",
    "International City",
    "Meydan",
    "DAMAC Hills",
    "Expo City Dubai",
];

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/rockyrealestatedubai", icon: "instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/rockyrealestatedubai/", icon: "linkedin" },
    { name: "Facebook", href: "https://www.facebook.com/rockyrealestatedubai/", icon: "facebook" },
    { name: "TikTok", href: "https://www.tiktok.com/@rockyrealestate", icon: "tiktok" },
];

const SocialIcon = ({ name, className }: { name: string; className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
        instagram: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        tiktok: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
            </svg>
        ),
        linkedin: (
            <svg className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
                <path d="M100.28 448H7.4V148.9h92.78zm-46.4-341.6C24.12 106.4 0 82.28 0 53.2A53.2 53.2 0 0 1 53.2 0a53.2 53.2 0 0 1 53.2 53.2c0 29.08-24.12 53.2-53.32 53.2zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.68V148.9h89V184h1.3c12.4-23.5 42.7-48.3 87.8-48.3 93.8 0 111.1 61.7 111.1 141.9V448z" />
            </svg>
        ),
        facebook: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12C24 5.37 18.63 0 12 0S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.46h3.05V9.41c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87v2.24h3.33l-.53 3.46h-2.8v8.39C19.61 22.95 24 17.99 24 12z" />
            </svg>
        ),
    };
    return icons[name] ?? null;
};

const Footer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <footer id="site-footer" className="bg-[#0d365e] text-white">
            <Container className="py-12 md:py-16 lg:py-20">

                {/* SEO – Popular Searches */}
                <section
                    className="mb-8 pb-8 border-b border-white/20"
                    aria-labelledby="footer-popular-searches-heading"
                >
                    <nav aria-label="Popular searches">
                        {/* Trigger button */}
                        <button
                            id="footer-popular-searches-heading"
                            aria-expanded={isOpen}
                            aria-controls="popular-searches-panel"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="flex w-full items-center justify-between gap-4 text-xs font-medium uppercase tracking-wider text-white cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d365e] rounded"
                        >
                            <span>Popular Searches</span>

                            {/* Chevron — animates exactly like FAQs + icon */}
                            <motion.svg
                                className="h-4 w-4 text-white/90"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
                                    clipRule="evenodd"
                                />
                            </motion.svg>
                        </button>

                        {/*
                          Panel — identical transition config to FAQs <AnimatePresence> answer panel:
                            height: 0 → auto  (duration 0.35s, cubic-bezier ease)
                            opacity: 0 → 1    (duration 0.25s, easeInOut)
                        */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id="popular-searches-panel"
                                    role="region"
                                    aria-labelledby="footer-popular-searches-heading"
                                    key="popular-searches"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
                                        opacity: { duration: 0.25, ease: "easeInOut" },
                                    }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2">
                                        {popularSearches.map((area) => (
                                            <li key={area}>
                                                <Link
                                                    href={`/areas?q=${encodeURIComponent(area)}`}
                                                    className="text-xs text-blue-200 hover:text-white py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                                                >
                                                    {area}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Column 1 – Brand */}
                    <section className="lg:col-span-1">
                        <Link href="/" className="shrink-0 block">
                            <Image
                                src="/assets/common/Rocky-Logo-White.svg"
                                alt="Rocky Real Estate"
                                width={140}
                                height={56}
                                className="h-10 w-auto md:h-12"
                            />
                        </Link>
                        <p className="mt-4 text-blue-100 text-sm leading-relaxed max-w-xs">
                            Your trusted partner for premium properties in Dubai and the UAE. Find your dream home or investment opportunity.
                        </p>
                    </section>

                    {/* Column 2 – Services */}
                    <section aria-labelledby="footer-services-heading">
                        <h6 id="footer-services-heading" className="text-sm font-medium uppercase tracking-wider text-white mb-4">
                            Services
                        </h6>
                        <nav aria-label="Footer services">
                            <ul className="space-y-3">
                                {footerServices.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="text-sm text-blue-100 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    {/* Column 3 – Company */}
                    <section aria-labelledby="footer-company-heading">
                        <h6 id="footer-company-heading" className="text-sm font-medium uppercase tracking-wider text-white mb-4">
                            Company
                        </h6>
                        <nav aria-label="Footer company links">
                            <ul className="space-y-3">
                                {footerCompany.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className="text-sm text-blue-100 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </section>

                    {/* Column 4 – Contact + Social */}
                    <section aria-labelledby="footer-contact-heading">
                        <h6 id="footer-contact-heading" className="text-sm font-medium uppercase tracking-wider text-white mb-4">
                            Contact
                        </h6>
                        <address className="not-italic space-y-3 text-sm text-blue-100">
                            <p>
                                <a href="tel:+97144476644" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                    +97144476644
                                </a>
                            </p>
                            <p>
                                <a href="mailto:info@rockyrealestate.com" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                    info@rockyrealestate.com
                                </a>
                            </p>
                            <p>Al Khaimah 2, Al Barsha 1, Dubai</p>
                        </address>
                        <div className="mt-5" aria-label="Social media">
                            <div className="flex gap-4">
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center text-blue-200 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded"
                                        aria-label={`Follow us on ${item.name}`}
                                    >
                                        <SocialIcon name={item.icon} className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-200">
                        <p>© 2026 Rocky Real Estate. All rights reserved.</p>
                        <nav aria-label="Footer legal links">
                            <ul className="flex flex-wrap justify-center gap-4">
                                <li className="border-r border-white/20 pr-4">
                                    <Link href="/privacy-policy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms-and-conditions" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                        Terms and Conditions
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;