"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Grid,
  List,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { PROPERTIES } from "@/lib/properties";
import { filterProperties, DEFAULT_FILTERS } from "@/lib/filters";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { FilterState, ListingType } from "@/types/property";

export function PropertyListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterState>({
    listingType: (searchParams.get("type") as ListingType) || "All",
    category: searchParams.get("category") || "All",
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 100000000,
    bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : "All",
    sortBy: (searchParams.get("sort") as FilterState["sortBy"]) || "featured",
    viewMode: (searchParams.get("view") as FilterState["viewMode"]) || "grid",
  });

  const [visibleCount, setVisibleCount] = useState(6);

  // Sync state to URL without reloading
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.listingType !== "All") params.set("type", filters.listingType);
    if (filters.category !== "All") params.set("category", filters.category);
    if (filters.location.trim()) params.set("location", filters.location.trim());
    if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice < 100000000) params.set("maxPrice", String(filters.maxPrice));
    if (filters.bedrooms !== "All") params.set("bedrooms", String(filters.bedrooms));
    if (filters.sortBy !== "featured") params.set("sort", filters.sortBy);
    if (filters.viewMode !== "grid") params.set("view", filters.viewMode);

    const queryString = params.toString();
    const targetUrl = queryString ? `/properties?${queryString}` : "/properties";
    window.history.replaceState(null, "", targetUrl);
  }, [filters]);

  const filteredListings = useMemo(() => {
    return filterProperties(PROPERTIES, filters);
  }, [filters]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    router.push("/properties");
  };

  const handleListingTypeChange = (type: ListingType | "All") => {
    setFilters((prev) => ({ ...prev, listingType: type }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header bar */}
      <div className="pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Global Collection</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
          Exceptional <span className="italic font-normal text-gold-gradient">Residences.</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          Explore vetted architectural monuments, waterfront pavilions, and trophy penthouses available
          for private acquisition and long-term lease.
        </p>
      </div>

      {/* Main Filter Bar */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-2xl">
        {/* Top Controls: Buy/Rent tabs, search input, reset, grid/list */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          {/* Buy / Rent / All Segment */}
          <div className="inline-flex p-1 rounded-full bg-black/60 border border-white/10 self-start">
            {(["All", "Buy", "Rent"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleListingTypeChange(type)}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  filters.listingType === type
                    ? "bg-[#c5a880] text-black shadow-md shadow-[#c5a880]/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {type === "All" ? "All Formats" : type === "Buy" ? "Acquisition" : "Lease"}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#c5a880] transition-colors">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Search city, architect, country..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              {filters.location && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* View Toggle & Reset */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              type="button"
              onClick={resetFilters}
              title="Reset all filters"
              className="px-3 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Grid vs List View */}
            <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, viewMode: "grid" }))}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  filters.viewMode === "grid"
                    ? "bg-[#c5a880] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, viewMode: "list" }))}
                aria-label="List view"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  filters.viewMode === "list"
                    ? "bg-[#c5a880] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Specific Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {/* Category */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
              Typology
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c5a880] cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Modern Penthouse">Modern Penthouse</option>
              <option value="Waterfront Estate">Waterfront Estate</option>
              <option value="Architectural Icon">Architectural Icon</option>
              <option value="Historic Palace">Historic Palace</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
              Minimum Price
            </label>
            <select
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c5a880] cursor-pointer"
            >
              <option value={0}>No Minimum</option>
              <option value={20000000}>$20,000,000+</option>
              <option value={35000000}>$35,000,000+</option>
              <option value={50000000}>$50,000,000+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
              Bedrooms
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  bedrooms: e.target.value === "All" ? "All" : Number(e.target.value),
                }))
              }
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#c5a880] cursor-pointer"
            >
              <option value="All">Any Bedrooms</option>
              <option value={4}>4+ Bedrooms</option>
              <option value={5}>5+ Bedrooms</option>
              <option value={6}>6+ Bedrooms</option>
              <option value={8}>8+ Bedrooms</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState["sortBy"] }))
              }
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-[#c5a880] font-medium focus:outline-none focus:border-[#c5a880] cursor-pointer"
            >
              <option value="featured">Curated (Featured)</option>
              <option value="price-desc">Price: Highest First</option>
              <option value="price-asc">Price: Lowest First</option>
              <option value="beds">Bedrooms: Most First</option>
              <option value="area">Area: Largest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between text-xs text-zinc-400">
        <div>
          Showing <span className="font-semibold text-white">{filteredListings.length}</span>{" "}
          {filteredListings.length === 1 ? "residence" : "exceptional residences"}
        </div>
        {filters.category !== "All" && (
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Filtered by:</span>
            <span className="text-[#c5a880] font-medium">{filters.category}</span>
          </div>
        )}
      </div>

      {/* Listings Grid / List */}
      {filteredListings.length > 0 ? (
        <div
          className={`mt-6 ${
            filters.viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              : "flex flex-col space-y-6"
          }`}
        >
          {filteredListings.slice(0, visibleCount).map((property) => (
            <div key={property.id}>
              <PropertyCard
                property={property}
                aspectRatio={filters.viewMode === "list" ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-16 py-16 text-center rounded-3xl bg-[#0d0d12] border border-white/10 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-zinc-400 mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif text-white">No Matching Residences Found</h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
            We could not find properties matching your current filter criteria. Try expanding your budget range or clearing search tags.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#c5a880] text-black hover:bg-[#dfc293] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredListings.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-zinc-300 hover:text-white border border-white/15 hover:border-[#c5a880] bg-white/5 transition-colors cursor-pointer"
          >
            Load Additional Residences ({filteredListings.length - visibleCount} Remaining)
          </button>
        </div>
      )}
    </div>
  );
}
