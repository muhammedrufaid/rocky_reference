"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

const highlights = [
  {
    title: "Brokerage Built for Long-Term Success",
    number: "01",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "50+ Years of Market Experience",
    number: "02",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Award-Winning and Industry Recognized Professionals",
    number: "03",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.25v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
  },
  {
    title: "Training Designed for Growth",
    number: "04",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Access to Active Clients & Listings",
    number: "05",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Marketing Power That Drives Deals",
    number: "06",
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

const WhyRockySection: React.FC<{
  backgroundColor?: string;
  className?: string;
}> = ({
  backgroundColor = "#faf9f7",
  className = "py-16 md:py-20 lg:py-24",
}) => {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
      aria-labelledby="why-rocky-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ── Left: Image with button overlaid inside at the top ── */}
          <motion.div
            className="relative aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/assets/common/brochure.jpg"
              alt="Rocky Real Estate careers - join our team in Dubai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Dark gradient overlay at bottom for button legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(10,30,55,0.72) 0%, transparent 100%)",
              }}
            />

            {/* Download button — sits inside the image, bottom-left */}
            <motion.a
              href="/brochure.pdf"
              download="brochure.pdf"
              className="group absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm px-5 py-3 text-sm font-semibold transition-all duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              style={{ color: "#0d365e" }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-y-[1px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Brochure (PDF)
            </motion.a>
          </motion.div>

          {/* ── Right: Content — aligned to the top of the image ── */}
          <div className="lg:pl-4 flex flex-col">
            <motion.h2
              id="why-rocky-heading"
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-tight mb-10 md:mb-12"
              style={{ color: "#0d365e" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Why Rocky Real Estate?
            </motion.h2>

            <div className="divide-y mb-10 md:mb-12" style={{ borderColor: "#e3e8ef" }}>
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  className="group flex items-center gap-4 py-[14px] cursor-default"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Number */}
                  <span
                    className="shrink-0 text-[11px] font-semibold tabular-nums w-6 leading-none"
                    style={{ color: "#0d365e", opacity: 0.28 }}
                  >
                    {item.number}
                  </span>

                  {/* Icon */}
                  <span
                    className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 group-hover:bg-[#dce8f4]"
                    style={{ backgroundColor: "#eef3f9", color: "#0d365e" }}
                    aria-hidden
                  >
                    {item.icon}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-sm md:text-[15px] font-medium leading-snug transition-colors duration-200 group-hover:text-[#1761a8]"
                    style={{ color: "#0d365e" }}
                  >
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default WhyRockySection;