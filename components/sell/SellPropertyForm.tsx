"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import { postSell } from "@/utils/getServices";
import { SellTrustPriceTagIcon, SellTrustShieldIcon, SellTrustSparkIcon } from "@/utils/icons";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
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

const propertyTypes = [
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Land",
] as const;

const inputBase =
  "w-full bg-white rounded-xl px-4 py-3.5 text-base outline-none transition focus:ring-1 focus:ring-[#1C4E80]/40 focus:border-[#1C4E80]";

const labelBase =
  "mb-2 block text-xs uppercase tracking-widest font-medium text-[#333333]/60";

const inputError = "ring-1 ring-red-400 focus:ring-red-400";

export default function SellPropertyForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    locationArea: "",
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
    if (!formState.propertyType.trim())
      next.propertyType = "Property type is required";
    if (!formState.locationArea.trim())
      next.locationArea = "Location / area is required";

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
      await postSell({
        fullName: formState.fullName.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim(),
        propertyType: formState.propertyType.trim(),
        locationArea: formState.locationArea.trim(),
        message: formState.message.trim() || undefined,
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
        propertyType: "",
        locationArea: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const nextValue =
      name === "phone" ? String(value).replace(/[^\d]/g, "") : value;
    setFieldErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete (next as Record<string, string>)[name];
      return next;
    });
    setFormState((prev) => ({ ...prev, [name]: nextValue }));
  };

  const trustPoints = [
    { icon: SellTrustPriceTagIcon, label: "Top Market Price" },
    { icon: SellTrustSparkIcon, label: "Fast & Simple Process" },
    { icon: SellTrustShieldIcon, label: "Fully Confidential" },
  ] as const;

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* LEFT */}
          <motion.div
            className="lg:basis-[45%]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="mt-6 text-2xl font-medium leading-tight text-[#081F3A] sm:text-3xl md:text-4xl"
              variants={fadeUp}
              custom={2}
            >
              Ready to Sell? Let&apos;s Talk.
            </motion.h2>

            <motion.div
              className="mt-4 h-[2px] w-10 bg-[#C3AD95]"
              variants={fadeUp}
              custom={1}
              aria-hidden
            />

            <motion.p
              className="mt-3 max-w-2xl text-base leading-relaxed text-[#333333]/60 md:text-lg"
              variants={fadeUp}
              custom={3}
            >
              Fill in your details and one of our property experts will get back
              to you within 24 hours.
            </motion.p>

            <div className="mt-8 space-y-4">
              {trustPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.label}
                    className="flex items-start gap-3"
                    variants={fadeUp}
                    custom={4 + idx}
                  >
                    <span
                      className="mt-0.5 inline-flex text-[#C3AD95]"
                      aria-hidden
                    >
                      <Icon />
                    </span>
                    <span className="text-base text-[#000000]/70">
                      {point.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="my-8 h-px w-full bg-[#E7DCCD]"
              variants={fadeUp}
              custom={7}
              aria-hidden
            />

            <motion.div
              className="flex items-center gap-4"
              variants={fadeUp}
              custom={8}
            >
              <div
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#E7DCCD]  text-[#C3AD95]"
                aria-hidden
              >
                <span className="text-sm font-medium tracking-[0.22em] pl-[0.22em]">
                  SA
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <p className="text-base font-medium text-[#081F3A]">
                    Perhat Atayev
                  </p>
                  <p className="text-sm text-[#333333]/60">Property Specialist</p>
                </div>
                <a
                  href="tel:+97144476644"
                  className="mt-1 inline-flex text-base font-medium text-[#0D365E] hover:text-[#1C4E80] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C4E80]/30 focus-visible:ring-offset-2 rounded"
                >
                  +971 4 447 6644
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="lg:basis-[55%]"
            initial={{ opacity: 0, x: 36 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }
            }
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08,
            }}
          >
            <div className="rounded-2xl bg-[#F6F6F6] p-6 sm:p-8">
              <form
                className="space-y-5"
                aria-label="Sell your property form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelBase}>
                      Full Name <span aria-hidden>*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Full Name"
                      value={formState.fullName}
                      onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.fullName ? inputError : ""}`}
                      aria-required="true"
                    />
                    {fieldErrors.fullName ? (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.fullName}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelBase}>
                      Phone Number <span aria-hidden>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel"
                      placeholder="+971 50 000 0000"
                      value={formState.phone}
                      onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.phone ? inputError : ""}`}
                      aria-required="true"
                    />
                    {fieldErrors.phone ? (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelBase}>
                      Email Address <span aria-hidden>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={handleChange}
                      className={`${inputBase} ${fieldErrors.email ? inputError : ""}`}
                      aria-required="true"
                    />
                    {fieldErrors.email ? (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="propertyType" className={labelBase}>
                      Property Type <span aria-hidden>*</span>
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formState.propertyType}
                      onChange={handleChange}
                      className={`${inputBase} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-position-[right_1rem_center] bg-no-repeat pr-10 ${fieldErrors.propertyType ? inputError : ""}`}
                      aria-required="true"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.propertyType ? (
                      <p className="mt-1 text-xs text-red-600">
                        {fieldErrors.propertyType}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label htmlFor="locationArea" className={labelBase}>
                    Location / Area <span aria-hidden>*</span>
                  </label>
                  <input
                    id="locationArea"
                    name="locationArea"
                    type="text"
                    placeholder="e.g. Downtown Dubai"
                    value={formState.locationArea}
                    onChange={handleChange}
                    className={`${inputBase} ${fieldErrors.locationArea ? inputError : ""}`}
                    aria-required="true"
                  />
                  {fieldErrors.locationArea ? (
                    <p className="mt-1 text-xs text-red-600">
                      {fieldErrors.locationArea}
                    </p>
                  ) : null}
                </div>

                {/* Row 4 */}
                <div>
                  <label htmlFor="message" className={labelBase}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`${inputBase} resize-none`}
                    placeholder="Tell us about your property..."
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-1">
                  {submitted ? (
                    <p role="status" className="mb-3 text-sm text-emerald-800">
                      Thanks — we&apos;ll be in touch within 24 hours.
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full cursor-pointer rounded-xl bg-[#0D365E] px-6 py-4 text-base font-medium text-white transition-colors hover:bg-[#1C4E80] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C4E80]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Sending…" : "Send Enquiry →"}
                  </button>
                  {error ? (
                    <p role="alert" className="mt-2 text-xs text-red-600">
                      {error}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
