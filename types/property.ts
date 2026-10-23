export type PropertyCategory = 
  | "Luxury Villa"
  | "Modern Penthouse"
  | "Waterfront Estate"
  | "Architectural Icon"
  | "Historic Palace"
  | "Commercial";

export type ListingType = "Buy" | "Rent";

export type PropertyStatus = "Available" | "Private Reserve" | "Under Contract" | "Exclusive Listing";

export interface PropertyFloorPlan {
  level: string;
  title: string;
  sqFt: number;
  sqM: number;
  description: string;
  rooms: string[];
}

export interface PropertySpecs {
  ceilingHeight: string;
  views: string;
  parkingSpaces: number;
  furnishing: string;
  completionYear: number;
  energyRating: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: {
    city: string;
    country: string;
    address: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  priceFormatted: string;
  pricePerSqFt?: string;
  currency: string;
  listingType: ListingType;
  category: PropertyCategory;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  areaSqM: number;
  lotSize?: string;
  architect?: string;
  coverImage: string;
  gallery: string[];
  description: string;
  architecturalPhilosophy: string;
  amenities: string[];
  specs: PropertySpecs;
  floorPlans: PropertyFloorPlan[];
  featured: boolean;
  signature?: boolean;
  highlights: string[];
}

export interface FilterState {
  listingType: ListingType | "All";
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | "All";
  sortBy: "featured" | "price-asc" | "price-desc" | "beds" | "area";
  viewMode: "grid" | "list";
}
