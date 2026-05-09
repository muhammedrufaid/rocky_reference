import { getData, postData } from './api'
import type { PropertyListing } from './types'

let preferredSuggestionsEndpointIndex: number | null = null

function trimLocationPart(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** subLocality, locality, city — matches reference API / site (comma-separated, no redundant repeats). */
function buildLocationFromApiParts(item: {
  subLocality?: unknown
  locality?: unknown
  city?: unknown
  location?: unknown
  area?: unknown
}): string {
  const sub = trimLocationPart(item.subLocality)
  const locality = trimLocationPart(item.locality)
  const city = trimLocationPart(item.city)
  const ordered = [sub, locality, city].filter(Boolean)
  const deduped: string[] = []
  for (const part of ordered) {
    const prev = deduped[deduped.length - 1]
    if (prev != null && prev.toLowerCase() === part.toLowerCase()) continue
    deduped.push(part)
  }
  if (deduped.length > 0) return deduped.join(', ')
  const fallback =
    trimLocationPart(item.location) || trimLocationPart(item.area)
  return fallback || 'Dubai'
}

/** Maps API property object to PropertyListing format */
function mapApiPropertyToListing(item: any, index: number, listingType: "Buy" | "Rent"): PropertyListing {
  const id = item.id ?? item.propertyRefNo ?? index + 1
  const towerName = typeof item.towerName === 'string' ? item.towerName.trim() : ''
  const subLocality = typeof item.subLocality === 'string' ? item.subLocality.trim() : ''
  const propertyTitle = typeof item.propertyTitle === 'string' ? item.propertyTitle.trim() : ''
  const title = towerName || subLocality || item.title || `Property ${id}`
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
    propertyTitle: propertyTitle || undefined,
    towerName: towerName || undefined,
    subLocality: subLocality || undefined,
    type: listingType,
    location: buildLocationFromApiParts(item),
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

async function getOffPlanPropertiesCore(
  params: URLSearchParams,
): Promise<any | undefined> {
  try {
    return await getData(`frontend/properties/off-plan?${params.toString()}`, 0)
  } catch (error) {
    console.error('Failed to fetch off-plan properties:', error)
  }
}

export async function getOffPlanProperties(
  options: PropertiesFetchOptions = {},
): Promise<any | undefined> {
  const page = options.page ?? 1
  const limit = options.limit ?? 20
  const terms = normalizeAreaSearchTerms(options.search ?? options.q)

  if (terms.length > 1) {
    const fetchLimit = Math.min(
      500,
      Math.max(120, limit * Math.max(page, 1) * 3),
    )
    const results = await Promise.all(
      terms.map((search) => {
        const params = new URLSearchParams({
          page: '1',
          limit: String(fetchLimit),
          search,
        })
        appendPropertiesFilters(params, options)
        return getOffPlanPropertiesCore(params)
      }),
    )
    return mergeMultiAreaPropertyResponses(results, page, limit)
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (terms.length === 1) params.set('search', terms[0])
  appendPropertiesFilters(params, options)
  return getOffPlanPropertiesCore(params)
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
      console.error('Failed to fetch property types:', error)
      // throw notFound();
    }
}

export type PropertyTypesByCategory = {
  residential: string[]
  commercial: string[]
}

type TypesByCategoryRecord = {
  type?: unknown
  category?: unknown
}

function normalizeTypesList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return Array.from(
    new Set(
      value
        .map((x) => String(x ?? '').trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b))
}

/** Normalizes unknown payload from `types-by-category` to `{ residential, commercial }`. */
export function normalizePropertyTypesByCategoryPayload(data: unknown): PropertyTypesByCategory {
  const root = (data as any)?.data != null ? (data as any).data : data

  // Shape A: flat list: [{ type: "Apartment", category: "Residential" }, ...]
  if (Array.isArray(root)) {
    const residential: string[] = []
    const commercial: string[] = []

    for (const row of root as TypesByCategoryRecord[]) {
      const type = String(row?.type ?? '').trim()
      if (!type) continue
      const category = String(row?.category ?? '').trim().toLowerCase()
      if (category === 'residential') residential.push(type)
      else if (category === 'commercial') commercial.push(type)
    }

    return {
      residential: normalizeTypesList(residential),
      commercial: normalizeTypesList(commercial),
    }
  }

  // Shape B: object: { residential: [...], commercial: [...] } (or capitalized)
  const residential = normalizeTypesList((root as any)?.residential ?? (root as any)?.Residential)
  const commercial = normalizeTypesList((root as any)?.commercial ?? (root as any)?.Commercial)
  return { residential, commercial }
}

export async function getPropertyTypesByCategory(): Promise<PropertyTypesByCategory | undefined> {
  try {
    const data = await getData(`frontend/properties/types-by-category`, 0)
    return normalizePropertyTypesByCategoryPayload(data)
  } catch (error) {
    console.error('Failed to fetch property types by category:', error)
  }
}

/** Normalizes `getPropertyTypes` API payload to a sorted list of type names. */
export function normalizePropertyTypesPayload(data: unknown): string[] {
  const raw = Array.isArray(data) ? data : (data as { data?: unknown })?.data
  if (!Array.isArray(raw)) return []
  return Array.from(
    new Set(
      raw
        .map((x) => String(x ?? '').trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b))
}

export interface PropertiesFetchOptions {
  page?: number;
  limit?: number;
  /** Optional filter params to pass to API */
  q?: string;
  type?: string;
  /** New API filter params (string = one area; string[] = OR — merged client-side) */
  search?: string | string[];
  propertyType?: string | string[];
  min?: string;
  max?: string;
  beds?: string;
  baths?: string;
}

function appendPropertiesFilters(
  params: URLSearchParams,
  options: PropertiesFetchOptions,
) {
  const propertyType = options.propertyType ?? options.type
  if (propertyType) {
    const propertyTypeValue = Array.isArray(propertyType)
      ? propertyType.map((x) => String(x).trim()).filter(Boolean).join(',')
      : String(propertyType).trim()
    if (propertyTypeValue) params.set('propertyType', propertyTypeValue)
  }
  if (options.min) params.set('min', options.min)
  if (options.max) params.set('max', options.max)
  if (options.beds) params.set('beds', options.beds)
  if (options.baths) params.set('baths', options.baths)
}

type ApiListingRecord = Record<string, unknown> & {
  propertyRefNo?: unknown
  id?: unknown
  slug?: unknown
}

function isPropertyApiRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

function extractPropertiesArrays(responses: (unknown | undefined)[]): ApiListingRecord[][] {
  return responses.map((r) => {
    if (!isPropertyApiRecord(r)) return []
    const items = r.properties ?? r.data
    return Array.isArray(items) ? (items as ApiListingRecord[]) : []
  })
}

function listingDedupeKey(item: ApiListingRecord): string {
  return String(item.propertyRefNo ?? item.id ?? item.slug ?? '').trim()
}

/**
 * Round-robin merge, dedupe by propertyRefNo / id / slug (union of areas).
 * Paginates in memory over the merged list; `total` reflects merged length only
 * within the fetched window (see per-area fetch limit in callers).
 */
function mergeMultiAreaPropertyResponses(
  responses: (unknown | undefined)[],
  page: number,
  limit: number,
): Record<string, unknown> {
  const lists = extractPropertiesArrays(responses)
  const seen = new Set<string>()
  const merged: ApiListingRecord[] = []
  const maxLen = lists.reduce((m, l) => Math.max(m, l.length), 0)
  for (let i = 0; i < maxLen; i += 1) {
    for (const list of lists) {
      const item = list[i]
      if (!item) continue
      const key = listingDedupeKey(item)
      if (key) {
        if (seen.has(key)) continue
        seen.add(key)
      }
      merged.push(item)
    }
  }
  const start = (Math.max(1, page) - 1) * limit
  const pageItems = merged.slice(start, start + limit)
  const sample = responses.find(isPropertyApiRecord)
  return {
    ...(sample ? { ...sample } : {}),
    properties: pageItems,
    data: pageItems,
    total: merged.length,
  }
}

async function getBuyPropertiesCore(
  params: URLSearchParams,
): Promise<any | undefined> {
  try {
    return await getData(`frontend/properties/buy?${params.toString()}`, 0)
  } catch (error) {
    console.error('Failed to fetch buy properties:', error)
  }
}

async function getRentPropertiesCore(
  params: URLSearchParams,
): Promise<any | undefined> {
  try {
    return await getData(`frontend/properties/rent?${params.toString()}`, 0)
  } catch (error) {
    console.error('Failed to fetch rent properties:', error)
  }
}

function normalizeAreaSearchTerms(search: string | string[] | undefined): string[] {
  if (search == null) return []
  const list = Array.isArray(search) ? search : [search]
  return list.map((s) => String(s).trim()).filter(Boolean)
}

export async function getBuyProperties(options: PropertiesFetchOptions = {}): Promise<any | undefined> {
  const page = options.page ?? 1
  const limit = options.limit ?? 20
  const terms = normalizeAreaSearchTerms(options.search ?? options.q)

  if (terms.length > 1) {
    const fetchLimit = Math.min(
      500,
      Math.max(120, limit * Math.max(page, 1) * 3),
    )
    const results = await Promise.all(
      terms.map((search) => {
        const params = new URLSearchParams({
          page: '1',
          limit: String(fetchLimit),
          search,
        })
        appendPropertiesFilters(params, options)
        return getBuyPropertiesCore(params)
      }),
    )
    return mergeMultiAreaPropertyResponses(results, page, limit)
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (terms.length === 1) params.set('search', terms[0])
  appendPropertiesFilters(params, options)
  return getBuyPropertiesCore(params)
}

export async function getRentProperties(options: PropertiesFetchOptions = {}): Promise<any | undefined> {
  const page = options.page ?? 1
  const limit = options.limit ?? 20
  const terms = normalizeAreaSearchTerms(options.search ?? options.q)

  if (terms.length > 1) {
    const fetchLimit = Math.min(
      500,
      Math.max(120, limit * Math.max(page, 1) * 3),
    )
    const results = await Promise.all(
      terms.map((search) => {
        const params = new URLSearchParams({
          page: '1',
          limit: String(fetchLimit),
          search,
        })
        appendPropertiesFilters(params, options)
        return getRentPropertiesCore(params)
      }),
    )
    return mergeMultiAreaPropertyResponses(results, page, limit)
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (terms.length === 1) params.set('search', terms[0])
  appendPropertiesFilters(params, options)
  return getRentPropertiesCore(params)
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
  propertyRefNo?: string
  towerName?: string
  propertyPurpose?: string
  propertyType?: string
  locality?: string
  subLocality?: string
  type?: string
  label?: string
  full?: string
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
    `${baseUrl}/api/frontend/properties/search-by-area?${params.toString()}`,
    // `${baseUrl}/api/frontend/properties/search?${params.toString()}`,
    // `${baseUrl}/api/properties/search?${params.toString()}`,
  ]

  const normalizeSuggestions = (data: PropertySuggestionsResponse): PropertySuggestion[] =>
    (data.suggestions ?? [])
      .map((item) => {
        // Area endpoint returns `{ type, label, full }`.
        if (item.label || item.full || item.type) {
          return {
            type: item.type,
            label: item.label,
            full: item.full,
          }
        }

        // Property endpoint returns legacy property fields.
        return {
          propertyRefNo: item.propertyRefNo,
          towerName: item.towerName,
          propertyPurpose: item.propertyPurpose,
          propertyType: item.propertyType,
          locality: item.locality,
          subLocality: item.subLocality,
        }
      })
      .slice(0, limit)

  const parseSuggestions = async (endpointIndex: number): Promise<PropertySuggestion[] | null> => {
    const response = await fetch(endpoints[endpointIndex], {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })

    if (response.ok) {
      const data = (await response.json()) as PropertySuggestionsResponse
      preferredSuggestionsEndpointIndex = endpointIndex
      return normalizeSuggestions(data)
    }

    if (response.status === 404) {
      return null
    }

    throw new Error(`Search suggestions failed: ${response.status}`)
  }

  // After first successful response, prefer that endpoint to avoid repeated fallback latency.
  if (preferredSuggestionsEndpointIndex != null) {
    const fallbackIndexes = endpoints
      .map((_, index) => index)
      .filter((index) => index !== preferredSuggestionsEndpointIndex)
    const prioritizedIndexes = [preferredSuggestionsEndpointIndex, ...fallbackIndexes]

    for (const endpointIndex of prioritizedIndexes) {
      const suggestions = await parseSuggestions(endpointIndex)
      if (suggestions) return suggestions
    }

    throw new Error('Search suggestions endpoint not available')
  }

  // First lookup: use deterministic endpoint order so UI mirrors
  // `search-by-area` response ordering and content.
  let firstNonAbortError: Error | null = null
  for (let endpointIndex = 0; endpointIndex < endpoints.length; endpointIndex += 1) {
    try {
      const suggestions = await parseSuggestions(endpointIndex)
      if (suggestions) {
        return suggestions
      }
    } catch (error) {
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


//get proeprtysuggestions by areas

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

export type ContactPayload = {
  fullName: string
  email: string
  phone?: string
  inquiryType?: string
  message: string
}

export async function postContact(payload: ContactPayload): Promise<unknown> {
  return await postData('contact', payload)
}

/** Sell enquiry: `POST /api/sell` → upstream `{ROCKY_API_ORIGIN}/api/sell` (path override: `ROCKY_API_SELL_PATH`). */
export type SellEnquiryPayload = {
  fullName: string
  phone: string
  email: string
  propertyType: string
  locationArea: string
  message?: string
}

export async function postSell(payload: SellEnquiryPayload): Promise<unknown> {
  return await postData('sell', payload)
}
