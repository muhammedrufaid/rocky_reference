"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { navigationData } from "../../utils/data";

const SCROLL_THRESHOLD = 50;

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    // Set initial state (handles SSR + scroll position on load)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white backdrop-blur-md shadow-sm border-b border-[var(--border-light)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className={`shrink-0 transition-all duration-500 ${scrolled ? "" : "brightness-0 invert"}`}>
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
            {navigationData.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onMouseEnter={() => setActiveNav(item.title)}
                onMouseLeave={() => setActiveNav(null)}
                className={`relative py-2 text-sm font-medium transition-all duration-500 ${
                  scrolled
                    ? `text-[var(--charcoal)] hover:text-[var(--rocky-blue)] ${activeNav === item.title ? "text-[var(--rocky-blue)]" : ""}`
                    : `text-white hover:text-white/90 ${activeNav === item.title ? "text-white" : ""}`
                }`}
              >
                {item.title}
                {activeNav === item.title && (
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 w-full transition-all ${
                      scrolled ? "bg-[var(--rocky-blue)]" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: CTAs */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Secondary CTA - Call */}
            <a
              href="tel:+971501234567"
              className={`hidden sm:flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-500 ${
                scrolled
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
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--rocky-blue)] rounded-lg hover:bg-[var(--rocky-blue-hover)] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-all duration-500 ${
                scrolled
                  ? "text-[var(--charcoal)] hover:text-[var(--rocky-blue)]"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile slide-in menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ top: "4rem" }}
      >
        <nav className="flex flex-col gap-1 p-6 overflow-auto">
          {navigationData.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 text-base font-medium text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/30 hover:text-[var(--rocky-blue)] rounded-lg transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[var(--border-light)] flex flex-col gap-2">
            <a
              href="tel:+971501234567"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 text-center text-base font-medium text-[var(--rocky-blue)] border border-[var(--rocky-blue)] rounded-lg"
            >
              Call
            </a>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 text-center text-base font-medium text-white bg-[var(--rocky-blue)] rounded-lg"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/20"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
