import React, { useState, useEffect } from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";

const PropertyFilters: React.FC<Props> = ({
  filters,
  filterOptions,
  priceError,
  handleFilterChange,
  handleSubmit,
  resetFilters
}) => {

  const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);

  const ApiCities = async () => {
    try {
      const url = ApiConstants.API_BASE_URL + ApiEndPoints.CITIES;

      const res = await fetch(url, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      const json = await res.json();
      console.log("Cities API:", json);

      // adjust based on API response
      setCities(json.data || json);

    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    ApiCities();
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">

          {/* BHK */}
          <select
            value={filters.bhk}
            onChange={(e) => handleFilterChange("bhk", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">BHK</option>
            {filterOptions?.bhk?.map((b) => (
              <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
            ))}
          </select>

          {/* Property Type */}
          <select
            value={filters.property_type}
            onChange={(e) => handleFilterChange("property_type", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">Type</option>
            {filterOptions?.property_type?.map((t) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={filters.construction_status}
            onChange={(e) => handleFilterChange("construction_status", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">Status</option>
            {filterOptions?.construction_status?.map((s) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>

          {/* ✅ City (FIXED) */}
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">City</option>

            {cities.map((city) => (
              <option key={city.city_id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Price */}
          <div className="flex items-center gap-2">
            <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Min"
              className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Max"
              className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          {/* Construction Type */}
          {filterOptions?.construction_types && (
            <select
              value={filters.construction_type}
              onChange={(e) => handleFilterChange("construction_type", e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="">Construction</option>
              {filterOptions.construction_types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}

          {/* Buttons */}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-black text-sm rounded-lg">
            Apply
          </button>

          <button type="button" onClick={resetFilters} className="px-4 py-2 bg-gray-100 text-sm rounded-lg">
            Reset
          </button>

        </form>

        {priceError && (
          <p className="text-xs text-red-600 mt-2">{priceError}</p>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;