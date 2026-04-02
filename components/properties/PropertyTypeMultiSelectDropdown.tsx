"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export function serializePropertyTypesForQuery(types: string[]): string {
  return Array.from(new Set(types.map((v) => String(v ?? "").trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b))
    .join(",");
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

export default function PropertyTypeMultiSelectDropdown({
  options,
  value,
  onApply,
  label = "Property Type",
  placeholder = "Select type",
}: {
  options: string[];
  value: string[];
  onApply: (next: string[]) => void;
  label?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<string[]>(value);

  const sortedOptions = useMemo(() => dedupeAndSort(options), [options]);
  const appliedCount = dedupeAndSort(value).length;
  const displayLabel = appliedCount > 0 ? `${appliedCount} selected` : placeholder;

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
    setDraft(dedupeAndSort(value));
  }, [open, value]);

  const handleReset = () => {
    setDraft([]);
    onApply([]);
  };

  const handleToggle = (opt: string) => {
    setDraft((prev) => dedupeAndSort(toggleInList(prev, opt)));
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
          className="absolute left-0 top-full z-50 mt-1.5 w-[min(520px,calc(100vw-2rem))] max-h-[min(420px,70vh)] overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(8,31,58,0.14)] ring-1 ring-black/[0.05] flex flex-col"
        >
          <div className="overflow-y-auto p-3 flex-1 min-h-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {sortedOptions.map((opt) => {
                const checked = draft.includes(opt);
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
                        "flex size-4 shrink-0 items-center justify-center rounded border",
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

            {sortedOptions.length === 0 && (
              <div className="py-8 text-center text-sm" style={{ color: "rgba(51,51,51,0.55)" }}>
                No options available.
              </div>
            )}
          </div>

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
