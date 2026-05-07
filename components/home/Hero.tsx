"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import HeroSearchCard from "./HeroSearchCard";
import HeroSearchCardV2 from "./HeroSearchCardV2";

interface HeroProps {
  videoSrc?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const Hero: React.FC<HeroProps> = ({
  // videoSrc = "https://www.pexels.com/download/video/29575342/",
  videoSrc = "https://www.pexels.com/download/video/8359173/",
  // videoSrc = "https://videos.pexels.com/video-files/31617692/13470975_1920_1080_24fps.mp4",
  // videoSrc = "https://cdn.sanity.io/files/74l1zcgb/production/572466e7a90003b155357bb6708775bd0b9a95f8.mp4",
}) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]"
      aria-labelledby="hero-title"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient fallback — shown while video loads or on error */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            videoLoaded && !videoError ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(13, 54, 94, 0.72) 0%, rgba(20, 40, 60, 0.55) 100%)",
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

        {/*
          Subtle dual-tone overlay:
          - Left side: a very light dark wash so white text stays readable
          - Right side: almost fully transparent so the cityscape breathes
          - A thin bottom vignette grounds the search bar area
          No dominant blue cast — just enough contrast for legibility.
        */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(8, 18, 28, 0.52) 0%,
                rgba(8, 18, 28, 0.28) 55%,
                rgba(8, 18, 28, 0.08) 100%
              )
            `,
          }}
          aria-hidden
        />

        {/* Bottom vignette — anchors the UI without affecting the skyline */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2] h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(8, 18, 28, 0.38) 0%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex-col justify-center pt-16 md:pt-20 pb-12 md:pb-16"
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
              Find Your Dream Home <br /> in Dubai
            </motion.h1>
            <motion.p
              className="mt-3 md:mt-4 text-base md:text-lg text-white/85 max-w-xl"
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Luxury villas, penthouses, apartments, and more. Explore
              properties you can buy or invest in across Dubai.
            </motion.p>
          </header>

          {/* <HeroSearchCard /> */}
          <HeroSearchCardV2 />
        </Container>
      </div>
    </section>
  );
};

export default Hero;