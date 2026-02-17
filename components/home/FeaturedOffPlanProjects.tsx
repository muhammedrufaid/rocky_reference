"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { featuredOffPlanProjects } from "@/utils/data";

const FeaturedOffPlanProjects: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-[#f8f6f3]"
      aria-labelledby="featured-off-plan-heading"
    >
      <Container>
        <header className="text-center md:text-left mb-10 md:mb-12">
          <motion.h2
            id="featured-off-plan-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-[var(--charcoal)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Featured Off-Plan Projects
          </motion.h2>
          <motion.p
            className="mt-2 text-base md:text-lg text-[var(--charcoal)]/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            Discover premium off-plan developments from Dubai&apos;s leading developers.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredOffPlanProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <Link
                href={project.path}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e7dccd]/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium text-white bg-[var(--rocky-blue)]/90 rounded-md backdrop-blur-sm">
                    Off-Plan
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-sm font-medium text-[var(--rocky-blue)]">
                    {project.developer}
                  </p>
                  <h3 className="mt-1 text-lg md:text-xl font-medium text-[var(--charcoal)] group-hover:text-[var(--rocky-blue)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--charcoal)]/70">
                    {project.location}
                    {project.completionYear && (
                      <span className="ml-1">• Ready {project.completionYear}</span>
                    )}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base font-semibold text-[var(--charcoal)]">
                      From {project.priceFrom}
                    </span>
                    <span className="text-sm font-medium text-[var(--rocky-blue)] group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-10 md:mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Link
            href="/off-plan"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[var(--rocky-blue)] hover:bg-[#1c4e80] rounded-lg transition-colors"
          >
            View All Off-Plan Projects
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedOffPlanProjects;