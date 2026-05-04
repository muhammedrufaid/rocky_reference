import type { PropertyFilters, PropertyListing } from "./types";

function parsePrice(priceStr: string): number | null {
  const match = priceStr.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export function filterPropertyListings(
  listings: PropertyListing[],
  filters: PropertyFilters
): PropertyListing[] {
  return listings.filter((listing) => {
    const listingTypeMatch =
      filters.listingType === "buy"
        ? listing.type === "Buy"
        : listing.type === "Rent";
    if (!listingTypeMatch) return false;

    if (filters.propertyType && filters.propertyType !== "All Types") {
      const tokens = String(filters.propertyType)
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      if (tokens.length > 0) {
        const listingType = listing.propertyType?.toLowerCase() ?? "";
        if (!listingType) return false;
        if (!tokens.includes(listingType)) return false;
      }
    }

    const priceNum = parsePrice(listing.price);
    if (priceNum != null) {
      if (filters.minPrice) {
        const min = parseInt(filters.minPrice, 10);
        if (priceNum < min) return false;
      }
      if (filters.maxPrice) {
        const max = parseInt(filters.maxPrice, 10);
        if (priceNum > max) return false;
      }
    }

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const qRaw = filters.searchQuery.trim().toLowerCase();
      const tokens = qRaw
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean);

      const matchesToken = (q: string) =>
        listing.title.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q) ||
        (listing.propertyType?.toLowerCase().includes(q) ?? false) ||
        (listing.towerName?.toLowerCase().includes(q) ?? false) ||
        (listing.subLocality?.toLowerCase().includes(q) ?? false) ||
        (listing.propertyTitle?.toLowerCase().includes(q) ?? false);

      const match =
        tokens.length > 0 ? tokens.some(matchesToken) : matchesToken(qRaw);
      if (!match) return false;
    }

    return true;
  });
}
