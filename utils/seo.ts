import type { Metadata } from "next";
import { getData } from "@/utils/api";

export type CmsSeoPayload = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  keywords?: string[] | string | null;
  ogImage?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  twitterImage?: string | null;
  authors?: Array<{ name?: string | null; url?: string | null }> | null;
  robots?: {
    index?: boolean | null;
    follow?: boolean | null;
  } | null;
};

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeKeywords(value: CmsSeoPayload["keywords"]): string[] {
  if (Array.isArray(value)) {
    return value.map((k) => cleanText(k)).filter(Boolean);
  }
  const raw = cleanText(value);
  if (!raw) return [];
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function safeUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function getSiteUrl(override?: string): string {
  const fromEnv =
    cleanText(process.env.NEXT_PUBLIC_SITE_URL) ||
    cleanText(process.env.SITE_URL) ||
    cleanText(process.env.NEXT_PUBLIC_BASE_URL);

  const candidate = cleanText(override) || fromEnv;
  const url = candidate ? candidate.replace(/\/$/, "") : "https://rocky-ref.vercel.app";
  return url;
}

export function toAbsoluteUrl(pathOrUrl: string, siteUrlOverride?: string): string {
  const value = cleanText(pathOrUrl);
  if (!value) return getSiteUrl(siteUrlOverride);
  const asUrl = safeUrl(value);
  if (asUrl) return asUrl.toString();
  const base = getSiteUrl(siteUrlOverride);
  return `${base}${value.startsWith("/") ? "" : "/"}${value}`;
}

function clampTitle(value: string, maxLen: number): string {
  const title = cleanText(value);
  if (title.length <= maxLen) return title;
  return title.slice(0, Math.max(0, maxLen - 1)).trimEnd() + "…";
}

function clampDescription(value: string, minLen: number, maxLen: number): string {
  const desc = cleanText(value);
  if (!desc) return "";
  if (desc.length >= minLen && desc.length <= maxLen) return desc;
  if (desc.length > maxLen) return desc.slice(0, maxLen).trimEnd();
  return desc;
}

export async function fetchSeoFromCms(pathname: string): Promise<CmsSeoPayload | null> {
  const endpoint =
    cleanText(process.env.SEO_CMS_ENDPOINT) || "frontend/seo";

  try {
    const params = new URLSearchParams({ path: pathname });
    const data = await getData<CmsSeoPayload>(`${endpoint}?${params.toString()}`, 300, {
      // SEO is optional; don't spam the dev overlay if CMS isn't configured yet.
      silent: true,
    });
    return data ?? null;
  } catch {
    return null;
  }
}

export function buildPageMetadata(options: {
  pathname: string;
  seo: CmsSeoPayload | null;
  siteUrl?: string;
  fallback: {
    /** Primary keyword + brand; keep under 60 characters. */
    title: string;
    /** 140–160 characters recommended. */
    description: string;
    /** Absolute URL to social image. */
    image: string;
    /** Keywords to help CMS + internal search; not a ranking lever. */
    keywords: string[];
    /** Author(s) or organization. */
    authors: Array<{ name: string; url?: string }>;
  };
}): Metadata {
  const siteUrl = getSiteUrl(options.siteUrl);
  const metadataBase = safeUrl(siteUrl) ?? new URL("https://rockyrealestate.com");

  const canonicalInput = cleanText(options.seo?.canonicalUrl) || options.pathname;
  const canonical = toAbsoluteUrl(canonicalInput, siteUrl);

  const titleRaw = cleanText(options.seo?.title) || options.fallback.title;
  const descriptionRaw = cleanText(options.seo?.description) || options.fallback.description;

  const title = clampTitle(titleRaw, 60);
  const description = clampDescription(descriptionRaw, 140, 160) || descriptionRaw;

  const keywords = [
    ...options.fallback.keywords,
    ...normalizeKeywords(options.seo?.keywords),
  ].filter(Boolean);

  // Per project SEO rules: OG/Twitter title+description must match the page title+description exactly.
  const ogTitle = title;
  const ogDescription = description;

  const ogImage = toAbsoluteUrl(
    cleanText(options.seo?.ogImage) || options.fallback.image,
    siteUrl,
  );
  const twitterImage = toAbsoluteUrl(
    cleanText(options.seo?.twitterImage) || cleanText(options.seo?.ogImage) || options.fallback.image,
    siteUrl,
  );

  const authors =
    (options.seo?.authors ?? [])
      .map((a) => ({ name: cleanText(a?.name), url: cleanText(a?.url) }))
      .filter((a) => Boolean(a.name))
      .map((a) => ({ name: a.name, url: a.url || undefined })) ??
    [];

  const mergedAuthors = authors.length > 0 ? authors : options.fallback.authors;

  const index = options.seo?.robots?.index ?? true;
  const follow = options.seo?.robots?.follow ?? true;

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    keywords,
    authors: mergedAuthors,
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      locale: "en_AE",
      siteName: "Rocky Real Estate",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
    other: {
      "geo.region": "AE-DU",
      "geo.placename": "Dubai",
      "geo.position": "25.2048;55.2708",
      ICBM: "25.2048, 55.2708",
      publisher: "Rocky Real Estate",
    },
  };
}

export type SeoSlugResult = {
  slug: string;
  url: string;
};

/**
 * Normalizes user/URL search text for matching against DB values.
 *
 * - "dubai-internet-city" -> "dubai internet city"
 * - "  Dubai   Internet  " -> "dubai internet"
 */
export function normalizeSearchText(value: string | null | undefined): string {
  return safeDecode(String(value ?? ""))
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Flexible match (avoids direct `===`):
 * - substring match on normalized text
 * - fallback to "all words present" match
 */
export function matchesSearchText(
  searchInput: string | null | undefined,
  dbValue: string | null | undefined,
): boolean {
  const query = normalizeSearchText(searchInput);
  const target = normalizeSearchText(dbValue);
  if (!query || !target) return false;

  if (target.includes(query)) return true;

  const words = query.split(" ").filter(Boolean);
  if (words.length === 0) return false;
  return words.every((w) => target.includes(w));
}

function safeDecode(value: string): string {
  // Handle URL-ish inputs (e.g. `Downtown%20Dubai`, `Dubai+Marina`) without throwing.
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value.replace(/\+/g, " ");
  }
}

function normalizeToSlugPart(value: string): string {
  // Normalize unicode/diacritics, then keep only a-z/0-9 as words.
  const ascii = value
    .normalize("NFKD")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0300-\u036f]/g, "");

  return ascii
    .toLowerCase()
    .replace(/&/g, " and ") // mild SEO improvement for common inputs like "JBR & Marina"
    .replace(/['’`]/g, "") // drop apostrophes
    .replace(/[^a-z0-9]+/g, "-") // all separators → hyphen
    .replace(/-+/g, "-") // collapse repeats
    .replace(/^-|-$/g, ""); // trim
}

/**
 * Convert a user search query (locations) to a clean, SEO-friendly slug.
 *
 * Examples:
 * - "DAMAC Hills | Sobha Hartland" -> "damac-hills-or-sobha-hartland"
 * - "Dubai Marina" -> "dubai-marina"
 * - "Downtown Dubai | Business Bay" -> "downtown-dubai-or-business-bay"
 */
export function generateSeoSlug(query: string | null | undefined): string {
  const raw = safeDecode((query ?? "").trim());
  if (!raw) return "";

  // Treat mixed separators consistently: "|", ",", "+" (and common variants) -> split tokens.
  const normalizedSeparators = raw
    .replace(/%20/gi, " ")
    .replace(/\s*(\||,|\+|\/|;)\s*/g, "|")
    .replace(/\|+/g, "|")
    .trim();

  const tokens = normalizedSeparators
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) return "";

  // Dedupe while preserving order (based on final slug part).
  const seen = new Set<string>();
  const parts: string[] = [];

  for (const token of tokens) {
    const part = normalizeToSlugPart(safeDecode(token));
    if (!part) continue;
    if (seen.has(part)) continue;
    seen.add(part);
    parts.push(part);
  }

  return parts.join("-or-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Bonus helper: returns both `slug` and a full URL using the provided basePath.
 * Ensures the returned URL ends with a trailing slash when a slug exists.
 */
export function generateSeoSlugWithUrl(
  query: string | null | undefined,
  basePath: string
): SeoSlugResult {
  const slug = generateSeoSlug(query);
  const base = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const url = slug ? `${base}${slug}/` : base;
  return { slug, url };
}

/**
 * Best-effort reverse: convert "downtown-dubai-or-business-bay" -> "downtown dubai | business bay".
 * This is intentionally lossy (case/punctuation), but good enough for filtering/search.
 */
export function seoSlugToQuery(slug: string | null | undefined): string {
  const raw = safeDecode((slug ?? "").trim().replace(/^\/+|\/+$/g, ""));
  if (!raw) return "";
  return raw
    .toLowerCase()
    .split("-or-")
    .map((p) => p.replace(/-+/g, " ").trim())
    .filter(Boolean)
    .join(" | ");
}

/**
 * Separate area tokens for API calls. The listings API treats a single `search`
 * string as one location, so multi-select (`-or-` slug or `q` with `|`) must
 * be split and requested per area (merged in `getServices`).
 */
export function areaSearchTermsFromPropertyFilters(
  q: string | null | undefined,
  searchSlug: string | null | undefined,
): string[] | undefined {
  const qTrim = (q ?? "").trim();
  if (qTrim) {
    const parts = qTrim
      .split(/\s*[|]\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }
  const slug = (searchSlug ?? "").trim();
  if (!slug) return undefined;
  const raw = safeDecode(slug).replace(/^\/+|\/+$/g, "").toLowerCase();
  const segments = raw
    .split("-or-")
    .map((p) => p.replace(/-+/g, " ").trim())
    .filter(Boolean);
  return segments.length ? segments : undefined;
}
