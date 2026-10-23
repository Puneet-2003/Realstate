"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building, DollarSign, Bed, ArrowRight } from "lucide-react";
import { ListingType } from "@/types/property";

export function SearchPanel({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [listingType, setListingType] = useState<ListingType>("Buy");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set("type", listingType);
    if (location.trim()) params.set("location", location.trim());
    if (category !== "All") params.set("category", category);
    if (bedrooms !== "All") params.set("bedrooms", bedrooms);

    if (budget === "under-25m") {
      params.set("maxPrice", "25000000");
    } else if (budget === "25m-50m") {
      params.set("minPrice", "25000000");
      params.set("maxPrice", "50000000");
    } else if (budget === "50m-plus") {
      params.set("minPrice", "50000000");
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto rounded-3xl p-4 sm:p-6 bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/90 ${className}`}
    >
      <form onSubmit={handleSearch}>
        {/* Top bar: Buy/Rent Switch & Direct filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
          {/* Buy / Rent Switch */}
          <div className="inline-flex p-1 rounded-full bg-black/60 border border-white/10">
            <button
              type="button"
              onClick={() => setListingType("Buy")}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                listingType === "Buy"
                  ? "bg-[#c5a880] text-black shadow-md shadow-[#c5a880]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Acquire (Buy)
            </button>
            <button
              type="button"
              onClick={() => setListingType("Rent")}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                listingType === "Rent"
                  ? "bg-[#c5a880] text-black shadow-md shadow-[#c5a880]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Lease (Rent)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
            <span>Curated global portfolios across 24 gateway cities</span>
          </div>
        </div>

        {/* Search Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Location Input */}
          <div className="relative">
            <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-1">
              Location / Region
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#c5a880] transition-colors">
              <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bel Air, Manhattan, Como..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Property Category */}
          <div className="relative">
            <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-1">
              Residence Type
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#c5a880] transition-colors">
              <Building className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#121218] text-white">All Classifications</option>
                <option value="Luxury Villa" className="bg-[#121218] text-white">Luxury Villa</option>
                <option value="Modern Penthouse" className="bg-[#121218] text-white">Modern Penthouse</option>
                <option value="Waterfront Estate" className="bg-[#121218] text-white">Waterfront Estate</option>
                <option value="Architectural Icon" className="bg-[#121218] text-white">Architectural Icon</option>
                <option value="Historic Palace" className="bg-[#121218] text-white">Historic Palace</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="relative">
            <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-1">
              Budget Parameter
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#c5a880] transition-colors">
              <DollarSign className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent text-sm text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#121218] text-white">Any Price Bracket</option>
                <option value="under-25m" className="bg-[#121218] text-white">Under $25M</option>
                <option value="25m-50m" className="bg-[#121218] text-white">$25M – $50M</option>
                <option value="50m-plus" className="bg-[#121218] text-white">$50M+ Ultra Prime</option>
              </select>
            </div>
          </div>

          {/* Bedrooms & Search Button */}
          <div className="relative">
            <label className="block text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-1">
              Bedrooms
            </label>
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-[#c5a880] transition-colors">
              <Bed className="w-4 h-4 text-zinc-400 shrink-0" />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent text-sm text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#121218] text-white">Any Bedrooms</option>
                <option value="3" className="bg-[#121218] text-white">3+ Suites</option>
                <option value="4" className="bg-[#121218] text-white">4+ Suites</option>
                <option value="5" className="bg-[#121218] text-white">5+ Suites</option>
                <option value="6" className="bg-[#121218] text-white">6+ Suites</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-xl shadow-[#c5a880]/20 flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02]"
          >
            <Search className="w-4 h-4" />
            <span>Discover Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
