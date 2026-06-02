"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { blogPosts } from "@/utils/data";
import { ArrowRightIcon } from "@/utils/icons";

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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-[#0D365E]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              From Our Blog
            </motion.h2>
            <motion.p
              className="mt-3 max-w-2xl text-base text-[#555] md:text-lg"
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
              className="inline-flex items-center gap-2 pb-0.5 text-sm font-medium text-rocky-blue transition-colors hover:opacity-80"
            >
              View All Blogs <ArrowRightIcon width="14" height="14" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
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
              <BlogPostCard post={post} variant="home" />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
