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
export type DubaiSouthAgentHeroCtaPopup = boolean | string;

export const DUBAI_SOUTH_AGENT_HERO_CTA_POPUP_EVENT =
  "rocky:dubai-south-agent-hero-cta-popup";

export interface DubaiSouthAgentHeroCtaPopupDetail {
  popupId?: string;
}

export interface DubaiSouthAgentHeroProps {
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaPopup?: DubaiSouthAgentHeroCtaPopup;
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

const imageOverlay =
  "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.88) 50%, rgba(255, 255, 255, 0.85) 100%)";

const ctaClassName =
  "group inline-flex items-center gap-2 text-sm font-medium text-[#0d365e] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d365e]/30 hover:text-[#c3ad95]";

function HeroCtaContent({ label }: { label: string }) {
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

function resolveCtaPopupId(
  ctaPopup: DubaiSouthAgentHeroCtaPopup,
): string | undefined {
  return typeof ctaPopup === "string" ? ctaPopup : undefined;
}

function PulseDot() {
  return (
    <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
      <span
        className="absolute inline-flex h-full w-full rounded-full animate-ping"
        style={{ backgroundColor: "rgba(195, 173, 149, 0.5)" }}
      />
      <span
        className="relative inline-flex w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: "#c3ad95" }}
      />
    </span>
  );
}

const DubaiSouthAgentHero: React.FC<DubaiSouthAgentHeroProps> = ({
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
      new CustomEvent<DubaiSouthAgentHeroCtaPopupDetail>(
        DUBAI_SOUTH_AGENT_HERO_CTA_POPUP_EVENT,
        {
          detail: { popupId },
        },
      ),
    );
  };

  const sectionStyle = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#ffffff",
      }
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pb-8 pt-12 md:pb-10 md:pt-14"
      aria-labelledby="dubai-south-agent-hero-heading"
      style={sectionStyle}
    >
      {image && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: imageOverlay }}
          aria-hidden
        />
      )}

      <Container>
        <div className="relative z-10 max-w-4xl">
          <motion.nav
            className="mb-6 flex items-center gap-1.5 text-xs font-medium tracking-widest capitalize text-[#c3ad95]"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <span aria-hidden className="text-[#c3ad95]/40">
                    /
                  </span>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-[#0d365e]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#0d365e]/55">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>

          <motion.h1
            id="dubai-south-agent-hero-heading"
            className="text-3xl font-medium leading-tight tracking-tight text-[#0d365e] sm:text-4xl"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            {title}
          </motion.h1>

          <motion.div
            className="mt-4 h-px w-full max-w-[280px] bg-[#0d365e]/20"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.14}
            aria-hidden
          />

          {description && (
            <motion.p
              className="mt-6 max-w-3xl text-sm leading-relaxed text-[#333333]/80 md:text-base"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.18}
            >
              {description}
            </motion.p>
          )}

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
                  aria-haspopup="dialog"
                  aria-controls={
                    typeof ctaPopup === "string" ? ctaPopup : undefined
                  }
                >
                  <HeroCtaContent label={trimmedCtaLabel!} />
                </button>
              ) : (
                <Link href={ctaHref!} className={ctaClassName}>
                  <HeroCtaContent label={trimmedCtaLabel!} />
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default DubaiSouthAgentHero;
