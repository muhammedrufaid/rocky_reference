import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyListingGrid from "@/components/properties/PropertyListingGrid";
import { Suspense } from "react";
import {
  getBuyProperties,
  getOffPlanProperties,
  getRentProperties,
  mapApiResponseToPropertyListings,
} from "@/utils/getServices";
import { filterPropertyListings } from "@/utils/data";
import PropertySearchBar from "@/components/properties/PropertySearchBar";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";

const PAGE_SIZE = 20;
/** Fetch a large batch so we can filter & paginate on the frontend */
const FETCH_LIMIT = 500;

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ q?: string; type?: string; min?: string; max?: string; page?: string }>;
}) {
  const { type } = await params;
  const filters = await searchParams;
  if (type !== "rent" && type !== "buy") {
    notFound();
  }
  const offPlanPropertiesData = await getOffPlanProperties();
  const currentPage = Math.max(1, parseInt(filters.page ?? "1", 10) || 1);

  // Fetch ALL properties without filter params (API doesn't support filtering)
  const apiData =
    type === "buy"
      ? await getBuyProperties({ page: 1, limit: FETCH_LIMIT })
      : await getRentProperties({ page: 1, limit: FETCH_LIMIT });

  const allListings = apiData
    ? mapApiResponseToPropertyListings(apiData, type === "buy" ? "Buy" : "Rent")
    : [];

  // ── Client-side filtering ──────────────────────────────────────────────────
  const hasFilters = !!(filters.q || filters.type || filters.min || filters.max);

  const filteredListings = hasFilters
    ? filterPropertyListings(allListings, {
      listingType: type as "buy" | "rent",
      propertyType: filters.type,
      minPrice: filters.min,
      maxPrice: filters.max,
      searchQuery: filters.q,
    })
    : allListings;

  // ── Pagination on filtered results ─────────────────────────────────────────
  const totalItems = filteredListings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * PAGE_SIZE;
  const listings = filteredListings.slice(startIdx, startIdx + PAGE_SIZE);

  const basePath = `/properties/${type}/in-dubai`;

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid hideOnScroll />
      <main className="pt-16 md:pt-20">
        {/* <PageHero
          title={title}
          description="Discover premium properties across Dubai's most sought-after communities."
          breadcrumb={breadcrumb}
        /> */}
        {/* <Suspense fallback={<div className="h-24" style={{ backgroundColor: "#faf9f7" }} />}>
          <PropertyFilterBar type={type} />
        </Suspense> */}
        <Suspense fallback={<div className="h-18" />}>
          <PropertySearchBar />
        </Suspense>
        <PropertyListingGrid
          listings={listings}
          pagination={{
            currentPage: safeCurrentPage,
            totalPages,
            totalItems,
            basePath,
          }}
        />
        <FeaturedOffPlanProjects data={offPlanPropertiesData} />
        <TestimonialSection />

        {/* <PropertiesList type={type} searchParams={filters} /> */}
      </main>
      <Footer />
    </div>
  );
}
