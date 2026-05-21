"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { navigationData } from "../../utils/data";

const SCROLL_THRESHOLD = 50;
const HEADER_HEIGHT_CSS_VAR = "--site-header-height";

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/rockyrealestatedubai", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/rockyrealestatedubai/", icon: "linkedin" },
  { name: "Facebook", href: "https://www.facebook.com/rockyrealestatedubai/", icon: "facebook" },
  { name: "TikTok", href: "https://www.tiktok.com/@rockyrealestate", icon: "tiktok" },
] as const;

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
      <svg className={className} fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
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

interface HeaderProps {
  forceSolid?: boolean;
  hideOnScroll?: boolean;
}

const Header: React.FC<HeaderProps> = ({ forceSolid = false, hideOnScroll = false }) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const handleDesktopDropdownBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next) return;
    if (!e.currentTarget.contains(next)) setActiveNav(null);
  };

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      const height = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(HEADER_HEIGHT_CSS_VAR, `${height}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) setMobileOpenId(null);
  }, [mobileMenuOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hideOnScroll) return;
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([e]) => setFooterInView(e.isIntersecting),
      { threshold: 0.6 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [hideOnScroll]);

  const isSolid = forceSolid || scrolled;
  const isHidden = hideOnScroll && scrolled && !footerInView;

  return (
    <>
      <header
        ref={headerRef}
        className={`font-dubai fixed top-0 left-0 right-0 z-50 w-full min-w-0 overflow-visible transition-all duration-500 ease-out ${isHidden ? "-translate-y-full" : ""
          } ${isSolid
            ? "bg-white shadow-sm border-b border-[var(--border-light)]"
            : "bg-transparent"
          }`}
      >
        <Container>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--rocky-blue)] focus:shadow-md"
          >
            Skip to content
          </a>
          <div className="flex h-16 md:h-20 min-w-0 items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className={`shrink-0 transition-all duration-500 ${isSolid ? "" : "brightness-0 invert"}`}
            >
              <Image
                src="/assets/common/rocky-50-logo.svg"
                alt="Rocky Real Estate"
                width={140}
                height={56}
                className="h-10 w-auto md:h-12"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 overflow-visible" aria-label="Primary navigation">
              {navigationData.map((item) =>
                item.path && !("type" in item && item.type === "dropdown") ? (
                  <Link
                    key={item.id}
                    href={item.path}
                    onMouseEnter={() => setActiveNav(item.title)}
                    onMouseLeave={() => setActiveNav(null)}
                    className={`relative py-2 text-[15px] font-medium transition-all duration-500 ${isSolid
                        ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                        : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                      }`}
                  >
                    {item.title}
                    {activeNav === item.title && (
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 w-full transition-all ${isSolid ? "bg-[#C3AD95]" : "bg-[#C3AD95]"
                          }`}
                      />
                    )}
                  </Link>
                ) : (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setActiveNav(item.title)}
                    onMouseLeave={() => setActiveNav(null)}
                    onFocusCapture={() => setActiveNav(item.title)}
                    onBlurCapture={handleDesktopDropdownBlur}
                  >
                    {item.path ? (
                      <Link
                        href={item.path}
                        className={`relative z-10 py-2 text-[15px] font-medium transition-all duration-500 flex items-center gap-0.5 ${isSolid
                            ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                            : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                          }`}
                        aria-haspopup="true"
                        aria-expanded={activeNav === item.title}
                        aria-controls={`desktop-dropdown-${item.id}`}
                      >
                        {item.title}
                        <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`py-2 text-[15px] font-medium transition-all duration-500 flex items-center gap-0.5 ${isSolid
                            ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                            : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                          }`}
                        aria-haspopup="true"
                        aria-expanded={activeNav === item.title}
                        aria-controls={`desktop-dropdown-${item.id}`}
                      >
                        {item.title}
                        <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    {activeNav === item.title && (
                      <>
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 w-full transition-all ${isSolid ? "bg-[#C3AD95]" : "bg-[#C3AD95]"
                            }`}
                        />
                        <div className="absolute top-full left-0 z-[60] pt-2 before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-['']">
                          <ul
                            id={`desktop-dropdown-${item.id}`}
                            className="header-nav-dropdown relative isolate min-w-[220px] py-2 rounded-lg bg-white shadow-lg border border-[var(--border-light)] [transform:translateZ(0)]"
                            aria-label={`${item.title} submenu`}
                          >
                            {"children" in item && item.children.map((sub) => (
                              <li key={sub.id} className="whitespace-nowrap">
                                <Link
                                  href={sub.path}
                                  className="block px-4 py-2.5 text-[15px] font-medium text-[#333333] hover:bg-[var(--soft-sand)]/30 hover:text-[var(--rocky-blue)] transition-colors whitespace-nowrap"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </nav>

            {/* Right: Social + mobile menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
              <nav
                className="hidden lg:flex items-center gap-2"
                aria-label="Social media"
              >
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${item.name}`}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isSolid
                        ? "text-[var(--rocky-blue)] hover:opacity-70 focus-visible:ring-[var(--rocky-blue)]"
                        : "text-white hover:opacity-80 focus-visible:ring-white"
                      }`}
                  >
                    <SocialIcon name={item.icon} className="w-5 h-5" />
                  </a>
                ))}
              </nav>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 ${isSolid
                    ? "text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40"
                    : "text-white hover:bg-white/10"
                  }`}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {/* Animated hamburger lines */}
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* ── Mobile Sidebar ─────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={`font-dubai lg:hidden fixed top-0 right-0 bottom-0 z-50 w-full flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border-light)] shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/assets/common/Rocky-Logo-Original.svg"
              alt="Rocky Real Estate"
              width={110}
              height={44}
              className="h-10 w-auto md:h-12"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links — scrollable */}
        <nav className="flex-1 overflow-y-auto py-4 pl-4 pr-5" aria-label="Mobile primary navigation">
          <ul className="flex flex-col gap-0.5">
            {navigationData.map((item, idx) =>
              item.path && !("type" in item && item.type === "dropdown") ? (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 text-[15px] font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li key={item.id}>
                  <div className="flex items-center gap-3 w-full py-3">
                    {item.path ? (
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 min-w-0 text-[15px] font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setMobileOpenId((prev) => (prev === item.id ? null : item.id))}
                        className="flex-1 min-w-0 text-[15px] font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors text-left"
                      >
                        {item.title}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMobileOpenId((prev) => (prev === item.id ? null : item.id));
                      }}
                      className="flex items-center justify-center w-8 h-8 shrink-0 text-[var(--charcoal)]/50 hover:text-[var(--rocky-blue)] rounded-lg transition-colors"
                      aria-expanded={mobileOpenId === item.id}
                      aria-controls={`mobile-menu-${item.id}`}
                      aria-label={`${mobileOpenId === item.id ? "Collapse" : "Expand"} ${item.title} menu`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${mobileOpenId === item.id ? "rotate-180 text-[var(--rocky-blue)]" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Accordion sub-items */}
                  <div
                    id={`mobile-menu-${item.id}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${mobileOpenId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <ul className="flex flex-col gap-0.5 pl-5 pb-1 pt-1">
                      {"children" in item && item.children.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 px-5 text-[14px] font-medium text-[var(--charcoal)]/80 hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Sidebar footer — social */}
        <div className="shrink-0 border-t border-[var(--border-light)] p-5">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--charcoal)]/50 mb-4">
            Follow us
          </p>
          <nav className="flex items-center justify-center gap-4" aria-label="Social media">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${item.name}`}
                className="flex items-center justify-center w-12 h-12 rounded-full text-[var(--rocky-blue)] bg-[var(--soft-sand)]/20 hover:bg-[var(--soft-sand)]/50 hover:opacity-80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rocky-blue)] focus-visible:ring-offset-2"
              >
                <SocialIcon name={item.icon} className="w-6 h-6" />
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Header;