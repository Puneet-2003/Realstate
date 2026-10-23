import { Property, FilterState } from "@/types/property";

export const DEFAULT_FILTERS: FilterState = {
  listingType: "All",
  category: "All",
  location: "",
  minPrice: 0,
  maxPrice: 100000000,
  bedrooms: "All",
  sortBy: "featured",
  viewMode: "grid",
};

export function filterProperties(properties: Property[], filters: Partial<FilterState>): Property[] {
  return properties.filter((property) => {
    // Listing Type
    if (filters.listingType && filters.listingType !== "All") {
      if (property.listingType !== filters.listingType) return false;
    }

    // Category
    if (filters.category && filters.category !== "All") {
      if (property.category !== filters.category) return false;
    }

    // Location search
    if (filters.location && filters.location.trim() !== "") {
      const q = filters.location.toLowerCase().trim();
      const match =
        property.title.toLowerCase().includes(q) ||
        property.location.city.toLowerCase().includes(q) ||
        property.location.country.toLowerCase().includes(q) ||
        property.location.neighborhood.toLowerCase().includes(q) ||
        property.location.address.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Min Price
    if (typeof filters.minPrice === "number" && filters.minPrice > 0) {
      if (property.price < filters.minPrice) return false;
    }

    // Max Price
    if (typeof filters.maxPrice === "number" && filters.maxPrice < 100000000) {
      if (property.price > filters.maxPrice) return false;
    }

    // Bedrooms
    if (filters.bedrooms && filters.bedrooms !== "All") {
      const beds = Number(filters.bedrooms);
      if (property.bedrooms < beds) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "beds":
        return b.bedrooms - a.bedrooms;
      case "area":
        return b.areaSqFt - a.areaSqFt;
      case "featured":
      default:
        // Featured first
        if (a.signature && !b.signature) return -1;
        if (!a.signature && b.signature) return 1;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
    }
  });
}
