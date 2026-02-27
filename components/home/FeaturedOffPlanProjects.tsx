"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface FeaturedOffPlanProjectsProps {
  data: any;
}

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

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FeaturedOffPlanProjects: React.FC<FeaturedOffPlanProjectsProps> = ({ data }) => {
  const projects = (data?.properties || []).slice(0, 4);

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
              href="/off-plan"
              className="inline-flex items-center gap-2 text-sm font-semibold pb-0.5 transition-colors text-[var(--rocky-blue)] hover:opacity-80"
            >
              View All Projects <ArrowIcon />
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
                <Link href={`/properties/${project.propertyRefNo}`} className="flex flex-col flex-1">
                  {/* Image — aspect-[4/3] suits 4-col layout */}
                  <figure className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images?.[0] ?? "https://placehold.co/400x300/f0ede8/0d365e?text=Property"}
                      alt={project.propertyTitle}
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
                      {/* {project.towerName || project.propertyRefNo} */}
                      Emaar
                    </span>
                  </figure>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3
                      className="text-base font-semibold leading-snug line-clamp-2"
                      style={{ color: "#0d365e" }}
                    >
                      {project.towerName || project.propertyRefNo}
                    </h3>

                    <div
                      className="mt-1.5 flex items-center gap-1.5 text-xs"
                      style={{ color: "#888" }}
                    >
                      <span style={{ color: "#c3ad95" }}>
                        <LocationIcon />
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
                      {project.price
                        ? `AED ${Number(project.price).toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                </Link>

                {/* CTA — Call & WhatsApp (outside Link to avoid nested <a>) */}
                <div className="px-4 pb-4 pt-0 flex gap-2">
                  <a
                    href="tel:+971564120637"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg transition-colors duration-200 border hover:bg-[#0d365e] hover:text-white!"
                    style={{
                      borderColor: "#0d365e",
                      color: "#0d365e",
                    }}
                  >
                    <PhoneIcon /> Call
                  </a>
                  <a
                    href={`https://wa.me/971564120637?text=${encodeURIComponent(`Hi! I'm interested in ${project.towerName || project.propertyTitle}. I'm exploring Off Plan opportunities and investment options for upcoming projects. Could you share more details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg transition-colors duration-200 border hover:bg-[#0d365e] hover:text-white!"
                    style={{
                      borderColor: "#0d365e",
                      color: "#0d365e",
                    }}
                    aria-label={`WhatsApp about ${project.propertyTitle}`}
                  >
                    <WhatsAppIcon /> WhatsApp
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