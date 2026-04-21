import React, { useState, useEffect } from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";

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

const PropertyFilters2: React.FC<Props> = ({
  filters,
  filterOptions: propFilterOptions,
  priceError,
  handleFilterChange,
  handleSubmit,
  resetFilters
}) => {
  const [optionsData, setOptionsData] = useState<any>({});

  const fetchOptions = async () => {
    try {
      const url = `${ApiConstants.API_BASE_URL}${ApiEndPoints.OPTIONS}`;
      console.log("🔍 Fetching options from:", url);

      const res = await axios.get(url, { headers: ApiConstants.HEADERS });
      console.log("📦 Options data:", res.data);
      setOptionsData(res.data);
    } catch (error) {
      console.error("❌ Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const filterOptions = propFilterOptions?.bhk ? propFilterOptions : optionsData;

  // Helper function to safely get value from option
  const getOptionValue = (option: any, type: string): string => {
    if (!option) return '';
    if (type === 'bhk') return option.bhk?.toString() || '';
    return option.name || option.bhk?.toString() || '';
  };

  // Helper function to get display label from option
  const getOptionLabel = (option: any, type: string): string => {
    if (!option) return '';
    if (type === 'bhk') return `${option.bhk} BHK`;
    return option.name || '';
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
              {bhkOptions.map((option: any, index: number) => (
                <option key={index} value={getOptionValue(option, 'bhk')}>
                  {getOptionLabel(option, 'bhk')}
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
              {propertyTypeOptions.map((option: any, index: number) => (
                <option key={index} value={getOptionValue(option, 'property')}>
                  {getOptionLabel(option, 'property')}
                </option>
              ))}
            </select>

            {/* City */}
            {/* <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
              disabled={isLoadingCities}
            >
              <option value="">City</option>
              {cities.map((city, index: number) => (
                <option key={city.city_id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select> */}

            {/* Construction Status */}
            <select
              value={filters.construction_status}
              onChange={(e) => handleFilterChange("construction_status", e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer"
            >
              <option value="">Construction Status</option>
              {constructionStatusOptions.map((option: any, index: number) => (
                <option key={index} value={getOptionValue(option, 'status')}>
                  {getOptionLabel(option, 'status')}
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
                {constructionTypeOptions.map((option: any, index: number) => (
                  <option key={index} value={getOptionValue(option, 'type')}>
                    {getOptionLabel(option, 'type')}
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

export default PropertyFilters2;