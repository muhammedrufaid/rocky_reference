"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { postCareerApplication } from "@/utils/getServices";

const POSITION = {
  value: "property-consultant",
  label: "Property Consultant",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  },
});

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease },
  },
};

const labelClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400";

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-[#0d365e]/40 focus:ring-2 focus:ring-[#0d365e]/10";

const selectClass = `${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-position-[right_1rem_center] bg-no-repeat pr-10`;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  cvFile: File | null;
}

const UploadIcon = () => (
  <svg
    className="size-[18px] shrink-0 text-[#9f8870]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const JoinOurTeamSection: React.FC<{ className?: string }> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    position: POSITION.value,
    cvFile: null,
  });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, cvFile: file }));
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setSubmitError("Please fill in your name, email, and phone number.");
      return;
    }
    if (!form.cvFile) {
      setSubmitError("Please upload your CV.");
      return;
    }

    setSubmitting(true);
    try {
      await postCareerApplication({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        position: POSITION.label,
        cv: form.cvFile,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="join-our-team"
      ref={sectionRef}
      className={`relative overflow-hidden py-16 md:py-20 lg:py-24 ${className ?? ""}`}
      aria-labelledby="join-team-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#c3ad95] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(13,54,94,0.06),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Image panel */}
          <motion.div
            className="group relative min-h-[300px] overflow-hidden rounded-3xl bg-neutral-100 sm:min-h-[360px] lg:min-h-[560px]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeLeft}
          >
            <Image
              src="/assets/recruitment/recruitmentv2.webp"
              alt="Rocky Real Estate team collaborating"
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-br from-[#c3ad95]/10 via-transparent to-[#0d365e]/50"
            />

            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-medium text-charcoal">Actively hiring</span>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            className="flex flex-col justify-center rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm sm:p-10 lg:p-11"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp(0.12)}
          >
            {submitted ? (
              <div
                className="flex flex-1 flex-col items-center justify-center gap-5 py-10 text-center"
                role="alert"
                aria-live="polite"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#c3ad95] to-[#9f8870] text-2xl text-white shadow-lg shadow-[#c3ad95]/30">
                  ✓
                </div>
                <h3 className="text-2xl font-medium tracking-tight text-[#0d365e] sm:text-3xl">
                  Application sent
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-neutral-500 md:text-base">
                  Thank you for your interest. Our recruitment team will review your application and
                  be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeUp(0.2)}
                >
                  <div
                    className="mb-4 h-0.5 w-12 bg-[#c3ad95]"
                    aria-hidden="true"
                  />
                  {/* <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#9f8870]">
                    Careers
                  </p> */}
                  <h2
                    id="join-team-heading"
                    className="mt-2 text-2xl font-medium leading-tight tracking-tight text-[#0d365e] sm:text-3xl md:text-4xl"
                  >
                    Join our team
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
                    We are always looking for passionate, driven professionals to grow with Rocky
                    Real Estate across Dubai&apos;s property market.
                  </p>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-8 flex flex-col gap-4"
                  aria-label="Job application form"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeUp(0.3)}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelClass}>
                        Full name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className={inputClass}
                        placeholder="Jane Smith"
                        autoComplete="name"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={inputClass}
                        placeholder="jane@example.com"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="+971 50 000 0000"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className={labelClass}>
                        Position applying for
                      </label>
                      <select
                        id="position"
                        name="position"
                        className={selectClass}
                        value={form.position}
                        onChange={handleChange}
                        disabled
                        aria-disabled="true"
                      >
                        <option value={POSITION.value} disabled>
                          {POSITION.label}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <span id="cv-label" className={labelClass}>
                      CV / resume
                    </span>
                    <label
                      htmlFor="cvFile"
                      className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-4 py-3 transition-all duration-200 hover:border-[#9f8870]/50 hover:bg-white focus-within:border-[#0d365e]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0d365e]/10"
                    >
                      <UploadIcon />
                      <span
                        className={`min-w-0 flex-1 truncate text-sm ${
                          fileName ? "font-medium text-charcoal" : "text-neutral-500"
                        }`}
                      >
                        {fileName || "Upload your CV or resume"}
                      </span>
                      <span className="shrink-0 text-[11px] text-neutral-400">PDF, DOC</span>
                      <input
                        id="cvFile"
                        name="cvFile"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        aria-labelledby="cv-label"
                      />
                    </label>
                  </div>

                  {submitError && (
                    <div
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                      role="alert"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0d365e] px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#1c4e80] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d365e]/30 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Apply now"}
                    <ArrowIcon />
                  </button>
                </motion.form>
              </>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default JoinOurTeamSection;
