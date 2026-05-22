import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { PropertyItem, Filters, formatProperty } from "./PropertySearchHelper";

export const usePropertySearch = () => {
  const API_BASE_URL = "/api";
  const { state } = useLocation();

  const [pageState, setPageState] = useState<{
    items: PropertyItem[];
    totalCount: number;
    loading: boolean;
    isUsingAI: boolean;
  }>({
    items: [],
    totalCount: 0,
    loading: false,
    isUsingAI: false,
  });

  const [filterOptionsApiData, setFilterOptionsApiData] = useState<Record<string, unknown>>({});
  const [priceError, setPriceError] = useState("");
  const [filters, setFilters] = useState<Filters>({
    city: "",
    bhk: "",
    property_type: "",
    construction_status: "",
    construction_type: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sale_type: "",
    verified: "",
    project: "",
    featured_agent: "",
  });

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    const filterKeys = [
      "city", "bhk", "property_type", "construction_status",
      "construction_type", "minPrice", "maxPrice", "search",
      "sale_type", "verified", "project", "featured_agent"
    ] as const;
    type FilterKey = typeof filterKeys[number];
    filterKeys.forEach(key => {
      if (filters[key as FilterKey]) {
        params.append(key, filters[key as FilterKey]);
      }
    });
    return params.toString();
  }, [filters]);

  const fetchProperties = useCallback(async () => {
    setPageState(prev => ({ ...prev, loading: true, isUsingAI: false }));
    try {
      const q = buildQueryString();
      const res = await fetch(`${API_BASE_URL}/properties${q ? `?${q}` : ""}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      let propertiesData: Record<string, unknown>[] = [];
      if (data.data && Array.isArray(data.data)) {
        propertiesData = data.data;
      } else if (Array.isArray(data)) {
        propertiesData = data;
      } else if (data.properties && Array.isArray(data.properties)) {
        propertiesData = data.properties;
      }
      const formattedProperties = propertiesData.map(formatProperty);
      setPageState(prev => ({ ...prev, items: formattedProperties, totalCount: formattedProperties.length }));
    } catch (error) {
      console.error("Error fetching properties:", error);
      setPageState(prev => ({ ...prev, items: [], totalCount: 0 }));
    } finally {
      setPageState(prev => ({ ...prev, loading: false }));
    }
  }, [buildQueryString]);

  const handleFilterChange = useCallback((name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProperties();
  }, [fetchProperties]);

  const resetFilters = useCallback(() => {
    setFilters({
      city: "",
      bhk: "",
      property_type: "",
      construction_status: "",
      construction_type: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sale_type: "",
      verified: "",
      project: "",
      featured_agent: "",
    });
    setPriceError("");
    setTimeout(() => fetchProperties(), 100);
  }, [fetchProperties]);

  const fetchOptions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/options`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFilterOptionsApiData(data.data || data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  }, []);

  useEffect(() => {
    if (filters.minPrice && filters.maxPrice && parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)) {
      setPriceError("Min price must be less than max price");
    } else {
      setPriceError("");
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    if (pageState.isUsingAI) return;
    const delayDebounce = setTimeout(() => {
      if (Object.values(filters).some(value => value !== "")) {
        fetchProperties();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [filters, fetchProperties, pageState.isUsingAI]);

  useEffect(() => {
    fetchOptions();
    if (state?.aiResults && Array.isArray(state.aiResults)) {
      setPageState(prev => ({
        ...prev,
        items: state.aiResults.map((item: Record<string, unknown>) => formatProperty(item)),
        totalCount: state.aiResults.length,
        isUsingAI: true,
      }));
    } else {
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pageState,
    filterOptionsApiData,
    filters,
    priceError,
    handleFilterChange,
    handleSubmit,
    resetFilters,
  };
};
