"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { testimonials } from "@/utils/data";

const QuoteIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[var(--charcoal)]/15 flex-shrink-0"
  >
    <path
      d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"
      fill="currentColor"
    />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "currentColor" : "none"}
        stroke={i < rating ? "currentColor" : "currentColor"}
        strokeWidth={i < rating ? 0 : 1.5}
        className="text-[var(--rocky-blue)]/60"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ))}
  </div>
);

const TestimonialSection: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-[#e7dccd]"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <header className="text-left mb-12 md:mb-16">
          <motion.h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--charcoal)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="mt-3 text-base md:text-lg text-[var(--charcoal)]/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            Trusted by homeowners and investors across Dubai.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/60"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {/* Quote icon – top-right corner */}
              <div className="absolute top-5 right-5 md:top-6 md:right-6">
                <QuoteIcon />
              </div>

              {/* 5-star rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Testimonial quote – comfortable line spacing */}
              <blockquote className="text-[var(--charcoal)] text-[15px] md:text-base leading-relaxed tracking-tight pr-8 min-h-[4.5rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author – stronger font weight */}
              <footer className="mt-6 pt-4 border-t border-[var(--charcoal)]/10">
                <cite className="not-italic text-[var(--charcoal)] font-semibold text-[15px]">
                  {testimonial.author}
                </cite>
              </footer>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
