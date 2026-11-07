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
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";
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
      <StaggerContainer staggerDelay={0.12} className="pb-8 border-b border-[#CFCCAE]">
        <StaggerItem className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#4C4829] font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#6B6840]" />
          <span>The Global Collection</span>
        </StaggerItem>
        <StaggerItem>
        <h1 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#1E1700] font-normal tracking-tight">
          Exceptional <span className="italic font-normal text-[#5A5734]">Residences.</span>
        </h1>
        </StaggerItem>
        <StaggerItem as="div" className="mt-3 text-sm sm:text-base text-[#3E3A1F] font-normal max-w-2xl leading-relaxed">
          Explore vetted architectural monuments, waterfront pavilions, and trophy penthouses available
          for private acquisition and long-term lease.
        </StaggerItem>
      </StaggerContainer>

      {/* Main Filter Bar */}
      <FadeIn delay={0.3} threshold={0.05} className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#CFCCAE] shadow-md shadow-[#2B2612]/6">
        {/* Top Controls: Buy/Rent tabs, search input, reset, grid/list */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#CFCCAE]">
          {/* Buy / Rent / All Segment */}
          <div className="inline-flex p-1 rounded-full bg-[#F8F7F0] border border-[#CFCCAE] self-start">
            {(["All", "Buy", "Rent"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleListingTypeChange(type)}
                className={`px-4 sm:px-5 py-2 sm:py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  filters.listingType === type
                    ? "bg-[#5A5734] text-white shadow-md shadow-[#5A5734]/20"
                    : "text-[#3E3A1F] hover:text-[#1E1700]"
                }`}
              >
                {type === "All" ? "All Formats" : type === "Buy" ? "Acquisition" : "Lease"}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8F7F0] border border-[#CFCCAE] focus-within:border-[#5A5734] transition-colors">
              <Search className="w-4 h-4 text-[#5A5734] shrink-0" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Search city, architect, country..."
                className="w-full bg-transparent text-xs sm:text-sm text-[#1E1700] font-medium placeholder-[#7F6B60] focus:outline-none"
              />
              {filters.location && (
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}
                  className="text-xs text-[#5A5734] hover:text-[#1E1700] font-bold cursor-pointer"
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
              className="px-3 py-2 rounded-xl border border-[#6B6840]/20 text-[#5A5734] hover:text-white hover:bg-[#5A5734] text-xs flex items-center gap-1.5 transition-colors cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Grid vs List View */}
            <div className="inline-flex p-1 rounded-xl bg-[#F8F7F0] border border-[#6B6840]/20">
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, viewMode: "grid" }))}
                aria-label="Grid view"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  filters.viewMode === "grid"
                    ? "bg-[#5A5734] text-white"
                    : "text-[#6F6C55] hover:text-[#2B2612]"
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
                    ? "bg-[#5A5734] text-white"
                    : "text-[#6F6C55] hover:text-[#2B2612]"
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
            <label className="block text-[10px] uppercase tracking-wider text-[#5A5734] font-semibold mb-1">
              Typology
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-[#F8F7F0] border border-[#6B6840]/20 text-xs text-[#2B2612] focus:outline-none focus:border-[#5A5734] cursor-pointer"
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
            <label className="block text-[10px] uppercase tracking-wider text-[#5A5734] font-semibold mb-1">
              Minimum Price
            </label>
            <select
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
              className="w-full px-3 py-2 rounded-xl bg-[#F8F7F0] border border-[#6B6840]/20 text-xs text-[#2B2612] focus:outline-none focus:border-[#5A5734] cursor-pointer"
            >
              <option value={0}>No Minimum</option>
              <option value={20000000}>$20,000,000+</option>
              <option value={35000000}>$35,000,000+</option>
              <option value={50000000}>$50,000,000+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#5A5734] font-semibold mb-1">
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
              className="w-full px-3 py-2 rounded-xl bg-[#F8F7F0] border border-[#6B6840]/20 text-xs text-[#2B2612] focus:outline-none focus:border-[#5A5734] cursor-pointer"
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
            <label className="block text-[10px] uppercase tracking-wider text-[#5A5734] font-semibold mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState["sortBy"] }))
              }
              className="w-full px-3 py-2 rounded-xl bg-[#F8F7F0] border border-[#6B6840]/20 text-xs text-[#5A5734] font-semibold focus:outline-none focus:border-[#5A5734] cursor-pointer"
            >
              <option value="featured">Curated (Featured)</option>
              <option value="price-desc">Price: Highest First</option>
              <option value="price-asc">Price: Lowest First</option>
              <option value="beds">Bedrooms: Most First</option>
              <option value="area">Area: Largest First</option>
            </select>
          </div>
        </div>
      </FadeIn>

      {/* Results Header */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-[#A9A68A]">
        <div>
          Showing <span className="font-semibold text-[#1E1700]">{filteredListings.length}</span>{" "}
          {filteredListings.length === 1 ? "residence" : "exceptional residences"}
        </div>
        {filters.category !== "All" && (
          <div className="flex items-center gap-1.5">
            <span className="text-[#8A876A]">Filtered by:</span>
            <span className="text-[#BCB893] font-medium">{filters.category}</span>
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
          {filteredListings.slice(0, visibleCount).map((property, i) => (
            <FadeIn key={property.id} distance={36} duration={0.8} threshold={0.15} delay={filters.viewMode === "grid" ? (i % 3) * 0.1 : 0}>
              <PropertyCard
                property={property}
                aspectRatio={filters.viewMode === "list" ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"}
              />
            </FadeIn>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 sm:mt-16 py-12 sm:py-16 px-6 text-center rounded-3xl bg-[#0d0d12] border border-white/10 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#A9A68A] mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif text-white">No Matching Residences Found</h3>
          <p className="text-xs text-[#A9A68A] mt-2 max-w-sm mx-auto leading-relaxed">
            We could not find properties matching your current filter criteria. Try expanding your budget range or clearing search tags.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#BCB893] text-black hover:bg-[#CFCCAE] transition-colors cursor-pointer"
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
            className="px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-[#C9C7AE] hover:text-white border border-white/15 hover:border-[#BCB893] bg-white/5 transition-colors cursor-pointer"
          >
            Load Additional Residences ({filteredListings.length - visibleCount} Remaining)
          </button>
        </div>
      )}
    </div>
  );
}
