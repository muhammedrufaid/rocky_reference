import { getData } from './getData'
import type { PropertyListing } from './data'

let preferredSuggestionsEndpointIndex: number | null = null

/** Maps API property object to PropertyListing format */
function mapApiPropertyToListing(item: any, index: number, listingType: "Buy" | "Rent"): PropertyListing {
  const id = item.id ?? item.propertyRefNo ?? index + 1
  const title = item.title ?? item.towerName ?? item.propertyRefNo ?? `Property ${id}`
  const price = item.price != null
    ? (listingType === "Rent"
        ? `AED ${Number(item.price).toLocaleString()}/year`
        : `AED ${Number(item.price).toLocaleString()}`)
    : "Price on request"
  const path = item.path ?? `/properties/${listingType.toLowerCase()}/in-dubai/${item.propertyRefNo ?? item.slug ?? id}`
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

export interface PropertySuggestion {
  propertyRefNo: string
  towerName?: string
  propertyPurpose?: string
  propertyType?: string
  locality?: string
  subLocality?: string
}

interface PropertySuggestionsResponse {
  suggestions?: PropertySuggestion[]
}

/**
 * Fetches property suggestions for search autocomplete.
 * Tries both new and legacy API endpoints for compatibility.
 */
export async function getPropertySuggestions(
  query: string,
  limit: number = 6,
  signal?: AbortSignal
): Promise<PropertySuggestion[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')
  const params = new URLSearchParams({
    q: trimmedQuery,
    limit: String(limit),
  })
  const endpoints = [
    `${baseUrl}/api/frontend/properties/search?${params.toString()}`,
    `${baseUrl}/api/properties/search?${params.toString()}`,
  ]

  const parseSuggestions = async (endpointIndex: number): Promise<PropertySuggestion[] | null> => {
    const response = await fetch(endpoints[endpointIndex], {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })

    if (response.ok) {
      const data = (await response.json()) as PropertySuggestionsResponse
      preferredSuggestionsEndpointIndex = endpointIndex
      return (data.suggestions ?? []).slice(0, limit)
    }

    if (response.status === 404) {
      return null
    }

    throw new Error(`Search suggestions failed: ${response.status}`)
  }

  // After first successful response, prefer that endpoint to avoid repeated fallback latency.
  if (preferredSuggestionsEndpointIndex != null) {
    const fallbackIndex = preferredSuggestionsEndpointIndex === 0 ? 1 : 0
    const prioritizedIndexes = [preferredSuggestionsEndpointIndex, fallbackIndex]

    for (const endpointIndex of prioritizedIndexes) {
      const suggestions = await parseSuggestions(endpointIndex)
      if (suggestions) return suggestions
    }

    throw new Error('Search suggestions endpoint not available')
  }

  // First lookup: race both endpoints in parallel so initial typing feels faster.
  const settled = await Promise.allSettled([parseSuggestions(0), parseSuggestions(1)])
  let firstNonAbortError: Error | null = null

  for (const result of settled) {
    if (result.status === 'fulfilled' && result.value) {
      return result.value
    }

    if (result.status === 'rejected') {
      const error = result.reason
      if (error instanceof Error && error.name === 'AbortError') {
        throw error
      }
      if (!firstNonAbortError && error instanceof Error) {
        firstNonAbortError = error
      }
    }
  }

  if (firstNonAbortError) {
    throw firstNonAbortError
  }

  throw new Error('Search suggestions endpoint not available')
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
