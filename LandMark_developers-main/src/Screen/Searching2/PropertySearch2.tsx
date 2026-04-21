import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyFilters from "./PropertyFilter2";
import PropertyCards from "./PropertyCards2";
import { Property, Filters } from "./types";
import { fetchProperties, buildQueryString } from "./propertyUtils";
import "./PropertySearch2.css";

const PropertySearch2 = () => {
  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    city: "", bhk: "", property_type: "", construction_status: "",
    construction_type: "", minPrice: "", maxPrice: "",
    search: "", sale_type: "", verified: "", project: "", featured_agent: ""
  });

  const townshipId = id ? parseInt(id) : 9;

  const loadProperties = async () => {
    setLoading(true);
    const query = buildQueryString(filters);
    const data = await fetchProperties(townshipId, query);
    setProperties(data);
    setTotalCount(data.length);
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProperties();
  };

  const resetFilters = () => {
    const clearedFilters = {
      city: "", bhk: "", property_type: "", construction_status: "",
      construction_type: "", minPrice: "", maxPrice: "",
      search: "", sale_type: "", verified: "", project: "", featured_agent: ""
    };
    setFilters(clearedFilters);
    setPriceError("");
    
    // Call load with cleared filters
    setLoading(true);
    setTimeout(async () => {
      const query = buildQueryString(clearedFilters);
      const data = await fetchProperties(townshipId, query);
      setProperties(data);
      setTotalCount(data.length);
      setLoading(false);
    }, 100);
  };

  return (
    <div className="search-container">
      <button 
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
        type="button"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      <div className={`filter-wrapper ${showFilters ? 'mobile-show' : ''}`}>
        <PropertyFilters
          filters={filters}
          priceError={priceError}
          handleFilterChange={handleFilterChange}
          handleSubmit={handleSubmit}
          resetFilters={resetFilters}
        />
      </div>
      <div className="content-area">
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <PropertyCards properties={properties} totalCount={totalCount} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default PropertySearch2;