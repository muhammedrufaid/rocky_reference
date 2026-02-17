"use client";

import React, { useState } from "react";
import { searchTabs, categoryOptions } from "@/utils/data";

type SearchTab = (typeof searchTabs)[number];

const HeroSearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SearchTab>("Buy");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = categoryOptions[activeTab] ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tab: activeTab,
      category: selectedCategory || null,
      query: searchQuery,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-5 max-w-2xl"
    >
      <fieldset className="space-y-4 md:space-y-5">
        <legend className="sr-only">
          Property search: choose transaction type, category, and enter
          search
        </legend>

        {/* Tabs: Buy | Rent | Sell */}
        <div
          role="tablist"
          aria-label="Transaction type"
          className="flex gap-1 p-1 rounded-lg bg-white/10 backdrop-blur-sm w-fit"
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
              className={`min-w-[72px] md:min-w-[80px] py-2.5 px-3 md:py-3 md:px-4 text-sm font-medium rounded-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                activeTab === tab
                  ? "bg-white text-[#0d365e]"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div role="group" aria-labelledby="category-label">
          <span id="category-label" className="sr-only">
            Category for {activeTab}
          </span>
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                aria-label={`Select ${category}`}
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === category ? "" : category
                  )
                }
                className={`min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  selectedCategory === category
                    ? "bg-[#c3ad95] text-[#081f3a] border-2 border-[#c3ad95]"
                    : "bg-white/10 text-white/90 border-2 border-white/30 hover:bg-white/20 hover:border-white/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar + button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="hero-search" className="sr-only">
            Search for properties, locations, or keywords
          </label>
          <input
            id="hero-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location, property, or keyword..."
            className="flex-1 min-h-[48px] md:min-h-[52px] px-4 md:px-5 rounded-lg bg-white/95 text-[#333333] placeholder:text-[#333333]/60 border-0 focus:ring-1 focus:ring-[#c3ad95] focus:ring-offset-1 focus:ring-offset-transparent focus:outline-none text-base"
            autoComplete="off"
          />
          <button
            type="submit"
            className="min-h-[48px] md:min-h-[52px] px-6 md:px-8 rounded-lg bg-[#0d365e] hover:bg-[#1c4e80] text-white font-semibold text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0 sm:w-auto w-full"
          >
            Search
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default HeroSearchCard;