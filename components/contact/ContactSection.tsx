"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const INQUIRY_TYPES = ["Buy", "Sell", "Rent", "General"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } as const,
  }),
};

const Field: React.FC<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ id, label, type = "text", placeholder, required, value, onChange }) => (
  <div className="relative group">
    <label
      htmlFor={id}
      className="block font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#9f8870] pt-5 mb-1.5"
    >
      {label}
      {required && <span className="ml-[3px]">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full pb-3 bg-transparent border-none outline-none font-['DM_Sans',sans-serif] text-[13px] text-[#081f3a] placeholder:text-[#c3ad95]/60 caret-[#1c4e80]"
    />
    {/* Static underline */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e7dccd]" />
    {/* Animated focus underline */}
    <div className="absolute bottom-0 left-0 h-px bg-[#0d365e] w-0 group-focus-within:w-full transition-all duration-500 ease-out" />
  </div>
);

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

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-section-heading"
      className="relative overflow-hidden"
    >
      {/* Plain white background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#ffffff" }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.55fr]">

          {/* ── LEFT: Info panel (Rocky Blue) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="py-20 pr-12 flex flex-col justify-between"
            style={{ minHeight: 620 }}
          >
            <div>
             
              {/* Heading */}
              <motion.h2
                id="contact-section-heading"
                custom={1}
                variants={fadeUp}
                className=" text-[clamp(36px,4.5vw,54px)] leading-[1.07] tracking-[-0.02em] text-[#081f3a] m-0"
              >
                Let's start a
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-[clamp(36px,4.5vw,54px)] leading-[1.07] tracking-[-0.02em] text-[#9f8870] m-0"
              >
                conversation.
              </motion.p>

              {/* Thin rule */}
              <motion.div
                custom={3}
                variants={fadeUp}
                className="mt-10 mb-10 w-8 h-px bg-[#c3ad95]/50"
              />

              {/* Contact details */}
              <div className="flex flex-col gap-6">
                {([
                  { label: "Office", lines: ["Al Khaimah 2, Al Barsha 1", "Dubai, UAE"],        href: undefined },
                  { label: "Phone",  lines: ["+971 4 447 6644"],                                 href: "tel:+97144476644" },
                  { label: "Email",  lines: ["info@rockyrealestate.com"],                         href: "mailto:info@rockyrealestate.com" },
                  { label: "Hours",  lines: ["Sun – Thu  9:00 – 18:00", "Sat  10:00 – 16:00"],  href: undefined },
                ] as const).map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i + 4}
                    variants={fadeUp}
                    className="grid items-start gap-4"
                    style={{ gridTemplateColumns: "52px 1fr" }}
                  >
                    <span className="font-['DM_Sans',sans-serif] text-[9px] tracking-[0.22em] uppercase text-[#c3ad95] pt-[2px]">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-['DM_Sans',sans-serif] text-[13px] leading-relaxed text-[#0d365e] no-underline transition-colors duration-200 hover:text-[#1c4e80]"
                      >
                        {item.lines.map((l, j) => <span key={j} className="block">{l}</span>)}
                      </a>
                    ) : (
                      <p className="m-0 font-['DM_Sans',sans-serif] text-[13px] leading-relaxed text-[#4a5568]">
                        {item.lines.map((l, j) => <span key={j} className="block">{l}</span>)}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div custom={9} variants={fadeUp} className="mt-14">
              <a
                href="https://wa.me/971561663813?text=Hi!%20I%20would%20like%20to%20schedule%20a%20consultation%20with%20Rocky%20Real%20Estate."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-3 font-['DM_Sans',sans-serif] text-[10px] tracking-[0.2em] uppercase font-medium text-[#0d365e] no-underline transition-opacity duration-200 hover:opacity-55"
              >
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                  style={{ border: "1px solid rgba(13,54,94,0.3)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form panel (warm off-white) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="py-10 flex items-center"
          >
          <div
            className="w-full px-12 py-12 rounded-2xl"
            style={{ background: "transparent", border: "1px solid #0d365e" }}
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

                {/* Section eyebrow */}
                <p className="font-['DM_Sans',sans-serif] text-[9px] tracking-[0.28em] uppercase text-[#0d365e] mb-2">
                  Send a Message
                </p>

                {/* Field overrides for blue bg — inline wrapper */}
                {[
                  { id: "fullName", label: "Full Name", type: "text",  placeholder: "John Smith",          required: true  },
                  { id: "email",    label: "Email",     type: "email", placeholder: "john@example.com",     required: true  },
                  { id: "phone",    label: "Phone",     type: "tel",   placeholder: "+971 50 123 4567",     required: false },
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

                {/* Inquiry type pills */}
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
                          onClick={() =>
                            setFormState((prev) => ({ ...prev, inquiryType: type }))
                          }
                          className="font-['DM_Sans',sans-serif] text-[10px] rounded-full tracking-[0.16em] uppercase px-5 py-2 rounded-fulltransition-all duration-200 cursor-pointer"
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

                {/* Message textarea */}
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

                {/* Submit row */}
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
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
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