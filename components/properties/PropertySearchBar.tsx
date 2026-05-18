"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Container from "@/components/layout/Container";
import {
  getPropertySuggestions,
  getPropertyTypesByCategory,
  type PropertyTypesByCategory,
  type PropertySuggestion,
} from "@/utils/getServices";
import { generateSeoSlug, seoSlugToQuery } from "@/utils/seo";
import { serializePropertyTypesForQuery } from "@/components/properties/PropertyTypeMultiSelectDropdown";
import PropertyTypeCategoryDropdown from "@/components/properties/PropertyTypeCategoryDropdown";
import { ChipCloseIcon, FilterFunnelIcon, ToolbarDropdownChevronIcon, ToolbarSearchIcon } from "@/utils/icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type TransactionType = "buy" | "rent";

interface PropertySearchBarProps {
  defaultType?: TransactionType;
  isOffPlan?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RENT_PRICES = [
  { label: "Any", value: "" },
  { label: "AED 50,000", value: "50000" },
  { label: "AED 100,000", value: "100000" },
  { label: "AED 150,000", value: "150000" },
  { label: "AED 200,000", value: "200000" },
  { label: "AED 300,000", value: "300000" },
  { label: "AED 500,000", value: "500000" },
  { label: "AED 750,000", value: "750000" },
  { label: "AED 1,000,000", value: "1000000" },
  { label: "AED 1,500,000", value: "1500000" },
  { label: "AED 2,000,000+", value: "2000000" },
];

const BUY_PRICES = [
  { label: "Any", value: "" },
  { label: "AED 50,000", value: "50000" },
  { label: "AED 100,000", value: "100000" },
  { label: "AED 150,000", value: "150000" },
  { label: "AED 200,000", value: "200000" },
  { label: "AED 300,000", value: "300000" },
  { label: "AED 500,000", value: "500000" },
  { label: "AED 750,000", value: "750000" },
  { label: "AED 1,000,000", value: "1000000" },
  { label: "AED 1,500,000", value: "1500000" },
  { label: "AED 2,000,000+", value: "2000000" },
];

// ─── Suggestions helpers ──────────────────────────────────────────────────────

const SEARCH_DEBOUNCE_MS = 200;
const SUGGESTIONS_LIMIT = 20;
const SUGGESTIONS_MAX_HEIGHT_PX = 260;
const MAX_VISIBLE_TAGS = 1;

function typesFromSearchParam(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return Array.from(
    new Set(
      raw
        .split(",")
        .map((t) => decodeQueryParam(t).trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));
}

function decodeQueryParam(raw: string): string {
  // Defensive: if any code path ever passes a raw querystring fragment,
  // convert `+` to space before decoding.
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    return raw.replace(/\+/g, " ");
  }
}

function parseNullableInt(raw: string | null): number | null {
  if (!raw?.trim()) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function getSuggestionId(s: PropertySuggestion): string {
  return (
    s.propertyRefNo ||
    s.full ||
    s.label ||
    `${s.type ?? ""}-${s.locality ?? ""}-${s.subLocality ?? ""}-${s.towerName ?? ""}`
  );
}

/** Full line for autocomplete rows (e.g. "The Bay (Business Bay, Dubai)"). */
function getSuggestionDisplayText(s: PropertySuggestion) {
  return String(
    s.full ||
      s.label ||
      s.locality ||
      s.subLocality ||
      s.towerName ||
      "Suggestion"
  );
}

/** Short token for URL / search param (area API: use `label` only when present). */
function getSuggestionQueryText(s: PropertySuggestion) {
  const short = s.label?.trim();
  if (short) return short;
  return String(
    s.full ||
      s.locality ||
      s.subLocality ||
      s.towerName ||
      s.propertyRefNo ||
      "Suggestion"
  );
}

function isLocationLikeSuggestion(s: PropertySuggestion): boolean {
  return Boolean(s.full?.trim() || s.label?.trim());
}

/** Short label for chips (first segment of full, or label). */
function getChipLabel(s: PropertySuggestion): string {
  const fromFull = s.full?.split(",")[0]?.trim();
  return (s.label?.trim() || fromFull || getSuggestionDisplayText(s)).trim();
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
    html += `<span style="font-weight:600;text-decoration:underline">${escapeHtml(
      text.slice(start, end)
    )}</span>`;
    lastIndex = end;

    if (match[0].length === 0) break;
  }

  html += escapeHtml(text.slice(lastIndex));
  return html;
}

const TagChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span
    className={[
      "inline-flex items-center gap-1 rounded-md px-2.5 py-1",
      "bg-[rgba(28,78,128,0.08)] text-[var(--rocky-blue)] text-[0.72rem] font-semibold",
      "border border-[rgba(28,78,128,0.18)] whitespace-nowrap",
    ].join(" ")}
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      className="ml-0.5 flex size-4 items-center justify-center rounded-full hover:bg-[rgba(28,78,128,0.12)] transition-colors border-none cursor-pointer bg-transparent text-[var(--rocky-blue)]"
    >
      <ChipCloseIcon width="10" height="10" />
    </button>
  </span>
);

// ─── FilterDropdown ───────────────────────────────────────────────────────────

interface DropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

function FilterDropdown({ value, options, onChange, placeholder, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const displayValue = selected?.value ? selected.label : placeholder;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${displayValue}`}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">{displayValue}</span>
        <ToolbarDropdownChevronIcon open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 min-w-full w-max max-h-56 overflow-auto rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        >
          {options.map((opt) => (
            <li
              key={opt.value || "any"}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer whitespace-nowrap px-4 py-3 text-sm transition-colors duration-150 ${value === opt.value
                ? "bg-[var(--rocky-blue)]/8 font-medium"
                : "hover:bg-[var(--soft-sand)]/40"
                }`}
              style={{
                color: value === opt.value ? "var(--rocky-blue)" : "var(--charcoal)",
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── PriceRangeDropdown (Bayut-style) ─────────────────────────────────────────

function normalizePriceInput(raw: string) {
  // Allow clearing. Otherwise keep only digits.
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/[^\d]/g, "");
  return digits;
}

const MAX_ALLOWED_PRICE = 40_000_000;

function numberFromDigits(digits: string) {
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

function formatWithCommas(digits: string) {
  if (!digits) return "";
  const n = numberFromDigits(digits);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString();
}

function countDigitsBeforeCursor(value: string, cursor: number) {
  return value.slice(0, cursor).replace(/[^\d]/g, "").length;
}

function cursorPositionAfterDigits(formatted: string, digitsBefore: number) {
  if (digitsBefore <= 0) return 0;
  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]!)) {
      count++;
      if (count === digitsBefore) return i + 1;
    }
  }
  return formatted.length;
}

function formatCompactNumber(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "";
  const abs = Math.abs(n);
  const units: Array<{ v: number; s: "B" | "M" | "K" }> = [
    { v: 1_000_000_000, s: "B" },
    { v: 1_000_000, s: "M" },
    { v: 1_000, s: "K" },
  ];
  for (const u of units) {
    if (abs >= u.v) {
      const val = n / u.v;
      const rounded = val >= 10 ? Math.round(val) : Math.round(val * 10) / 10;
      // Strip trailing .0
      const asText = String(rounded).endsWith(".0")
        ? String(rounded).slice(0, -2)
        : String(rounded);
      return `${asText}${u.s}`;
    }
  }
  return String(Math.round(n));
}

function formatCompactAedFromDigits(value: string) {
  const n = numberFromDigits(value);
  if (!n) return "";
  return `AED ${formatCompactNumber(n)}`;
}

function PriceRangeDropdown({
  minValue,
  maxValue,
  options,
  onDone,
  label = "Price (AED)",
  placeholder = "Price (AED)",
}: {
  minValue: string;
  maxValue: string;
  options: { label: string; value: string }[];
  onDone: (next: { min: string; max: string }) => void;
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  const [draftMin, setDraftMin] = useState(minValue);
  const [draftMax, setDraftMax] = useState(maxValue);
  const [activeField, setActiveField] = useState<"min" | "max">("min");
  const [align, setAlign] = useState<"left" | "right">("left");
  const [error, setError] = useState<string>("");
  const pendingPriceCursorRef = useRef<{
    field: "min" | "max";
    digitsBefore: number;
  } | null>(null);

  const suggestionOptions = useMemo(() => {
    return options.filter((o: { label: string; value: string }) => {
      return String(o.value ?? "").trim() !== "";
    });
  }, [options]);

  const displayLabel = useMemo(() => {
    const min = formatCompactAedFromDigits(minValue);
    const max = formatCompactAedFromDigits(maxValue);
    if (!min && !max) return placeholder;
    if (min && max) return `${min} - ${max}`;
    if (min) return `${min}+`;
    return `Up to ${max}`;
  }, [minValue, maxValue, placeholder]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setDraftMin(minValue);
    setDraftMax(maxValue);
    setError("");
    // Default focus: if min already set, edit max; otherwise edit min.
    const nextActive = minValue ? "max" : "min";
    setActiveField(nextActive);
    // Keep dropdown within viewport: choose left/right anchoring based on available space.
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const viewportW = window.innerWidth || 0;
      const desiredW = Math.min(520, Math.max(320, viewportW - 32)); // matches w-[min(520px,calc(100vw-2rem))]
      const fitsRight = rect.left + desiredW <= viewportW - 8;
      const fitsLeft = rect.right - desiredW >= 8;
      // Prefer left alignment when it fits; otherwise flip to right if that fits better.
      setAlign(fitsRight || !fitsLeft ? "left" : "right");
    } else {
      setAlign("left");
    }
    window.setTimeout(() => {
      (nextActive === "min" ? minInputRef : maxInputRef).current?.focus();
    }, 0);
  }, [open, minValue, maxValue]);

  const selectSuggestion = (val: string) => {
    if (activeField === "min") {
      setDraftMin(val);
      setActiveField("max");
      window.setTimeout(() => maxInputRef.current?.focus(), 0);
      return;
    }
    setDraftMax(val);
  };

  const validate = (nextMinRaw: string, nextMaxRaw: string) => {
    const minN = numberFromDigits(nextMinRaw);
    const maxN = numberFromDigits(nextMaxRaw);

    if (minN > MAX_ALLOWED_PRICE || maxN > MAX_ALLOWED_PRICE) {
      return `Maximum allowed price is AED ${MAX_ALLOWED_PRICE.toLocaleString()}.`;
    }
    if (minN && maxN && minN > maxN) {
      return "Minimum price must be less than or equal to maximum price.";
    }
    return "";
  };

  const handleDone = () => {
    const nextMin = normalizePriceInput(draftMin);
    const nextMax = normalizePriceInput(draftMax);
    const nextError = validate(nextMin, nextMax);
    if (nextError) {
      setError(nextError);
      return;
    }
    onDone({ min: nextMin, max: nextMax });
    setOpen(false);
  };

  const handleReset = () => {
    setDraftMin("");
    setDraftMax("");
    setActiveField("min");
    onDone({ min: "", max: "" });
    setOpen(false);
  };

  useLayoutEffect(() => {
    const pending = pendingPriceCursorRef.current;
    if (!pending) return;

    const input = pending.field === "min" ? minInputRef.current : maxInputRef.current;
    if (!input) {
      pendingPriceCursorRef.current = null;
      return;
    }

    const digits = pending.field === "min" ? draftMin : draftMax;
    const formatted = formatWithCommas(digits);
    const pos = cursorPositionAfterDigits(formatted, pending.digitsBefore);
    input.setSelectionRange(pos, pos);
    pendingPriceCursorRef.current = null;
  }, [draftMin, draftMax]);

  const handlePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "min" | "max"
  ) => {
    const input = e.target;
    const cursor = input.selectionStart ?? input.value.length;
    const digitsBefore = countDigitsBeforeCursor(input.value, cursor);
    const next = normalizePriceInput(input.value);

    pendingPriceCursorRef.current = { field, digitsBefore };

    if (field === "min") {
      setDraftMin(next);
      setError(validate(next, draftMax));
      return;
    }

    setDraftMax(next);
    setError(validate(draftMin, next));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${displayLabel}`}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">
          {displayLabel !== placeholder ? (
            <span className="text-[var(--charcoal)]">{displayLabel}</span>
          ) : (
            <span className="text-[var(--charcoal)]/60">{placeholder}</span>
          )}
        </span>
        <ToolbarDropdownChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={[
            "absolute top-full z-50 mt-1.5 w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(8,31,58,0.14)] ring-1 ring-black/[0.05]",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          <div className="p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-black/45">
                  Minimum
                </label>
                <input
                  ref={minInputRef}
                  inputMode="numeric"
                  value={formatWithCommas(draftMin)}
                  onFocus={() => setActiveField("min")}
                  onChange={(e) => handlePriceInputChange(e, "min")}
                  placeholder="0"
                  className={[
                    "mt-1 h-11 w-full rounded-lg border bg-white px-3 text-sm font-medium outline-none transition-all",
                    activeField === "min"
                      ? "border-[var(--rocky-blue)] ring-2 ring-[var(--rocky-blue)]/20"
                      : "border-[var(--border-light)]",
                  ].join(" ")}
                  style={{ color: "var(--charcoal)" }}
                />
              </div>
              <div>
                <label className="block text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-black/45">
                  Maximum
                </label>
                <input
                  ref={maxInputRef}
                  inputMode="numeric"
                  value={formatWithCommas(draftMax)}
                  onFocus={() => setActiveField("max")}
                  onChange={(e) => handlePriceInputChange(e, "max")}
                  placeholder="Any"
                  className={[
                    "mt-1 h-11 w-full rounded-lg border bg-white px-3 text-sm font-medium outline-none transition-all",
                    activeField === "max"
                      ? "border-[var(--rocky-blue)] ring-2 ring-[var(--rocky-blue)]/20"
                      : "border-[var(--border-light)]",
                  ].join(" ")}
                  style={{ color: "var(--charcoal)" }}
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-xs font-medium" style={{ color: "#C0392B" }}>
                {error}
              </p>
            )}

            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-black/45">
                  Suggestions
                </span>
                <span className="text-[0.7rem] text-black/45">
                  Applies to {activeField === "min" ? "Minimum" : "Maximum"}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {suggestionOptions.slice(0, 10).map((opt) => (
                  <button
                    key={`${activeField}-${opt.value}-${opt.label}`}
                    type="button"
                    onClick={() => selectSuggestion(String(opt.value))}
                    className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-[var(--soft-sand)]/30"
                    style={{ borderColor: "rgba(0,0,0,0.08)", color: "var(--charcoal)" }}
                  >
                    <span className="truncate font-medium">
                      {formatCompactAedFromDigits(String(opt.value))}
                    </span>
                    <span className="text-[0.7rem] text-black/45">Set</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-3 border-t px-3 py-3"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[rgba(220,50,50,0.06)]"
              style={{ color: "#C0392B" }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleDone}
              disabled={Boolean(error)}
              className={[
                "rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors",
                error
                  ? "bg-[var(--rocky-blue)]/60 cursor-not-allowed"
                  : "cursor-pointer bg-[var(--rocky-blue)] hover:bg-[var(--rocky-blue-hover)]",
              ].join(" ")}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BedsBathsDropdown (Bayut-style) ──────────────────────────────────────────

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function bedsBathsLabel(beds: number | null, baths: number | null) {
  const hasBeds = beds != null;
  const hasBaths = baths != null;
  if (!hasBeds && !hasBaths) return "Beds & Baths";

  const parts: string[] = [];
  if (hasBeds) {
    if (beds === 0) parts.push("Studio");
    else if (beds >= 6) parts.push("6+ Beds");
    else parts.push(`${beds} ${pluralize(beds, "Bed")}`);
  }
  if (hasBaths) {
    if (baths >= 6) parts.push("6+ Baths");
    else parts.push(`${baths} ${pluralize(baths, "Bath")}`);
  }

  return parts.join(" • ");
}

const OptionButton: React.FC<{
  label: string;
  selected: boolean;
  onSelect: () => void;
}> = ({ label, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={[
      "h-9 cursor-pointer rounded-full px-3 text-sm font-semibold transition-colors",
      "border",
      selected
        ? "bg-[var(--rocky-blue)] text-white border-[var(--rocky-blue)]"
        : "bg-white text-[var(--charcoal)] border-[rgba(0,0,0,0.10)] hover:bg-[var(--soft-sand)]/30",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rocky-blue)]/35",
    ].join(" ")}
  >
    {label}
  </button>
);

function BedsBathsDropdown({
  bedsValue,
  bathsValue,
  onDone,
  label = "Beds & Baths",
}: {
  bedsValue: number | null;
  bathsValue: number | null;
  onDone: (next: { beds: number | null; baths: number | null }) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState<"left" | "right">("left");

  const [draftBeds, setDraftBeds] = useState<number | null>(bedsValue);
  const [draftBaths, setDraftBaths] = useState<number | null>(bathsValue);

  const displayLabel = bedsBathsLabel(bedsValue, bathsValue);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setDraftBeds(bedsValue);
    setDraftBaths(bathsValue);

    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const viewportW = window.innerWidth || 0;
      const desiredW = Math.min(420, Math.max(320, viewportW - 32));
      const fitsRight = rect.left + desiredW <= viewportW - 8;
      const fitsLeft = rect.right - desiredW >= 8;
      setAlign(fitsRight || !fitsLeft ? "left" : "right");
    } else {
      setAlign("left");
    }
  }, [open, bedsValue, bathsValue]);

  const handleReset = () => {
    setDraftBeds(null);
    setDraftBaths(null);
    onDone({ beds: null, baths: null });
    setOpen(false);
  };

  const handleDone = () => {
    onDone({ beds: draftBeds, baths: draftBaths });
    setOpen(false);
  };

  const bedsOptions: Array<{ label: string; value: number }> = [
    { label: "Studio", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6+", value: 6 },
  ];

  const bathsOptions: Array<{ label: string; value: number }> = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6+", value: 6 },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${displayLabel}`}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">
          {displayLabel !== "Beds & Baths" ? (
            <span className="text-[var(--charcoal)]">{displayLabel}</span>
          ) : (
            <span className="text-[var(--charcoal)]/60">Beds & Baths</span>
          )}
        </span>
        <ToolbarDropdownChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={[
            "absolute top-full z-50 mt-1.5 w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(8,31,58,0.14)] ring-1 ring-black/[0.05]",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          <div className="p-3">
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-black/45">
                Beds
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bedsOptions.map((opt) => (
                  <OptionButton
                    key={`beds-${opt.value}`}
                    label={opt.label}
                    selected={draftBeds === opt.value}
                    onSelect={() => setDraftBeds(opt.value)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-black/45">
                Baths
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bathsOptions.map((opt) => (
                  <OptionButton
                    key={`baths-${opt.value}`}
                    label={opt.label}
                    selected={draftBaths === opt.value}
                    onSelect={() => setDraftBaths(opt.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-3 border-t px-3 py-3"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[rgba(220,50,50,0.06)]"
              style={{ color: "#C0392B" }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="cursor-pointer rounded-lg bg-[var(--rocky-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--rocky-blue-hover)]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ListingDropdown ──────────────────────────────────────────────────────────

function ListingDropdown({
  transactionType,
  onSelect,
}: {
  transactionType: TransactionType;
  onSelect: (tx: TransactionType) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--rocky-blue)", borderColor: "var(--rocky-blue)" }}
      >
        <span>{transactionType === "rent" ? "Rent" : "Buy"}</span>
        <ToolbarDropdownChevronIcon open={open} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 min-w-full rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        >
          {(["rent", "buy"] as TransactionType[]).map((tx) => {
            const isSelected = transactionType === tx;
            return (
              <li
                key={tx}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setOpen(false);
                  onSelect(tx);
                }}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium capitalize transition-colors ${isSelected
                  ? "bg-[var(--rocky-blue)]/8"
                  : "hover:bg-[var(--soft-sand)]/40"
                  }`}
                style={{
                  color: isSelected ? "var(--rocky-blue)" : "var(--charcoal)",
                }}
              >
                {tx === "rent" ? "Rent" : "Buy"}
                {isSelected && (
                  <svg
                    className="size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PropertySearchBar: React.FC<PropertySearchBarProps> = ({
  defaultType = "buy",
  isOffPlan = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Derive transaction type from URL path (e.g. /properties/rent/in-dubai)
  const transactionType: TransactionType =
    pathname.includes("/rent/") ? "rent" : pathname.includes("/buy/") ? "buy" : defaultType;
  const priceOptions = transactionType === "rent" ? RENT_PRICES : BUY_PRICES;

  const [propertyTypesByCategory, setPropertyTypesByCategory] = useState<PropertyTypesByCategory>({
    // Important: start as empty, but we treat "not yet hydrated" separately so
    // dropdown labeling can stay stable on first paint.
    residential: [],
    commercial: [],
  });

  const [propertyTypesHydrated, setPropertyTypesHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPropertyTypesByCategory().then((data) => {
      if (cancelled) return;
      if (data) setPropertyTypesByCategory(data);
      setPropertyTypesHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState(
    decodeQueryParam(searchParams.get("q") ?? "")
  );
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(() =>
    typesFromSearchParam(searchParams.get("type"))
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");
  const [selectedBeds, setSelectedBeds] = useState<number | null>(() =>
    parseNullableInt(searchParams.get("beds"))
  );
  const [selectedBaths, setSelectedBaths] = useState<number | null>(() =>
    parseNullableInt(searchParams.get("baths"))
  );
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [selectedItems, setSelectedItems] = useState<PropertySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const lastRequestIdRef = useRef(0);

  const [isSticky, setIsSticky] = useState(false);
  const [isHiddenByFooter, setIsHiddenByFooter] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const visibleItems = selectedItems.slice(0, MAX_VISIBLE_TAGS);
  const overflowItems = selectedItems.slice(MAX_VISIBLE_TAGS);
  const overflowCount = overflowItems.length;
  const [showOverflowPopover, setShowOverflowPopover] = useState(false);
  const overflowBtnRef = useRef<HTMLButtonElement>(null);
  const overflowPopRef = useRef<HTMLDivElement>(null);

  // Sync URL params → state
  useEffect(() => {
    const qFromUrl = decodeQueryParam(searchParams.get("q") ?? "");
    const searchFromUrl = searchParams.get("search") ?? "";
    const qCombined = qFromUrl || (searchFromUrl ? seoSlugToQuery(searchFromUrl) : "");
    setSelectedPropertyTypes(typesFromSearchParam(searchParams.get("type")));
    setMinPrice(searchParams.get("min") ?? "");
    setMaxPrice(searchParams.get("max") ?? "");
    setSelectedBeds(parseNullableInt(searchParams.get("beds")));
    setSelectedBaths(parseNullableInt(searchParams.get("baths")));

    // If `q` contains multiple selections (joined by "|"), rebuild chips so
    // the UI stays in multi-select mode after navigation.
    const tokens = qCombined
      .split("|")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tokens.length > 0) {
      // Always render URL `q` as chips to avoid duplicating the same text
      // in both the chips + the input after navigation.
      setSelectedItems(tokens.map((t) => ({ label: t, full: t, type: "query" })));
      setSearchQuery("");
      setShowOverflowPopover(false);
    } else {
      setSelectedItems([]);
      setSearchQuery("");
      setShowOverflowPopover(false);
    }
  }, [searchParams]);

  // Suggestions: debounced, abortable lookup (mirrors HeroSearchCardV2 behavior).
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
  }, [searchQuery]);

  // Close suggestions on outside click.
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideSuggestions = suggestionsRef.current?.contains(target);
      const isInsideMobileInput = mobileInputRef.current?.contains(target);
      const isInsideDesktopInput = desktopInputRef.current?.contains(target);
      if (!isInsideSuggestions && !isInsideMobileInput && !isInsideDesktopInput) {
        setShowSuggestions(false);
      }

      if (
        overflowPopRef.current &&
        !overflowPopRef.current.contains(target) &&
        overflowBtnRef.current &&
        !overflowBtnRef.current.contains(target)
      ) {
        setShowOverflowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Sticky sentinel
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Hide when footer visible
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setIsHiddenByFooter(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const buildUrl = useCallback(
    (
      tx: TransactionType = transactionType,
      options?: {
        qOverride?: string | null;
        ignoreSelections?: boolean;
        typesOverride?: string[];
        minOverride?: string;
        maxOverride?: string;
        bedsOverride?: number | null;
        bathsOverride?: number | null;
      }
    ) => {
      const params = new URLSearchParams();
      const queryFromSelections =
        !options?.ignoreSelections && selectedItems.length > 0
          ? selectedItems.map(getSuggestionQueryText).join(" | ")
          : "";
      const q =
        options?.qOverride !== undefined
          ? options.qOverride ?? ""
          : queryFromSelections || searchQuery;
      if (q) params.set("q", q);
      const typeCsv = serializePropertyTypesForQuery(
        options?.typesOverride ?? selectedPropertyTypes
      );
      if (typeCsv) params.set("type", typeCsv);
      const minToUse = options?.minOverride ?? minPrice;
      const maxToUse = options?.maxOverride ?? maxPrice;
      if (minToUse) params.set("min", minToUse);
      if (maxToUse) params.set("max", maxToUse);
      const bedsToUse = options?.bedsOverride ?? selectedBeds;
      const bathsToUse = options?.bathsOverride ?? selectedBaths;
      if (bedsToUse != null) params.set("beds", String(bedsToUse));
      if (bathsToUse != null) params.set("baths", String(bathsToUse));
      // Optional readability: `URLSearchParams` serializes spaces as `+`.
      // If you prefer `%20`, keep this replace.
      const query = params.toString().replace(/\+/g, "%20");
      const basePath = isOffPlan ? "/off-plan-properties/in-dubai" : `/properties/${tx}/in-dubai`;
      return `${basePath}${query ? `?${query}` : ""}`;
    },
    [
      searchQuery,
      selectedItems,
      selectedPropertyTypes,
      minPrice,
      maxPrice,
      selectedBeds,
      selectedBaths,
      transactionType,
      isOffPlan,
    ]
  );

  const handlePriceDone = useCallback(
    (next: { min: string; max: string }) => {
      setMinPrice(next.min);
      setMaxPrice(next.max);
      // Update URL immediately so the server page fetches filtered results.
      router.push(
        buildUrl(transactionType, {
          minOverride: next.min,
          maxOverride: next.max,
        })
      );
    },
    [router, buildUrl, transactionType]
  );

  const handleBedsBathsDone = useCallback(
    (next: { beds: number | null; baths: number | null }) => {
      setSelectedBeds(next.beds);
      setSelectedBaths(next.baths);
      router.push(
        buildUrl(transactionType, {
          bedsOverride: next.beds,
          bathsOverride: next.baths,
        })
      );
    },
    [router, buildUrl, transactionType]
  );

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const tx = transactionType;

    const queryFromSelections =
      selectedItems.length > 0 ? selectedItems.map(getSuggestionQueryText).join(" | ") : "";
    const q = (queryFromSelections || searchQuery || "").trim();

    // Prefer `search=<seo-slug>` when we have a location query; keep other filters as query params.
    if (q) {
      const slug = generateSeoSlug(q);
      const params = new URLSearchParams();
      if (slug) params.set("search", slug);
      const typeCsv = serializePropertyTypesForQuery(selectedPropertyTypes);
      if (typeCsv) params.set("type", typeCsv);
      if (minPrice) params.set("min", minPrice);
      if (maxPrice) params.set("max", maxPrice);
      if (selectedBeds != null) params.set("beds", String(selectedBeds));
      if (selectedBaths != null) params.set("baths", String(selectedBaths));
      const extra = params.toString().replace(/\+/g, "%20");
      const basePath = isOffPlan ? "/off-plan-properties/in-dubai" : `/properties/${tx}/in-dubai`;
      router.push(`${basePath}${extra ? `?${extra}` : ""}`);
    } else {
      router.push(buildUrl());
    }
    setFilterPanelOpen(false);
    setShowSuggestions(false);
  };

  const hasActiveFilters = !!(
    selectedPropertyTypes.length ||
    minPrice ||
    maxPrice ||
    selectedBeds != null ||
    selectedBaths != null
  );

  const handleListingSelect = (tx: TransactionType) => {
    if (isOffPlan) return;
    router.push(`/properties/${tx}/in-dubai`);
  };

  const handleSuggestionSelect = (s: PropertySuggestion) => {
    const sid = getSuggestionId(s);
    setSelectedItems((prev) =>
      prev.some((x) => getSuggestionId(x) === sid) ? prev : [...prev, s]
    );
    setSearchQuery("");
    setShowSuggestions(false);
    mobileInputRef.current?.focus();
    desktopInputRef.current?.focus();
  };

  const handleRemoveSelected = (id: string) => {
    setSelectedItems((prev) => prev.filter((s) => getSuggestionId(s) !== id));
    if (overflowItems.length <= 1) setShowOverflowPopover(false);
  };

  const handleClearAllSelected = () => {
    setSelectedItems([]);
    setSearchQuery("");
    setShowOverflowPopover(false);
    router.push(buildUrl(transactionType, { qOverride: "", ignoreSelections: true }));
  };

  const handleApplyPropertyTypes = (next: string[]) => {
    setSelectedPropertyTypes(next);
    router.push(buildUrl(transactionType, { typesOverride: next }));
  };

  const suggestionsDropdown =
    showSuggestions &&
    searchQuery.trim().length >= 2 &&
    (suggestions.length > 0 || isFetchingSuggestions) ? (
      <ul
        ref={suggestionsRef}
        role="listbox"
        aria-label="Property suggestions"
        className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-y-auto rounded-xl bg-white py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_10px_24px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04]"
        style={{ maxHeight: `${SUGGESTIONS_MAX_HEIGHT_PX}px` }}
      >
        {suggestions.map((s, i) => (
          <li key={getSuggestionId(s)} role="option" aria-selected={false}>
            <button
              type="button"
              onMouseDown={() => handleSuggestionSelect(s)}
              className={`w-full cursor-pointer px-4 py-3 text-left text-sm transition-colors duration-150 ${
                i > 0 ? "border-t border-[var(--border-light)]" : ""
              } hover:bg-[var(--soft-sand)]/40`}
              style={{ color: "var(--charcoal)" }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightMatchesToHtml(
                    getSuggestionDisplayText(s),
                    searchQuery
                  ),
                }}
              />
            </button>
          </li>
        ))}
        {isFetchingSuggestions && suggestions.length === 0 && (
          <li className="px-4 py-3 text-sm" style={{ color: "rgba(51,51,51,0.55)" }}>
            Searching…
          </li>
        )}
      </ul>
    ) : null;

  const barContent = (
    <form onSubmit={handleSearch} className="w-full">
      {/* Mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="relative flex-1 min-w-0">
          <label htmlFor="property-search-mobile" className="sr-only">
            Search properties
          </label>
          <div
            className="flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-[var(--rocky-blue)]/40 focus-within:ring-offset-1"
            style={{ borderColor: "var(--border-light)" }}
          >
            {visibleItems.map((item) => (
              <TagChip
                key={getSuggestionId(item)}
                label={getChipLabel(item)}
                onRemove={() => handleRemoveSelected(getSuggestionId(item))}
              />
            ))}

            {overflowCount > 0 && (
              <div className="relative">
                <button
                  ref={overflowBtnRef}
                  type="button"
                  onClick={() => setShowOverflowPopover((v) => !v)}
                  aria-label={`Show ${overflowCount} more selected items`}
                  className={[
                    "inline-flex items-center gap-1 rounded-md px-2.5 py-1",
                    "text-[0.72rem] font-semibold whitespace-nowrap cursor-pointer",
                    "border transition-colors duration-150",
                    showOverflowPopover
                      ? "bg-[var(--rocky-blue)] text-white border-[var(--rocky-blue)]"
                      : "bg-[rgba(28,78,128,0.08)] text-[var(--rocky-blue)] border-[rgba(28,78,128,0.18)] hover:bg-[rgba(28,78,128,0.14)]",
                  ].join(" ")}
                >
                  +{overflowCount} More
                </button>

                {showOverflowPopover && (
                  <div
                    ref={overflowPopRef}
                    className="absolute left-0 top-full z-50 mt-1.5 min-w-[180px] overflow-hidden rounded-lg border bg-white shadow-[0_10px_28px_rgba(8,31,58,0.16)]"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="border-b px-3 py-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "rgba(28,78,128,0.45)" }}>
                        {overflowCount} More Selected
                      </span>
                    </div>
                    <ul className="m-0 list-none overflow-y-auto p-0" style={{ maxHeight: "152px" }}>
                      {overflowItems.map((item, i) => (
                        <li
                          key={getSuggestionId(item)}
                          className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? "border-t" : ""}`}
                          style={{ borderColor: "rgba(0,0,0,0.06)" }}
                        >
                          <span className="min-w-0 truncate text-[0.82rem] font-medium" style={{ color: "var(--charcoal)" }}>
                            {getChipLabel(item)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelected(getSuggestionId(item))}
                            aria-label={`Remove ${getChipLabel(item)}`}
                            className="ml-3 flex size-6 items-center justify-center rounded-full hover:bg-[rgba(28,78,128,0.1)] transition-colors border-none cursor-pointer bg-transparent text-[var(--rocky-blue)] shrink-0"
                          >
                            <ChipCloseIcon width="10" height="10" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedItems.length > 1 && (
              <button
                type="button"
                onClick={handleClearAllSelected}
                aria-label="Clear all selected"
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[0.68rem] font-semibold"
                style={{
                  borderColor: "rgba(220,50,50,0.25)",
                  backgroundColor: "rgba(220,50,50,0.06)",
                  color: "#C0392B",
                }}
              >
                <ChipCloseIcon width="10" height="10" /> Clear all
              </button>
            )}

            <input
              id="property-search-mobile"
              type="search"
              value={searchQuery}
              ref={mobileInputRef}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={
                selectedItems.length === 0
                  ? "Search location, community, building..."
                  : "Add more..."
              }
              className="min-w-[120px] flex-1 bg-transparent py-0.5 outline-none"
              style={{ color: "var(--charcoal)" }}
              autoComplete="off"
            />
          </div>
          {suggestionsDropdown}
        </div>
        <button
          type="button"
          onClick={() => setFilterPanelOpen((p) => !p)}
          aria-expanded={filterPanelOpen}
          aria-label={filterPanelOpen ? "Close filters" : "Open filters"}
          className={`relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1 ${filterPanelOpen || hasActiveFilters
            ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)] text-white"
            : "border-[var(--border-light)] bg-white text-[var(--charcoal)]"
            }`}
        >
          <FilterFunnelIcon />
          {hasActiveFilters && (
            <span
              className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-[var(--charcoal)]"
              aria-hidden
            />
          )}
        </button>

        {/* Mobile filter panel */}
        {filterPanelOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter properties"
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-light)] px-5 py-4">
              <h3 className="text-base font-medium" style={{ color: "var(--rocky-blue)" }}>
                Filters
              </h3>
              <button
                type="button"
                onClick={() => setFilterPanelOpen(false)}
                aria-label="Close filters"
                className="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:bg-[var(--soft-sand)]/30"
                style={{ color: "var(--charcoal)" }}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-5">
                {!isOffPlan && (
                  <ListingDropdown
                    transactionType={transactionType}
                    onSelect={handleListingSelect}
                  />
                )}
                <PropertyTypeCategoryDropdown
                  categories={propertyTypesHydrated ? propertyTypesByCategory : undefined}
                  value={selectedPropertyTypes}
                  onApply={handleApplyPropertyTypes}
                />
                <BedsBathsDropdown
                  bedsValue={selectedBeds}
                  bathsValue={selectedBaths}
                  onDone={handleBedsBathsDone}
                />
                <PriceRangeDropdown
                  minValue={minPrice}
                  maxValue={maxPrice}
                  options={priceOptions}
                  onDone={handlePriceDone}
                />
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--rocky-blue)] font-medium text-white shadow-sm transition-all hover:bg-[var(--rocky-blue-hover)] hover:shadow-md"
                >
                  <ToolbarSearchIcon /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        
        {!isOffPlan && (
          <div className="shrink-0 min-w-[120px]">
            <ListingDropdown
              transactionType={transactionType}
              onSelect={handleListingSelect}
            />
          </div>
        )}

        <div className="relative flex-1 min-w-0">
          <label htmlFor="property-search-desktop" className="sr-only">
            Search properties
          </label>
          <div
            className="flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-[var(--rocky-blue)]/40 focus-within:ring-offset-1"
            style={{ borderColor: "var(--border-light)" }}
          >
            {visibleItems.map((item) => (
              <TagChip
                key={getSuggestionId(item)}
                label={getChipLabel(item)}
                onRemove={() => handleRemoveSelected(getSuggestionId(item))}
              />
            ))}

            {overflowCount > 0 && (
              <div className="relative">
                <button
                  ref={overflowBtnRef}
                  type="button"
                  onClick={() => setShowOverflowPopover((v) => !v)}
                  aria-label={`Show ${overflowCount} more selected items`}
                  className={[
                    "inline-flex items-center gap-1 rounded-md px-2.5 py-1",
                    "text-[0.72rem] font-semibold whitespace-nowrap cursor-pointer",
                    "border transition-colors duration-150",
                    showOverflowPopover
                      ? "bg-[var(--rocky-blue)] text-white border-[var(--rocky-blue)]"
                      : "bg-[rgba(28,78,128,0.08)] text-[var(--rocky-blue)] border-[rgba(28,78,128,0.18)] hover:bg-[rgba(28,78,128,0.14)]",
                  ].join(" ")}
                >
                  +{overflowCount} More
                </button>

                {showOverflowPopover && (
                  <div
                    ref={overflowPopRef}
                    className="absolute left-0 top-full z-50 mt-1.5 min-w-[180px] overflow-hidden rounded-lg border bg-white shadow-[0_10px_28px_rgba(8,31,58,0.16)]"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="border-b px-3 py-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase" style={{ color: "rgba(28,78,128,0.45)" }}>
                        {overflowCount} More Selected
                      </span>
                    </div>
                    <ul className="m-0 list-none overflow-y-auto p-0" style={{ maxHeight: "152px" }}>
                      {overflowItems.map((item, i) => (
                        <li
                          key={getSuggestionId(item)}
                          className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? "border-t" : ""}`}
                          style={{ borderColor: "rgba(0,0,0,0.06)" }}
                        >
                          <span className="min-w-0 truncate text-[0.82rem] font-medium" style={{ color: "var(--charcoal)" }}>
                            {getChipLabel(item)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSelected(getSuggestionId(item))}
                            aria-label={`Remove ${getChipLabel(item)}`}
                            className="ml-3 flex size-6 items-center justify-center rounded-full hover:bg-[rgba(28,78,128,0.1)] transition-colors border-none cursor-pointer bg-transparent text-[var(--rocky-blue)] shrink-0"
                          >
                            <ChipCloseIcon width="10" height="10" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {selectedItems.length > 1 && (
              <button
                type="button"
                onClick={handleClearAllSelected}
                aria-label="Clear all selected"
                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[0.68rem] font-semibold"
                style={{
                  borderColor: "rgba(220,50,50,0.25)",
                  backgroundColor: "rgba(220,50,50,0.06)",
                  color: "#C0392B",
                }}
              >
                <ChipCloseIcon width="10" height="10" /> Clear all
              </button>
            )}

            <input
              id="property-search-desktop"
              type="search"
              value={searchQuery}
              ref={desktopInputRef}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={
                selectedItems.length === 0
                  ? "Search location, community, building..."
                  : "Add more..."
              }
              className="min-w-[140px] flex-1 bg-transparent py-0.5 outline-none placeholder:text-[var(--charcoal)]/50"
              style={{ color: "var(--charcoal)" }}
              autoComplete="off"
            />
          </div>
          {suggestionsDropdown}
        </div>
        <div className="shrink-0 min-w-[220px]">
          <PropertyTypeCategoryDropdown
            categories={propertyTypesHydrated ? propertyTypesByCategory : undefined}
            value={selectedPropertyTypes}
            onApply={handleApplyPropertyTypes}
          />
        </div>
        <div className="shrink-0 min-w-[220px]">
          <BedsBathsDropdown
            bedsValue={selectedBeds}
            bathsValue={selectedBaths}
            onDone={handleBedsBathsDone}
          />
        </div>
        <div className="shrink-0 min-w-[220px]">
          <PriceRangeDropdown
            minValue={minPrice}
            maxValue={maxPrice}
            options={priceOptions}
            onDone={handlePriceDone}
          />
        </div>
        <button
          type="submit"
          aria-label="Search properties"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[var(--rocky-blue)] text-white transition-colors hover:bg-[var(--rocky-blue-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        >
          <ToolbarSearchIcon />
        </button>
      </div>
    </form>
  );

  const sectionClass = "py-4 md:py-6 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]";
  const sectionStyle = { backgroundColor: "#faf9f7" };

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Static bar */}
      <div
        ref={barRef}
        className={`w-full transition-opacity duration-300 ${isSticky ? "invisible opacity-0" : "visible opacity-100"
          }`}
      >
        <section className={sectionClass} style={sectionStyle} aria-label="Property search">
          <Container>{barContent}</Container>
        </section>
      </div>

      {/* Sticky bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${isSticky && !isHiddenByFooter
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
          }`}
        aria-hidden={!isSticky || isHiddenByFooter}
      >
        <section className={sectionClass} style={sectionStyle} aria-label="Property search">
          <Container>{barContent}</Container>
        </section>
      </div>
    </>
  );
};

export default PropertySearchBar;