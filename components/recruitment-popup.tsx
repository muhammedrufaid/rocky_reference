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
            className="absolute inset-0 bg-[#081F3A]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Subtle floating gradient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
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
            className="relative w-full max-w-[850px] overflow-hidden rounded-3xl border border-[#E7DCCD]/40 bg-white/95 shadow-[0_32px_80px_rgba(8,31,58,0.35)] backdrop-blur-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Glass highlight edge */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20"
              aria-hidden="true"
            />

            {/* Close button */}
            <motion.button
              ref={closeButtonRef}
              type="button"
              onClick={handleDismiss}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#E7DCCD]/50 bg-[#081F3A]/60 text-white/80 backdrop-blur-sm transition-colors hover:border-[#C3AD95] hover:bg-[#0D365E] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/60 md:right-5 md:top-5"
              aria-label="Close recruitment popup"
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2, ease: LUXURY_EASE }}
            >
              <ModalCloseIcon />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image — shown first on mobile */}
              <div className="relative order-1 min-h-[220px] sm:min-h-[260px] md:order-2 md:min-h-[440px]">
                <Image
                  src="/assets/recruitment/recruitment3.webp"
                  alt="Rocky Real Estate recruitment — join our luxury property team in Dubai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 425px"
                  priority={false}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#081F3A]/40 via-transparent to-transparent md:bg-gradient-to-l md:from-[#081F3A]/30 md:via-transparent md:to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Text panel — dark luxury section (20% structural color) */}
              <div className="relative order-2 flex flex-col justify-center bg-gradient-to-br from-[#081F3A] via-[#0D365E] to-[#1C4E80] px-7 py-10 sm:px-9 sm:py-12 md:order-1 md:px-10 md:py-14">
                {/* Accent glow */}
                <div
                  className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
                  style={{ background: "rgba(195, 173, 149, 0.45)" }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C3AD95]">
                    Careers at Rocky
                  </p>

                  {/* Sandstone accent divider */}
                  <div
                    className="mt-4 h-px w-14 bg-[#C3AD95]"
                    aria-hidden="true"
                  />

                  <h2
                    id="recruitment-popup-heading"
                    className="mt-5 text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]"
                  >
                    Build Your Legacy With Us
                  </h2>

                  <p
                    id="recruitment-popup-description"
                    className="mt-4 text-sm leading-relaxed text-white/80 sm:text-[15px] sm:leading-7"
                  >
                    For 50 years, we&apos;ve guided Dubai&apos;s real estate market.
                    Now we&apos;re looking for the next generation of real estate
                    leaders.
                  </p>

                  <div
                    className="mt-8 h-px w-full bg-[#9F8870]/35"
                    aria-hidden="true"
                  />

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/recruitment"
                      onClick={handleDismiss}
                      className="group inline-flex items-center justify-center rounded-xl bg-[#0D365E] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(13,54,94,0.35)] transition-colors duration-200 hover:bg-[#1C4E80] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/50"
                    >
                      Apply Now
                      <span
                        className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#9F8870]/60 bg-transparent px-6 py-3.5 text-sm font-medium text-[#E7DCCD] transition-colors duration-200 hover:border-[#C3AD95] hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3AD95]/40"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
