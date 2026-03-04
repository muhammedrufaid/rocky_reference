"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { searchTabs, categoryOptions } from "@/utils/data";

type SearchTab = (typeof searchTabs)[number];

const HeroSearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("Buy");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = categoryOptions[activeTab] ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tab: activeTab,
      category: selectedCategory || null,
      query: searchQuery,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-5 max-w-2xl"
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      transition={{
        ...staggerTransition,
        delay: 0.3,
      }}
    >
      <fieldset className="space-y-4 md:space-y-5">
        <legend className="sr-only">
          Property search: choose transaction type, category, and enter search
        </legend>

        {/* Tabs: Buy | Rent | Sell */}
        <motion.div
          role="tablist"
          aria-label="Transaction type"
          className="flex gap-1 p-1 rounded-lg bg-white/10 backdrop-blur-sm w-fit"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...staggerTransition,
            delay: 0.4,
          }}
        >
          {searchTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab}`}
              id={`tab-${tab}`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedCategory("");
              }}
              className={`min-w-[72px] cursor-pointer md:min-w-[80px] py-2.5 px-3 md:py-3 md:px-4 text-sm font-medium rounded-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${activeTab === tab
                  ? "bg-white text-[#0d365e]"
                  : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Search bar with integrated category dropdown */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...staggerTransition,
            delay: 0.5,
          }}
        >
          <div className="flex flex-1 min-h-[48px] md:min-h-[52px] rounded-lg bg-white/95">
            {/* Category dropdown */}
            <div ref={dropdownRef} className="relative shrink-0">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label={`Category: ${selectedCategory || "All"}`}
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center cursor-pointer gap-1.5 h-full px-3 md:px-4 text-sm font-medium text-[#333333] border-r border-[#e5e7eb] hover:bg-[#f5f0ea] transition-colors rounded-l-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#c3ad95] whitespace-nowrap"
              >
                <span className="max-w-[90px] truncate">
                  {selectedCategory || categories[0] || "Category"}
                </span>
                <svg
                  className={`w-3.5 h-3.5 shrink-0 text-[#333333]/60 transition-transform ${dropdownOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul
                  role="listbox"
                  aria-label={`Category for ${activeTab}`}
                  className="absolute top-full left-0 mt-1 min-w-[160px] py-1 rounded-lg bg-white shadow-lg border border-[#e5e7eb] z-20"
                >
                  {categories.map((category) => (
                    <li
                      key={category}
                      role="option"
                      aria-selected={selectedCategory === category}
                      onClick={() => {
                        setSelectedCategory((prev) =>
                          prev === category ? "" : category
                        );
                        setDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${selectedCategory === category
                          ? "bg-[#e7dccd]/40 text-[#0d365e] font-medium"
                          : "text-[#333333] hover:bg-[#f5f0ea]"
                        }`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label htmlFor="hero-search" className="sr-only">
              Search for properties, locations
            </label>
            <input
              id="hero-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location, property"
              className="flex-1 min-w-0 min-h-[48px] md:min-h-[52px] px-3 md:px-4 py-2.5 md:py-3 bg-transparent text-[#333333] placeholder:text-[#333333]/50 border-0 focus:ring-0 focus:outline-none text-base"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="min-h-[48px] md:min-h-[52px] px-6 md:px-8 rounded-lg bg-[#c3ad95] hover:bg-[#9f8870] active:bg-[#a38c73] cursor-pointer text-[#000000] font-medium text-base transition-all duration-200 ease-out hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0 sm:w-auto w-full"
          >
            Search
          </button>

        </motion.div>
      </fieldset>
    </motion.form>
  );
};

export default HeroSearchCard;