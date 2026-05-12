"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { testimonials } from "@/utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BlockQuoteIcon } from "@/utils/icons";
import "swiper/css";
import "swiper/css/navigation";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
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
        aria-hidden="true"
        focusable="false"
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


const TestimonialSection: React.FC<{ backgroundColor?: string, className?: string }> = ({ backgroundColor = "#faf9f7", className = "py-16 md:py-20 lg:py-24" }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <section
      className={`overflow-x-hidden ${className}`}
      style={{ backgroundColor }}
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16 gap-4">
          <header className="text-left">
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
          {/* Swiper navigation buttons */}
          <div className="flex gap-2 justify-end md:justify-start">
            <button
              ref={prevRef}
              className="swiper-nav-btn rounded-full border border-[var(--charcoal)]/20 bg-white/80 p-2 shadow hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              ref={nextRef}
              className="swiper-nav-btn rounded-full border border-[var(--charcoal)]/20 bg-white/80 p-2 shadow hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        {/* Swiper for testimonials */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            768: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
          className="overflow-hidden!"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.article
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col border border-[var(--charcoal)]/10 transition-all duration-300 hover:border-[var(--rocky-blue)]/50 hover:shadow-md"
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
                  <BlockQuoteIcon />
                </div>

                {/* 5-star rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Testimonial quote – comfortable line spacing */}
                <blockquote className="text-[var(--charcoal)] line-clamp-4 text-[15px] md:text-base leading-relaxed tracking-tight pr-8 min-h-0 flex-1 overflow-hidden">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author – stronger font weight */}
                <footer className="mt-6 pt-4 border-t border-[var(--charcoal)]/10">
                  <cite className="not-italic text-[var(--charcoal)] font-medium text-[15px]">
                    {testimonial.author}
                  </cite>
                </footer>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TestimonialSection;
