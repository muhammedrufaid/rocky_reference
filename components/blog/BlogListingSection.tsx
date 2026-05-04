"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { blogPosts } from "@/utils/data";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export default function BlogListingSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogPosts.map((p) => p.category))).sort((a, b) =>
      a.localeCompare(b),
    );
    return ["All", ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    const q = normalize(query);
    return blogPosts.filter((post) => {
      const categoryOk = activeCategory === "All" || post.category === activeCategory;
      if (!categoryOk) return false;

      if (!q) return true;
      const haystack = normalize([post.title, post.description, post.category].join(" "));
      return haystack.includes(q);
    });
  }, [activeCategory, query]);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <Container>
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              {/* <p className="text-sm text-charcoal/60">
                {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
              </p> */}
              <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-rocky-blue md:text-3xl">
                Latest insights
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] md:text-base text-charcoal/70">
                Market perspectives, design ideas, and practical guidance for buying, selling, and
                living well.
              </p>
            </div>

            <div className="w-full md:w-[360px]">
              <label className="sr-only" htmlFor="blog-search">
                Search blog posts
              </label>
              <div className="relative">
                <input
                  id="blog-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/45 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] outline-none transition focus:border-black/20 focus:ring-4 focus:ring-black/5"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-charcoal/70 hover:bg-black/5"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* <div className="-mx-1 flex gap-2 overflow-x-auto py-1">
            {categories.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={[
                    "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                    active
                      ? "bg-(--rocky-blue) text-white"
                      : "bg-black/5 text-charcoal/75 hover:bg-black/10",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div> */}

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-black/2 p-8">
              <p className="text-sm font-medium text-charcoal">No results found.</p>
              <p className="mt-1 text-sm text-charcoal/65">
                Try a different keyword or choose another category.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                  className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-rocky-blue shadow-sm ring-1 ring-black/10 hover:bg-black/5"
                >
                  Reset filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} variant="home" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

