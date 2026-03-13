 
// import { useState, useEffect, useCallback } from 'react';
// import './Property.css';

// interface Property {
//   property_id: number;
//   title: string;
//   image: string;
//   construction_status: string;
//   construction_type: string;
//   property_type: string;
//   bhk: number;
//   verified: number;
//   area_sqft: number;
//   created_at: string;
//   price: string;
//   location: string;
// }

// const PropertySearch = () => {
//   // API configuration
//   const API_BASE_URL = 'http://localhost:5000/api';

//   // State management
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [totalCount, setTotalCount] = useState(0);
  
//   // Filter states - these will be sent to API
//   const [filters, setFilters] = useState({
//     city: '',
//     bhk: '',
//     property_type: '',
//     construction_status: '',
//     construction_type: '',
//     minPrice: '',
//     maxPrice: '',
//     search: ''
//   });

//   // Price validation error state
//   const [priceError, setPriceError] = useState<string>('');

//   // Get unique filter options (these could also come from a separate API endpoint)
//   const [filterOptions, setFilterOptions] = useState({
//     cities: [],
//     bhk: [1, 2, 3, 4, 5],
//     property_types: ['Apartment', 'Villa', 'House', 'Commercial'],
//     construction_status: ['Ready to Move',  'Under Construction'],
//     construction_types: ['New', 'Resale']
//   });
 
//   // Validate price inputs
//   const validatePrices = (min: string, max: string): boolean => {
//     if (min && max && parseFloat(min) > parseFloat(max)) {
//       setPriceError('Minimum price cannot be greater than maximum price');
//       return false;
//     }
//     setPriceError('');
//     return true;
//   };

//   // Build query string from filters
//   const buildQueryString = useCallback(() => {
//     const params = new URLSearchParams();
    
//     // Add filters only if they have values
//     if (filters.city) params.append('city', filters.city);
//     if (filters.bhk) params.append('bhk', filters.bhk);
//     if (filters.property_type) params.append('type', filters.property_type);
//     if (filters.construction_status) params.append('construction_status', filters.construction_status);
//     if (filters.construction_type) params.append('construction_type', filters.construction_type);
    
//     // Price filters - only add if they have valid values
//     if (filters.minPrice && !isNaN(Number(filters.minPrice)) && Number(filters.minPrice) > 0) {
//       params.append('minPrice', filters.minPrice);
//     }
//     if (filters.maxPrice && !isNaN(Number(filters.maxPrice)) && Number(filters.maxPrice) > 0) {
//       params.append('maxPrice', filters.maxPrice);
//     }
    
//     if (filters.search) params.append('search', filters.search);
    
//     return params.toString();
//   }, [filters]);

//   // Fetch properties from API with current filters
//   const fetchProperties = useCallback(async () => {
//     // Don't fetch if there's a price validation error
//     if (priceError) {
//       return;
//     }

//     setLoading(true);
//     setError(null);
    
//     try {
//       const queryString = buildQueryString();
//       const url = `${API_BASE_URL}/properties${queryString ? `?${queryString}` : ''}`;
      
//       console.log('Fetching from:', url); // For debugging
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true'
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Received properties:', data);
      
//       // Handle different response formats
//       if (Array.isArray(data)) {
//         setProperties(data);
//         setTotalCount(data.length);
//       } else if (data.data && Array.isArray(data.data)) {
//         setProperties(data.data);
//         setTotalCount(data.total || data.data.length);
//       } else {
//         setProperties([]);
//         setTotalCount(0);
//       }
      
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
//       setError(errorMessage);
//       console.error('Error fetching properties:', err);
//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [buildQueryString, priceError]);
 

//   // Handle filter changes with price validation
//   const handleFilterChange = (filterName: string, value: string | number | boolean): void => {
//     if (filterName === 'minPrice' || filterName === 'maxPrice') {
//       // Allow empty string or valid numbers
//       if (value !== '' && (isNaN(Number(value)) || parseFloat(String(value)) < 0)) {
//         return; // Don't update if invalid
//       }
      
//       setFilters(prev => {
//         const newFilters = { ...prev, [filterName]: value };
        
//         // Validate prices when either field changes
//         const min = filterName === 'minPrice' ? String(value) : prev.minPrice;
//         const max = filterName === 'maxPrice' ? String(value) : prev.maxPrice;
//         validatePrices(min, max);
        
//         return newFilters;
//       });
//     } else {
//       setFilters(prev => ({
//         ...prev,
//         [filterName]: value
//       }));
      
//       // Trigger fetch for filter changes (except price filters which have their own debounce)
//       if (filterName !== 'minPrice' && filterName !== 'maxPrice') {
//         setTimeout(() => {
//           fetchProperties();
//         }, 300);
//       }
//     }
//   };

//   // Handle search input with debounce
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const value = e.target.value;
//     setFilters(prev => ({
//       ...prev,
//       search: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     if (!priceError) {
//       fetchProperties();
//     }
//   };

//   // Handle filter reset
//   const resetFilters = () => {
//     setFilters({
//       city: '',
//       bhk: '',
//       property_type: '',
//       construction_status: '',
//       construction_type: '',
//       minPrice: '',
//       maxPrice: '',
//       search: ''
//     });
//     setPriceError(''); // Clear price error
//     // Fetch all properties after reset
//     setTimeout(() => fetchProperties(), 0);
//   };

//   // Debounced search effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (filters.search !== undefined && !priceError) {
//         fetchProperties();
//       }
//     }, 500); // Debounce delay

//     return () => clearTimeout(timer);
//   }, [filters.search, fetchProperties, priceError]);

//   // Debounced price filter effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!priceError && (filters.minPrice || filters.maxPrice)) {
//         fetchProperties();
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [filters.minPrice, filters.maxPrice, fetchProperties, priceError]);

//   // Initial fetch on component mount
//   useEffect(() => {
//     fetchProperties();
//     // fetchFilterOptions(); // Optional: fetch filter options
//   }, []);

//   return (
//     <div className="property-search-container">
//       <h1 className="page-title">Search Properties</h1>
      
//       {/* Search Form */}
//       <form onSubmit={handleSubmit} className="search-form">
//         {/* Search Bar */}
//         <div className="search-section">
//           <input
//             type="text"
//             placeholder="Search by location, property name, or description..."
//             value={filters.search || ''}
//             onChange={handleSearch}
//             className="search-input"
//           />
//         </div>

//         {/* Filters Section */}
//         <div className="filters-section">
//           <div className="filters-grid">
//             {/* City Filter */}
//             <div className="filter-item">
//               <label>City</label>
//               <input
//                 type="text"
//                 placeholder="Enter city name"
//                 value={filters.city}
//                 onChange={(e) => handleFilterChange('city', e.target.value)}
//                 list="cities"
//               />
//               <datalist id="cities">
//                 {filterOptions.cities.map(city => (
//                   <option key={city} value={city} />
//                 ))}
//               </datalist>
//             </div>

//             {/* BHK Filter */}
//             <div className="filter-item">
//               <label>BHK</label>
//               <select
//                 value={filters.bhk}
//                 onChange={(e) => handleFilterChange('bhk', e.target.value)}
//               >
//                 <option value="">All BHK</option>
//                 {filterOptions.bhk.map(option => (
//                   <option key={option} value={option}>{option} BHK</option>
//                 ))}
//               </select>
//             </div>

//             {/* Property Type Filter */}
//             <div className="filter-item">
//               <label>Property Type</label>
//               <select
//                 value={filters.property_type}
//                 onChange={(e) => handleFilterChange('property_type', e.target.value)}
//               >
//                 <option value="">All Types</option>
//                 {filterOptions.property_types.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Construction Status Filter */}
//             <div className="filter-item">
//               <label>Construction Status</label>
//               <select
//                 value={filters.construction_status}
//                 onChange={(e) => handleFilterChange('construction_status', e.target.value)}
//               >
//                 <option value="">All Status</option>
//                 {filterOptions.construction_status.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Construction Type Filter */}
//             <div className="filter-item">
//               <label>Construction Type</label>
//               <select
//                 value={filters.construction_type}
//                 onChange={(e) => handleFilterChange('construction_type', e.target.value)}
//               >
//                 <option value="">All Types</option>
//                 {filterOptions.construction_types.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Min Price Filter */}
//             <div className="filter-item">
//               <label>Min Price (₹)</label>
//               <input
//                 type="number"
//                 placeholder="Min Price"
//                 value={filters.minPrice}
//                 onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//                 min="0"
//                 step="100000"
//               />
//             </div>

//             {/* Max Price Filter */}
//             <div className="filter-item">
//               <label>Max Price (₹)</label>
//               <input
//                 type="number"
//                 placeholder="Max Price"
//                 value={filters.maxPrice}
//                 onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//                 min="0"
//                 step="100000"
//               />
//             </div>
//           </div>

//           {/* Price Validation Error */}
//           {priceError && (
//             <div className="price-error-message">
//               {priceError}
//             </div>
//           )}

//           {/* Filter Actions */}
//           <div className="filter-actions">
//             <button 
//               type="submit" 
//               className="search-button"
//               disabled={!!priceError}
//             >
//               Search Properties
//             </button>
//             <button type="button" onClick={resetFilters} className="reset-button">
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Loading State */}
//       {loading && (
//         <div className="loading-spinner">
//           <div className="spinner"></div>
//           <p>Loading properties from database...</p>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="error-message">
//           <p>Error: {error}</p>
//           <button onClick={fetchProperties} className="retry-button">
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Results Section */}
//       {!loading && !error && (
//         <div className="results-section">
//           <div className="results-header">
//             <h2>Properties Found: {totalCount}</h2>
//             {totalCount > 0 && (
//               <p className="results-info">
//                 Showing {properties.length} of {totalCount} properties from database
//               </p>
//             )}
//           </div>

//           <div className="properties-grid">
//             {properties.length > 0 ? (
//               properties.map((property) => (
//                 <div key={property.property_id} className="property-card">
//                   {/* Image Gallery */}
//                   {property.image ? (
//                     <div className="property-images">
//                       <img 
//                         src={property.image} 
//                         alt={property.title}
//                         className="property-main-image"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.onerror = null;
//                           target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="no-image-placeholder">
//                       <span>PREMIUM PROPERTY</span>
//                     </div>
//                   )}

//                   <div className="property-details">
//                     <h3 className="property-title">
//                       {property.title}
//                     </h3>
                    
//                     {/* Tags */}
//                     <div className="property-tags">
//                       {property.construction_status && (
//                         <span className="tag status">{property.construction_status}</span>
//                       )}
//                       {property.construction_type && (
//                         <span className="tag type">{property.construction_type}</span>
//                       )}
//                       {property.property_type && (
//                         <span className="tag property">{property.property_type}</span>
//                       )}
//                       {property.bhk && (
//                         <span className="tag bhk">{property.bhk} BHK</span>
//                       )}
//                       {property.verified === 1 && (
//                         <span className="tag verified">Verified</span>
//                       )}
//                     </div>

//                     {/* Area */}
//                     <div className="property-details-grid">
//                       <div className="detail-item">
//                         <span className="detail-label">Area</span>
//                         <span className="detail-value">{property.area_sqft?.toLocaleString()} sqft</span>
//                       </div>
//                       {property.created_at && (
//                         <div className="detail-item">
//                           <span className="detail-label">Listed</span>
//                           <span className="detail-value">
//                             {new Date(property.created_at).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric',
//                               year: 'numeric'
//                             })}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Price and Location */}
//                     <div className="property-footer">
//                       <span className="property-price">
//                         ₹{(parseFloat(property.price) / 10000000).toFixed(1)} CRORES
//                       </span>
//                       <span className="property-location">
//                         📍 {property.location?.split(',')[0]}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-results">
//                 <p>No properties found matching your criteria in the database.</p>
//                 <button onClick={resetFilters} className="reset-button">
//                   Clear Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertySearch;

// // import { useState, useEffect, useCallback, useMemo } from 'react';
// // import './Property.css';

// // interface Property {
// //   property_id: number;
// //   title: string;
// //   image: string;
// //   construction_status: string;
// //   construction_type: string;
// //   property_type: string;
// //   bhk: number;
// //   verified: number;
// //   area_sqft: number;
// //   created_at: string;
// //   price: string;
// //   location: string;
// // }

// // const PropertySearch = () => {
// //   // API configuration - this returns ALL properties
// //   const API_URL = 'https://api.jsonsilo.com/public/d5689335-06e7-4ba2-827e-a816b9236c7e';

// //   // State management
// //   const [allProperties, setAllProperties] = useState<Property[]>([]);
// //   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
  
// //   // Filter states
// //   const [filters, setFilters] = useState({
// //     city: '',
// //     bhk: '',
// //     property_type: '',
// //     construction_status: '',
// //     construction_type: '',
// //     minPrice: '',
// //     maxPrice: '',
// //     search: ''
// //   });

// //   // Price validation error state
// //   const [priceError, setPriceError] = useState<string>('');

// //   // Get unique filter options from the data
// //   const [filterOptions, setFilterOptions] = useState({
// //     cities: [] as string[],
// //     bhk: [] as number[],
// //     property_types: [] as string[],
// //     construction_status: [] as string[],
// //     construction_types: [] as string[]
// //   });

// //   // Extract unique filter options from properties
// //   const extractFilterOptions = useCallback((properties: Property[]) => {
// //     const cities = [...new Set(properties.map(p => p.location?.split(',')[0]?.trim()).filter(Boolean))];
// //     const bhkValues = [...new Set(properties.map(p => p.bhk).filter(Boolean))].sort((a, b) => a - b);
// //     const propertyTypes = [...new Set(properties.map(p => p.property_type).filter(Boolean))];
// //     const constructionStatuses = [...new Set(properties.map(p => p.construction_status).filter(Boolean))];
// //     const constructionTypes = [...new Set(properties.map(p => p.construction_type).filter(Boolean))];

// //     setFilterOptions({
// //       cities: cities as string[],
// //       bhk: bhkValues,
// //       property_types: propertyTypes,
// //       construction_status: constructionStatuses,
// //       construction_types: constructionTypes
// //     });
// //   }, []);

// //   // Fetch all properties from API
// //   const fetchAllProperties = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       console.log('Fetching from:', API_URL);
      
// //       const response = await fetch(API_URL, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'ngrok-skip-browser-warning': 'true'
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       console.log('Received properties:', data);
      
// //       // Handle different response formats
// //       let properties: Property[] = [];
// //       if (Array.isArray(data)) {
// //         properties = data;
// //       } else if (data.data && Array.isArray(data.data)) {
// //         properties = data.data;
// //       }
      
// //       setAllProperties(properties);
// //       setFilteredProperties(properties);
// //       extractFilterOptions(properties);
      
// //     } catch (err) {
// //       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
// //       setError(errorMessage);
// //       console.error('Error fetching properties:', err);
// //       setAllProperties([]);
// //       setFilteredProperties([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [extractFilterOptions]);

// //   // Client-side filtering function
// //   const applyFilters = useCallback(() => {
// //     let filtered = [...allProperties];

// //     // Apply search filter
// //     if (filters.search) {
// //       const searchLower = filters.search.toLowerCase();
// //       filtered = filtered.filter(property => 
// //         property.title?.toLowerCase().includes(searchLower) ||
// //         property.location?.toLowerCase().includes(searchLower)
// //       );
// //     }

// //     // Apply city filter
// //     if (filters.city) {
// //       const cityLower = filters.city.toLowerCase();
// //       filtered = filtered.filter(property => 
// //         property.location?.toLowerCase().includes(cityLower)
// //       );
// //     }

// //     // Apply BHK filter
// //     if (filters.bhk) {
// //       filtered = filtered.filter(property => 
// //         property.bhk === parseInt(filters.bhk)
// //       );
// //     }

// //     // Apply property type filter
// //     if (filters.property_type) {
// //       filtered = filtered.filter(property => 
// //         property.property_type === filters.property_type
// //       );
// //     }

// //     // Apply construction status filter
// //     if (filters.construction_status) {
// //       filtered = filtered.filter(property => 
// //         property.construction_status === filters.construction_status
// //       );
// //     }

// //     // Apply construction type filter
// //     if (filters.construction_type) {
// //       filtered = filtered.filter(property => 
// //         property.construction_type === filters.construction_type
// //       );
// //     }

// //     // Apply price filters
// //     if (filters.minPrice && !isNaN(Number(filters.minPrice))) {
// //       const minPrice = parseFloat(filters.minPrice);
// //       filtered = filtered.filter(property => 
// //         parseFloat(property.price) >= minPrice
// //       );
// //     }

// //     if (filters.maxPrice && !isNaN(Number(filters.maxPrice))) {
// //       const maxPrice = parseFloat(filters.maxPrice);
// //       filtered = filtered.filter(property => 
// //         parseFloat(property.price) <= maxPrice
// //       );
// //     }

// //     setFilteredProperties(filtered);
// //   }, [allProperties, filters]);

// //   // Apply filters whenever filters or allProperties change
// //   useEffect(() => {
// //     if (allProperties.length > 0) {
// //       applyFilters();
// //     }
// //   }, [filters, allProperties, applyFilters]);

// //   // Validate price inputs
// //   const validatePrices = (min: string, max: string): boolean => {
// //     if (min && max && parseFloat(min) > parseFloat(max)) {
// //       setPriceError('Minimum price cannot be greater than maximum price');
// //       return false;
// //     }
// //     setPriceError('');
// //     return true;
// //   };

// //   // Handle filter changes with price validation
// //   const handleFilterChange = (filterName: string, value: string): void => {
// //     if (filterName === 'minPrice' || filterName === 'maxPrice') {
// //       if (value !== '' && (isNaN(Number(value)) || parseFloat(value) < 0)) {
// //         return;
// //       }
      
// //       setFilters(prev => {
// //         const newFilters = { ...prev, [filterName]: value };
// //         const min = filterName === 'minPrice' ? value : prev.minPrice;
// //         const max = filterName === 'maxPrice' ? value : prev.maxPrice;
// //         validatePrices(min, max);
// //         return newFilters;
// //       });
// //     } else {
// //       setFilters(prev => ({
// //         ...prev,
// //         [filterName]: value
// //       }));
// //     }
// //   };

// //   // Handle search input
// //   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
// //     const value = e.target.value;
// //     setFilters(prev => ({
// //       ...prev,
// //       search: value
// //     }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
// //     e.preventDefault();
// //     if (!priceError) {
// //       applyFilters();
// //     }
// //   };

// //   // Handle filter reset
// //   const resetFilters = () => {
// //     setFilters({
// //       city: '',
// //       bhk: '',
// //       property_type: '',
// //       construction_status: '',
// //       construction_type: '',
// //       minPrice: '',
// //       maxPrice: '',
// //       search: ''
// //     });
// //     setPriceError('');
// //   };

// //   // Initial fetch on component mount
// //   useEffect(() => {
// //     fetchAllProperties();
// //   }, [fetchAllProperties]);

// //   return (
// //     <div className="property-search-container">
// //       <h1 className="page-title">Search Properties</h1>
      
// //       {/* Search Form */}
// //       <form onSubmit={handleSubmit} className="search-form">
// //         {/* Search Bar */}
// //         <div className="search-section">
// //           <input
// //             type="text"
// //             placeholder="Search by location or property name..."
// //             value={filters.search}
// //             onChange={handleSearch}
// //             className="search-input"
// //           />
// //         </div>

// //         {/* Filters Section */}
// //         <div className="filters-section">
// //           <div className="filters-grid">
// //             {/* City Filter */}
// //             <div className="filter-item">
// //               <label>City</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter city name"
// //                 value={filters.city}
// //                 onChange={(e) => handleFilterChange('city', e.target.value)}
// //                 list="cities"
// //               />
// //               <datalist id="cities">
// //                 {filterOptions.cities.map(city => (
// //                   <option key={city} value={city} />
// //                 ))}
// //               </datalist>
// //             </div>

// //             {/* BHK Filter */}
// //             <div className="filter-item">
// //               <label>BHK</label>
// //               <select
// //                 value={filters.bhk}
// //                 onChange={(e) => handleFilterChange('bhk', e.target.value)}
// //               >
// //                 <option value="">All BHK</option>
// //                 {filterOptions.bhk.map(option => (
// //                   <option key={option} value={option}>{option} BHK</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Property Type Filter */}
// //             <div className="filter-item">
// //               <label>Property Type</label>
// //               <select
// //                 value={filters.property_type}
// //                 onChange={(e) => handleFilterChange('property_type', e.target.value)}
// //               >
// //                 <option value="">All Types</option>
// //                 {filterOptions.property_types.map(option => (
// //                   <option key={option} value={option}>{option}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Construction Status Filter */}
// //             <div className="filter-item">
// //               <label>Construction Status</label>
// //               <select
// //                 value={filters.construction_status}
// //                 onChange={(e) => handleFilterChange('construction_status', e.target.value)}
// //               >
// //                 <option value="">All Status</option>
// //                 {filterOptions.construction_status.map(option => (
// //                   <option key={option} value={option}>{option}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Construction Type Filter */}
// //             <div className="filter-item">
// //               <label>Construction Type</label>
// //               <select
// //                 value={filters.construction_type}
// //                 onChange={(e) => handleFilterChange('construction_type', e.target.value)}
// //               >
// //                 <option value="">All Types</option>
// //                 {filterOptions.construction_types.map(option => (
// //                   <option key={option} value={option}>{option}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Min Price Filter */}
// //             <div className="filter-item">
// //               <label>Min Price (₹)</label>
// //               <input
// //                 type="number"
// //                 placeholder="Min Price"
// //                 value={filters.minPrice}
// //                 onChange={(e) => handleFilterChange('minPrice', e.target.value)}
// //                 min="0"
// //                 step="100000"
// //               />
// //             </div>

// //             {/* Max Price Filter */}
// //             <div className="filter-item">
// //               <label>Max Price (₹)</label>
// //               <input
// //                 type="number"
// //                 placeholder="Max Price"
// //                 value={filters.maxPrice}
// //                 onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
// //                 min="0"
// //                 step="100000"
// //               />
// //             </div>
// //           </div>

// //           {/* Price Validation Error */}
// //           {priceError && (
// //             <div className="price-error-message">
// //               {priceError}
// //             </div>
// //           )}

// //           {/* Filter Actions */}
// //           <div className="filter-actions">
// //             <button 
// //               type="submit" 
// //               className="search-button"
// //               disabled={!!priceError}
// //             >
// //               Apply Filters
// //             </button>
// //             <button type="button" onClick={resetFilters} className="reset-button">
// //               Reset Filters
// //             </button>
// //           </div>
// //         </div>
// //       </form>

// //       {/* Loading State */}
// //       {loading && (
// //         <div className="loading-spinner">
// //           <div className="spinner"></div>
// //           <p>Loading properties from database...</p>
// //         </div>
// //       )}

// //       {/* Error State */}
// //       {error && (
// //         <div className="error-message">
// //           <p>Error: {error}</p>
// //           <button onClick={fetchAllProperties} className="retry-button">
// //             Retry
// //           </button>
// //         </div>
// //       )}

// //       {/* Results Section */}
// //       {!loading && !error && (
// //         <div className="results-section">
// //           <div className="results-header">
// //             <h2>Properties Found: {filteredProperties.length}</h2>
// //             <p className="results-info">
// //               Showing {filteredProperties.length} of {allProperties.length} total properties
// //             </p>
// //           </div>

// //           <div className="properties-grid">
// //             {filteredProperties.length > 0 ? (
// //               filteredProperties.map((property) => (
// //                 <div key={property.property_id} className="property-card">
// //                   {/* Image Gallery */}
// //                   {property.image ? (
// //                     <div className="property-images">
// //                       <img 
// //                         src={property.image} 
// //                         alt={property.title}
// //                         className="property-main-image"
// //                         onError={(e) => {
// //                           const target = e.target as HTMLImageElement;
// //                           target.onerror = null;
// //                           target.src = 'https://via.placeholder.com/300x200?text=No+Image';
// //                         }}
// //                       />
// //                     </div>
// //                   ) : (
// //                     <div className="no-image-placeholder">
// //                       <span>PREMIUM PROPERTY</span>
// //                     </div>
// //                   )}

// //                   <div className="property-details">
// //                     <h3 className="property-title">
// //                       {property.title}
// //                     </h3>
                    
// //                     {/* Tags */}
// //                     <div className="property-tags">
// //                       {property.construction_status && (
// //                         <span className="tag status">{property.construction_status}</span>
// //                       )}
// //                       {property.construction_type && (
// //                         <span className="tag type">{property.construction_type}</span>
// //                       )}
// //                       {property.property_type && (
// //                         <span className="tag property">{property.property_type}</span>
// //                       )}
// //                       {property.bhk && (
// //                         <span className="tag bhk">{property.bhk} BHK</span>
// //                       )}
// //                       {property.verified === 1 && (
// //                         <span className="tag verified">Verified</span>
// //                       )}
// //                     </div>

// //                     {/* Area */}
// //                     <div className="property-details-grid">
// //                       <div className="detail-item">
// //                         <span className="detail-label">Area</span>
// //                         <span className="detail-value">{property.area_sqft?.toLocaleString()} sqft</span>
// //                       </div>
// //                       {property.created_at && (
// //                         <div className="detail-item">
// //                           <span className="detail-label">Listed</span>
// //                           <span className="detail-value">
// //                             {new Date(property.created_at).toLocaleDateString('en-US', { 
// //                               month: 'short', 
// //                               day: 'numeric',
// //                               year: 'numeric'
// //                             })}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Price and Location */}
// //                     <div className="property-footer">
// //                       <span className="property-price">
// //                         ₹{(parseFloat(property.price) / 10000000).toFixed(1)} CRORES
// //                       </span>
// //                       <span className="property-location">
// //                         📍 {property.location?.split(',')[0]}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="no-results">
// //                 <p>No properties found matching your criteria.</p>
// //                 <button onClick={resetFilters} className="reset-button">
// //                   Clear Filters
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PropertySearch;

import { useState, useEffect, useCallback } from "react";
import PropertyFilters from "./PropertyFilters";
import PropertyCards from "./PropertyCards";
import "./Property.css";

const PropertySearch = () => {

  const API_BASE_URL = "http://localhost:5000/api";

  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    city: "",
    bhk: "",
    property_type: "",
    construction_status: "",
    construction_type: "",
    minPrice: "",
    maxPrice: "",
    search: ""
  });

  const [priceError, setPriceError] = useState("");

  const filterOptions = {
    cities: [],
    bhk: [1, 2, 3, 4, 5],
    property_types: ["Apartment", "Villa", "House"],
    construction_status: ["Ready to Move", "Under Construction"],
    construction_types: ["New", "Resale"]
  };

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.city) params.append("city", filters.city);
    if (filters.bhk) params.append("bhk", filters.bhk);
    if (filters.search) params.append("search", filters.search);

    return params.toString();

  }, [filters]);

  const fetchProperties = useCallback(async () => {

    setLoading(true);

    const query = buildQueryString();
    //const url = `${API_BASE_URL}/properties?${query}`;
    const url = `${API_BASE_URL}/properties`;
    console.log("fetchProperties", url, query);
    const res = await fetch(url);
    const data = await res.json();

    setProperties(data.data);
    setTotalCount(data.data.length);

    setLoading(false);

  }, [buildQueryString]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProperties();
  };

  const resetFilters = () => {
    setFilters({
      city: "",
      bhk: "",
      property_type: "",
      construction_status: "",
      construction_type: "",
      minPrice: "",
      maxPrice: "",
      search: ""
    });

    fetchProperties();
  };

  useEffect(() => {
    console.log("Initial fetch of properties from API");
    fetchProperties();
  }, []);

  console.log("Rendering PropertySearch with filters:", properties);

  return (
    <div className="property-search-container">

      <h1>Search Properties</h1>

      <PropertyFilters
        filters={filters}
        filterOptions={filterOptions}
        priceError={priceError}
        handleFilterChange={handleFilterChange}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        resetFilters={resetFilters}
      />

      {loading ? <p>Loading...</p> : (
        <PropertyCards
          properties={properties}
          totalCount={totalCount}
        />
      )}

    </div>
  );
};

export default PropertySearch;