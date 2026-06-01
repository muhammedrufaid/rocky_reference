"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRecruitmentPopup } from "@/hooks/useRecruitmentPopup";
import { isRecruitmentPopupEligible } from "@/utils/recruitmentPopup";
import { ModalCloseIcon } from "@/utils/icons";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: LUXURY_EASE } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: LUXURY_EASE } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25, ease: LUXURY_EASE },
  },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== "Tab") return;

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey) {
    if (active === first || !container.contains(active)) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (active === last) {
    event.preventDefault();
    first.focus();
  }
}

export default function RecruitmentPopup() {
  const pathname = usePathname();
  const eligible = isRecruitmentPopupEligible(pathname);
  const { isOpen, dismiss } = useRecruitmentPopup({ enabled: eligible });

  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDismiss = useCallback(() => {
    dismiss();
  }, [dismiss]);

  // ESC key closes the modal.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleDismiss();
        return;
      }
      if (modalRef.current) {
        trapFocus(modalRef.current, event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  // Move focus into the modal when it opens.
  useEffect(() => {
    if (!isOpen) return;

    const timerId = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => window.clearTimeout(timerId);
  }, [isOpen]);

  if (!mounted || !eligible) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="recruitment-popup-backdrop"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleDismiss();
            }
          }}
        >
          {/* Dark blurred backdrop */}
          <div
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Subtle floating gradient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(13, 54, 94, 0.55) 0%, rgba(195, 173, 149, 0.25) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruitment-popup-heading"
            aria-describedby="recruitment-popup-description"
            className="relative w-full max-w-[900px] overflow-hidden rounded-2xl backdrop-blur-xl md:min-h-[420px]"
            style={{
              boxShadow:
                "0 0 0 1.5px rgba(195, 173, 149, 0.15), 0 20px 60px rgba(8, 31, 58, 0.45), 0 0 80px rgba(13, 54, 94, 0.4)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              ref={closeButtonRef}
              type="button"
              onClick={handleDismiss}
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#081F3A]/60 text-white/80 backdrop-blur-sm transition-colors hover:bg-[#0D365E] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/60"
              aria-label="Close recruitment popup"
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2, ease: LUXURY_EASE }}
            >
              <ModalCloseIcon />
            </motion.button>

            {/*
              Layout: flex row on desktop so both panels are perfectly flush —
              no gap, no divider, no white line.
              On mobile: stack vertically (flex-col).
            */}
            <div className="flex flex-col md:flex-row">

              {/* ── Text panel (left on desktop) ── */}
              <div className="relative order-2 flex w-full flex-col justify-center bg-gradient-to-br from-[#081F3A] via-[#0D365E] to-[#1C4E80] px-6 py-8 sm:px-9 sm:py-10 md:order-1 md:w-[44%] md:flex-shrink-0 md:px-10 md:py-12 lg:px-12 lg:py-14">
                {/* Accent glow */}
                <div
                  className="pointer-events-none absolute -left-16 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                  style={{ background: "rgba(195, 173, 149, 0.45)" }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#C3AD95]">
                    Careers at Rocky
                  </p>

                  {/* Sandstone accent divider */}
                  <div
                    className="mt-3 h-px w-12 bg-[#C3AD95]"
                    aria-hidden="true"
                  />

                  <h2
                    id="recruitment-popup-heading"
                    className="mt-4 text-2xl font-medium leading-tight tracking-tight text-white sm:text-[1.65rem] md:text-[2rem] lg:text-[2.15rem]"
                  >
                    Build Your Legacy With Us
                  </h2>

                  <p
                    id="recruitment-popup-description"
                    className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base sm:leading-7"
                  >
                    For 50 years, we&apos;ve guided Dubai&apos;s real estate market.
                    Now we&apos;re looking for the next generation of real estate
                    leaders.
                  </p>

                  <div
                    className="mt-6 h-px w-full bg-[#9F8870]/35"
                    aria-hidden="true"
                  />

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/recruitment"
                      onClick={handleDismiss}
                      className="group inline-flex items-center justify-center rounded-xl bg-[#0D365E] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(13,54,94,0.35)] transition-colors duration-200 hover:bg-[#1C4E80] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/50 sm:text-base"
                    >
                      Apply Now
                      <span
                        className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Image panel (right on desktop) ── 
                  Uses aspect-ratio on mobile so it's never clipped.
                  On desktop: flex-1 so it fills the remaining width,
                  position relative + inset-0 image fills every pixel.
              -->
              */}
              <div className="relative order-1 aspect-[4/3] w-full md:order-2 md:aspect-auto md:min-h-[420px] md:flex-1">
                <Image
                  src="/assets/recruitment/recruitmentv2.webp"
                  alt="Rocky Real Estate recruitment — join our luxury property team in Dubai"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority={false}
                />
                {/* Subtle left-edge fade to blend into text panel — no hard line */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#081F3A]/20 via-transparent to-transparent md:bg-gradient-to-r md:from-[#0D365E]/30 md:via-transparent md:to-transparent"
                  aria-hidden="true"
                />
              </div>

            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}