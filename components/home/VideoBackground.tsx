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
        className={`absolute inset-0 transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 18, 28, 0.65) 0%, rgba(8, 18, 28, 0.45) 100%)",
        }}
        aria-hidden
      />

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Left-anchored text overlay — keeps headline readable */}
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

      {/* Bottom vignette — anchors the search bar area */}
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