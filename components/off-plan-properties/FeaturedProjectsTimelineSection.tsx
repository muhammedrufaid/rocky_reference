"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/utils/data";

// Register the plugin once at module level (safe to call multiple times).
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Easing tokens (GSAP uses its own curve strings)
// ─────────────────────────────────────────────────────────────────────────────
const EASE_OUT_EXPO = "power4.out";
const EASE_INOUT = "power3.inOut";

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const FeaturedProjectsTimelineSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active index is used only to manage button aria-pressed; all visual
  // transitions are handled by GSAP without touching React state.
  const [activeIndex, setActiveIndex] = useState(0);
  // Mutable ref shadow so GSAP callbacks don't capture stale state.
  const activeIndexRef = useRef(0);

  // ── Scroll-to helper ──────────────────────────────────────────────────────
  const scrollToProject = useCallback((index: number) => {
    const el = imageRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // ── Activate a project entry (visual + state) ─────────────────────────────
  /**
   * All DOM mutations here use GSAP so they stay off the React render cycle
   * and are batched by GSAP's internal ticker (rAF-aligned).
   */
  const activateProject = useCallback(
    (index: number, animate = true) => {
      if (activeIndexRef.current === index) return;
      const prev = activeIndexRef.current;
      activeIndexRef.current = index;
      setActiveIndex(index); // only triggers button aria-pressed reflow

      const duration = animate ? 0.38 : 0;

      projects.forEach((_, i) => {
        const isActive = i === index;
        const dot = dotRefs.current[i];
        const title = titleRefs.current[i];
        const desc = descRefs.current[i];

        if (!dot || !title || !desc) return;

        // ── Dot ──────────────────────────────────────────────────────────────
        gsap.to(dot, {
          width: isActive ? 10 : 7,
          height: isActive ? 10 : 7,
          opacity: isActive ? 1 : 0.25,
          backgroundColor: isActive ? "var(--color-accent, #c9a96e)" : "currentColor",
          boxShadow: isActive
            ? "0 0 0 3px rgba(201,169,110,0.18)"
            : "0 0 0 0px rgba(201,169,110,0)",
          duration,
          ease: EASE_INOUT,
          overwrite: "auto",
        });

        // ── Title ─────────────────────────────────────────────────────────────
        gsap.to(title, {
          opacity: isActive ? 1 : 0.3,
          fontSize: isActive ? "1.35rem" : "1.1rem",
          fontWeight: isActive ? 600 : 400,
          duration,
          ease: EASE_INOUT,
          overwrite: "auto",
        });

        // ── Description (clip-path + height for smooth reveal) ────────────────
        if (isActive) {
          // Reveal: set initial state, then animate in.
          gsap.set(desc, {
            display: "block",
            clipPath: "inset(0 0 100% 0)",
            y: 10,
            opacity: 0,
          });
          gsap.to(desc, {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: animate ? 0.42 : 0,
            ease: EASE_OUT_EXPO,
            overwrite: "auto",
          });
        } else if (i === prev) {
          // Only animate out the previous entry to avoid competing tweens.
          gsap.to(desc, {
            clipPath: "inset(0 0 100% 0)",
            y: -6,
            opacity: 0,
            duration: animate ? 0.28 : 0,
            ease: EASE_INOUT,
            overwrite: "auto",
            onComplete: () => {
              // Hide from flow after the tween completes.
              gsap.set(desc, { display: "none" });
            },
          });
        }
      });
    },
    [] // no deps — refs are mutable, setActiveIndex is stable
  );

  // ── Main GSAP setup ────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /**
     * gsap.context() scopes all tweens & ScrollTriggers created inside it
     * to the component root element. A single ctx.revert() in the cleanup
     * function kills every tween, trigger, and event listener — no leaks.
     */
    const ctx = gsap.context(() => {
      // ── 1. Initial state: hide elements before they animate in ─────────────
      gsap.set(headerRef.current, { opacity: 0, y: 32, willChange: "transform, opacity" });
      gsap.set(leftPanelRef.current, { opacity: 0, y: 20, willChange: "transform, opacity" });
      imageRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 40, willChange: "transform, opacity" });
      });
      // Descriptions all hidden initially.
      descRefs.current.forEach((el) => {
        if (el) gsap.set(el, { display: "none" });
      });

      // ── 2. Section entrance — header fade-up ──────────────────────────────
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: () => {
            // Remove will-change after animation to free GPU resources.
            headerTl.then(() => {
              gsap.set(headerRef.current, { willChange: "auto" });
            });
          },
        },
      });

      headerTl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE_OUT_EXPO,
      });

      // ── 3. Left panel fade-up (staggered after header) ────────────────────
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      leftTl.to(leftPanelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: EASE_OUT_EXPO,
        onComplete: () => {
          gsap.set(leftPanelRef.current, { willChange: "auto" });
          // Activate the first project without scroll animation.
          activateProject(0, false);
        },
      });

      // ── 4. Image stack — staggered fade-up as they enter the viewport ──────
      imageRefs.current.forEach((el, i) => {
        if (!el) return;

        const imgTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });

        imgTl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.72,
          delay: i * 0.07, // gentle stagger
          ease: EASE_OUT_EXPO,
          onComplete: () => {
            gsap.set(el, { willChange: "auto" });
          },
        });
      });

      // ── 5. Sticky left panel via ScrollTrigger pin ─────────────────────────
      /**
       * Instead of a manual scroll listener + translateY, we let ScrollTrigger
       * handle the pinning. `pinSpacing: false` prevents it from adding extra
       * height below the pinned element (the right column provides that space).
       */
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => {
          const rightPanel = section.querySelector<HTMLElement>(".right-panel");
          if (!rightPanel) return "bottom bottom";
          // End when the bottom of the right panel hits the bottom of the viewport.
          return `+=${rightPanel.offsetHeight - (leftPanelRef.current?.offsetHeight ?? 0)}`;
        },
        pin: leftPanelRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // ── 6. Per-image ScrollTriggers to drive the active index ──────────────
      imageRefs.current.forEach((el, index) => {
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          // "Centre band" — image is considered active when it straddles
          // the 35 %–65 % band of the viewport height.
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => activateProject(index),
          onEnterBack: () => activateProject(index),
        });
      });

      // ── 7. Subtle parallax on images (optional, compositor-only) ──────────
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const img = el.querySelector("img");
        if (!img) return;

        gsap.set(img, { willChange: "transform" });

        gsap.fromTo(
          img,
          { y: "-6%" },
          {
            y: "6%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2, // smoothly scrubbed; value is seconds of lag
              onLeave: () => gsap.set(img, { willChange: "auto" }),
            },
          }
        );
      });
    }, section); // ← scope to section element

    return () => {
      // Kills all tweens, ScrollTriggers, and event listeners created inside ctx.
      ctx.revert();
    };
  }, [activateProject]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className={className ?? "pb-16 md:pb-20 lg:pb-24 site-header-offset"}
      aria-labelledby="featured-projects-heading"
      style={{ position: "relative" }}
    >
      <Container>
        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* ── LEFT PANEL — pinned by ScrollTrigger ──────────────────────── */}
          <div style={{ position: "relative" }}>
            {/*
              leftPanelRef is the element ScrollTrigger will pin.
              position:relative so GSAP can apply `position:fixed` internally
              during the pin phase without breaking layout.
            */}
            <div
              ref={leftPanelRef}
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "",
              }}
            >
              <div style={{ width: "100%", maxWidth: "460px" }}>
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={project.id}
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        marginBottom:
                          index < projects.length - 1 ? "0.25rem" : 0,
                      }}
                    >
                      {/* Timeline rail */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          width: "20px",
                          paddingTop: "6px",
                        }}
                      >
                        {/* Dot — GSAP animates width/height/opacity/boxShadow */}
                        <div
                          ref={(el) => {
                            dotRefs.current[index] = el;
                          }}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "currentColor",
                            opacity: 0.25,
                            flexShrink: 0,
                          }}
                        />

                        {/* Connecting line */}
                        {index < projects.length - 1 && (
                          <div
                            ref={(el) => {
                              lineRefs.current[index] = el;
                            }}
                            style={{
                              flex: 1,
                              width: "1px",
                              backgroundColor: "currentColor",
                              opacity: 0.1,
                              minHeight: "48px",
                              marginTop: "6px",
                            }}
                          />
                        )}
                      </div>

                      {/* Text content */}
                      <div style={{ flex: 1, paddingBottom: "2rem" }}>
                        <button
                          onClick={() => scrollToProject(index)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            textAlign: "left",
                            width: "100%",
                          }}
                          aria-label={`Go to project: ${project.title}`}
                          aria-pressed={isActive}
                        >
                          {/*
                            fontSize / fontWeight / opacity are all driven by
                            GSAP; React only sets initial values here.
                          */}
                          <span
                            ref={(el) => {
                              titleRefs.current[index] = el;
                            }}
                            style={{
                              display: "block",
                              // fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontSize: "1.1rem",
                              fontWeight: 400,
                              letterSpacing: "-0.01em",
                              opacity: 0.3,
                              color: "inherit",
                              lineHeight: 1.2,
                            }}
                          >
                            {project.title}
                          </span>
                        </button>

                        {/*
                          Description wrapper — GSAP uses clip-path + opacity + y
                          to animate reveal. `display:none` set by GSAP initially.
                        */}
                        <div
                          ref={(el) => {
                            descRefs.current[index] = el;
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <p
                            style={{
                              
                              fontSize: "0.875rem",
                              lineHeight: 1.75,
                              opacity: 0.65,
                              marginTop: "0.75rem",
                              maxWidth: "34ch",
                            }}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — normal scroll, stacked images ─────────────── */}
          <div
            className="right-panel"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {projects.map((project, index) => (
  <div
    key={project.id}
    ref={(el) => {
      imageRefs.current[index] = el;
    }}
    className="relative h-[62vh] overflow-hidden rounded-2xl flex-shrink-0"
  >
    <Image
      src={project.imageUrl}
      alt={project.imageAlt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      priority={index === 0}
    />

    {/* Gradient overlay */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_45%,transparent_70%)]"
    />

    {/* Caption */}
    <p className="absolute bottom-5 left-6 right-6 m-0 text-[0.68rem] uppercase tracking-[0.12em] text-white/70">
      {project.caption}
    </p>
  </div>
))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjectsTimelineSection;