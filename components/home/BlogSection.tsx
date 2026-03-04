"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import { blogPosts } from "@/utils/data";

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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const BlogSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-white"
      aria-labelledby="blog-section-heading"
    >
      <Container>
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <motion.h2
              id="blog-section-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-[var(--rocky-blue)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              From Our Blog
            </motion.h2>
            <motion.p
              className="mt-3 text-base md:text-lg text-[var(--charcoal)]/70 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              Expert perspectives on luxury living, design trends, and market insights for discerning homeowners.
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
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium pb-0.5 transition-colors text-[var(--rocky-blue)] hover:opacity-80"
            >
              View All Blogs <ArrowIcon />
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
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
                href={post.path}
                className="group block"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative h-[240px] md:h-[260px] overflow-hidden rounded-[12px] bg-[var(--soft-sand)]/30">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium uppercase tracking-widest text-[#717171]"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {post.category}
                    </p>

                    <h3 className="mt-2 text-base font-medium transition-colors line-clamp-2">
                      {post.description}
                    </h3>
                    {/* <p className="mt-3 text-[15px] leading-relaxed text-[var(--charcoal)] line-clamp-2">

                      </p> */}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
