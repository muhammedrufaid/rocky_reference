"use client";

import React, { useState } from "react";
import { searchTabs, categoryOptions } from "../../utils/data";

const HeroSearchCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof searchTabs)[number]>("Buy");
  const [category, setCategory] = useState("Residential");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const categories = categoryOptions[activeTab] || categoryOptions.Buy;
  const isResidential = category === "Residential";

  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-[var(--border-light)] overflow-hidden">
      {/* Tabs */}
      <div className="flex p-1.5 gap-1 bg-[var(--soft-sand)]/30">
        {searchTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCategory(categoryOptions[tab][0]);
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[var(--rocky-blue)] text-white shadow-sm"
                : "bg-white text-[var(--charcoal)] hover:bg-white/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search controls */}
      <div className="p-4 md:p-5">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-end ${isResidential ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
          {/* Category dropdown */}
          <div>
            <label className="block text-xs font-medium text-[var(--charcoal)]/70 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 text-sm text-[var(--charcoal)] bg-white border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)] focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"
            >
              {categories.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Location input */}
          <div className="md:col-span-1 lg:col-span-1">
            <label className="block text-xs font-medium text-[var(--charcoal)]/70 mb-1.5">
              Location
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--charcoal)]/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, building or community"
                className="w-full pl-10 pr-4 py-2.5 text-sm text-[var(--charcoal)] bg-white border border-[var(--border-light)] rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Budget dropdown */}
          <div>
            <label className="block text-xs font-medium text-[var(--charcoal)]/70 mb-1.5">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2.5 text-sm text-[var(--charcoal)] bg-white border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)] focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"
            >
              <option value="">Any</option>
              <option value="500k">AED 500K - 1M</option>
              <option value="1m">AED 1M - 2M</option>
              <option value="2m">AED 2M - 5M</option>
              <option value="5m">AED 5M+</option>
            </select>
          </div>

          {/* Bedrooms (only when Residential) */}
          {isResidential && (
            <div>
              <label className="block text-xs font-medium text-[var(--charcoal)]/70 mb-1.5">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-4 py-2.5 text-sm text-[var(--charcoal)] bg-white border border-[var(--border-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)] focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
          )}

          {/* Search button */}
          <div>
            <button
              type="button"
              className="w-full py-3 px-6 text-sm font-semibold text-white bg-[var(--rocky-blue)] rounded-lg hover:bg-[var(--rocky-blue-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--rocky-blue)] focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchCard;
