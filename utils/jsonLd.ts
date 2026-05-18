import type { ApiPropertyDetail } from "@/utils/getServices";
import type { BlogPost } from "@/utils/types";
import { getPropertyDisplayTitle, getPropertyLocationLabel, getSiteUrl, toAbsoluteUrl } from "@/utils/seo";

export function buildRealEstateListingJsonLd(
  property: ApiPropertyDetail,
  pageUrl: string,
) {
  const name = getPropertyDisplayTitle(property);
  const address = getPropertyLocationLabel(property);
  const images = (property.images ?? []).filter(Boolean).map((url) => toAbsoluteUrl(url));

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    url: pageUrl,
    description: property.propertyDescription?.replace(/<[^>]*>/g, " ").trim() || undefined,
    image: images.length > 0 ? images : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: address,
      addressCountry: "AE",
    },
    offers: property.price
      ? {
          "@type": "Offer",
          price: String(property.price).replace(/[^\d.]/g, "") || undefined,
          priceCurrency: "AED",
        }
      : undefined,
  };
}

export function buildBlogPostingJsonLd(post: BlogPost, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image ? toAbsoluteUrl(post.image) : undefined,
    url: pageUrl,
    author: {
      "@type": "Organization",
      name: "Rocky Real Estate",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Rocky Real Estate",
      url: getSiteUrl(),
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? toAbsoluteUrl(item.url) : undefined,
    })),
  };
}
