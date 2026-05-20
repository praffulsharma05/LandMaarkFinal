import { useState, useEffect, useCallback } from "react";
import PropertyFilters from "./PropertyFilters";
import PropertyCards from "./PropertyCards";
import { useLocation } from "react-router-dom";
import { ApiConstants } from "../../constants/ApiConstants";
import "./PropertyCards.css";

interface PropertyItem {
  property_id: number; title: string; image: string; price: number; location: string;
  bhk: number; property_type: string; construction_status: string; construction_type: string;
  area_sqft: number; description: string; verified: number; created_at: string;
}

interface Filters {
  city: string; bhk: string; property_type: string; construction_status: string;
  construction_type: string; minPrice: string; maxPrice: string; search: string;
  sale_type: string; verified: string; project: string; featured_agent: string;
}

const formatProperty = (item: Record<string, unknown>): PropertyItem => ({
  property_id: Number(item.property_id ?? item.id ?? 0),
  title: String(item.title ?? "No Title"),
  image: String(item.image ?? ""),
  price: parseFloat(String(item.price ?? 0)),
  location: String(item.location ?? ApiConstants.UNKNOWN),
  bhk: parseInt(String(item.bhk ?? 0)) || 0,
  property_type: String(item.property_type ?? ApiConstants.UNKNOWN),
  construction_status: String(item.construction_status ?? ApiConstants.UNKNOWN),
  construction_type: String(item.construction_type ?? ""),
  area_sqft: parseFloat(String(item.area_sqft ?? 0)),
  description: String(item.description ?? ""),
  verified: Number(item.verified ?? 0),
  created_at: String(item.created_at ?? new Date().toISOString()),
});

const PropertySearch = () => {
  const API_BASE_URL = "/api";
  const { state } = useLocation();
  const [pageState, setPageState] = useState<{ items: PropertyItem[]; totalCount: number; loading: boolean; isUsingAI: boolean }>({ items: [], totalCount: 0, loading: false, isUsingAI: false });
  const [filterOptionsApiData, setFilterOptionsApiData] = useState<Record<string, unknown>>({});
  const [filters, setFilters] = useState<Filters>({ city: "", bhk: "", property_type: "", construction_status: "", construction_type: "", minPrice: "", maxPrice: "", search: "", sale_type: "", verified: "", project: "", featured_agent: "" });
  const [priceError, setPriceError] = useState("");

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    const filterKeys = ["city", "bhk", "property_type", "construction_status", "construction_type", "minPrice", "maxPrice", "search", "sale_type", "verified", "project", "featured_agent"] as const;
    type FilterKey = typeof filterKeys[number];
    filterKeys.forEach(key => { if (filters[key as FilterKey]) params.append(key, filters[key as FilterKey]); });
    return params.toString();
  }, [filters]);

  const fetchProperties = useCallback(async () => {
    setPageState(prev => ({ ...prev, loading: true, isUsingAI: false }));
    try {
      const res = await fetch(`${API_BASE_URL}/properties${(() => { const q = buildQueryString(); return q ? `?${q}` : ""; })()}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      let propertiesData: Record<string, unknown>[] = [];
      if (data.data && Array.isArray(data.data)) propertiesData = data.data;
      else if (Array.isArray(data)) propertiesData = data;
      else if (data.properties && Array.isArray(data.properties)) propertiesData = data.properties;
      const formattedProperties = propertiesData.map(formatProperty);
      setPageState(prev => ({ ...prev, items: formattedProperties, totalCount: formattedProperties.length }));
    } catch (error) {
      console.error("Error fetching properties:", error);
      setPageState(prev => ({ ...prev, items: [], totalCount: 0 }));
    } finally {
      setPageState(prev => ({ ...prev, loading: false }));
    }
  }, [buildQueryString]);

  const handleFilterChange = useCallback((name: string, value: string) => setFilters((prev) => ({ ...prev, [name]: value })), []);
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); fetchProperties(); }, [fetchProperties]);
  const resetFilters = useCallback(() => {
    setFilters({ city: "", bhk: "", property_type: "", construction_status: "", construction_type: "", minPrice: "", maxPrice: "", search: "", sale_type: "", verified: "", project: "", featured_agent: "" });
    setPriceError("");
    setTimeout(() => fetchProperties(), 100);
  }, [fetchProperties]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/options`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFilterOptionsApiData(data.data || data);
    } catch (error) { console.error("Error fetching options:", error); }
  }, []);

  useEffect(() => {
    if (filters.minPrice && filters.maxPrice && parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)) {
      setPriceError("Min price must be less than max price");
    } else { setPriceError(""); }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    if (pageState.isUsingAI) return;
    const delayDebounce = setTimeout(() => {
      if (Object.values(filters).some(value => value !== "")) fetchProperties();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [filters, fetchProperties, pageState.isUsingAI]);

  useEffect(() => {
    fetchOptions();
    if (state?.aiResults && Array.isArray(state.aiResults)) {
      setPageState(prev => ({ ...prev, items: state.aiResults.map((item: Record<string, unknown>) => formatProperty(item)), totalCount: state.aiResults.length, isUsingAI: true }));
    } else { fetchProperties(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="property-search-container">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <PropertyFilters filters={filters} filterOptions={filterOptionsApiData} priceError={priceError} handleFilterChange={handleFilterChange} handleSubmit={handleSubmit} resetFilters={resetFilters} />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {pageState.loading ? (
          <div className="flex justify-start items-start property-search-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PropertyCards properties={pageState.items} totalCount={pageState.totalCount} loading={pageState.loading} />
        )}
      </div>
    </div>
  );
};

export default PropertySearch;
