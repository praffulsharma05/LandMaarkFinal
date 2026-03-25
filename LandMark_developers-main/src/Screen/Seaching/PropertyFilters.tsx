// // import React, { useState, useEffect} from "react";
// // import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
// // import { ApiConstants } from "../../constants/ApiConstants";
// // import { ApiEndPoints } from "../../constants/ApiEndpoints";
  
// // const PropertyFilters: React.FC<Props > = ({
// //   filters,
// //   filterOptions,
// //   priceError,
// //   handleFilterChange,
// //   handleSubmit,
// //   resetFilters
// // }) => {

// //   const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);

// //   const ApiCities = async () => {
// //     try {
// //       const url = ApiConstants.API_BASE_URL + ApiEndPoints.CITIES;

// //       const res = await fetch(url, {
// //         headers: {
// //           "ngrok-skip-browser-warning": "true"
// //         }
// //       });

// //       const json = await res.json();
// //       console.log("Cities API:", json);

// //       // adjust based on API response
// //       setCities(json.data || json);

// //     } catch (error) {
// //       console.error("Error fetching cities:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     ApiCities();
// //   }, []);

// //   return (
// //     <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
// //       <div className="max-w-7xl mx-auto px-4 py-3">
        
// //         <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">

// //           {/* BHK */}
// //           <select
// //             value={filters.bhk}
// //             onChange={(e) => handleFilterChange("bhk", e.target.value)}
// //             className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //           >
// //             <option value="">BHK</option>
// //             {filterOptions?.bhk?.map((b) => (
// //               <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
// //             ))}
// //           </select>


// //           {/* Property Type */}
// //           <select
// //             value={filters.property_type}
// //             onChange={(e) => handleFilterChange("property_type", e.target.value)}
// //             className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //           >
// //             <option value="">Type</option>
// //             {filterOptions?.property_type?.map((t) => (
// //               <option key={t.name} value={t.name}>{t.name}</option>
// //             ))}
// //           </select>

// //           {/* Status */}
// //           <select
// //             value={filters.construction_status}
// //             onChange={(e) => handleFilterChange("construction_status", e.target.value)}
// //             className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //           >
// //             <option value="">Status</option>
// //             {filterOptions?.construction_status?.map((s) => (
// //               <option key={s.name} value={s.name}>{s.name}</option>
// //             ))}
// //           </select>

// //           {/* ✅ City (FIXED) */}
// //           <select
// //             value={filters.city}
// //             onChange={(e) => handleFilterChange("city", e.target.value)}
// //             className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //           >
// //             <option value="">City</option>

// //             {cities.map((city) => (
// //               <option key={city.city_id} value={city.name}>
// //                 {city.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Price */}
// //           <div className="flex items-center gap-2">
// //             <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
// //             <input
// //               type="number"
// //               value={filters.minPrice}
// //               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
// //               placeholder="Min"
// //               className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-sm"
// //             />
// //             <span className="text-gray-400">-</span>
// //             <input
// //               type="number"
// //               value={filters.maxPrice}
// //               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
// //               placeholder="Max"
// //               className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-sm"
// //             />
// //           </div>

// //           {/* Construction Type */}
// //           {filterOptions?.construction_types && (
// //             <select
// //               value={filters.construction_type}
// //               onChange={(e) => handleFilterChange("construction_type", e.target.value)}
// //               className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
// //             >
// //               <option value="">Construction</option>
// //               {filterOptions.construction_types.map((type) => (
// //                 <option key={type} value={type}>{type}</option>
// //               ))}
// //             </select>
// //           )}

// //           {/* Buttons */}
// //           <button type="submit" className="px-4 py-2 bg-blue-600 text-black text-sm rounded-lg">
// //             Apply
// //           </button>

// //           <button type="button" onClick={resetFilters} className="px-4 py-2 bg-gray-100 text-sm rounded-lg">
// //             Reset
// //           </button>

// //         </form>

// //         {priceError && (
// //           <p className="text-xs text-red-600 mt-2">{priceError}</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PropertyFilters;
 

//  import React, { useState, useEffect } from "react";
// import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";

// interface FiltersType {
//   city: string;
//   bhk: string;
//   property_type: string;
//   construction_status: string;
//   construction_type: string;
//   minPrice: string;
//   maxPrice: string;
//   search: string;
//   sale_type: string;
//   verified: string;
//   project: string;
//   featured_agent: string;
// }

// interface Props {
//   filters: FiltersType;
//   filterOptions: any;
//   priceError: string;
//   handleFilterChange: (name: string, value: string) => void;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   resetFilters: () => void;
// }

// const PropertyFilters: React.FC<Props> = ({
//   filters,
//   filterOptions,
//   priceError,
//   handleFilterChange,
//   handleSubmit,
//   resetFilters
// }) => {
//   const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);

//   const fetchCities = async () => {
//     try {
//       const url = "/api/cities";
//       console.log("🏙️ Fetching cities from:", url);

//       const res = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const json = await res.json();
//       console.log("🏙️ Cities API response:", json);

//       const citiesData = json.data || json || [];
//       setCities(citiesData);
//     } catch (error) {
//       console.error("❌ Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCities();
//   }, []);

//   return (
//     <div className="flex-1 min-w-[150px]  mt-20 py-2 border-white rounded-lg">
//       <div className="w-full  ">
//         <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 w-full">
//           <select
//             value={filters.bhk}
//             onChange={(e) => handleFilterChange("bhk", e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">BHK</option>
//             {filterOptions?.bhk?.map((b: any) => (
//               <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
//             ))}
//           </select>

//           <select
//             value={filters.property_type}
//             onChange={(e) => handleFilterChange("property_type", e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Property Type</option>
//             {filterOptions?.property_type?.map((t: any) => (
//               <option key={t.name} value={t.name}>{t.name}</option>
//             ))}
//           </select>

//           <select
//             value={filters.construction_status}
//             onChange={(e) => handleFilterChange("construction_status", e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Status</option>
//             {filterOptions?.construction_status?.map((s: any) => (
//               <option key={s.name} value={s.name}>{s.name}</option>
//             ))}
//           </select>

//           <select
//             value={filters.city}
//             onChange={(e) => handleFilterChange("city", e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">City</option>
//             {cities.map((city) => (
//               <option key={city.city_id} value={city.name}>
//                 {city.name}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center gap-2">
//             <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
//             <input
//               type="number"
//               value={filters.minPrice}
//               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
//               placeholder="Min Price"
//               className="w-28 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="text-gray-400">-</span>
//             <input
//               type="number"
//               value={filters.maxPrice}
//               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
//               placeholder="Max Price"
//               className="w-28 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {filterOptions?.construction_types && filterOptions.construction_types.length > 0 && (
//             <select
//               value={filters.construction_type}
//               onChange={(e) => handleFilterChange("construction_type", e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Construction Type</option>
//               {filterOptions.construction_types.map((type: string) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           )}

//           <button 
//             type="submit" 
//             className="px-4 py-2 bg-blue-600 text-black text-sm rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Apply Filters
//           </button>

//           <button 
//             type="button" 
//             onClick={resetFilters} 
//             className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             Reset
//           </button>
//         </form>

//         {priceError && (
//           <p className="text-xs text-red-600 mt-2">{priceError}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyFilters; 
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

  const fetchCities = async () => {
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
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="w-full mt-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 w-full">
          <select
            value={filters.bhk}
            onChange={(e) => handleFilterChange("bhk", e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">BHK</option>
            {filterOptions?.bhk?.map((b: any) => (
              <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
            ))}
          </select>

          <select
            value={filters.property_type}
            onChange={(e) => handleFilterChange("property_type", e.target.value)}
            className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Property Type</option>
            {filterOptions?.property_type?.map((t: any) => (
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>

          <select
            value={filters.construction_status}
            onChange={(e) => handleFilterChange("construction_status", e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Status</option>
            {filterOptions?.construction_status?.map((s: any) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>

          <select
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
            className="flex-1 min-w-[100px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 flex-1 min-w-[180px]">
            <CurrencyRupeeIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Min Price"
              className="flex-1 min-w-[70px] px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-400 flex-shrink-0">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Max Price"
              className="flex-1 min-w-[70px] px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {filterOptions?.construction_types && filterOptions.construction_types.length > 0 && (
            <select
              value={filters.construction_type}
              onChange={(e) => handleFilterChange("construction_type", e.target.value)}
              className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Construction Type</option>
              {filterOptions.construction_types.map((type: string) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}

          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm"
          >
            Apply Filters
          </button>

          <button 
            type="button" 
            onClick={resetFilters} 
            className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
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