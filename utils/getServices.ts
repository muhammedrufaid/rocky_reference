import { getData } from './getData'
import type { PropertyListing } from './data'

/** Maps API property object to PropertyListing format */
function mapApiPropertyToListing(item: any, index: number, listingType: "Buy" | "Rent"): PropertyListing {
  const id = item.id ?? item.propertyRefNo ?? index + 1
  const title = item.title ?? item.towerName ?? item.propertyRefNo ?? `Property ${id}`
  const price = item.price != null
    ? (listingType === "Rent"
        ? `AED ${Number(item.price).toLocaleString()}/year`
        : `AED ${Number(item.price).toLocaleString()}`)
    : "Price on request"
  const path = item.path ?? `/${listingType.toLowerCase()}/${item.propertyRefNo ?? item.slug ?? id}`
  const images = Array.isArray(item.images)
    ? item.images
    : item.image
      ? [item.image]
      : ["https://placehold.co/400x300/f0ede8/0d365e?text=Property"]

  return {
    id,
    title,
    type: listingType,
    location: item.location ?? item.locality ?? item.area ?? "Dubai",
    price,
    path,
    images,
    beds: item.beds ?? item.bedrooms,
    baths: item.baths ?? item.bathrooms,
    area: item.area ?? item.sqft ?? item.squareFeet,
    propertySize: item.propertySize ?? item.area ?? item.sqft ?? item.squareFeet,
    propertySizeUnit: item.propertySizeUnit ?? "SQFT",
    propertyType: item.propertyType ?? item.property_type,
    agent: item.agent,
    badge: item.badge,
  }
}

/** Extracts and maps properties array from API response */
export function mapApiResponseToPropertyListings(
  response: any,
  listingType: "Buy" | "Rent"
): PropertyListing[] {
  const items = response?.properties ?? response?.data ?? (Array.isArray(response) ? response : [])
  return (items as any[]).map((item, i) => mapApiPropertyToListing(item, i, listingType))
}

/** Extracts total count from API response for pagination */
export function getTotalFromApiResponse(response: any): number | undefined {
  if (response?.total != null) return Number(response.total)
  if (response?.meta?.total != null) return Number(response.meta.total)
  if (response?.totalCount != null) return Number(response.totalCount)
  if (response?.total_count != null) return Number(response.total_count)
  return undefined
}

export async function getOffPlanProperties(): Promise<any | undefined> {
    try {
      return await getData(`frontend/properties/off-plan?page=1&limit=20`, 0)
    } catch (error) {
      console.error('Failed to fetch featured data:', error)
      // throw notFound();
    }
}

export async function getReadyProperties(): Promise<any | undefined> {
    try {
      return await getData(`frontend/properties/ready?page=1&limit=20`, 0)
    } catch (error) {
      console.error('Failed to fetch featured data:', error)
      // throw notFound();
    }
}

export async function getPropertyTypes(): Promise<any | undefined> {
    try {
      return await getData(`frontend/properties/types?page=1&limit=20`, 0)
    } catch (error) {
      console.error('Failed to fetch featured data:', error)
      // throw notFound();
    }
}

export interface PropertiesFetchOptions {
  page?: number;
  limit?: number;
  /** Optional filter params to pass to API */
  q?: string;
  type?: string;
  min?: string;
  max?: string;
}

export async function getBuyProperties(options: PropertiesFetchOptions = {}): Promise<any | undefined> {
    try {
      const page = options.page ?? 1
      const limit = options.limit ?? 20
      const params = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (options.q) params.set('q', options.q)
      if (options.type) params.set('type', options.type)
      if (options.min) params.set('min', options.min)
      if (options.max) params.set('max', options.max)
      return await getData(`frontend/properties/buy?${params.toString()}`, 0)
    } catch (error) {
      console.error('Failed to fetch buy properties:', error)
    }
}

export async function getRentProperties(options: PropertiesFetchOptions = {}): Promise<any | undefined> {
    try {
      const page = options.page ?? 1
      const limit = options.limit ?? 20
      const params = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (options.q) params.set('q', options.q)
      if (options.type) params.set('type', options.type)
      if (options.min) params.set('min', options.min)
      if (options.max) params.set('max', options.max)
      return await getData(`frontend/properties/rent?${params.toString()}`, 0)
    } catch (error) {
      console.error('Failed to fetch rent properties:', error)
    }
}

/** API response shape for a single property by propertyRefNo */
export interface ApiPropertyDetail {
  propertyRefNo: string
  permitNumber?: string
  propertyStatus?: string
  propertyPurpose?: string
  propertyType?: string
  propertySize?: string
  propertySizeUnit?: string
  bedrooms?: string
  bathrooms?: string
  offPlan?: string
  lastUpdated?: string
  city?: string
  locality?: string
  subLocality?: string
  towerName?: string
  propertyTitle?: string
  propertyDescription?: string
  price?: string
  furnished?: string
  rentFrequency?: string | null
  listingAgentEmail?: string
  listingAgent?: string
  listingAgentPhone?: string
  features?: string[]
  portals?: string[]
  images?: string[]
}

/** Fetches a single property by propertyRefNo from the API */
export async function getPropertyByRefNo(propertyRefNo: string): Promise<ApiPropertyDetail | null> {
  try {
    const data = await getData<ApiPropertyDetail>(`frontend/properties/${encodeURIComponent(propertyRefNo)}`, 60)
    return data ?? null
  } catch (error) {
    console.error('Failed to fetch property by ref:', propertyRefNo, error)
    return null
  }
}
