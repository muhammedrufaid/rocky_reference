"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/common/Pagination";

const PAGE_SIZE = 20;

interface PropertiesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  basePath: string;
}

/** Client pagination that updates URL (preserves filters). */
export default function PropertiesPagination({
  currentPage,
  totalPages,
  totalItems,
  basePath,
}: PropertiesPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const query = params.toString();
    return `${basePath}${query ? `?${query}` : ""}`;
  };

  const handlePageChange = (page: number) => {
    router.push(buildPageUrl(page));
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      totalItems={totalItems}
      pageSize={PAGE_SIZE}
      className="mt-8"
    />
  );
}
