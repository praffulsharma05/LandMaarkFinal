import { useState, useEffect, useCallback } from "react";
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

  const [filters, setFilters] = useState<Filters>({
    city: "", bhk: "", property_type: "", construction_status: "",
    construction_type: "", minPrice: "", maxPrice: "",
    search: "", sale_type: "", verified: "", project: "", featured_agent: ""
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadProperties();
  };

  const resetFilters = () => {
    setFilters({
      city: "", bhk: "", property_type: "", construction_status: "",
      construction_type: "", minPrice: "", maxPrice: "",
      search: "", sale_type: "", verified: "", project: "", featured_agent: ""
    });
    setPriceError("");
    setTimeout(loadProperties, 100);
  };

  const loadProperties = useCallback(async () => {
    setLoading(true);
    const townshipId = id ? parseInt(id) : 9;
    const query = buildQueryString(filters);
    const data = await fetchProperties(townshipId, query);
    setProperties(data);
    setTotalCount(data.length);
    setLoading(false);
  }, [id, filters]);

  useEffect(() => {
    if (filters.minPrice && filters.maxPrice && 
        parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)) {
      setPriceError("Min price must be less than max price");
    } else {
      setPriceError("");
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    const hasFilters = Object.values(filters).some(v => v !== "");
    if (hasFilters) {
      const timer = setTimeout(loadProperties, 500);
      return () => clearTimeout(timer);
    }
  }, [filters, loadProperties]);

  useEffect(() => { loadProperties(); }, [id]);

  return (
    <div className="search-container">
      <div className="filter-wrapper">
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