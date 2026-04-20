"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

type SalesHeroSectionProps = {
  title: string;
  description?: string;
  image?: string;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
      delay,
    },
  }),
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

const modalPanel = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] as const },
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SalesHeroSection({
  title,
  description,
  image = "/assets/common/selling.webp",
}: SalesHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const initialForm = useMemo<FormState>(
    () => ({ fullName: "", email: "", phone: "", message: "" }),
    [],
  );
  const [form, setForm] = useState<FormState>(initialForm);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 650));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = () => {
    setSubmitted(false);
    setForm(initialForm);
    setOpen(true);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden min-h-[580px] md:min-h-[660px] lg:min-h-[740px] flex items-center"
        aria-labelledby="developer-hero-heading"
      >
        {/* Background image — remains dominant, no global dark overlay */}
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover"
        />

        {/*
          Localized gradient: only darkens the left/text side.
          The right side of the image stays bright and vivid.
        */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden
          style={{
            background:
              "linear-gradient(100deg, rgba(4,10,20,0.82) 0%, rgba(4,10,20,0.65) 38%, rgba(4,10,20,0.18) 62%, transparent 78%)",
          }}
        />

        {/* Very subtle bottom vignette so scroll label stays readable */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 100%)",
          }}
        />

        {/* Fine noise grain — depth without weight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "170px",
          }}
        />

        <Container>
          <div className="relative z-20 w-full py-28 md:py-32 lg:py-36">
            <div className="max-w-xl text-center md:text-left">

              {/* Editorial label */}
              {/* <motion.p
                className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.26em] uppercase text-white/50"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0}
              >
                <span className="h-px w-6 bg-white/30" aria-hidden />
                Dubai Developer
              </motion.p> */}

              {/* Heading */}
              <motion.h1
                id="developer-hero-heading"
                className="mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.08}
              >
                {title}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-4 max-w-md text-sm leading-[1.75] text-white/68 md:text-base"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.16}
              >
                {description ??
                  "Developers behind the tallest building in the world, Burj Khalifa, Emaar has redefined the Dubai skyline with iconic master communities and internationally recognized properties."}
              </motion.p>
            </div>
          </div>
        </Container>

      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            onMouseDown={(e) => { if (e.currentTarget === e.target) setOpen(false); }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />

            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(8,31,58,0.18)]"
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Top accent bar — Rocky Blue */}
              {/* <div className="h-1 w-full bg-[#0D365E]" /> */}

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#9F8870]">
                      Request a callback
                    </p> */}
                    <h2 className="mt-2 text-xl font-medium text-[#081F3A]">
                      Talk to a Dubai property specialist
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#333333]/70">
                      Share your details and we'll contact you shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex cursor-pointer h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F6F6F6] text-[#333333]/50 transition hover:border-[#E7DCCD] hover:bg-[#F6F6F6] hover:text-[#0D365E] focus:outline-none focus:ring-2 focus:ring-[#C3AD95]/40"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Divider */}
                <div className="mt-5 h-px w-full bg-[#F6F6F6]" />

                <div className="mt-5">
                  {submitted ? (
                    <div className="rounded-xl border border-[#E7DCCD] bg-[#E7DCCD]/30 p-5">
                      <p className="text-sm font-medium text-[#081F3A]">Request received.</p>
                      <p className="mt-1 text-sm text-[#333333]/65">
                        We'll call you back as soon as possible.
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="rounded-xl bg-[#0D365E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1C4E80]"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSubmitted(false); setForm(initialForm); }}
                          className="rounded-xl border border-[#E7DCCD] px-4 py-2 text-sm font-medium text-[#0D365E] transition hover:bg-[#F6F6F6]"
                        >
                          Send another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor={fullNameId} className="block text-[11px] font-medium tracking-wide text-[#333333]/70">
                            Full Name
                          </label>
                          <input
                            id={fullNameId}
                            value={form.fullName}
                            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                            required
                            autoComplete="name"
                            placeholder="Your name"
                            className="mt-2 h-11 w-full rounded-xl border border-[#E7DCCD] bg-[#F6F6F6] px-3.5 text-sm text-[#081F3A] placeholder:text-[#333333]/35 outline-none transition focus:border-[#C3AD95] focus:bg-white focus:ring-2 focus:ring-[#C3AD95]/20"
                          />
                        </div>
                        <div>
                          <label htmlFor={phoneId} className="block text-[11px] font-medium tracking-wide text-[#333333]/70">
                            Phone Number
                          </label>
                          <input
                            id={phoneId}
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            required
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+971…"
                            className="mt-2 h-11 w-full rounded-xl border border-[#E7DCCD] bg-[#F6F6F6] px-3.5 text-sm text-[#081F3A] placeholder:text-[#333333]/35 outline-none transition focus:border-[#C3AD95] focus:bg-white focus:ring-2 focus:ring-[#C3AD95]/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor={emailId} className="block text-[11px] font-medium tracking-wide text-[#333333]/70">
                          Email
                        </label>
                        <input
                          id={emailId}
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          required
                          type="email"
                          autoComplete="email"
                          placeholder="you@email.com"
                          className="mt-2 h-11 w-full rounded-xl border border-[#E7DCCD] bg-[#F6F6F6] px-3.5 text-sm text-[#081F3A] placeholder:text-[#333333]/35 outline-none transition focus:border-[#C3AD95] focus:bg-white focus:ring-2 focus:ring-[#C3AD95]/20"
                        />
                      </div>

                      <div>
                        <label htmlFor={messageId} className="block text-[11px] font-medium tracking-wide text-[#333333]/70">
                          Message <span className="text-[#9F8870]">(optional)</span>
                        </label>
                        <textarea
                          id={messageId}
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          rows={4}
                          placeholder="Tell us what you're looking for…"
                          className="mt-2 w-full resize-none rounded-xl border border-[#E7DCCD] bg-[#F6F6F6] px-3.5 py-3 text-sm text-[#081F3A] placeholder:text-[#333333]/35 outline-none transition focus:border-[#C3AD95] focus:bg-white focus:ring-2 focus:ring-[#C3AD95]/20"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-1 cursor-pointer inline-flex w-full items-center justify-center rounded-xl bg-[#0D365E] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#1C4E80] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting ? "Sending…" : "Request Callback"}
                      </button>

                      <p className="text-center text-[11px] text-[#333333]/40">
                        By submitting, you agree to be contacted by Rocky Real Estate.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}