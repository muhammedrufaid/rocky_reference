/**
 * URL-safe slug from arbitrary text (job titles, names, etc.).
 * Lowercases, maps `&` to `and`, replaces non-alphanumeric runs with `-`, trims edge hyphens.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Last path segment, after trimming trailing slashes (e.g. `/blog/my-post/` → `my-post`).
 * Does not transform characters; use when slugs are already embedded in `path`.
 */
export function slugFromPath(path: string): string {
  const trimmed = path.replace(/\/+$/, "");
  return trimmed.split("/").pop() ?? "";
}
