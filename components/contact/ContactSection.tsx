"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const INQUIRY_TYPES = ["Buy", "Sell", "Rent", "General"] as const;

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } as const,
  }),
};

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "" as "" | (typeof INQUIRY_TYPES)[number],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const contacts = [
    {
      id: "visit",
      icon: LocationIcon,
      value: "Al Khaimah 2, Al Barsha 1\nDubai, UAE",
      href: undefined,
    },
    {
      id: "call",
      icon: PhoneIcon,
      value: "+971 4 447 6644",
      href: "tel:+97144476644",
    },
    {
      id: "write",
      icon: MailIcon,
      value: "info@rockyrealestate.com",
      href: "mailto:info@rockyrealestate.com",
    },
    // {
    //   id: "hours",
    //   icon: ClockIcon,
    //   value: "Sun – Thu  9:00 – 18:00\nSat  10:00 – 16:00",
    //   href: undefined,
    // },
  ] as const;

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-section-heading"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "#ffffff" }} />

      <Container className="relative">
        {/* gap-2 on mobile, gap-8 on md+ */}
        <div className="grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-[1fr_1.55fr]">

          {/* ── LEFT: Contact details ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* Headline */}
              <motion.h2
                id="contact-section-heading"
                custom={1}
                variants={fadeUp}
                className="text-[clamp(36px,4.5vw,54px)] leading-[1.07] tracking-[-0.02em] text-[#081f3a]"
              >
                Get in <span className="text-[#9f8870]">Touch</span>
              </motion.h2>

              {/* Thin rule — tighter margins on mobile */}
              <motion.div
                custom={3}
                variants={fadeUp}
                className="mt-6 mb-6 md:mt-10 md:mb-12 h-px bg-[#e7dccd]"
                style={{ width: 40 }}
              />

              {/* Contact rows */}
              <div className="flex flex-col">
                {contacts.map((item, i) => {
                  const Icon = item.icon;
                  return (
                  <motion.div
                    key={item.id}
                    custom={i + 4}
                    variants={fadeUp}
                    className="flex items-start py-3 md:py-5 border-b border-[#f0ebe3] first:border-t first:border-[#f0ebe3]"
                  >
                    <span className="text-[#c3ad95] w-6 shrink-0 pt-[2px] flex items-center" aria-hidden>
                      <Icon />
                    </span>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-['DM_Sans',sans-serif] text-[13px] leading-relaxed text-[#081f3a] no-underline transition-opacity duration-200 hover:opacity-40 whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="m-0 font-['DM_Sans',sans-serif] text-[13px] leading-relaxed text-[#4a5568] whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Form panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <div
              className="w-full px-6 py-8 md:px-12 md:py-12 rounded-2xl border border-neutral-300"
              style={{ background: "transparent"}}
            >
              {submitted ? (
                <div className="py-16">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-6 text-sm"
                    style={{ background: "#0d365e", color: "#fff", border: "1px solid #0d365e" }}
                  >
                    ✓
                  </div>
                  <p className="font-['Cormorant_Garamond',Georgia,serif] text-[28px] font-light text-[#081f3a] mb-2">
                    Message received.
                  </p>
                  <p className="font-['DM_Sans',sans-serif] text-[13px] text-[#9f8870]">
                    We'll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0">
                  <p className="font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#0d365e] mb-2">
                    Send a Message
                  </p>

                  {[
                    { id: "fullName", label: "Full Name", type: "text", placeholder: "John Smith", required: true },
                    { id: "email", label: "Email", type: "email", placeholder: "john@example.com", required: true },
                    { id: "phone", label: "Phone", type: "tel", placeholder: "+971 50 123 4567", required: false },
                  ].map(({ id, label, type, placeholder, required }) => (
                    <div key={id} className="relative group">
                      <label
                        htmlFor={id}
                        className="block font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#0d365e] pt-5 mb-1.5"
                      >
                        {label}{required && <span className="ml-[3px]">*</span>}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        required={required}
                        value={(formState as Record<string, string>)[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="block w-full pb-3 bg-transparent border-none outline-none font-['DM_Sans',sans-serif] text-[13px] text-[#081f3a] placeholder:text-[#0d365e]/30 caret-[#0d365e]"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0d365e]/20" />
                      <div className="absolute bottom-0 left-0 h-px bg-[#0d365e] w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
                    </div>
                  ))}

                  <div className="relative pt-5 pb-4">
                    <p className="font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#0d365e] mb-3">
                      Inquiry Type *
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {INQUIRY_TYPES.map((type) => {
                        const active = formState.inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormState((prev) => ({ ...prev, inquiryType: type }))}
                            className="font-['DM_Sans',sans-serif] text-[10px] rounded-full tracking-[0.16em] uppercase px-5 py-2 transition-all duration-200 cursor-pointer"
                            style={
                              active
                                ? { background: "#e7dccd", color: "#000000" }
                                : { background: "transparent", color: "#0d365e" }
                            }
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0d365e]/20" />
                  </div>

                  <div className="relative group pt-5">
                    <label
                      htmlFor="message"
                      className="block font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#0d365e] mb-2.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us about your property requirements…"
                      className="block w-full pb-3 bg-transparent border-none outline-none resize-none font-['DM_Sans',sans-serif] text-[13px] text-[#081f3a] placeholder:text-[#0d365e]/30 caret-[#0d365e]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0d365e]/20" />
                    <div className="absolute bottom-0 left-0 h-px bg-[#0d365e] w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
                  </div>

                  <div className="mt-10 flex items-center gap-5 flex-wrap">
                    <button
                      type="submit"
                      className="group/btn inline-flex items-center gap-4 font-['DM_Sans',sans-serif] text-[10px] tracking-[0.22em] uppercase font-medium rounded-full cursor-pointer py-[14px] pr-8 pl-[14px] transition-colors duration-250"
                      style={{ background: "#0d365e", color: "#fff", border: "1px solid #0d365e" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "#1c4e80";
                        el.style.borderColor = "#1c4e80";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = "#0d365e";
                        el.style.borderColor = "#0d365e";
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                        style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                      Send Message
                    </button>
                    <p className="font-['DM_Sans',sans-serif] text-[11px] text-[#0d365e]/60">
                      We respond within 1 business day.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default ContactSection;