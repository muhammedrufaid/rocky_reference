import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Newsletter from "@/components/home/Newsletter";
import { Suspense } from "react";
import DevelopersHeader from "@/components/off-plan-properties/DevelopersHeader";
import PropertySearchBar from "@/components/properties/PropertySearchBar";
import PropertyListingGrid from "@/components/properties/PropertyListingGrid";
import {
  getOffPlanProperties,
  getTotalFromApiResponse,
  mapApiResponseToPropertyListings,
} from "@/utils/getServices";
import { areaSearchTermsFromPropertyFilters } from "@/utils/seo";

const PAGE_SIZE = 20;

export const metadata = {
  title: "Developers | Rocky Real Estate",
  description:
    "Paperwork to handover — property management, brokerage, mortgage, professional inspection, listing & marketing, and after-sales support. Solutions tailored for Dubai's dynamic market.",
};

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    search?: string;
    type?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}) {
  const filters = await searchParams;
  const currentPage = Math.max(1, parseInt(filters.page ?? "1", 10) || 1);

  const areaTerms = areaSearchTermsFromPropertyFilters(filters.q, filters.search);
  const searchForApi =
    areaTerms != null
      ? areaTerms.length > 1
        ? areaTerms
        : areaTerms[0]
      : undefined;

  const apiData = await getOffPlanProperties({
    page: currentPage,
    limit: PAGE_SIZE,
    search: searchForApi,
    propertyType: filters.type,
    min: filters.min,
    max: filters.max,
  });

  const listings = apiData
    ? mapApiResponseToPropertyListings(apiData, "Buy")
    : [];

  const totalItems = apiData ? getTotalFromApiResponse(apiData) : undefined;
  const totalPages =
    totalItems != null ? Math.max(1, Math.ceil(totalItems / PAGE_SIZE)) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const basePath = `/off-plan-properties/in-dubai`;

  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Off-plan properties", href: "/off-plan-properties" },
    { label: "In Dubai" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header forceSolid hideOnScroll />
      <main className="pt-16 md:pt-20">
        {/* <PageHero
          title="Developers"
          description=""
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
        /> */}
        {/* <DevelopersHeroSection
          title="Developers in Dubai"
          description=" Discover trusted developers, premium communities, and off‑plan opportunities—curated for modern Dubai living."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Developers" },
          ]}
          image="https://images.pexels.com/photos/15185847/pexels-photo-15185847.jpeg"
        /> */}
        {/* <DevelopersHeader
          breadcrumb={breadcrumb}
          title="Off-plan properties in Dubai"
          description="Explore off‑plan launches across Dubai’s top communities, with flexible payment plans and handpicked developers."
          image="https://images.pexels.com/photos/15185847/pexels-photo-15185847.jpeg"
          className="pt-8 md:pt-10"
        /> */}
        <Suspense fallback={<div className="h-18" />}>
          <PropertySearchBar isOffPlan={true}/>
        </Suspense>
        <PropertyListingGrid
          listings={listings}
          showListingType={false}
          pagination={{
            currentPage: safeCurrentPage,
            totalPages,
            totalItems,
            basePath,
          }}
          isOffPlan={true}
        />
        <Newsletter className="py-16 md:py-20 lg:py-24" />
        <TestimonialSection />

      </main>
      <Footer />
    </div>
  );
}
