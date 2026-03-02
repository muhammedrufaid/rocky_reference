import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyListingGrid from "@/components/properties/PropertyListingGrid";
import PropertyFilterBar from "@/components/layout/PropertyFilterBar";
import { Suspense } from "react";
import {
  getBuyProperties,
  getRentProperties,
  mapApiResponseToPropertyListings,
  getTotalFromApiResponse,
} from "@/utils/getServices";

const PAGE_SIZE = 20;

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

  const currentPage = Math.max(1, parseInt(filters.page ?? "1", 10) || 1);

  const apiData =
    type === "buy"
      ? await getBuyProperties({
          page: currentPage,
          limit: PAGE_SIZE,
          q: filters.q,
          type: filters.type,
          min: filters.min,
          max: filters.max,
        })
      : await getRentProperties({
          page: currentPage,
          limit: PAGE_SIZE,
          q: filters.q,
          type: filters.type,
          min: filters.min,
          max: filters.max,
        });

  const listings = apiData
    ? mapApiResponseToPropertyListings(apiData, type === "buy" ? "Buy" : "Rent")
    : [];

  const totalFromApi = apiData ? getTotalFromApiResponse(apiData) : undefined;
  const totalItems = totalFromApi ?? undefined;
  const totalPages =
    totalFromApi != null
      ? Math.max(1, Math.ceil(totalFromApi / PAGE_SIZE))
      : listings.length >= PAGE_SIZE
        ? currentPage + 1
        : currentPage;

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
        <Suspense fallback={<div className="h-24" style={{ backgroundColor: "#faf9f7" }} />}>
          <PropertyFilterBar type={type} />
        </Suspense>
        <PropertyListingGrid
          listings={listings}
          pagination={{
            currentPage,
            totalPages,
            totalItems,
            basePath,
          }}
        />
        {/* <PropertiesList type={type} searchParams={filters} /> */}
      </main>
      <Footer />
    </div>
  );
}
