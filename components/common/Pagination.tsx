"use client";

import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Total items count (optional, for "Showing X–Y of Z" text) */
  totalItems?: number;
  /** Items per page */
  pageSize?: number;
  /** Max visible page numbers around current (default 1) */
  siblingCount?: number;
  /** Additional class for the wrapper */
  className?: string;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/**
 * Minimal reusable pagination component.
 * Renders prev/next buttons and page numbers with ellipsis when needed.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 12,
  siblingCount = 1,
  className = "",
}) => {
  const showPageControls = totalPages > 1;
  if (!showPageControls && totalItems == null) return null;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getPageNumbers = () => {
    const left = Math.max(1, currentPage - siblingCount);
    const right = Math.min(totalPages, currentPage + siblingCount);
    const showLeftEllipsis = left > 2;
    const showRightEllipsis = right < totalPages - 1;

    if (showLeftEllipsis && showRightEllipsis) {
      return [1, "...", ...range(left, right), "...", totalPages];
    }
    if (showLeftEllipsis) {
      return [1, "...", ...range(left, totalPages)];
    }
    if (showRightEllipsis) {
      return [...range(1, right), "...", totalPages];
    }
    return range(1, totalPages);
  };

  const pages = getPageNumbers();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems ?? currentPage * pageSize);

  return (
    <nav
      className={`flex flex-wrap items-center justify-between gap-4 ${className}`}
      aria-label="Pagination"
    >
      {totalItems != null ? (
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Showing {startItem}&ndash;{endItem} of {totalItems}
        </p>
      ) : (
        <div />
      )}
      {showPageControls && (
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 py-1 text-gray-400 text-sm">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p as number)}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
                className={`min-w-[2rem] h-8 px-2 rounded-lg text-sm cursor-pointer font-medium transition-colors ${
                  p === currentPage
                    ? "bg-[#0d365e] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="p-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
      )}
    </nav>
  );
};

export default Pagination;
