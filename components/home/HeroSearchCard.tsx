"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { searchTabs, categoryOptions } from "@/utils/data";
import {
  getPropertySuggestions,
  type PropertySuggestion,
} from "@/utils/getServices";

type SearchTab = (typeof searchTabs)[number];
const HeroSearchCard: React.FC = () => {
  const INITIAL_SUGGESTIONS_LIMIT = 8;
  const SUGGESTIONS_PAGE_SIZE = 8;
  const SEARCH_DEBOUNCE_MS = 200;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SearchTab>("Buy");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [suggestionsLimit, setSuggestionsLimit] = useState(
    INITIAL_SUGGESTIONS_LIMIT
  );
  const [hasMoreSuggestions, setHasMoreSuggestions] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const lastRequestIdRef = useRef(0);

  const categories = categoryOptions[activeTab] ?? [];

  const buildListingsUrl = (
    txType: "buy" | "rent",
    overrides?: { query?: string; propertyType?: string }
  ) => {
    const params = new URLSearchParams();
    const query = overrides?.query ?? searchQuery.trim();
    const propertyType = overrides?.propertyType ?? selectedCategory;

    if (query) params.set("q", query);
    if (propertyType) params.set("type", propertyType);

    const queryString = params.toString();
    return `/properties/${txType}/in-dubai${queryString ? `?${queryString}` : ""}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txType = activeTab === "Rent" ? "rent" : "buy";
    router.push(buildListingsUrl(txType));
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
    setSuggestionsLimit(INITIAL_SUGGESTIONS_LIMIT);
    setHasMoreSuggestions(true);
  }, [searchQuery]);

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setSuggestions([]);
      setIsFetchingSuggestions(false);
      setSuggestionsOpen(false);
      setHasMoreSuggestions(true);
      return;
    }

    const requestId = ++lastRequestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setIsFetchingSuggestions(true);
      setSuggestionsOpen(true);
      try {
        const nextSuggestions = await getPropertySuggestions(
          query,
          suggestionsLimit,
          controller.signal
        );
        const filteredSuggestions = nextSuggestions.filter((suggestion) =>
          isLocationLikeSuggestion(suggestion)
        );

        if (requestId === lastRequestIdRef.current) {
          setSuggestions(filteredSuggestions);
          setHasMoreSuggestions(nextSuggestions.length >= suggestionsLimit);
          setSuggestionsOpen(true);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          requestId === lastRequestIdRef.current
        ) {
          // If "load more" fails, don't wipe the already visible suggestions.
          // Just stop further pagination attempts.
          setHasMoreSuggestions(false);
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
  }, [searchQuery, suggestionsLimit]);

  const handleSuggestionClick = (suggestion: PropertySuggestion) => {
    const purpose = suggestion.propertyPurpose?.toLowerCase();
    const txType =
      purpose === "rent" || purpose === "buy"
        ? purpose
        : activeTab === "Rent"
          ? "rent"
          : "buy";

    const typedQuery = searchQuery.trim();
    const suggestionQuery =
      typedQuery ||
      suggestion.full?.trim() ||
      suggestion.label?.trim() ||
      suggestion.towerName?.trim() ||
      suggestion.locality?.trim() ||
      suggestion.propertyRefNo ||
      "";

    setSearchQuery(suggestionQuery);
    setSuggestions([]);
    setSuggestionsOpen(false);
    router.push(
      buildListingsUrl(txType, {
        query: suggestionQuery,
      })
    );
  };

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const isLocationLikeSuggestion = (suggestion: PropertySuggestion) =>
    Boolean(suggestion.full?.trim() || suggestion.label?.trim());

  const highlightMatchesToHtml = (text: string, query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return escapeHtml(text);

    const escapedQuery = escapeRegExp(trimmedQuery);
    const regex = new RegExp(escapedQuery, "gi");

    let html = "";
    let lastIndex = 0;

    // Wrap each exact match occurrence with <b><u>...</u></b>.
    let match: RegExpExecArray | null;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(text)) !== null) {
      const start = match.index ?? 0;
      const end = start + match[0].length;

      html += escapeHtml(text.slice(lastIndex, start));
      html += `<b><u>${escapeHtml(text.slice(start, end))}</u></b>`;
      lastIndex = end;

      // Safety: avoid infinite loops if regex matches empty strings.
      if (match[0].length === 0) break;
    }

    html += escapeHtml(text.slice(lastIndex));
    return html;
  };

  const getSuggestionTitleText = (suggestion: PropertySuggestion) =>
    String(
      suggestion.full ||
        suggestion.label ||
        suggestion.locality ||
        suggestion.subLocality ||
        suggestion.towerName ||
        "Suggestion"
    );

  const handleSuggestionsScroll = (
    event: React.UIEvent<HTMLUListElement, UIEvent>
  ) => {
    if (isFetchingSuggestions || !hasMoreSuggestions) return;

    const target = event.currentTarget;
    const isNearBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 24;

    if (isNearBottom) {
      setSuggestionsLimit((prev) => prev + SUGGESTIONS_PAGE_SIZE);
    }
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
                {suggestions.length > 0 ? (
                  <ul
                    role="listbox"
                    aria-label="Property suggestions"
                    onScroll={handleSuggestionsScroll}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="max-h-80 overflow-y-auto"
                  >
                    {suggestions.map((suggestion) => (
                      <li
                        key={
                          suggestion.propertyRefNo ||
                          suggestion.full ||
                          suggestion.label ||
                          `${suggestion.type}-${suggestion.locality || ""}-${suggestion.subLocality || ""}`
                        }
                      >
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full cursor-pointer px-4 py-3 text-left hover:bg-[#f5f0ea] transition-colors border-b border-[#f3f4f6] last:border-b-0"
                        >
                          <p
                            className="text-sm font-normal text-[#0d365e] truncate"
                            // Highlight query matches in title (case-insensitive, preserve original casing).
                            dangerouslySetInnerHTML={{
                              __html: highlightMatchesToHtml(
                                getSuggestionTitleText(suggestion),
                                searchQuery
                              ),
                            }}
                          />
                          {/* <p className="text-xs text-[#555555] mt-1">
                            {suggestion.type || suggestion.propertyRefNo
                              ? [
                                  suggestion.type
                                    ? suggestion.type === "subLocality"
                                      ? "Sub Locality"
                                      : "Tower"
                                    : undefined,
                                  suggestion.propertyPurpose,
                                  suggestion.propertyType,
                                  suggestion.locality,
                                  suggestion.subLocality,
                                ]
                                  .filter(Boolean)
                                  .join(" | ")
                              : ""}
                          </p> */}
                        </button>
                      </li>
                    ))}

                    {isFetchingSuggestions && (
                      <li className="px-4 py-2 text-xs text-[#666666]">
                        Loading more...
                      </li>
                    )}
                  </ul>
                ) : isFetchingSuggestions ? (
                  <div className="px-4 py-3 text-sm text-[#666666]">
                    Searching...
                  </div>
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