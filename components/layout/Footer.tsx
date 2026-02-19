import React from "react";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const footerServices = [
    { title: "Short Term Rentals", path: "/short-term-rentals" },
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
    "Dubai Marina", "Downtown Dubai", "Palm Jumeirah",
    "Business Bay", "JBR", "Dubai Hills",
];

const areasWeCover = [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah",
];

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/rockyrealestatedubai", icon: "instagram" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/rockyrealestatedubai/", icon: "linkedin" },
    { name: "Facebook", href: "https://www.facebook.com/rockyrealestatedubai/", icon: "facebook" },
    { name: "TikTok", href: "https://www.tiktok.com/@rockyrealestate", icon: "tiktok" },
    // { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
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
        youtube: (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
        facebook: (
            <svg
                className={className}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M24 12C24 5.37 18.63 0 12 0S0 5.37 0 12c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.46h3.05V9.41c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87v2.24h3.33l-.53 3.46h-2.8v8.39C19.61 22.95 24 17.99 24 12z" />
            </svg>
        ),

    };
    return icons[name] ?? null;
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0d365e] text-white">
            <Container className="py-12 md:py-16 lg:py-20">
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
                        <h3 id="footer-services-heading" className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                            Services
                        </h3>
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
                        <h3 id="footer-company-heading" className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                            Company
                        </h3>
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
                        <h3 id="footer-contact-heading" className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                            Contact
                        </h3>
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

                {/* SEO – Popular Searches & Areas */}
                <section
                    className="mt-12 pt-10 border-t border-white/20"
                    aria-labelledby="footer-extra-heading"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                        {/* Newsletter Signup */}
                        <div>
                            <h3
                                id="footer-newsletter-heading"
                                className="text-xs font-semibold uppercase tracking-wider text-white mb-1"
                            >
                                Stay in the loop
                            </h3>
                            <p className="text-sm text-blue-100 mb-3">
                                Sign up to our weekly newsletter for market updates
                            </p>
                            <form
                                action="/api/newsletter"
                                method="POST"
                                aria-labelledby="footer-newsletter-heading"
                                className="flex gap-2 max-w-sm"
                            >
                                <label htmlFor="footer-email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="footer-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    className="flex-1 min-w-0 px-3 py-2 rounded text-sm bg-white/10 border border-white/20 text-white placeholder-blue-300/70 focus:outline-none focus:ring-1 focus:ring-white/60 focus:border-white/40 transition"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-[#c3ad95] hover:bg-[#9f8870] cursor-pointer text-[#0d365e] text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 shrink-0"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>

                        {/* Popular Searches */}
                        <nav aria-labelledby="footer-popular-heading">
                            <h3
                                id="footer-popular-heading"
                                className="text-xs font-semibold uppercase tracking-wider text-white mb-3"
                            >
                                Popular Searches
                            </h3>
                            <ul className="flex flex-wrap gap-2">
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
                        </nav>

                    </div>
                </section>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-200">
                        <p>© 2026 Rocky Real Estate. All rights reserved.</p>
                        <nav aria-label="Footer legal links">
                            <ul className="flex flex-wrap justify-center gap-4">
                                <li className="border-r border-white/20 pr-4">
                                    <Link href="/privacy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="border-r border-white/20 pr-4">
                                    <Link href="/terms" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                        Terms of Use
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sitemap" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded">
                                        Sitemap
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