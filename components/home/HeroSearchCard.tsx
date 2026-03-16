"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { searchTabs, categoryOptions } from "@/utils/data";

type SearchTab = (typeof searchTabs)[number];
type PropertySuggestion = {
  propertyRefNo: string;
  towerName?: string;
  propertyPurpose?: string;
  propertyType?: string;
  locality?: string;
  subLocality?: string;
};

const HeroSearchCard: React.FC = () => {
  const MAX_SUGGESTIONS = 6;
  const SEARCH_DEBOUNCE_MS = 200;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("Buy");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const lastRequestIdRef = useRef(0);

  const categories = categoryOptions[activeTab] ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txType = activeTab === "Rent" ? "rent" : "buy";
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory) params.set("type", selectedCategory);
    const query = params.toString();
    router.push(`/properties/${txType}/in-dubai${query ? `?${query}` : ""}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSuggestions([]);
      setIsFetchingSuggestions(false);
      return;
    }

    const requestId = ++lastRequestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setIsFetchingSuggestions(true);
      try {
        const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(
          /\/$/,
          ""
        );
        const params = new URLSearchParams({
          q: query,
          limit: String(MAX_SUGGESTIONS),
        });
        const endpoints = [
          `${baseUrl}/api/frontend/properties/search?${params.toString()}`,
          `${baseUrl}/api/properties/search?${params.toString()}`,
        ];
        let data: { suggestions?: PropertySuggestion[] } | null = null;

        for (const endpoint of endpoints) {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          });

          if (response.ok) {
            data = (await response.json()) as { suggestions?: PropertySuggestion[] };
            break;
          }

          if (response.status !== 404) {
            throw new Error(`Search suggestions failed: ${response.status}`);
          }
        }

        if (!data) {
          throw new Error("Search suggestions endpoint not available");
        }

        const nextSuggestions = (data?.suggestions ?? []).slice(
          0,
          MAX_SUGGESTIONS
        );

        if (requestId === lastRequestIdRef.current) {
          setSuggestions(nextSuggestions);
          setSuggestionsOpen(true);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          requestId === lastRequestIdRef.current
        ) {
          setSuggestions([]);
          setSuggestionsOpen(false);
        }
      } finally {
        if (requestId === lastRequestIdRef.current) {
          setIsFetchingSuggestions(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion: PropertySuggestion) => {
    const purpose = suggestion.propertyPurpose?.toLowerCase();
    const txType =
      purpose === "rent" || purpose === "buy"
        ? purpose
        : activeTab === "Rent"
        ? "rent"
        : "buy";

    setSearchQuery(
      [suggestion.towerName, suggestion.locality].filter(Boolean).join(", ")
    );
    setSuggestions([]);
    setSuggestionsOpen(false);
    router.push(
      `/properties/${txType}/in-dubai/${encodeURIComponent(
        suggestion.propertyRefNo
      )}`
    );
  };

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
          <div
            ref={searchBoxRef}
            className="relative flex flex-1 min-h-[48px] md:min-h-[52px] rounded-lg bg-white/95"
          >
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
              onFocus={() => {
                if (suggestions.length > 0) {
                  setSuggestionsOpen(true);
                }
              }}
              placeholder="Search location, property"
              className="flex-1 min-w-0 min-h-[48px] md:min-h-[52px] px-3 md:px-4 py-2.5 md:py-3 bg-transparent text-[#333333] placeholder:text-[#333333]/50 border-0 focus:ring-0 focus:outline-none text-base"
              autoComplete="off"
            />

            {suggestionsOpen && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-lg border border-[#e5e7eb] bg-white shadow-lg overflow-hidden">
                {isFetchingSuggestions ? (
                  <div className="px-4 py-3 text-sm text-[#666666]">
                    Searching...
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul role="listbox" aria-label="Property suggestions">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.propertyRefNo}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full cursor-pointer px-4 py-3 text-left hover:bg-[#f5f0ea] transition-colors border-b border-[#f3f4f6] last:border-b-0"
                        >
                          <p className="text-sm font-semibold text-[#0d365e]">
                            {suggestion.propertyRefNo}{" "}
                            {suggestion.towerName
                              ? `- ${suggestion.towerName}`
                              : ""}
                          </p>
                          <p className="text-xs text-[#555555] mt-1">
                            {[
                              suggestion.propertyPurpose,
                              suggestion.propertyType,
                              suggestion.locality,
                              suggestion.subLocality,
                            ]
                              .filter(Boolean)
                              .join(" | ")}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-sm text-[#666666]">
                    No matching properties found.
                  </div>
                )}
              </div>
            )}
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