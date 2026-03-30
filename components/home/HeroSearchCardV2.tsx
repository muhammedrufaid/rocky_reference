"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPropertySuggestions,
  type PropertySuggestion,
} from "@/utils/getServices";

type SearchCategory = "RESIDENTIAL" | "COMMERCIAL" | "OFF PLAN";
type BuyOption = "BUY" | "RENT" | "OFF PLAN";

// ─── Constants ────────────────────────────────────────────────────────────────
const BUY_OPTIONS: BuyOption[] = ["BUY", "RENT"];
const CATEGORIES: SearchCategory[] = ["RESIDENTIAL", "COMMERCIAL", "OFF PLAN"];
// Fetch more than we display initially; reveal the rest on scroll.
const SUGGESTIONS_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 200;

// How many tags to show inline before collapsing into "+N More"
const MAX_VISIBLE_TAGS = 1;

// Suggestion dropdown should show ~5 rows, then scroll for the rest
const SUGGESTIONS_MAX_HEIGHT_PX = 260;

function getSuggestionId(s: PropertySuggestion): string {
  return (
    s.propertyRefNo ||
    s.full ||
    s.label ||
    `${s.type ?? ""}-${s.locality ?? ""}-${s.subLocality ?? ""}-${s.towerName ?? ""}`
  );
}

function getSuggestionTitleText(s: PropertySuggestion) {
  return String(
    s.label ||
      s.full ||
      s.locality ||
      s.subLocality ||
      s.towerName ||
      "Suggestion"
  );
}

/** Short label for chips (first segment of full, or label). */
function getChipLabel(s: PropertySuggestion): string {
  const fromFull = s.full?.split(",")[0]?.trim();
  return (s.label?.trim() || fromFull || getSuggestionTitleText(s)).trim();
}

function isLocationLikeSuggestion(s: PropertySuggestion): boolean {
  return Boolean(s.full?.trim() || s.label?.trim());
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Highlights query matches with semibold + underline (matches hero search card behavior). */
function highlightMatchesToHtml(text: string, query: string): string {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return escapeHtml(text);

  const escapedQuery = escapeRegExp(trimmedQuery);
  const regex = new RegExp(escapedQuery, "gi");

  let html = "";
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    const start = match.index ?? 0;
    const end = start + match[0].length;

    html += escapeHtml(text.slice(lastIndex, start));
    html += `<span style="font-weight:600;text-decoration:underline">${escapeHtml(text.slice(start, end))}</span>`;
    lastIndex = end;

    if (match[0].length === 0) break;
  }

  html += escapeHtml(text.slice(lastIndex));
  return html;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.6" />
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
    <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Tag chip ─────────────────────────────────────────────────────────────────
const TagChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span
    className={[
      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md",
      "bg-[rgba(13,54,94,0.08)] text-[#0D365E] text-[0.72rem] font-semibold",
      "border border-[rgba(13,54,94,0.15)] whitespace-nowrap",
    ].join(" ")}
  >
    {label}
    <button
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      className="ml-0.5 flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-[rgba(13,54,94,0.15)] transition-colors duration-150 border-none cursor-pointer bg-transparent text-[#0D365E]"
    >
      <CloseIcon />
    </button>
  </span>
);

// ─── Component ────────────────────────────────────────────────────────────────
const HeroSearchCardV2: React.FC = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [buyOption, setBuyOption]           = useState<BuyOption>("BUY");
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("RESIDENTIAL");
  const [searchQuery, setSearchQuery]       = useState("");
  const [suggestions, setSuggestions]       = useState<PropertySuggestion[]>([]);
  const [selectedItems, setSelectedItems]   = useState<PropertySuggestion[]>([]);
  const [showDropdown, setShowDropdown]     = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused]           = useState(false);
  // Controls the "+N More" overflow popover
  const [showOverflowPopover, setShowOverflowPopover] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const dropdownRef      = useRef<HTMLDivElement>(null);
  const inputRef         = useRef<HTMLInputElement>(null);
  const suggestionsRef   = useRef<HTMLUListElement>(null);
  const overflowBtnRef   = useRef<HTMLButtonElement>(null);
  const overflowPopRef   = useRef<HTMLDivElement>(null);
  const lastRequestIdRef = useRef(0);

  // ── Derived ────────────────────────────────────────────────────────────────
  const visibleItems   = selectedItems.slice(0, MAX_VISIBLE_TAGS);
  const overflowItems  = selectedItems.slice(MAX_VISIBLE_TAGS);
  const overflowCount  = overflowItems.length;

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const query = searchQuery.trim();

    if (!query || query.length < 2) {
      setSuggestions([]);
      setIsFetchingSuggestions(false);
      return;
    }

    const requestId = ++lastRequestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setIsFetchingSuggestions(true);
      try {
        const results = await getPropertySuggestions(
          query,
          SUGGESTIONS_LIMIT,
          controller.signal
        );
        const locationRows = results.filter(isLocationLikeSuggestion);
        const deduped = locationRows.filter(
          (r) => !selectedItems.some((s) => getSuggestionId(s) === getSuggestionId(r))
        );

        if (requestId === lastRequestIdRef.current) {
          setSuggestions(deduped);
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          requestId === lastRequestIdRef.current
        ) {
          setSuggestions([]);
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
  }, [searchQuery, selectedItems]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowDropdown(false);
      }
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(target) &&
        inputRef.current && !inputRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }
      // Close overflow popover on outside click
      if (
        overflowPopRef.current && !overflowPopRef.current.contains(target) &&
        overflowBtnRef.current && !overflowBtnRef.current.contains(target)
      ) {
        setShowOverflowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSearch = () => {
    console.log("Searching:", { buyOption, activeCategory, selectedItems, searchQuery });
  };

  const handleSuggestionSelect = (suggestion: PropertySuggestion) => {
    const sid = getSuggestionId(suggestion);
    if (!selectedItems.some((s) => getSuggestionId(s) === sid)) {
      setSelectedItems((prev) => [...prev, suggestion]);
    }
    setSearchQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleRemoveSelected = (id: string) => {
    setSelectedItems((prev) => prev.filter((s) => getSuggestionId(s) !== id));
    // Close popover if no overflow items remain after removal
    if (overflowItems.length <= 1) setShowOverflowPopover(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .hsv2-input::placeholder { color: rgba(51,51,51,0.38); }
      `}</style>

      <div className="w-full max-w-[620px]">

        {/* ── Category Tabs ── */}
        <nav aria-label="Property category" className="mb-3 flex items-center gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className="relative cursor-pointer border-none bg-none pb-1.5 pt-0 px-0"
            >
              <span
                className={[
                  "inline-block px-4 py-1.5 rounded-md text-xs font-semibold tracking-[0.1em]",
                  "transition-all duration-200 backdrop-blur-md",
                  activeCategory === cat
                    ? "bg-[rgba(8,31,58,0.72)] text-white border border-[rgba(195,173,149,0.4)]"
                    : "bg-[rgba(8,31,58,0.28)] text-[rgba(255,255,255,0.55)] border border-[rgba(255,255,255,0.14)]",
                ].join(" ")}
              >
                {cat}
              </span>

              {activeCategory === cat && (
                <motion.div
                  layoutId="hsv2-tab-underline"
                  className="absolute bottom-0 left-4 right-4 h-px bg-[#C3AD95]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* ── Search Bar ── */}
        <div
          className={[
            "flex items-stretch rounded-lg overflow-visible transition-shadow duration-300",
            isFocused
              ? "shadow-[0_0_0_2px_#1C4E80,0_12px_40px_rgba(8,31,58,0.28)]"
              : "shadow-[0_8px_32px_rgba(8,31,58,0.22)]",
            "bg-white",
          ].join(" ")}
        >

          {/* Buy / Rent Dropdown ── */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={showDropdown}
              className={[
                "h-full flex items-center gap-2 px-5 cursor-pointer select-none rounded-l-lg",
                "border-none outline-none text-white text-[0.78rem] font-semibold tracking-[0.1em]",
                "min-w-[88px] transition-colors duration-200",
                "bg-[#0D365E] hover:bg-[#0D365E]",
              ].join(" ")}
            >
              <span>{buyOption}</span>
              <motion.span
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <ChevronDownIcon />
              </motion.span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  role="listbox"
                  aria-label="Search type"
                  initial={{ opacity: 0, y: -6, scaleY: 0.94 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
                  transition={{ duration: 0.16 }}
                  className={[
                    "absolute top-full left-0 mt-1.5 z-50 overflow-hidden rounded-lg",
                    "min-w-[120px] list-none p-0 m-0",
                    "bg-gradient-to-b from-[#1C4E80] via-[#0D365E] to-[#081F3A]",
                    "shadow-[0_8px_24px_rgba(8,31,58,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                    "border border-[rgba(28,78,128,0.45)]",
                  ].join(" ")}
                  style={{ transformOrigin: "top" }}
                >
                  {BUY_OPTIONS.map((opt) => (
                    <li key={opt} role="option" aria-selected={opt === buyOption}>
                      <button
                        onClick={() => { setBuyOption(opt); setShowDropdown(false); }}
                        className={[
                          "w-full px-5 py-3 text-left text-[0.75rem] font-semibold tracking-[0.1em]",
                          "border-none cursor-pointer transition-colors duration-150",
                          opt === buyOption
                            ? "text-[#C3AD95] bg-[rgba(195,173,149,0.1)]"
                            : "text-[rgba(255,255,255,0.6)] bg-transparent hover:bg-[rgba(28,78,128,0.15)] hover:text-white",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="w-px self-stretch bg-[rgba(13,54,94,0.12)]" aria-hidden="true" />

          {/* Search Input + Tags ── */}
          <div className="relative flex-1 flex flex-wrap items-center gap-1.5 px-4 py-2 min-h-[52px]">

            {/* Visible tags (up to MAX_VISIBLE_TAGS) */}
            {visibleItems.map((item) => (
              <TagChip
                key={getSuggestionId(item)}
                label={getChipLabel(item)}
                onRemove={() => handleRemoveSelected(getSuggestionId(item))}
              />
            ))}

            {/* "+N More" overflow chip */}
            {overflowCount > 0 && (
              <div className="relative">
                <button
                  ref={overflowBtnRef}
                  onClick={() => setShowOverflowPopover((v) => !v)}
                  aria-label={`Show ${overflowCount} more selected items`}
                  className={[
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-md",
                    "text-[0.72rem] font-semibold whitespace-nowrap cursor-pointer",
                    "border transition-colors duration-150",
                    showOverflowPopover
                      ? "bg-[#0D365E] text-white border-[#0D365E]"
                      : "bg-[rgba(13,54,94,0.08)] text-[#0D365E] border-[rgba(13,54,94,0.15)] hover:bg-[rgba(13,54,94,0.14)]",
                  ].join(" ")}
                >
                  +{overflowCount} More
                </button>

                {/* Overflow Popover */}
                <AnimatePresence>
                  {showOverflowPopover && (
                    <motion.div
                      ref={overflowPopRef}
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className={[
                        "absolute top-full left-0 mt-1.5 z-50 rounded-lg overflow-hidden",
                        "bg-white border border-[rgba(13,54,94,0.1)]",
                        "shadow-[0_10px_28px_rgba(8,31,58,0.16)]",
                        "min-w-[180px]",
                      ].join(" ")}
                      style={{ transformOrigin: "top left" }}
                    >
                      <div className="px-3 py-2 border-b border-[rgba(13,54,94,0.08)]">
                        <span className="text-[0.65rem] font-semibold tracking-[0.1em] text-[rgba(13,54,94,0.4)] uppercase">
                          {overflowCount} More Selected
                        </span>
                      </div>
                      <ul className="list-none p-0 m-0 overflow-y-auto" style={{ maxHeight: "152px" }}>
                        {overflowItems.map((item, i) => (
                          <li
                            key={getSuggestionId(item)}
                            className={[
                              "flex items-center justify-between px-4 py-2.5",
                              i > 0 ? "border-t border-t-[rgba(13,54,94,0.07)]" : "",
                            ].join(" ")}
                          >
                            <span className="text-[0.82rem] text-[#333333] font-medium">{getChipLabel(item)}</span>
                            <button
                              onClick={() => handleRemoveSelected(getSuggestionId(item))}
                              aria-label={`Remove ${getChipLabel(item)}`}
                              className="ml-3 flex items-center justify-center w-5 h-5 rounded-full hover:bg-[rgba(13,54,94,0.1)] transition-colors duration-150 border-none cursor-pointer bg-transparent text-[#0D365E] flex-shrink-0"
                            >
                              <CloseIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Clear all button — shown when 2+ items selected */}
            {selectedItems.length > 1 && (
              <button
                onClick={() => { setSelectedItems([]); setShowOverflowPopover(false); }}
                aria-label="Clear all selected"
                className={[
                  "inline-flex items-center gap-1 px-2 py-1 rounded-md",
                  "text-[0.68rem] font-semibold whitespace-nowrap cursor-pointer",
                  "border border-[rgba(220,50,50,0.2)] bg-[rgba(220,50,50,0.05)]",
                  "text-[#C0392B] hover:bg-[rgba(220,50,50,0.12)] transition-colors duration-150",
                ].join(" ")}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Clear all
              </button>
            )}

            {/* Text input */}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { setIsFocused(true); setShowSuggestions(true); }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={selectedItems.length === 0 ? "Search area, community or project..." : "Add more..."}
              aria-label="Search properties"
              aria-autocomplete="list"
              aria-controls="hsv2-suggestions"
              className="hsv2-input flex-1 min-w-[100px] outline-none border-none bg-transparent text-[0.875rem] text-[#333333] py-1"
            />

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions &&
                searchQuery.trim().length >= 2 &&
                (suggestions.length > 0 || isFetchingSuggestions) && (
                <motion.ul
                  id="hsv2-suggestions"
                  ref={suggestionsRef}
                  role="listbox"
                  aria-label="Property suggestions"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16 }}
                  className={[
                    "absolute top-full left-0 right-0 mt-1.5 z-50 overflow-y-auto rounded-lg list-none p-0 m-0",
                    "bg-white border border-[rgba(13,54,94,0.1)] shadow-[0_10px_28px_rgba(8,31,58,0.16)]",
                  ].join(" ")}
                  style={{ maxHeight: `${SUGGESTIONS_MAX_HEIGHT_PX}px` }}
                >
                  {suggestions.map((s, i) => (
                    <li key={getSuggestionId(s)} role="option" aria-selected={false}>
                      <button
                        type="button"
                        onMouseDown={() => handleSuggestionSelect(s)}
                        className={[
                          "w-full flex items-center justify-between gap-3 px-5 py-3 text-left cursor-pointer",
                          "bg-transparent border-none transition-colors duration-150",
                          "hover:bg-[#E7DCCD]",
                          i > 0 ? "border-t border-t-[rgba(13,54,94,0.07)]" : "",
                        ].join(" ")}
                      >
                        <span
                          className="text-[0.85rem] text-[#333333] font-normal min-w-0 text-left"
                          dangerouslySetInnerHTML={{
                            __html: highlightMatchesToHtml(
                              getSuggestionTitleText(s),
                              searchQuery
                            ),
                          }}
                        />
                        {/* {s.type ? (
                          <span
                            className={[
                              "shrink-0 text-[0.68rem] text-[#0D365E] font-semibold tracking-[0.08em] uppercase",
                              "bg-[rgba(13,54,94,0.07)] px-2 py-0.5 rounded",
                            ].join(" ")}
                          >
                            {s.type}
                          </span>
                        ) : null} */}
                      </button>
                    </li>
                  ))}
                  {isFetchingSuggestions && suggestions.length === 0 && (
                    <li className="px-5 py-3 text-[0.8rem] text-[#333333]/55">
                      Searching…
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button ── */}
          <button
            onClick={handleSearch}
            aria-label="Search"
            className={[
              "flex-shrink-0 flex items-center justify-center px-5 cursor-pointer rounded-r-lg",
              "border-none bg-transparent text-[#0D365E]",
              "transition-colors duration-200 hover:text-white hover:bg-[#0D365E]",
            ].join(" ")}
          >
            <SearchIcon />
          </button>
        </div>

      </div>
    </>
  );
};

export default HeroSearchCardV2;