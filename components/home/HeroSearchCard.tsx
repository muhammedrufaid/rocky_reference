"use client";

import React, { useState } from "react";
import { searchTabs, categoryOptions } from "../../utils/data";

const ChevronDown = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeroSearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof searchTabs)[number]>("Buy");
  const [category, setCategory] = useState("Residential");
  const [location, setLocation] = useState("");

  const categories = categoryOptions[activeTab] || categoryOptions.Buy;

  const inputBase =
    "w-full h-12 px-4 text-sm text-gray-900 bg-white border border-gray-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d365e]/20 focus:border-[#0d365e] transition-all duration-200 placeholder:text-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider";

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(13,54,94,0.15)] border border-white/50 overflow-hidden">
      {/* Tabs with refined styling */}
      <div className="flex border-b border-gray-100">
        {searchTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCategory(categoryOptions[tab][0]);
            }}
            className={`
              relative flex-1 py-4 px-4 text-sm font-semibold transition-all duration-300
              ${
                activeTab === tab
                  ? "text-[#0d365e]"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
              }
            `}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0d365e] to-[#1a5a8e]" />
            )}
          </button>
        ))}
      </div>

      {/* Filter fields with enhanced spacing */}
      <div className="p-6 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-5 lg:gap-6">
          {/* Category */}
          <div className="lg:col-span-2">
            <label className={labelClass}>Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputBase} pr-10 appearance-none cursor-pointer font-medium`}
              >
                {categories.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown />
              </span>
            </div>
          </div>

          {/* Location - enhanced with icon */}
          <div className="lg:col-span-3">
            <label className={labelClass}>Location</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPinIcon />
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search by city, building, or community"
                className={`${inputBase} pl-11`}
              />
            </div>
          </div>

          {/* Search button - premium styling */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className={labelClass}>&nbsp;</label>
            <button
              type="button"
              className="
                w-full h-12 px-6 text-sm font-semibold text-white 
                bg-gradient-to-r from-[#0d365e] to-[#1a5a8e]
                rounded-xl 
                hover:from-[#0f4274] hover:to-[#1e6aa3]
                active:scale-[0.98]
                transition-all duration-200
                flex items-center justify-center gap-2.5
                shadow-lg shadow-[#0d365e]/20
                hover:shadow-xl hover:shadow-[#0d365e]/30
              "
            >
              <SearchIcon />
              <span>Search Properties</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchCard;