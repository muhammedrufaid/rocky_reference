"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { postContact } from "@/utils/getServices";
import { CallIcon, EmailIcon, LocationIcon } from "@/utils/icons";
import { PHONE_INPUT_PROPS, sanitizePhoneInput } from "@/utils/phone";

const INQUIRY_TYPES = [ "General", "Residential Sales", "Off Plan & Investments", "Residential Leasing", "Property Management", "Marketing"] as const;
type InquiryType = (typeof INQUIRY_TYPES)[number];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    } as const,
  }),
};

const InquiryTypeSelect: React.FC<{
  id: string;
  name: string;
  value: InquiryType;
  onChange: (next: InquiryType) => void;
  inputBase: string;
}> = ({ id, name, value, onChange, inputBase }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (target && wrapperRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* hidden input so native form semantics remain */}
      <input type="hidden" id={id} name={name} value={value} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${inputBase} cursor-pointer text-left appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
      >
        {value}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select inquiry type"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg"
        >
          <div className="max-h-56 overflow-auto py-1">
            {INQUIRY_TYPES.map((type) => {
              const active = type === value;
              return (
                <button
                  key={type}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(type);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "General" as InquiryType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof formState, string>>
  >({});

  const validate = () => {
    const next: Partial<Record<keyof typeof formState, string>> = {};

    if (!formState.fullName.trim()) next.fullName = "Full name is required";
    if (!formState.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formState.email.trim()))
      next.email = "Please enter a valid email";
    if (!formState.phone.trim()) next.phone = "Phone is required";
    if (!formState.message.trim()) next.message = "Message is required";

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      const startedAt = Date.now();
      await postContact({
        fullName: formState.fullName,
        email: formState.email,
        phone: formState.phone || undefined,
        inquiryType: formState.inquiryType,
        message: formState.message,
      });
      const minSendingMs = 800;
      const elapsed = Date.now() - startedAt;
      if (elapsed < minSendingMs) {
        await new Promise((r) => setTimeout(r, minSendingMs - elapsed));
      }
      setSubmitted(true);
      setFieldErrors({});
      setFormState({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "General",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const nextValue = name === "phone" ? sanitizePhoneInput(String(value)) : value;
    setFieldErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete (next as any)[name];
      return next;
    });
    setFormState((prev) => ({ ...prev, [name]: nextValue }));
  };

  const contacts = [
    {
      id: "visit",
      label: "Visit Us",
      icon: <LocationIcon width="16" height="16" />,
      value: "Al Khaimah 2, Al Barsha 1\nDubai, UAE",
      href: undefined,
    },
    {
      id: "call",
      label: "Call Us",
      icon: <CallIcon width="16" height="16" />,
      value: "+971 4 447 6644",
      href: "tel:+97144476644",
    },
    {
      id: "write",
      label: "Write to Us",
      icon: <EmailIcon width="16" height="16" />,
      value: "info@rockyrealestate.com",
      href: "mailto:info@rockyrealestate.com",
    },
  ] as const;

  const inputBase =
    "w-full h-11 rounded-lg border border-stone-200 bg-white px-4 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-200";
  const inputError =
    "border-red-300 focus:border-red-400 focus:ring-red-100";

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-section-heading"
      className="relative overflow-visible py-16 md:py-20 lg:py-24"
    >
      {/* Subtle background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#ffffff" }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* ── LEFT: Contact Info ── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              id="contact-section-heading"
              className="mt-6 text-2xl font-medium leading-tight text-[#081F3A] sm:text-3xl md:text-4xl"
              variants={fadeUp}
              custom={0}
            >
              Get in Touch
            </motion.h2>

            <motion.div
              className="mt-4 h-[2px] w-10 bg-[#C3AD95]"
              variants={fadeUp}
              custom={0.5}
              aria-hidden
            />

            {/* Intro text */}
            <motion.p
              className="mt-3 max-w-2xl text-base leading-relaxed text-[#333333]/60 md:text-lg"
              variants={fadeUp}
              custom={1}
            >
              Whether you're looking to buy, sell, or simply explore Dubai's
              finest properties, our team is ready to assist with tailored
              guidance.
            </motion.p>

            {/* Contact details panel */}
            <motion.div
              className="mt-8"
              variants={fadeUp}
              custom={2}
            >
              <div className="space-y-4">
                {contacts.map((contact, i) => {
                  const lines = contact.value.split("\n");
                  return (
                    <motion.div
                      key={contact.id}
                      className="flex items-start gap-3"
                      variants={fadeUp}
                      custom={3 + i}
                    >
                      {/* Icon badge */}
                      <span
                        className="mt-0.5 inline-flex text-[#C3AD95]"
                        aria-hidden
                      >
                        {contact.icon}
                      </span>

                      <div className="min-w-0">
                        {/* <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                          {contact.label}
                        </p> */}
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-sm md:text-base  text-[#0D365E] hover:text-[#1C4E80] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C4E80]/30 focus-visible:ring-offset-2 rounded"
                          >
                            {lines[0]}
                          </a>
                        ) : (
                          <address className="not-italic text-sm md:text-base  text-[#081F3A]">
                            {lines.map((line, idx) => (
                              <React.Fragment key={idx}>
                                {line}
                                {idx < lines.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                          </address>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-[#F6F6F6] p-6 sm:p-8"
              noValidate
              aria-label="Contact form"
              variants={fadeUp}
              custom={1}
            >
              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <motion.div variants={fadeUp} custom={2}>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                  >
                    Full Name <span aria-hidden>*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Jane Smith"
                    value={formState.fullName}
                    onChange={handleChange}
                    className={`${inputBase} ${fieldErrors.fullName ? inputError : ""}`}
                    aria-required="true"
                  />
                  {fieldErrors.fullName ? (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                  ) : null}
                </motion.div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <motion.div variants={fadeUp} custom={3}>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                    >
                      Email <span aria-hidden>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="jane@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.email ? inputError : ""}`}
                      aria-required="true"
                    />
                    {fieldErrors.email ? (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                    ) : null}
                  </motion.div>

                  <motion.div variants={fadeUp} custom={4}>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                    >
                      Phone <span aria-hidden>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      {...PHONE_INPUT_PROPS}
                      autoComplete="tel"
                      placeholder="+971 50 000 0000"
                      value={formState.phone}
                      onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.phone ? inputError : ""}`}
                      aria-required="true"
                    />
                    {fieldErrors.phone ? (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                    ) : null}
                  </motion.div>
                </div>

                {/* Inquiry Type */}
                <motion.div variants={fadeUp} custom={5}>
                  <label
                    htmlFor="inquiryType"
                    className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                  >
                    Inquiry Type
                  </label>
                  <InquiryTypeSelect
                    id="inquiryType"
                    name="inquiryType"
                    value={formState.inquiryType}
                    onChange={(next) =>
                      setFormState((prev) => ({ ...prev, inquiryType: next }))
                    }
                    inputBase={inputBase}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp} custom={6}>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                  >
                    Message <span aria-hidden>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your property requirements…"
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-200 focus:ring-2 ${
                      fieldErrors.message
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-stone-200 focus:border-stone-400 focus:ring-stone-200"
                    }`}
                    aria-required="true"
                  />
                  {fieldErrors.message ? (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
                  ) : null}
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp} custom={7}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full cursor-pointer rounded-lg bg-[#0d365e] px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#1c4e80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Sending..." : "Send Enquiry →"}
                  </button>
                  {error ? (
                    <p role="alert" className="mt-2 text-xs text-red-600">
                      {error}
                    </p>
                  ) : null}
                </motion.div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;