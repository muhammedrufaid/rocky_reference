"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import { ArrowRightIcon } from "@/utils/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** `true` opens a generic popup; a string identifies a specific popup for listeners. */
export type PageHeroCtaPopup = boolean | string;

export const PAGE_HERO_CTA_POPUP_EVENT = "rocky:page-hero-cta-popup";

export interface PageHeroCtaPopupDetail {
  popupId?: string;
}

export interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  /** Background image path. When provided, image shows with overlay. Otherwise uses gradient background. */
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** When set, CTA is a button that triggers a popup instead of navigating. */
  ctaPopup?: PageHeroCtaPopup;
  /** Optional handler when `ctaPopup` is set; runs before the document custom event. */
  onCtaPopupClick?: (popupId: string | undefined) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const gradientBg =
  "linear-gradient(135deg, rgba(13, 54, 94, 0.97) 0%, rgba(8, 31, 58, 0.95) 50%, rgba(13, 54, 94, 0.88) 100%)";
const imageOverlay =
  "linear-gradient(135deg, rgba(13, 54, 94, 0.82) 0%, rgba(8, 31, 58, 0.78) 50%, rgba(13, 54, 94, 0.75) 100%)";

const ctaClassName =
  "group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 hover:text-[#c3ad95]";

const ctaStyle: React.CSSProperties = { color: "rgba(255, 255, 255, 0.85)" };

function PageHeroCtaContent({ label }: { label: string }) {
  return (
    <>
      <PulseDot />
      {label}
      <ArrowRightIcon
        width="12"
        height="12"
        strokeWidth={2.5}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      />
    </>
  );
}

function resolveCtaPopupId(ctaPopup: PageHeroCtaPopup): string | undefined {
  return typeof ctaPopup === "string" ? ctaPopup : undefined;
}

function PulseDot() {
  return (
    <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
      {/* Ping ring — animates outward and fades */}
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping"
        style={{ backgroundColor: "rgba(195, 173, 149, 0.5)" }}
      />
      {/* Solid core dot */}
      <span
        className="relative inline-flex w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: "#c3ad95" }}
      />
    </span>
  );
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  description,
  breadcrumb,
  image,
  ctaLabel,
  ctaHref,
  ctaPopup,
  onCtaPopupClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const trimmedCtaLabel = ctaLabel?.trim();
  const isPopupCta = Boolean(ctaPopup);
  const showCta = Boolean(trimmedCtaLabel) && (isPopupCta || Boolean(ctaHref));

  const handleCtaPopupClick = () => {
    if (!ctaPopup) return;
    const popupId = resolveCtaPopupId(ctaPopup);
    onCtaPopupClick?.(popupId);
    document.dispatchEvent(
      new CustomEvent<PageHeroCtaPopupDetail>(PAGE_HERO_CTA_POPUP_EVENT, {
        detail: { popupId },
      }),
    );
  };

  const sectionStyle = image
    ? {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#081f3a",
    }
    : {
      background: gradientBg,
      backgroundColor: "#081f3a",
    };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
      aria-labelledby="page-hero-heading"
      style={sectionStyle}
    >
      {/* Semi-transparent overlay when image is used — image shows through, text stays readable */}
      {image && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: imageOverlay }}
          aria-hidden
        />
      )}
      {/* Subtle radial glow — matches Hero overlay depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(195, 173, 149, 0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Noise texture layer for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
        aria-hidden
      />

      <Container>
        <div className="relative z-10 max-w-xl">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-6 flex items-center gap-1.5 text-xs font-medium tracking-widest capitalize"
            style={{ color: "rgba(195, 173, 149, 0.75)" }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span
                    aria-hidden
                    style={{ color: "rgba(195, 173, 149, 0.4)" }}
                  >
                    /
                  </span>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[#c3ad95]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>

          {/* Heading */}
          <motion.h1
            id="page-hero-heading"
            className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            {title}
          </motion.h1>

          {/* Subheading */}
          {description && (
            <motion.p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(255,255,255,0.72)" }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.18}
            >
              {description}
            </motion.p>
          )}
          {/* Divider accent */}
          <motion.div
            className="mt-8 h-px w-12"
            style={{ backgroundColor: "#c3ad95", opacity: 0.6 }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.26}
            aria-hidden
          />

          {showCta && (
            <motion.div
              className="mt-8"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.22}
            >
              {isPopupCta ? (
                <button
                  type="button"
                  onClick={handleCtaPopupClick}
                  className={ctaClassName}
                  style={ctaStyle}
                  aria-haspopup="dialog"
                  aria-controls={
                    typeof ctaPopup === "string" ? ctaPopup : undefined
                  }
                >
                  <PageHeroCtaContent label={trimmedCtaLabel!} />
                </button>
              ) : (
                <Link
                  href={ctaHref!}
                  className={ctaClassName}
                  style={ctaStyle}
                >
                  <PageHeroCtaContent label={trimmedCtaLabel!} />
                </Link>
              )}
            </motion.div>
          )}


        </div>
      </Container>
    </section>
  );
};

export default PageHero;
