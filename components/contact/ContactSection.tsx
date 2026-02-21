"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const INQUIRY_TYPES = ["Buy", "Sell", "Rent", "General"] as const;

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

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

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "General" as (typeof INQUIRY_TYPES)[number],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const contacts = [
    {
      id: "visit",
      label: "Visit Us",
      icon: LocationIcon,
      value: "Al Khaimah 2, Al Barsha 1\nDubai, UAE",
      href: undefined,
    },
    {
      id: "call",
      label: "Call Us",
      icon: PhoneIcon,
      value: "+971 4 447 6644",
      href: "tel:+97144476644",
    },
    {
      id: "write",
      label: "Write to Us",
      icon: MailIcon,
      value: "info@rockyrealestate.com",
      href: "mailto:info@rockyrealestate.com",
    },
  ] as const;

  const inputBase =
    "w-full h-11 rounded-lg border border-stone-200 bg-white px-4 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-200";

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-section-heading"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Subtle background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#faf9f7" }}
      />

      <Container className="relative">


        <div className="mb-4 md:mb-8">
          <motion.h2
            id="off-plan-section-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
            style={{ color: "#0d365e" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Get in Touch
          </motion.h2>
          {/* <motion.p
            className="mt-3 text-sm md:text-base max-w-lg"
            style={{ color: "#555" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            Whether you're looking to buy, sell, or simply explore Dubai's
            finest properties, our team is ready to assist with tailored
            guidance.
          </motion.p> */}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* ── LEFT: Contact Info ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Intro text */}
            <motion.p
              className="text-sm leading-relaxed text-[#0d365e]"
              variants={fadeUp}
              custom={1}
            >
              Whether you're looking to buy, sell, or simply explore Dubai's
              finest properties, our team is ready to assist with tailored
              guidance.
            </motion.p>

            {/* Contact details panel */}
            <motion.div
              className="rounded-2xl border border-stone-100 bg-white p-6 md:p-8"
              variants={fadeUp}
              custom={2}
            >
              <div className="flex flex-col gap-6">
                {contacts.map((contact, i) => {
                  const Icon = contact.icon;
                  const lines = contact.value.split("\n");
                  return (
                    <motion.div
                      key={contact.id}
                      className="flex items-center gap-4"
                      variants={fadeUp}
                      custom={3 + i}
                    >
                      {/* Icon badge */}
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-100 bg-stone-50 text-stone-500"
                        aria-hidden
                      >
                        <Icon />
                      </span>

                      <div className="min-w-0">
                        {/* <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                          {contact.label}
                        </p> */}
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-sm text-stone-700 transition-colors duration-150 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 rounded"
                          >
                            {lines[0]}
                          </a>
                        ) : (
                          <address className="not-italic text-sm text-stone-700">
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

            {/* Decorative tagline */}
            {/* <motion.p
              className="text-xs text-stone-400 italic"
              variants={fadeUp}
              custom={6}
            >
              "Exceptional properties deserve exceptional service."
            </motion.p> */}
          </motion.div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {submitted ? (
              <motion.div
                className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-stone-100 bg-white p-8 text-center"
                variants={fadeUp}
                custom={1}
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-600">
                  <CheckIcon />
                </span>
                <h3 className="mb-2 font-serif text-xl font-light text-stone-800">
                  Message Received
                </h3>
                <p className="max-w-xs text-sm text-stone-500">
                  Thank you for reaching out. A member of our team will be in
                  touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      fullName: "",
                      email: "",
                      phone: "",
                      inquiryType: "General",
                      message: "",
                    });
                  }}
                  className="mt-6 text-xs font-medium text-stone-400 underline underline-offset-4 hover:text-stone-600 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-stone-100 bg-white p-6 md:p-8"
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
                      className={inputBase}
                      aria-required="true"
                    />
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
                        className={inputBase}
                        aria-required="true"
                      />
                    </motion.div>

                    <motion.div variants={fadeUp} custom={4}>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+971 50 000 0000"
                        value={formState.phone}
                        onChange={handleChange}
                        className={inputBase}
                      />
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
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formState.inquiryType}
                      onChange={handleChange}
                      className={`${inputBase} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                      aria-label="Select inquiry type"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
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
                      className="w-full resize-none rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition-all duration-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
                      aria-required="true"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} custom={7}>
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#0d365e] px-6 py-3 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#1c4e80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 active:scale-[0.99]"
                    >
                      Send Inquiry
                    </button>
                    {/* <p className="mt-3 text-center text-[11px] text-stone-400">
                      We typically respond within one business day.
                    </p> */}
                  </motion.div>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;