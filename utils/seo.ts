export type SeoSlugResult = {
  slug: string;
  url: string;
};

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
