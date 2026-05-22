"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface VideoBackgroundProps {
  videoSrc: string;
}

const MAX_PLAY_RETRIES = 4;
const MAX_LOAD_RETRIES = 2;
const PLAY_RETRY_DELAY_MS = 350;

function getVideoMimeType(src: string): string {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".ogg") || src.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playRetryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playAttemptsRef = useRef(0);
  const loadAttemptsRef = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const clearPlayRetry = useCallback(() => {
    if (playRetryTimeoutRef.current) {
      clearTimeout(playRetryTimeoutRef.current);
      playRetryTimeoutRef.current = null;
    }
  }, []);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || loadFailed) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    try {
      await video.play();
      playAttemptsRef.current = 0;
      setIsPlaying(true);
    } catch {
      playAttemptsRef.current += 1;
      if (playAttemptsRef.current >= MAX_PLAY_RETRIES) {
        setLoadFailed(true);
        return;
      }
      clearPlayRetry();
      playRetryTimeoutRef.current = setTimeout(() => {
        void attemptPlay();
      }, PLAY_RETRY_DELAY_MS);
    }
  }, [loadFailed, clearPlayRetry]);

  const handleReady = useCallback(() => {
    void attemptPlay();
  }, [attemptPlay]);

  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
    playAttemptsRef.current = 0;
    clearPlayRetry();
  }, [clearPlayRetry]);

  const handleError = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      setLoadFailed(true);
      return;
    }

    if (loadAttemptsRef.current < MAX_LOAD_RETRIES) {
      loadAttemptsRef.current += 1;
      setIsPlaying(false);
      video.load();
      return;
    }

    setLoadFailed(true);
    setIsPlaying(false);
  }, []);

  // Client-only mount — avoids hydration timing mismatches with media APIs
  useEffect(() => {
    setMounted(true);
    return () => clearPlayRetry();
  }, [clearPlayRetry]);

  // Reset and (re)initialize when src changes or after mount
  useEffect(() => {
    if (!mounted) return;

    playAttemptsRef.current = 0;
    loadAttemptsRef.current = 0;
    setIsPlaying(false);
    setLoadFailed(false);
    clearPlayRetry();

    const video = videoRef.current;
    if (!video) return;

    video.load();

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      void attemptPlay();
    }
  }, [mounted, videoSrc, attemptPlay, clearPlayRetry]);

  // Resume if autoplay was blocked while tab was hidden
  useEffect(() => {
    if (!mounted) return;

    const onVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        !loadFailed &&
        !isPlaying
      ) {
        void attemptPlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [mounted, loadFailed, isPlaying, attemptPlay]);

  const showVideo = mounted && isPlaying && !loadFailed;
  const showLoadingFallback = !mounted || (!isPlaying && !loadFailed);
  const showErrorFallback = loadFailed;

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {/* Gradient — loading state or permanent fallback on error */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showErrorFallback || showLoadingFallback ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 18, 28, 0.65) 0%, rgba(8, 18, 28, 0.45) 100%)",
        }}
        aria-hidden
      />

      {mounted && (
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleReady}
          onCanPlay={handleReady}
          onPlaying={handlePlaying}
          onError={handleError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <source src={videoSrc} type={getVideoMimeType(videoSrc)} />
        </video>
      )}

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
