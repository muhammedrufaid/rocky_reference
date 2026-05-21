/** True when `src` is an absolute remote URL (e.g. S3 listing images from the API). */
export function isRemoteListingImageUrl(src: unknown): src is string {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

/**
 * Listing photos are already hosted on S3. Skip Next/Vercel image optimization so
 * production does not reject them with INVALID_IMAGE_OPTIMIZE_REQUEST.
 */
export function shouldBypassListingImageOptimization(src: unknown): boolean {
  return isRemoteListingImageUrl(src);
}
