"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { navigationData } from "../../utils/data";

const SCROLL_THRESHOLD = 50;

interface HeaderProps {
  forceSolid?: boolean;
  hideOnScroll?: boolean;
}

const Header: React.FC<HeaderProps> = ({ forceSolid = false, hideOnScroll = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) setMobileMoreOpen(false);
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
        className={`fixed top-0 left-0 right-0 z-50 w-full min-w-0 overflow-x-clip transition-all duration-500 ease-out ${
          isHidden ? "-translate-y-full" : ""
        } ${
          isSolid
            ? "bg-white backdrop-blur-md shadow-sm border-b border-[var(--border-light)]"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-16 md:h-20 min-w-0 items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className={`shrink-0 transition-all duration-500 ${isSolid ? "" : "brightness-0 invert"}`}
            >
              <Image
                src="/assets/common/Rocky-Logo-Original.svg"
                alt="Rocky Real Estate"
                width={140}
                height={56}
                className="h-10 w-auto md:h-12"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationData.map((item) =>
                item.path && !("type" in item && item.type === "dropdown") ? (
                  <Link
                    key={item.id}
                    href={item.path}
                    onMouseEnter={() => setActiveNav(item.title)}
                    onMouseLeave={() => setActiveNav(null)}
                    className={`relative py-2 text-sm font-medium transition-all duration-500 ${
                      isSolid
                        ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                        : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                    }`}
                  >
                    {item.title}
                    {activeNav === item.title && (
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 w-full transition-all ${
                          isSolid ? "bg-[var(--rocky-blue)]" : "bg-white"
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
                  >
                    <button
                      type="button"
                      className={`py-2 text-sm font-medium transition-all duration-500 flex items-center gap-0.5 ${
                        isSolid
                          ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                          : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                      }`}
                      aria-haspopup="true"
                      aria-expanded={activeNav === item.title}
                    >
                      {item.title}
                      <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeNav === item.title && (
                      <>
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 w-full transition-all ${
                            isSolid ? "bg-[var(--rocky-blue)]" : "bg-white"
                          }`}
                        />
                        <div className="absolute top-full left-0 pt-2">
                          <ul
                            className="min-w-[180px] py-2 rounded-lg shadow-lg border border-[var(--border-light)] bg-white"
                            role="menu"
                          >
                            {"children" in item && item.children.map((sub) => (
                              <li key={sub.id} role="none">
                                <Link
                                  href={sub.path}
                                  className="block px-4 py-2.5 text-sm font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/30 hover:text-[var(--rocky-blue)] transition-colors"
                                  role="menuitem"
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

            {/* Right: CTAs */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Secondary CTA - Call */}
              <a
                href="tel:+971501234567"
                className={`hidden sm:flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-500 ${
                  isSolid
                    ? "text-[var(--rocky-blue)] border border-[var(--rocky-blue)] hover:bg-[var(--rocky-blue)] hover:text-white"
                    : "text-white border border-white/80 hover:bg-white hover:text-[var(--rocky-blue)]"
                }`}
              >
                Call
              </a>

              {/* Primary CTA - WhatsApp */}
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--rocky-blue)] rounded-lg hover:bg-[var(--rocky-blue-hover)] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-all duration-300 ${
                  isSolid
                    ? "text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {/* Animated hamburger lines */}
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
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
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-full flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="flex flex-col gap-0.5">
            {navigationData.map((item, idx) =>
              item.path && !("type" in item && item.type === "dropdown") ? (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-[15px] font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors group"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rocky-blue)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setMobileMoreOpen((prev) => !prev)}
                    className="flex items-center gap-3 w-full py-3 px-4 text-[15px] font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors text-left group"
                    aria-expanded={mobileMoreOpen}
                    aria-controls="mobile-more-menu"
                    id="mobile-more-trigger"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-[var(--rocky-blue)] transition-opacity shrink-0 ${mobileMoreOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                    <span className="flex-1">{item.title}</span>
                    <svg
                      className={`w-4 h-4 shrink-0 text-[var(--charcoal)]/50 transition-transform duration-200 ${mobileMoreOpen ? "rotate-180 text-[var(--rocky-blue)]" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion sub-items */}
                  <div
                    id="mobile-more-menu"
                    role="region"
                    aria-labelledby="mobile-more-trigger"
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      mobileMoreOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-0.5 pl-4 pb-1 pt-0.5">
                      {"children" in item && item.children.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 px-4 text-sm font-medium text-[var(--charcoal)]/80 hover:bg-[var(--soft-sand)]/40 hover:text-[var(--rocky-blue)] rounded-xl transition-colors"
                          >
                            <svg className="w-3 h-3 text-[var(--rocky-blue)]/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
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

        {/* Sidebar footer CTAs */}
        <div className="shrink-0 border-t border-[var(--border-light)] p-4 flex flex-col gap-3">
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-[var(--rocky-blue)] rounded-xl hover:bg-[var(--rocky-blue-hover)] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
          <a
            href="tel:+971501234567"
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[var(--rocky-blue)] border border-[var(--rocky-blue)] rounded-xl hover:bg-[var(--rocky-blue)] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
            </svg>
            Call Us
          </a>
        </div>
      </aside>
    </>
  );
};

export default Header;