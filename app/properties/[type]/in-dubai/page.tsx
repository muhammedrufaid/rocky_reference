import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyListingGrid from "@/components/properties/PropertyListingGrid";
import { Suspense } from "react";
import {
  getBuyProperties,
  getOffPlanProperties,
  getRentProperties,
  getTotalFromApiResponse,
  mapApiResponseToPropertyListings,
} from "@/utils/getServices";
import { areaSearchTermsFromPropertyFilters } from "@/utils/seo";
import PropertySearchBar from "@/components/properties/PropertySearchBar";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import ValuationCTA from "@/components/home/ValuationCTA";
import Newsletter from "@/components/home/Newsletter";

const PAGE_SIZE = 20;

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{
    q?: string;
    search?: string;
    type?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}) {
  const { type } = await params;
  const filters = await searchParams;
  if (type !== "rent" && type !== "buy") {
    notFound();
  }
  const offPlanPropertiesData = await getOffPlanProperties();
  const currentPage = Math.max(1, parseInt(filters.page ?? "1", 10) || 1);

  const areaTerms = areaSearchTermsFromPropertyFilters(filters.q, filters.search);
  const searchForApi =
    areaTerms != null
      ? areaTerms.length > 1
        ? areaTerms
        : areaTerms[0]
      : undefined;

  const apiData =
    type === "buy"
      ? await getBuyProperties({
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchForApi,
          propertyType: filters.type,
          min: filters.min,
          max: filters.max,
        })
      : await getRentProperties({
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchForApi,
          propertyType: filters.type,
          min: filters.min,
          max: filters.max,
        });

  const listings = apiData
    ? mapApiResponseToPropertyListings(apiData, type === "buy" ? "Buy" : "Rent")
    : [];
    
  const totalItems = apiData ? getTotalFromApiResponse(apiData) : undefined;
  const totalPages =
    totalItems != null ? Math.max(1, Math.ceil(totalItems / PAGE_SIZE)) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

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
        {/* <ValuationCTA /> */}
        <Newsletter />
        <TestimonialSection />

        {/* <PropertiesList type={type} searchParams={filters} /> */}
      </main>
      <Footer />
    </div>
  );
}
