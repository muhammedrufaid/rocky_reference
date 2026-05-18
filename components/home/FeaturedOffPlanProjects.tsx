"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { ArrowRightIcon, CallIcon, DirhamIcon, LocationIcon, WhatsAppIcon } from "@/utils/icons";

interface FeaturedOffPlanProjectsProps {
  data: any;
  backgroundColor?: string;
}

const FeaturedOffPlanProjects: React.FC<FeaturedOffPlanProjectsProps> = ({ data, backgroundColor = "#ffffff" }) => {
  const projects = (data?.properties || []).slice(0, 4);

  return (
    <section
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="off-plan-section-heading"
      style={{ backgroundColor: backgroundColor }}
    >
      <Container>
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <motion.h2
              id="off-plan-section-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-tight"
              style={{ color: "#0D365E" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Featured Off Plan Properties
            </motion.h2>
            <motion.p
              className="mt-3 text-base text-[#555] md:text-lg max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              Explore and invest in top off-plan projects located in prime areas in Dubai.
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
              href="/off-plan-properties/in-dubai"
              className="inline-flex items-center gap-2 text-sm font-medium pb-0.5 transition-colors text-[var(--rocky-blue)] hover:opacity-80"
            >
              View All Projects <ArrowRightIcon width="14" height="14" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </header>

        {/* Grid — 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-visible">
          {projects.map((project: any, index: number) => (
            <motion.article
              key={project.propertyRefNo}
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
              <div className="flex flex-col flex-1">
                <Link href={`/off-plan-properties/in-dubai/${project.propertyRefNo}`} className="flex flex-col flex-1">
                  {/* Image — aspect-[4/3] suits 4-col layout */}
                  <figure className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images?.[0] ?? "https://placehold.co/400x300/f0ede8/0d365e?text=Property"}
                      alt={project.propertyTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={55}
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
                    {/* <span
                      className="absolute top-3 left-3 text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#0d365e" }}
                    >
                      {project.towerName || project.propertyRefNo}
                      Emaar
                    </span> */}
                  </figure>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3
                      className="text-base font-medium leading-snug line-clamp-2"
                      style={{ color: "#0d365e" }}
                    >
                      {project.towerName || project.subLocality}
                    </h3>

                    <div
                      className="mt-1.5 flex items-center gap-1.5 text-xs"
                      style={{ color: "#888" }}
                    >
                      <span style={{ color: "#c3ad95" }}>
                        <LocationIcon width="14" height="14" />
                      </span>
                      <span className="line-clamp-1">{project.locality}</span>
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
                      {project.price ? (
                        <span className="inline-flex items-center gap-1">
                          <DirhamIcon className="w-4 h-4 shrink-0" />
                          <span>{Number(project.price).toLocaleString()}</span>
                        </span>
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>
                </Link>

                {/* CTA — Call & WhatsApp (outside Link to avoid nested <a>) */}
                <div className="px-4 pb-4 pt-0 flex gap-2">
                  <a
                    href="tel:+971564120637"
                    aria-label={`Call about ${project.towerName || project.propertyTitle || "this property"}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium rounded-lg transition-colors duration-200 border hover:bg-[#0d365e] hover:text-white!"
                    style={{
                      borderColor: "#0d365e",
                      color: "#0d365e",
                    }}
                  >
                    <CallIcon width="14" height="14" /> Call
                  </a>
                  <a
                    href={`https://wa.me/971564120637?text=${encodeURIComponent(`Hi! I'm interested in ${project.towerName || project.propertyTitle}. I'm exploring Off Plan opportunities and investment options for upcoming projects. Could you share more details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium rounded-lg transition-colors duration-200 border hover:bg-[#0d365e] hover:text-white!"
                    style={{
                      borderColor: "#0d365e",
                      color: "#0d365e",
                    }}
                    aria-label={`WhatsApp about ${project.propertyTitle}`}
                  >
                    <WhatsAppIcon width="14" height="14" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedOffPlanProjects;