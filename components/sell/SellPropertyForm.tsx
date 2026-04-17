"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

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

const PriceTagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20.59 13.41 11 23H2v-9l9.59-9.59a2 2 0 0 1 2.82 0l6.18 6.18a2 2 0 0 1 0 2.82Z" />
    <circle cx="7.5" cy="16.5" r="1.5" />
  </svg>
);

const SparkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="M2 12h6" />
    <path d="M16 12h6" />
    <path d="m4.93 19.07 4.24-4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="M9.5 12.5 11 14l3.5-4" />
  </svg>
);

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

export default function SellPropertyForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const trustPoints = [
    { icon: PriceTagIcon, label: "Top Market Price" },
    { icon: SparkIcon, label: "Fast & Simple Process" },
    { icon: ShieldIcon, label: "Fully Confidential" },
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
                    Sarah Al Habtoor
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
              <form className="space-y-5" aria-label="Sell your property form">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className={labelBase}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      className={inputBase}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelBase}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputBase}
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelBase}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputBase}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="propertyType" className={labelBase}>
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      className={`${inputBase} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-position-[right_1rem_center] bg-no-repeat pr-10`}
                      defaultValue=""
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
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label htmlFor="location" className={labelBase}>
                    Location / Area
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className={inputBase}
                    placeholder="e.g. Downtown Dubai"
                  />
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
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-xl bg-[#0D365E] px-6 py-4 text-base font-medium text-white transition-colors hover:bg-[#1C4E80] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1C4E80]/40 focus-visible:ring-offset-2"
                  >
                    Send Enquiry &rarr;
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

