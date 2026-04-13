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

// Fallback classification so the UI can hydrate from URL params immediately,
// before category options are fetched from the API.
const FALLBACK_RESIDENTIAL_TYPES = new Set(
  ["Apartment", "Penthouse", "Townhouse", "Villa", "Residential Land"].map((t) =>
    t.toLowerCase()
  )
);

function inferTabFromSelection(selectedRaw: string[]): TabKey | null {
  const selected = dedupeAndSort(selectedRaw);
  if (selected.length === 0) return null;
  const allResidential = selected.every((t) =>
    FALLBACK_RESIDENTIAL_TYPES.has(t.toLowerCase())
  );
  if (allResidential) return "residential";
  // If it's not entirely residential, we treat it as commercial for labeling purposes.
  // This matches your homepage behavior where "Commercial" = all non-residential types.
  return "commercial";
}

function computeDropdownLabel(applied: string[], categories?: PropertyTypesByCategory, placeholder = "Select type") {
  const selected = dedupeAndSort(applied);
  if (selected.length === 0) return placeholder;
  if (selected.length === 1) return selected[0];

  // If categories haven't hydrated yet, infer a stable label from the selection
  // to avoid the "7 selected" flicker on first render.
  const inferred = inferTabFromSelection(selected);
  if (!categories) {
    if (inferred === "residential") return `Residential (${selected.length})`;
    if (inferred === "commercial") return `Commercial (${selected.length})`;
    return `${selected.length} selected`;
  }

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

  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    // Pick the correct tab on first render (URL-hydrated), even before categories load.
    return inferTabFromSelection(value) ?? "residential";
  });
  // Keep per-tab draft selections so switching tabs doesn't "lose" ticks.
  // We only enforce mutual exclusivity when the user clicks "Done".
  const [draftResidential, setDraftResidential] = useState<string[]>([]);
  const [draftCommercial, setDraftCommercial] = useState<string[]>([]);

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

  const tabOptions =
    activeTab === "residential" ? residentialOptions : commercialOptions;

  const draft = useMemo(
    () => (activeTab === "residential" ? draftResidential : draftCommercial),
    [activeTab, draftResidential, draftCommercial]
  );

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
    // When opened, hydrate the per-tab drafts from the applied value.
    const next = dedupeAndSort(value);
    const inRes = next.every((t) => residentialSet.has(t.toLowerCase()));
    const inCom = next.every((t) => commercialSet.has(t.toLowerCase()));
    if (next.length > 0) {
      if (inCom && !inRes) setActiveTab("commercial");
      if (inRes && !inCom) setActiveTab("residential");
      // If options are not yet hydrated (empty sets), fall back to canonical inference.
      if (!inRes && !inCom && residentialSet.size === 0 && commercialSet.size === 0) {
        const inferred = inferTabFromSelection(next);
        if (inferred) setActiveTab(inferred);
      }
    }
    // Split the applied list across the two drafts.
    // If we don't have categories yet, split using the canonical residential allow-list.
    const nextRes: string[] = [];
    const nextCom: string[] = [];

    for (const t of next) {
      const lower = t.toLowerCase();
      const isRes =
        residentialSet.size > 0
          ? residentialSet.has(lower)
          : FALLBACK_RESIDENTIAL_TYPES.has(lower);
      (isRes ? nextRes : nextCom).push(t);
    }

    setDraftResidential(nextRes);
    setDraftCommercial(nextCom);
  }, [open, value, residentialSet, commercialSet]);

  const handleReset = () => {
    setDraftResidential([]);
    setDraftCommercial([]);
    onApply([]);
  };

  const handleToggle = (opt: string) => {
    if (activeTab === "residential") {
      setDraftResidential((prev) => dedupeAndSort(toggleInList(prev, opt)));
      return;
    }
    setDraftCommercial((prev) => dedupeAndSort(toggleInList(prev, opt)));
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
                      // Do not mutate draft selections on tab switch.
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
                // Enforce mutual exclusivity at apply-time:
                // - If both tabs have selections, apply the currently active tab only.
                // - Otherwise apply whichever tab has selections.
                const res = dedupeAndSort(draftResidential);
                const com = dedupeAndSort(draftCommercial);
                const both = res.length > 0 && com.length > 0;

                const next =
                  both
                    ? activeTab === "residential"
                      ? res
                      : com
                    : com.length > 0
                      ? com
                      : res;

                onApply(next);
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

