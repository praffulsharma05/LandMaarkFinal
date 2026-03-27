import React, { useState, useEffect } from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";

interface FiltersType {
  city: string;
  bhk: string;
  property_type: string;
  construction_status: string;
  construction_type: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  sale_type: string;
  verified: string;
  project: string;
  featured_agent: string;
}

interface Props {
  filters: FiltersType;
  filterOptions: any;
  priceError: string;
  handleFilterChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetFilters: () => void;
}

const PropertyFilters: React.FC<Props> = ({
  filters,
  filterOptions,
  priceError,
  handleFilterChange,
  handleSubmit,
  resetFilters
}) => {
  const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const fetchCities = async () => {
    setIsLoadingCities(true);
    try {
      const url = "/api/cities";
      console.log("🏙️ Fetching cities from:", url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      console.log("🏙️ Cities API response:", json);

      const citiesData = json.data || json || [];
      setCities(citiesData);
    } catch (error) {
      console.error("❌ Error fetching cities:", error);
    } finally {
      setIsLoadingCities(false);
    }
  };
  
  useEffect(() => {
    fetchCities();
  }, []);

  // Helper function to safely get value from option (handles both string and object)
  const getOptionValue = (option: any): string => {
    if (typeof option === 'string') return option;
    if (option && typeof option === 'object') {
      return option.name || option.bhk?.toString() || '';
    }
    return '';
  };

  // Helper function to safely get display label from option
  const getOptionLabel = (option: any): string => {
    if (typeof option === 'string') return option;
    if (option && typeof option === 'object') {
      if (option.bhk) return `${option.bhk} BHK`;
      if (option.name) return option.name;
      return '';
    }
    return '';
  };

  // Safe array access with fallback
  const bhkOptions = Array.isArray(filterOptions?.bhk) ? filterOptions.bhk : [];
  const propertyTypeOptions = Array.isArray(filterOptions?.property_type) ? filterOptions.property_type : [];
  const constructionStatusOptions = Array.isArray(filterOptions?.construction_status) ? filterOptions.construction_status : [];
  const constructionTypeOptions = Array.isArray(filterOptions?.construction_type) ? filterOptions.construction_type : [];

  return (
    <div className="sticky top-4 z-10 flex justify-center px-4">
      <div className="w-full max-w-7xl backdrop-blur-xl bg-white/80 border border-gray-200 shadow-lg rounded-2xl px-5 py-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          {/* LEFT SIDE → FILTERS */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* BHK */}
            <select
              value={filters.bhk}
              onChange={(e) => handleFilterChange("bhk", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
            >
              <option value="">BHK</option>
              {bhkOptions.map((option, index) => (
                <option key={index} value={getOptionValue(option)}>
                  {getOptionLabel(option)}
                </option>
              ))}
            </select>

            {/* Property Type */}
            <select
              value={filters.property_type}
              onChange={(e) => handleFilterChange("property_type", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
            >
              <option value="">Property Type</option>
              {propertyTypeOptions.map((option, index) => (
                <option key={index} value={getOptionValue(option)}>
                  {getOptionLabel(option)}
                </option>
              ))}
            </select>

            {/* City */}
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
              disabled={isLoadingCities}
            >
              <option value="">City</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {/* Construction Status */}
            <select
              value={filters.construction_status}
              onChange={(e) => handleFilterChange("construction_status", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
            >
              <option value="">Construction Status</option>
              {constructionStatusOptions.map((option, index) => (
                <option key={index} value={getOptionValue(option)}>
                  {getOptionLabel(option)}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition">
              <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-20 text-sm focus:outline-none bg-transparent"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-20 text-sm focus:outline-none bg-transparent"
              />
            </div>

            {/* Construction Type - Only show if options exist */}
            {constructionTypeOptions.length > 0 && (
              <select
                value={filters.construction_type}
                onChange={(e) => handleFilterChange("construction_type", e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
              >
                <option value="">Construction Type</option>
                {constructionTypeOptions.map((option, index) => (
                  <option key={index} value={getOptionValue(option)}>
                    {getOptionLabel(option)}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* RIGHT SIDE → ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-3 min-w-[200px]">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-md hover:scale-[1.03] transition duration-200"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:bg-gray-100 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Error Message */}
        {priceError && (
          <p className="text-xs text-red-500 mt-2 ml-1">
            {priceError}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;