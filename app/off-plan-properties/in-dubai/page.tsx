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
const FILTER_WINDOW_LIMIT = 500;

function parsePositiveInt(value: string | undefined) {
  const n = value != null ? Number(value) : NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function parseNonNegativeInt(value: string | undefined) {
  const n = value != null ? Number(value) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}6

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
    beds?: string;
    baths?: string;
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

  const minN = parsePositiveInt(filters.min);
  const maxN = parsePositiveInt(filters.max);
  const bedsN = parseNonNegativeInt(filters.beds);
  const bathsN = parsePositiveInt(filters.baths);

  const hasClientFilters =
    minN != null || maxN != null || bedsN != null || bathsN != null;

  // Off-plan API filtering is not always reliable/consistent across fields.
  // When filters are active, fetch a larger window, filter in-memory, then paginate.
  const fetchPage = hasClientFilters ? 1 : currentPage;
  const fetchLimit = hasClientFilters ? FILTER_WINDOW_LIMIT : PAGE_SIZE;

  const apiData = await getOffPlanProperties({
    page: fetchPage,
    limit: fetchLimit,
    search: searchForApi,
    propertyType: filters.type,
    min: filters.min,
    max: filters.max,
    beds: filters.beds,
    baths: filters.baths,
  });

  const itemsRaw: any[] =
    (apiData?.properties ??
      apiData?.data ??
      (Array.isArray(apiData) ? apiData : [])) as any[];

  const itemsFiltered = hasClientFilters
    ? itemsRaw.filter((item) => {
        const propertyTypeRaw = String(
          item?.propertyType ?? item?.property_type ?? ""
        ).toLowerCase();

        // Price
        if (minN != null || maxN != null) {
          const price = Number(item?.price);
          if (!Number.isFinite(price)) return false;
          if (minN != null && price < minN) return false;
          if (maxN != null && price > maxN) return false;
        }

        // Beds (Studio = 0; 8+ = 8)
        if (bedsN != null) {
          const bedsRaw = item?.beds ?? item?.bedrooms;
          const beds = Number(bedsRaw);
          if (!Number.isFinite(beds)) return false;
          if (bedsN === 0) {
            const isApartment =
              propertyTypeRaw === "apartment" || propertyTypeRaw.includes("apartment");
            if (!isApartment) return false;
          }
          if (bedsN >= 8) {
            if (beds < 8) return false;
          } else {
            if (beds !== bedsN) return false;
          }
        }

        // Baths (6+ = 6)
        if (bathsN != null) {
          const bathsRaw = item?.baths ?? item?.bathrooms;
          const baths = Number(bathsRaw);
          if (!Number.isFinite(baths)) return false;
          if (bathsN >= 6) {
            if (baths < 6) return false;
          } else {
            if (baths !== bathsN) return false;
          }
        }

        return true;
      })
    : itemsRaw;

  const filteredTotalItems = itemsFiltered.length;
  const totalItems = hasClientFilters
    ? filteredTotalItems
    : apiData
      ? getTotalFromApiResponse(apiData)
      : undefined;

  const totalPages =
    totalItems != null ? Math.max(1, Math.ceil(totalItems / PAGE_SIZE)) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageStart = (Math.max(1, safeCurrentPage) - 1) * PAGE_SIZE;
  const pageItems = hasClientFilters
    ? itemsFiltered.slice(pageStart, pageStart + PAGE_SIZE)
    : itemsFiltered;

  const listings = pageItems.length
    ? mapApiResponseToPropertyListings(
        { ...(apiData ?? {}), properties: pageItems, data: pageItems },
        "Buy"
      )
    : [];

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
