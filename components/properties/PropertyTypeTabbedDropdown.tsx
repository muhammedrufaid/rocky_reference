"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type PropertyCategory = "Residential" | "Commercial";

export type PropertyTypeRow = {
  type: string;
  category: string;
};

export type PropertyTypeMultiSelection = {
  residential: string[];
  commercial: string[];
};

export const EMPTY_PROPERTY_TYPE_MULTI_SELECTION: PropertyTypeMultiSelection = {
  residential: [],
  commercial: [],
};

export function serializePropertyTypeMultiSelectionForQuery(
  value: PropertyTypeMultiSelection
): string {
  const all = [...(value.residential ?? []), ...(value.commercial ?? [])]
    .map((v) => String(v ?? "").trim())
    .filter(Boolean);
  return Array.from(new Set(all))
    .sort((a, b) => a.localeCompare(b))
    .join(",");
}

function normalizeCategory(value: string): PropertyCategory | null {
  const v = String(value ?? "").trim().toLowerCase();
  if (v === "residential") return "Residential";
  if (v === "commercial") return "Commercial";
  return null;
}

function dedupeAndSort(values: string[]) {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function toggleInList(list: string[], item: string) {
  const normalized = String(item ?? "").trim();
  if (!normalized) return list;
  return list.includes(normalized) ? list.filter((x) => x !== normalized) : [...list, normalized];
}

function getSelectedForTab(value: PropertyTypeMultiSelection, tab: PropertyCategory) {
  return tab === "Residential" ? value.residential : value.commercial;
}

function setSelectedForTab(
  value: PropertyTypeMultiSelection,
  tab: PropertyCategory,
  nextList: string[]
): PropertyTypeMultiSelection {
  return tab === "Residential"
    ? { ...value, residential: nextList }
    : { ...value, commercial: nextList };
}

function sanitizeExclusive(
  value: PropertyTypeMultiSelection,
  preferCategory: PropertyCategory
): PropertyTypeMultiSelection {
  const resCount = value.residential?.length ?? 0;
  const comCount = value.commercial?.length ?? 0;
  if (resCount === 0 || comCount === 0) return value;
  return preferCategory === "Residential"
    ? { ...value, commercial: [] }
    : { ...value, residential: [] };
}

function getActiveCategory(value: PropertyTypeMultiSelection): PropertyCategory | null {
  const resCount = value.residential?.length ?? 0;
  const comCount = value.commercial?.length ?? 0;
  if (resCount > 0) return "Residential";
  if (comCount > 0) return "Commercial";
  return null;
}

function getActiveCount(value: PropertyTypeMultiSelection): number {
  const active = getActiveCategory(value);
  if (!active) return 0;
  return active === "Residential"
    ? (value.residential?.length ?? 0)
    : (value.commercial?.length ?? 0);
}

function getDropdownLabel(value: PropertyTypeMultiSelection, placeholder: string): string {
  const active = getActiveCategory(value);
  if (!active) return placeholder;
  return `${active} (${getActiveCount(value)})`;
}

export default function PropertyTypeTabbedDropdown({
  rows,
  value,
  onApply,
  label = "Property Type",
  placeholder = "Select Type",
  initialTab = "Residential",
}: {
  rows: PropertyTypeRow[];
  value: PropertyTypeMultiSelection;
  onApply: (next: PropertyTypeMultiSelection) => void;
  label?: string;
  placeholder?: string;
  initialTab?: PropertyCategory;
}) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PropertyCategory>(initialTab);
  const ref = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<PropertyTypeMultiSelection>(value);
  const [lastActiveCategory, setLastActiveCategory] = useState<PropertyCategory>(initialTab);

  const residentialOptions = useMemo(
    () =>
      dedupeAndSort(
        rows
          .filter((r) => normalizeCategory(r.category) === "Residential")
          .map((r) => r.type)
      ),
    [rows]
  );
  const commercialOptions = useMemo(
    () =>
      dedupeAndSort(
        rows
          .filter((r) => normalizeCategory(r.category) === "Commercial")
          .map((r) => r.type)
      ),
    [rows]
  );

  const optionsForTab = activeTab === "Residential" ? residentialOptions : commercialOptions;
  const selectedCount = getActiveCount(draft);
  const selectedLabel = getDropdownLabel(draft, placeholder);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // When opening, start with latest applied value.
  useEffect(() => {
    if (!open) return;
    setDraft(sanitizeExclusive(value, lastActiveCategory));
  }, [open, value, lastActiveCategory]);

  const handleTabChange = (tab: PropertyCategory) => setActiveTab(tab);

  const handleReset = () => {
    setDraft(EMPTY_PROPERTY_TYPE_MULTI_SELECTION);
    onApply(EMPTY_PROPERTY_TYPE_MULTI_SELECTION);
  };

  const handleToggle = (opt: string) => {
    setDraft((prev) => {
      setLastActiveCategory(activeTab);
      const sanitized = sanitizeExclusive(prev, activeTab);
      const current = getSelectedForTab(sanitized, activeTab);
      const next = toggleInList(current, opt);
      const nextValue = setSelectedForTab(sanitized, activeTab, next);
      // Enforce mutual exclusivity: selecting in one tab clears the other bucket.
      return sanitizeExclusive(nextValue, activeTab);
    });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${selectedLabel}`}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">
          {selectedCount > 0 ? (
            <span className="text-[var(--charcoal)]">{selectedLabel}</span>
          ) : (
            <span className="text-[var(--charcoal)]/60">{placeholder}</span>
          )}
        </span>
        <svg
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-1.5 w-[min(520px,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(8,31,58,0.14)] ring-1 ring-black/[0.05]"
        >
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b px-3 pt-3" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            {(["Residential", "Commercial"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={[
                    "relative flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    isActive ? "bg-[var(--rocky-blue)] text-white" : "bg-[rgba(28,78,128,0.06)] text-[var(--rocky-blue)] hover:bg-[rgba(28,78,128,0.10)]",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Options */}
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {optionsForTab.map((opt) => {
                const checked = getSelectedForTab(draft, activeTab).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggle(opt)}
                    className={[
                      "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                      checked
                        ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)]/8"
                        : "border-[rgba(0,0,0,0.08)] hover:bg-[var(--soft-sand)]/30",
                    ].join(" ")}
                    style={{ color: "var(--charcoal)" }}
                    role="checkbox"
                    aria-checked={checked}
                  >
                    <span className="truncate font-medium">{opt}</span>
                    <span
                      className={[
                        "flex size-4 items-center justify-center rounded border",
                        checked
                          ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)]"
                          : "border-[rgba(0,0,0,0.22)]",
                      ].join(" ")}
                      aria-hidden
                    >
                      {checked && (
                        <svg
                          className="size-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {optionsForTab.length === 0 && (
              <div className="py-8 text-center text-sm" style={{ color: "rgba(51,51,51,0.55)" }}>
                No options available.
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex items-center justify-between gap-3 border-t px-3 py-3"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[rgba(220,50,50,0.06)]"
              style={{ color: "#C0392B" }}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                setOpen(false);
              }}
              className="rounded-lg bg-[var(--rocky-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--rocky-blue-hover)]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

