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
import { areaSearchTermsFromPropertyFilters, buildPageMetadata, fetchSeoFromCms, toAbsoluteUrl } from "@/utils/seo";
import PropertySearchBar from "@/components/properties/PropertySearchBar";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedOffPlanProjects from "@/components/home/FeaturedOffPlanProjects";
import ValuationCTA from "@/components/home/ValuationCTA";
import Newsletter from "@/components/home/Newsletter";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ q?: string; search?: string; type?: string }>;
}) {
  const { type } = await params;
  const filters = await searchParams;

  const isBuy = type === "buy";
  const pathname = `/properties/${type}/in-dubai`;
  const seo = await fetchSeoFromCms(pathname);

  // Build area label for dynamic titles (e.g. "Business Bay")
  const areaRaw = filters.search ?? filters.q ?? "";
  const areaLabel = areaRaw
    ? areaRaw
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : null;

  const locationSuffix = areaLabel ? ` in ${areaLabel}, Dubai` : " in Dubai";

  const title = isBuy
    ? `Properties for Sale${locationSuffix} | Rocky Real Estate`
    : `Properties for Rent${locationSuffix} | Rocky Real Estate`;

  const description = isBuy
    ? `Find properties for sale${locationSuffix} with Rocky Real Estate. Browse apartments, villas, and townhouses with expert agent support, competitive pricing, and seamless buying experience across UAE.`
    : `Find properties for rent${locationSuffix} with Rocky Real Estate. Explore apartments, villas, and townhouses available to rent with flexible terms and dedicated leasing support across Dubai.`;

  const buyKeywords = [
    "properties for sale Dubai",
    "buy property Dubai",
    "apartments for sale Dubai",
    "villas for sale Dubai",
    "townhouses for sale Dubai",
    "Dubai real estate for sale",
    "freehold properties Dubai",
    "property purchase UAE",
    "residential properties Dubai",
    ...(areaLabel ? [`properties for sale ${areaLabel} Dubai`, `buy apartment ${areaLabel}`] : []),
  ];

  const rentKeywords = [
    "properties for rent Dubai",
    "rent property Dubai",
    "apartments for rent Dubai",
    "villas for rent Dubai",
    "townhouses for rent Dubai",
    "Dubai rental properties",
    "short term rentals Dubai",
    "long term rentals Dubai",
    "residential rentals UAE",
    ...(areaLabel ? [`properties for rent ${areaLabel} Dubai`, `rent apartment ${areaLabel}`] : []),
  ];

  return buildPageMetadata({
    pathname,
    seo,
    fallback: {
      title,
      description,
      image: toAbsoluteUrl("/assets/common/rockyabout.webp"),
      keywords: isBuy ? buyKeywords : rentKeywords,
      authors: [{ name: "Rocky Real Estate", url: toAbsoluteUrl("/") }],
    },
  });
}

const PAGE_SIZE = 20;
const FILTER_WINDOW_LIMIT = 500;

function parsePositiveInt(value: string | undefined) {
  const n = value != null ? Number(value) : NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function parseNonNegativeInt(value: string | undefined) {
  const n = value != null ? Number(value) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

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
    beds?: string;
    baths?: string;
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

  const minN = parsePositiveInt(filters.min);
  const maxN = parsePositiveInt(filters.max);
  const bedsN = parseNonNegativeInt(filters.beds);
  const bathsN = parsePositiveInt(filters.baths);

  const hasClientFilters =
    minN != null || maxN != null || bedsN != null || bathsN != null;

  // When client-side filters are active, apply filtering BEFORE pagination.
  // We fetch a larger window (capped) then paginate in-memory so each page
  // has a consistent PAGE_SIZE and totals reflect the filtered dataset.
  const fetchPage = hasClientFilters ? 1 : currentPage;
  const fetchLimit = hasClientFilters ? FILTER_WINDOW_LIMIT : PAGE_SIZE;

  const apiData =
    type === "buy"
      ? await getBuyProperties({
          page: fetchPage,
          limit: fetchLimit,
          search: searchForApi,
          propertyType: filters.type,
          min: filters.min,
          max: filters.max,
          beds: filters.beds,
          baths: filters.baths,
        })
      : await getRentProperties({
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
          // Studio is only valid for Apartments (avoid showing Office/Commercial etc).
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
        { ...(apiData ?? {}), properties: pageItems },
        type === "buy" ? "Buy" : "Rent"
      )
    : [];

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
