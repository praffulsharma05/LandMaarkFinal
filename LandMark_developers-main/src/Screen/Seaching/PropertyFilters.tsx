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
//  return (
//   <div className="fixed  left-0 right-0 -mt-6 bg-white border-b border-gray-200 z-50 shadow-sm">
//   <div className="w-250 px-4 py-4">
//     <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 w-full">     
      
//       <select
//         value={filters.bhk}
//         onChange={(e) => handleFilterChange("bhk", e.target.value)}
//  className="w-auto px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"      >
//         <option value="">BHK Type</option>
//         {filterOptions?.bhk?.map((b: any) => (
//           <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
//         ))}
//       </select>
//         <select
//             value={filters.property_type}
//             onChange={(e) => handleFilterChange("property_type", e.target.value)}
//  className="w-30 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//  >
//             <option value="">Property Type</option>
//             {filterOptions?.property_type?.map((t: any) => (
//               <option key={t.name} value={t.name}>{t.name}</option>
//             ))}
//           </select>
//           <select
//             value={filters.city}
//             onChange={(e) => handleFilterChange("city", e.target.value)}
//             className="w-30 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//           >
//             <option value="">City</option>
//             {cities.map((city) => (
//               <option key={city.city_id} value={city.name}>
//                 {city.name}
//               </option>
//             ))}
//           </select>
//        <select
//         value={filters.construction_status}
//         onChange={(e) => handleFilterChange("construction_status", e.target.value)}
//         className="w-30 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//       >
//         <option value="">Construction</option>
//         {filterOptions?.construction_status?.map((s: any) => (
//           <option key={s.name} value={s.name}>{s.name}</option>
//         ))}
//       </select>

//        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
//             <CurrencyRupeeIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
//             <input
//               type="number"
//               value={filters.minPrice}
//               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
//               placeholder="Min Price"
//               className="w-30 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//             />
//             <span className="text-gray-400 flex-shrink-0">-</span>
//             <input
//               type="number"
//               value={filters.maxPrice}
//               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
//               placeholder="Max Price"
//               className="w-30 px-2 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//             />
//           </div>

//           {filterOptions?.construction_types && filterOptions.construction_types.length > 0 && (
//             <select
//               value={filters.construction_type}
//               onChange={(e) => handleFilterChange("construction_type", e.target.value)}
//               className="w-30 px-200 py-1 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white cursor-pointer"
//             >
//               <option value="">Construction Type</option>
//               {filterOptions.construction_types.map((type: string) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>  
//           )}
//       <button 
//         type="submit" 
//         className="flex items-right gap-2"
//       >
//         Apply Filters
//       </button>
//       <button 
//         type="button" 
//         onClick={resetFilters} 
//         className="flex items- gap-2"
//       >
//         Reset
//       </button>
//     </form>
//     {priceError && (
//       <p className="text-xs text-red-600 mt-2">{priceError}</p>
//     )}
//   </div>
// </div> 
 
//   );
// };
// export default PropertyFilters;

 
// import React, { useState, useEffect } from "react";
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

//   // Debug: Log filterOptions to see what's available
//   useEffect(() => {
//     console.log("Filter Options:", filterOptions);
//     console.log("Construction Status Options:", filterOptions?.construction_status);
//   }, [filterOptions]);

//   return (

//     <div className="fixed left-0 right-0 -mt-6 bg-white border-b border-gray-200 z-50 shadow-sm">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
//         <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-between gap-3">
//           {/* Left side - all filter inputs */}
//           <div className="flex flex-wrap items-center gap-2 flex-1">
//             <select
//               value={filters.bhk}
//               onChange={(e) => handleFilterChange("bhk", e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-colors"
//             >
//               <option value="">BHK Type</option>
//               {filterOptions?.bhk?.map((b: any) => (
//                 <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
//               ))}
//             </select>
            
//             <select
//               value={filters.property_type}
//               onChange={(e) => handleFilterChange("property_type", e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-colors"
//             >
//               <option value="">Property Type</option>
//               {filterOptions?.property_type?.map((t: any) => (
//                 <option key={t.name} value={t.name}>{t.name}</option>
//               ))}
//             </select>
            
//             <select
//               value={filters.city}
//               onChange={(e) => handleFilterChange("city", e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-colors"
//             >
//               <option value="">City</option>
//               {cities.map((city) => (
//                 <option key={city.city_id} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
            
//             {/* Construction Status - Fixed */}
//             <select
//               value={filters.construction_status}
//               onChange={(e) => handleFilterChange("construction_status", e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-colors"
//             >
//               <option value="">Construction Status</option>
//               {filterOptions?.construction_status && filterOptions.construction_status.length > 0 ? (
//                 filterOptions.construction_status.map((s: any) => (
//                   <option key={s.name || s} value={s.name || s}>
//                     {s.name || s}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No options available</option>
//               )}
//             </select>

//             {/* Price Range Inputs */}
//             <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-300">
//               <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
//               <input
//                 type="number"
//                 value={filters.minPrice}
//                 onChange={(e) => handleFilterChange("minPrice", e.target.value)}
//                 placeholder="Min Price"
//                 className="w-24 px-2 py-1.5 bg-transparent text-sm focus:outline-none"
//               />
//               <span className="text-gray-400">-</span>
//               <input
//                 type="number"
//                 value={filters.maxPrice}
//                 onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
//                 placeholder="Max Price"
//                 className="w-24 px-2 py-1.5 bg-transparent text-sm focus:outline-none"
//               />
//             </div>

//             {/* Construction Type */}
//             {filterOptions?.construction_types && filterOptions.construction_types.length > 0 && (
//               <select
//                 value={filters.construction_type}
//                 onChange={(e) => handleFilterChange("construction_type", e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-colors"
//               >
//                 <option value="">Construction Type</option>
//                 {filterOptions.construction_types.map((type: string) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>  
//             )}
//           </div>

//           {/* Right side - buttons */}
//           <div className="flex items-center gap-2">
//             <button 
//               type="submit" 
//               className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               Apply Filters
//             </button>
//             <button 
//               type="button" 
//               onClick={resetFilters} 
//               className="px-5 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 flex items-center gap-2"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               Reset
//             </button>
//           </div>
//         </form>
        
//         {priceError && (
//           <p className="text-xs text-red-600 mt-2 ml-1">{priceError}</p>
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

  // Debug: Log all filterOptions to see what's available
  useEffect(() => {
    console.log("=== Filter Options Debug ===");
    console.log("Full filterOptions:", filterOptions);
    console.log("BHK Options:", filterOptions?.bhk);
    console.log("Property Type Options:", filterOptions?.property_type);
    console.log("Construction Status Options:", filterOptions?.construction_status);
    console.log("Construction Type Options:", filterOptions?.construction_type);
    console.log("All keys in filterOptions:", filterOptions ? Object.keys(filterOptions) : "No filterOptions");
    console.log("============================");
  }, [filterOptions]);

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
          className="filter-pill"
        >
          <option value="">BHK</option>
          {filterOptions?.bhk?.map((b, i) => (
            <option key={i} value={b.bhk || b}>
              {b.bhk ? `${b.bhk} BHK` : b}
            </option>
          ))}
        </select>

        {/* Property Type */}
        <select
          value={filters.property_type}
          onChange={(e) => handleFilterChange("property_type", e.target.value)}
          className="filter-pill"
        >
          <option value="">Property Type</option>
          {filterOptions?.property_type?.map((t, i) => (
            <option key={i} value={t.name || t}>
              {t.name || t}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={filters.city}
          onChange={(e) => handleFilterChange("city", e.target.value)}
          className="filter-pill"
        >
          <option value="">City</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.construction_status}
          onChange={(e) =>
            handleFilterChange("construction_status", e.target.value)
          }
          className="filter-pill"
        >
          <option value="">Construction Status</option>
          {filterOptions?.construction_status?.map((s, i) => (
            <option key={i} value={s.name || s}>
              {s.name || s}
            </option>
          ))}
        </select>

        {/* Price */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition">
          <span className="text-gray-500 text-sm">₹</span>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              handleFilterChange("minPrice", e.target.value)
            }
            className="w-20 text-sm focus:outline-none bg-transparent"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              handleFilterChange("maxPrice", e.target.value)
            }
            className="w-20 text-sm focus:outline-none bg-transparent"
          />
        </div>

        {/* Construction Type */}
        {filterOptions?.construction_type?.length > 0 && (
          <select
            value={filters.construction_type}
            onChange={(e) =>
              handleFilterChange("construction_type", e.target.value)
            }
            className="filter-pill"
          >
            <option value="">Construction Type</option>
            {filterOptions.construction_type.map((t, i) => (
              <option key={i} value={t.name || t}>
                {t.name || t}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* RIGHT SIDE → ACTION BUTTONS */}
      <div className="flex items-center justify-end gap-3 min-w-[200px]">

        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-md hover:scale-[1.03] transition"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={resetFilters}
          className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </form>

    {/* Error */}
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