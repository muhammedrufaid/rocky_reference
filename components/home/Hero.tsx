"use client";

import React from "react";
import Container from "../layout/Container";
import HeroSearchCard from "./HeroSearchCard";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[75vh] flex flex-col justify-end pb-8 md:pb-12 lg:pb-16">
      {/* Background image with soft gradient overlay - white-dominant, premium feel */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: ` url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920')`,
          // backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.92) 100%), url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920')`,
        }}
      />
      <div className="absolute inset-0 bg-white/20" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Container className="flex flex-col items-center text-center mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--charcoal)] max-w-3xl mb-4">
            Find Your Perfect Property in Dubai
          </h1>
          <p className="text-base md:text-lg text-[var(--charcoal)]/80 max-w-xl">
            Explore premium residential and commercial properties. Five decades of real estate excellence across the UAE.
          </p>
        </Container>

        {/* Floating search card */}
        <Container className="flex justify-center -mb-12 md:-mb-16 lg:-mb-20">
          <HeroSearchCard />
        </Container>
      </div>
    </section>
  );
};

export default Hero;
