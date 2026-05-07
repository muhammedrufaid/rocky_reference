"use client";

import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc }) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {/* Gradient fallback — shown while video loads or on error */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${videoLoaded && !videoError ? "opacity-0" : "opacity-100"
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
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoLoaded && !videoError ? "opacity-100" : "opacity-0"
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
  );
};

export default VideoBackground;
