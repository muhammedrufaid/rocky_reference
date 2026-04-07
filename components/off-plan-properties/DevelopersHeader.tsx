"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "../layout/Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DevelopersHeaderProps {
  title?: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  image?: string;
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const DEFAULT_BREADCRUMB: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Developers" },
];

const DEFAULT_DESCRIPTION =
  "Discover trusted developers, premium communities, and off‑plan opportunities—curated for modern Dubai living.";

// Fallback gradient when no image is supplied
const FALLBACK_BG =
  "linear-gradient(135deg, #0a0a0a 0%, #111010 50%, #1a1510 100%)";

const DevelopersHeader: React.FC<DevelopersHeaderProps> = ({
  title = "Developers in Dubai",
  description = DEFAULT_DESCRIPTION,
  breadcrumb = DEFAULT_BREADCRUMB,
  image,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className={className ?? "pt-8 md:pt-12 lg:pt-16"}
      aria-labelledby="valuation-heading"
    >
      <Container>
        <motion.article
          className="relative min-h-[320px] overflow-hidden rounded-2xl"
          style={{ boxShadow: "0 8px 40px rgba(11, 12, 12, 0.12)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {/* Background */}
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: FALLBACK_BG }}
              aria-hidden
            />
          )}

          {/* Dark overlay — covers entire background */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(13, 54, 94, 0.88) 0%, rgba(13, 54, 94, 0.65) 50%, rgba(13, 54, 94, 0.35) 100%)",
            }}
            aria-hidden
          />

          {/* Text content — sits above image and overlay */}
          <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14 lg:w-1/2 lg:px-14 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-white/80">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {breadcrumb.map((item, idx) => {
                  const isLast = idx === breadcrumb.length - 1;
                  return (
                    <li key={`${item.label}-${idx}`} className="flex items-center">
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="transition hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className={isLast ? "text-white" : undefined}
                          aria-current={isLast ? "page" : undefined}
                        >
                          {item.label}
                        </span>
                      )}
                      {!isLast ? <span className="mx-2 text-white/50">/</span> : null}
                    </li>
                  );
                })}
              </ol>
            </nav>

            <motion.h2
              id="valuation-heading"
              className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem]"
              style={{ color: "#ffffff" }}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.1}
            >
              {title}
            </motion.h2>

            <motion.p
              className="mt-4 max-w-lg text-base leading-relaxed text-white/85 md:text-lg"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.18}
            >
              {description}
            </motion.p>
          </div>
        </motion.article>
      </Container>
    </section>
  );
};

export default DevelopersHeader;