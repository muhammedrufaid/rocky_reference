"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { featuredOffPlanProjects } from "@/utils/data";

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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

const FeaturedOffPlanProjects: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-labelledby="off-plan-section-heading"
    >
      <Container>
        <header className="text-center mb-12 md:mb-16">
          <h2
            id="off-plan-section-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium"
            style={{ color: "#0d365e" }}
          >
            Featured Off Plan Projects in Dubai
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#333333" }}>
            Explore our handpicked <strong>Off Plan Properties in Dubai</strong> offering exceptional value. Discover premium <strong>Dubai Off Plan Projects</strong> and <strong>Luxury Apartments in Dubai</strong> from leading developers.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredOffPlanProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(13,54,94,0.12)]"
            >
              <Link href={project.path} className="block">
                <figure className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </figure>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3
                    className="text-lg md:text-xl font-semibold"
                    style={{ color: "#0d365e" }}
                  >
                    {project.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: "#333333" }}>
                    <span className="flex-shrink-0" style={{ color: "#c3ad95" }}>
                      <LocationIcon />
                    </span>
                    <span>{project.location}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium" style={{ color: "#0d365e" }}>
                    Starting From: {project.priceFrom}
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#333333" }}>
                    Developer: {project.developer}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center justify-center w-full py-3 px-4 text-sm font-semibold rounded-lg transition-colors bg-[#0d365e] text-white group-hover:bg-[#1c4e80]"
                  >
                    View Project
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedOffPlanProjects;
