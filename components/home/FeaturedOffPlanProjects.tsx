"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { featuredOffPlanProjects } from "@/utils/data";

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const FeaturedOffPlanProjects: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="off-plan-section-heading"
    >
      <Container>
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <motion.h2
              id="off-plan-section-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight"
              style={{ color: "#0d365e" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Featured Off Plan Projects
            </motion.h2>
            <motion.p
              className="mt-3 text-sm md:text-base max-w-lg"
              style={{ color: "#555" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              Explore top off-plan properties in Dubai with prime locations and exceptional value.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="self-start sm:self-auto"
          >
            <Link
              href="/off-plan"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold border-b-2 pb-0.5 transition-colors"
              style={{ color: "#0d365e", borderColor: "#c3ad95" }}
            >
              View All Projects <ArrowIcon />
            </Link>
          </motion.div>
        </header>

        {/* Grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-visible">
          {featuredOffPlanProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group relative z-0 flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:z-10"
              style={{
                boxShadow: "0 2px 12px rgba(13,54,94,0.07)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <Link href={project.path} className="flex flex-col flex-1">
                {/* Image — aspect-[4/3] suits 4-col layout */}
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Subtle gradient overlay for readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,54,94,0.35) 0%, transparent 55%)",
                    }}
                  />
                  {/* Developer badge over image */}
                  <span
                    className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#0d365e" }}
                  >
                    {project.developer}
                  </span>
                </figure>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="text-base font-semibold leading-snug line-clamp-2"
                    style={{ color: "#0d365e" }}
                  >
                    {project.title}
                  </h3>

                  <div
                    className="mt-1.5 flex items-center gap-1.5 text-xs"
                    style={{ color: "#888" }}
                  >
                    <span style={{ color: "#c3ad95" }}>
                      <LocationIcon />
                    </span>
                    <span className="line-clamp-1">{project.location}</span>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-3"
                    style={{ borderTop: "1px solid #F0EDE8" }}
                  />

                  <p className="text-xs" style={{ color: "#888" }}>
                    Starting From
                  </p>
                  <p
                    className="text-sm font-bold mt-0.5"
                    style={{ color: "#0d365e" }}
                  >
                    {project.priceFrom}
                  </p>

                  {/* CTA */}
                  <span
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: "#0d365e",
                      color: "#fff",
                    }}
                  >
                    View Project <ArrowIcon />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedOffPlanProjects;