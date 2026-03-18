 

import { useState, useEffect, useCallback } from "react";
import PropertyFilters from "./PropertyFilters";
import PropertyCards from "./PropertyCards";
import "./PropertySearch.css";
import { useLocation } from "react-router-dom";

const PropertySearch = () => {

  const API_BASE_URL = "http://localhost:5000/api";
  const { state } = useLocation();
  const [properties, setProperties] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOptionsApiData, setFilterOptionsApiData] = useState({});

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

  const buildQueryString = useCallback(() => {

    const params = new URLSearchParams();

    if (filters.city) params.append("city", filters.city);
    if (filters.bhk) params.append("bhk", filters.bhk);
    if (filters.property_type) params.append("property_type", filters.property_type);
    if (filters.construction_status) params.append("construction_status", filters.construction_status);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.search) params.append("search", filters.search);

    return params.toString();

  }, [filters]);

  const fetchProperties = useCallback(async () => {

    setLoading(true);

    const query = buildQueryString();
    const url = `${API_BASE_URL}/properties?${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setProperties(data.data || []);
      setTotalCount(data.data?.length || 0);

    } catch (error) {
      console.error("Error fetching properties:", error);
    }

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
    setPriceError("");
  };

  const fetchOptions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/options`);
      const data = await res.json();
      setFilterOptionsApiData(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  /* Auto fetch when filters change */
  useEffect(() => {

    if (
      filters.minPrice &&
      filters.maxPrice &&
      parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)
    ) {
      setPriceError("Min price must be less than max price");
      return;
    }

    setPriceError("");

    const delayDebounce = setTimeout(() => {
      //fetchProperties();
    }, 400);

    return () => clearTimeout(delayDebounce);

  }, [filters, fetchProperties]);

  useEffect(() => {
    fetchOptions();
    console.log("AI Search Data in PropertySearch:", state.aiResults); 
    setProperties(state.aiResults || []); // Load AI search results if available
  }, []);

  return (
    <div className="property-search-container">

      <h1>Search Properties</h1>

      <PropertyFilters
        filters={filters}
        filterOptions={filterOptionsApiData}
        priceError={priceError}
        handleFilterChange={handleFilterChange}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        resetFilters={resetFilters}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <PropertyCards
          properties={properties}
          totalCount={totalCount}
        />
      )}

    </div>
  );
};

export default PropertySearch;

 