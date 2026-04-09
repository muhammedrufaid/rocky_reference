"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/utils/data";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT_EXPO = "power4.out";
const EASE_INOUT = "power3.inOut";

const FeaturedProjectsTimelineSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  // FIX: track the pinST instance so we can refresh it after desc expansion
  const pinSTRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const scrollToProject = useCallback((index: number) => {
    const el = imageRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const activateProject = useCallback(
    (index: number, animate = true) => {
      if (activeIndexRef.current === index) return;
      const prev = activeIndexRef.current;
      activeIndexRef.current = index;
      setActiveIndex(index);

      const duration = animate ? 0.38 : 0;

      projects.forEach((_, i) => {
        const isActive = i === index;
        const dot = dotRefs.current[i];
        const title = titleRefs.current[i];
        const desc = descRefs.current[i];

        if (!dot || !title || !desc) return;

        gsap.to(dot, {
          width: isActive ? 10 : 7,
          height: isActive ? 10 : 7,
          opacity: isActive ? 1 : 0.25,
          backgroundColor: isActive
            ? "var(--color-accent, #c9a96e)"
            : "currentColor",
          boxShadow: isActive
            ? "0 0 0 3px rgba(201,169,110,0.18)"
            : "0 0 0 0px rgba(201,169,110,0)",
          duration,
          ease: EASE_INOUT,
          overwrite: "auto",
        });

        gsap.to(title, {
          opacity: isActive ? 1 : 0.3,
          fontSize: isActive ? "1.35rem" : "1.1rem",
          fontWeight: isActive ? 600 : 400,
          duration,
          ease: EASE_INOUT,
          overwrite: "auto",
        });

        if (isActive) {
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
            // FIX: after desc expands, refresh the pin so its end boundary
            // accounts for the new left-panel height.
            onComplete: () => {
              pinSTRef.current?.refresh();
              ScrollTrigger.refresh();
            },
          });
        } else if (i === prev) {
          gsap.to(desc, {
            clipPath: "inset(0 0 100% 0)",
            y: -6,
            opacity: 0,
            duration: animate ? 0.28 : 0,
            ease: EASE_INOUT,
            overwrite: "auto",
            onComplete: () => {
              gsap.set(desc, { display: "none" });
              // FIX: refresh again after collapse so pin end is recalculated.
              pinSTRef.current?.refresh();
              ScrollTrigger.refresh();
            },
          });
        }
      });
    },
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, {
        opacity: 0,
        y: 32,
        willChange: "transform, opacity",
      });
      gsap.set(leftPanelRef.current, {
        opacity: 0,
        y: 20,
        willChange: "transform, opacity",
      });
      imageRefs.current.forEach((el) => {
        if (el)
          gsap.set(el, { opacity: 0, y: 40, willChange: "transform, opacity" });
      });
      descRefs.current.forEach((el) => {
        if (el) gsap.set(el, { display: "none" });
      });

      // Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
          onEnter: () => {
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

      // Left panel entrance
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
          activateProject(0, false);
        },
      });

      // Image stagger entrance
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
          delay: i * 0.07,
          ease: EASE_OUT_EXPO,
          onComplete: () => {
            gsap.set(el, { willChange: "auto" });
          },
        });
      });

      // FIX: Sticky left panel pin.
      // The end is calculated as: right panel total height minus left panel
      // height, so both columns finish scrolling at exactly the same moment.
      // `invalidateOnRefresh: true` ensures this is recalculated whenever
      // ScrollTrigger.refresh() is called (e.g. after desc expand/collapse).
      const pinST = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => {
          const rightPanel =
            section.querySelector<HTMLElement>(".right-panel");
          const leftPanel = leftPanelRef.current;
          if (!rightPanel || !leftPanel) return "bottom bottom";

          // Total scrollable distance = right panel height - left panel height.
          // Add a small buffer (32px) so the last description is never clipped.
          const scrollDistance =
            rightPanel.offsetHeight - leftPanel.offsetHeight + 32;
          return `+=${Math.max(scrollDistance, 0)}`;
        },
        pin: leftPanelRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Store ref so activateProject callbacks can call refresh on it.
      pinSTRef.current = pinST;

      // Per-image ScrollTriggers driving the active index.
      // FIX: Tighten the active band to 40%–60% so the last item activates
      // before its image card bottom hits the viewport bottom.
      imageRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => activateProject(index),
          onEnterBack: () => activateProject(index),
        });
      });

      // Subtle image parallax (compositor-only, y transform)
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
              scrub: 1.2,
              onLeave: () => gsap.set(img, { willChange: "auto" }),
            },
          }
        );
      });
    }, section);

    return () => {
      pinSTRef.current = null;
      ctx.revert();
    };
  }, [activateProject]);

  return (
    // FIX: `overflow: hidden` on the section prevents any child from bleeding
    // outside the section boundary regardless of pin timing edge cases.
    <section
      ref={sectionRef}
      className={`${className ?? "py-16 md:py-20 lg:py-24"} relative overflow-hidden`}
      aria-labelledby="featured-projects-heading"
    >
      <Container>
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* LEFT PANEL — pinned by ScrollTrigger */}
          <div className="relative">
            <div
              ref={leftPanelRef}
              className="relative top-0 left-0 w-full flex"
            >
              <div className="w-full max-w-[460px]">
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;
                  const isLast = index === projects.length - 1;

                  return (
                    <div
                      key={project.id}
                      className={`flex gap-5 ${isLast ? "mb-0" : "mb-1"}`}
                    >
                      {/* Timeline rail */}
                      <div
                        className="flex flex-col items-center shrink-0 w-[20px] pt-[6px]"
                      >
                        <div
                          ref={(el) => {
                            dotRefs.current[index] = el;
                          }}
                          className="w-[7px] h-[7px] rounded-full bg-current opacity-25 shrink-0"
                        />

                        {!isLast && (
                          <div
                            ref={(el) => {
                              lineRefs.current[index] = el;
                            }}
                            className="flex-1 w-px bg-current opacity-10 min-h-[48px] mt-[6px]"
                          />
                        )}
                      </div>

                      {/* Text content */}
                      <div
                        className={`flex-1 ${isLast ? "pb-16" : "pb-8"}`}
                      >
                        <button
                          onClick={() => scrollToProject(index)}
                          className="bg-transparent border-0 p-0 cursor-pointer text-left w-full"
                          aria-label={`Go to project: ${project.title}`}
                          aria-pressed={isActive}
                        >
                          <span
                            ref={(el) => {
                              titleRefs.current[index] = el;
                            }}
                            className="block text-[1.1rem] font-normal tracking-[-0.01em] opacity-30 text-inherit leading-[1.2]"
                          >
                            {project.title}
                          </span>
                        </button>

                        <div
                          ref={(el) => {
                            descRefs.current[index] = el;
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-sm leading-[1.75] opacity-65 mt-3 max-w-[60ch]"
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

          {/* RIGHT PANEL — normal scroll, stacked images */}
          <div className="right-panel flex flex-col gap-8" >
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

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.18)_45%,transparent_70%)]"
                />

                {/* <p className="absolute bottom-5 left-6 right-6 m-0 text-[0.68rem] uppercase tracking-[0.12em] text-white/70">
                  {project.caption}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjectsTimelineSection;