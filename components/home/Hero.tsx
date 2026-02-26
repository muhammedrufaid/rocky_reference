"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import HeroSearchCard from "./HeroSearchCard";

interface HeroProps {
  videoSrc?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Hero: React.FC<HeroProps> = ({
  videoSrc = "https://www.pexels.com/download/video/29575342/",
}) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);

  return (
    <main className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
      {/* Video background - gradient fallback when video not loaded */}
      <div className="absolute inset-0 z-0">
        {/* Gradient fallback - shows when video hasn't loaded or failed */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to right, rgba(13, 54, 94, 0.98) 0%, rgba(13, 54, 94, 0.85) 50%, rgba(13, 54, 94, 0.6) 100%)",
          }}
          aria-hidden
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, rgba(13, 54, 94, 0.88) 0%, rgba(13, 54, 94, 0.65) 50%, rgba(13, 54, 94, 0.35) 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <section
        className="relative z-10 flex min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex-col justify-center pt-16 md:pt-20 pb-12 md:pb-16"
        aria-labelledby="hero-title"
      >
        <Container>
          <header className="text-center md:text-left max-w-2xl mb-6 md:mb-8">
            <motion.h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight tracking-tight"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Find Your Dream Home in Dubai
            </motion.h1>
            <motion.p
              className="mt-3 md:mt-4 text-base md:text-lg text-white/90 max-w-xl"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Luxury villas, penthouses, apartments, and more. Explore properties you can buy or invest in across Dubai.
            </motion.p>
          </header>

          <HeroSearchCard />
        </Container>
      </section>
    </main>
  );
};

export default Hero;