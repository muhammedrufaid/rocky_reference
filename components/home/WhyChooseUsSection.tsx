"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

const benefits = [
  { icon: "◆", title: "Market-Leading Expertise", desc: "Deep knowledge of Dubai's real estate landscape" },
  { icon: "◆", title: "Off-Plan Access", desc: "Exclusive access to premium off-plan developments" },
  { icon: "◆", title: "Data-Driven Advisory", desc: "Investment decisions backed by market intelligence" },
  { icon: "◆", title: "Transparent Service", desc: "Honest, clear guidance you can trust" },
  { icon: "◆", title: "Dedicated Management", desc: "Personalised client relationship at every step" },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section
      className="pb-16 md:pb-20 lg:pb-24"
      aria-labelledby="why-choose-heading"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Container>
        {/* ROW 1: Small image + heading/text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Smaller image */}
          <figure
            className="relative w-full max-w-xl mx-auto lg:mx-0 aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ boxShadow: "0 6px 28px rgba(13, 54, 94, 0.10)" }}
          >
            <Image
              src="/assets/common/whychooseus.jpg"
              alt="Luxury Dubai real estate - Rocky Real Estate expertise"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 384px, 40vw"
              priority={false}
            />
            {/* Overlay badge */}
            {/* <div
              className="absolute bottom-4 left-4 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase"
              style={{ backgroundColor: "#0d365e", color: "#ffffff" }}
            >
              Dubai's Trusted Experts
            </div> */}
          </figure>

          {/* Text content */}
          <article className="flex flex-col justify-center">
            <div
              className="mb-4 w-12 h-0.5"
              style={{ backgroundColor: "#c3ad95" }}
              aria-hidden
            />
            <h2
              id="why-choose-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight"
              style={{ color: "#0d365e" }}
            >
              Why Choose Rocky Real Estate
            </h2>
            <p
              className="mt-5 text-base md:text-lg leading-relaxed"
              style={{ color: "#555555" }}
            >
              As Dubai's real estate experts, we deliver exceptional value across
              off-plan properties and luxury investment. Our commitment to
              excellence ensures you find the perfect opportunity.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,54,94,0.28)]"
                style={{
                  backgroundColor: "#0d365e",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(13, 54, 94, 0.2)",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </article>
        </div>

        {/* Divider */}
        {/* <div
          className="w-full h-px mb-14"
          style={{ backgroundColor: "#e8e0d8" }}
          aria-hidden
        /> */}

        {/* ROW 2: Benefits grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-5 rounded-2xl transition-shadow duration-300 hover:shadow-md"
              style={{
                backgroundColor: "#f9f7f5",
                border: "1px solid #ede8e2",
              }}
            >
              <span
                className="text-xs"
                style={{ color: "#c3ad95" }}
                aria-hidden
              >
                ◆
              </span>
              <h3
                className="text-sm font-semibold leading-snug"
                style={{ color: "#0d365e" }}
              >
                {benefit.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#666666" }}
              >
                {benefit.desc}
              </p>
            </div>
          ))}
        </div> */}
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;