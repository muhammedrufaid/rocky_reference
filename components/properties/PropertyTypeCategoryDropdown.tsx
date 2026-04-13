"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { PropertyTypesByCategory } from "@/utils/getServices";

function dedupeAndSort(values: string[]) {
  return Array.from(new Set(values.map((v) => String(v ?? "").trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b)
  );
}

function toggleInList(list: string[], item: string) {
  const normalized = String(item ?? "").trim();
  if (!normalized) return list;
  return list.includes(normalized) ? list.filter((x) => x !== normalized) : [...list, normalized];
}

type TabKey = "residential" | "commercial";

function computeDropdownLabel(applied: string[], categories?: PropertyTypesByCategory, placeholder = "Select type") {
  const selected = dedupeAndSort(applied);
  if (selected.length === 0) return placeholder;
  if (selected.length === 1) return selected[0];

  if (!categories) return `${selected.length} selected`;

  const resSet = new Set((categories.residential ?? []).map((x) => x.toLowerCase()));
  const comSet = new Set((categories.commercial ?? []).map((x) => x.toLowerCase()));

  const inResidential = selected.every((t) => resSet.has(t.toLowerCase()));
  const inCommercial = selected.every((t) => comSet.has(t.toLowerCase()));

  if (inResidential) return `Residential (${selected.length})`;
  if (inCommercial) return `Commercial (${selected.length})`;
  return `${selected.length} selected`;
}

export default function PropertyTypeCategoryDropdown({
  categories,
  value,
  onApply,
  label = "Property Type",
  placeholder = "Select type",
}: {
  categories?: PropertyTypesByCategory;
  value: string[];
  onApply: (next: string[]) => void;
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TabKey>("residential");
  const [draft, setDraft] = useState<string[]>(value);

  const residentialOptions = useMemo(
    () => dedupeAndSort(categories?.residential ?? []),
    [categories?.residential]
  );
  const commercialOptions = useMemo(
    () => dedupeAndSort(categories?.commercial ?? []),
    [categories?.commercial]
  );

  const residentialSet = useMemo(
    () => new Set(residentialOptions.map((x) => x.toLowerCase())),
    [residentialOptions]
  );
  const commercialSet = useMemo(
    () => new Set(commercialOptions.map((x) => x.toLowerCase())),
    [commercialOptions]
  );

  const appliedCount = dedupeAndSort(value).length;
  const displayLabel = computeDropdownLabel(value, categories, placeholder);

  const tabOptions = activeTab === "residential" ? residentialOptions : commercialOptions;

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
    // Enforce mutual exclusivity between Residential and Commercial selections:
    // when opened, keep draft constrained to whichever category the current value fits.
    const next = dedupeAndSort(value);
    const inRes = next.every((t) => residentialSet.has(t.toLowerCase()));
    const inCom = next.every((t) => commercialSet.has(t.toLowerCase()));
    if (next.length > 0) {
      if (inCom && !inRes) setActiveTab("commercial");
      if (inRes && !inCom) setActiveTab("residential");
    }
    setDraft(next);
  }, [open, value]);

  const handleReset = () => {
    setDraft([]);
    onApply([]);
  };

  const handleToggle = (opt: string) => {
    setDraft((prev) => {
      const allowed =
        activeTab === "residential" ? residentialSet : commercialSet;
      // Drop any selections from the other category before toggling.
      const filtered = prev.filter((t) => allowed.has(t.toLowerCase()));
      return dedupeAndSort(toggleInList(filtered, opt));
    });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${displayLabel}`}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)]/40 focus:ring-offset-1"
        style={{ color: "var(--charcoal)", borderColor: "var(--border-light)" }}
      >
        <span className="truncate">
          {appliedCount > 0 ? (
            <span className="text-[var(--charcoal)]">{displayLabel}</span>
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
          className="absolute left-0 top-full z-50 mt-1.5 w-[min(560px,calc(100vw-2rem))] max-h-[min(440px,70vh)] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(8,31,58,0.14)] ring-1 ring-black/[0.05] flex flex-col"
        >
          {/* Tabs */}
          <div className="px-3 pt-3">
            <div
              className="flex items-center gap-2 rounded-xl border p-1"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
              role="tablist"
              aria-label="Property type category"
            >
              {([
                { key: "residential", label: "Residential" },
                { key: "commercial", label: "Commercial" },
              ] as const).map((t) => {
                const isActive = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveTab(t.key);
                      // Ensure only one category is selected at a time.
                      setDraft((prev) => {
                        const allowed =
                          t.key === "residential" ? residentialSet : commercialSet;
                        return prev.filter((x) => allowed.has(x.toLowerCase()));
                      });
                    }}
                    className={[
                      "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-[var(--rocky-blue)] text-white"
                        : "text-[var(--charcoal)] hover:bg-[var(--soft-sand)]/30",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options */}
          <div className="overflow-y-auto p-3 flex-1 min-h-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {tabOptions.map((opt) => {
                const checked = draft.includes(opt);
                return (
                  <button
                    key={`${activeTab}-${opt}`}
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
                        "flex size-4 shrink-0 items-center justify-center rounded border",
                        checked ? "border-[var(--rocky-blue)] bg-[var(--rocky-blue)]" : "border-[rgba(0,0,0,0.22)]",
                      ].join(" ")}
                      aria-hidden
                    >
                      {checked && (
                        <svg className="size-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {tabOptions.length === 0 && (
              <div className="py-8 text-center text-sm" style={{ color: "rgba(51,51,51,0.55)" }}>
                No options available.
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center justify-between gap-3 border-t px-3 py-3 shrink-0"
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

