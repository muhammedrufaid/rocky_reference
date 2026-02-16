"use client";

import React from "react";
import Container from "../layout/Container";
import HeroSearchCard from "./HeroSearchCard";

const Hero = () => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-end pb-10 md:pb-14 lg:pb-20">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.pexels.com/download/video/34805552/"
          type="video/mp4"
        />
      </video>
      
      {/* Sophisticated gradient overlay - deep navy to transparent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0d365e]/50 to-[#0d365e]/80"
        aria-hidden="true"
      />
      
      {/* Subtle vignette effect */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <Container className="flex flex-col items-center text-center mb-10 md:mb-12 lg:mb-16 px-4">
          {/* Eyebrow text */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide">
              Trusted Since 1975
            </span>
          </div>

          {/* Main heading with refined typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white max-w-4xl mb-5 md:mb-6 leading-tight tracking-tight">
            Find Your Perfect Property
            <span className="block mt-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              in Dubai
            </span>
          </h1>
          
          {/* Subheading with better contrast */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed font-light">
            Explore premium residential and commercial properties. Five decades of real estate excellence across the UAE.
          </p>
        </Container>

        {/* Floating search card with enhanced shadow */}
        <Container className="flex justify-center -mb-16 md:-mb-20 lg:-mb-24 px-4">
          <HeroSearchCard />
        </Container>
      </div>
    </section>
  );
};

export default Hero;