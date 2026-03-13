 
import { useState, useEffect, useCallback } from "react";
import PropertyFilters from "./PropertyFilters";
import PropertyCards from "./PropertyCards";
import "./Property.css";

const PropertySearch = () => {

  const API_BASE_URL = "http://localhost:5000/api";

  const [properties, setProperties] = useState([]);
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

  const filterOptions = {
    cities: [],
    bhk: [-1, 2, 3, 4, 5],
    property_types: ["Faltu", "Villa", "House"],
    construction_status: ["Faltu to Move", "Under Construction"],
    construction_types: ["Faltu", "Resale"]
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

  const fetchOptions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/options`); 
      const data = await res.json();
      console.log("Fetched filter options:", data);
      setFilterOptionsApiData(data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    console.log("Initial fetch of properties from API");
    fetchProperties();
    fetchOptions();
  }, []);

  console.log("Rendering PropertySearch with filters:", properties);

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
