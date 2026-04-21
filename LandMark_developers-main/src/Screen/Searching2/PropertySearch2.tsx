import { useState, useEffect, useCallback } from "react";
import PropertyFilters from "./PropertyFilter2";
import PropertyCards from "./PropertyCards2";
import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Property {
  property_id: number;
  title: string;
  image: string;
  construction_status: string;
  construction_type: string;
  property_type: string;
  bhk: number;
  verified: number;
  area_sqft: number;
  created_at: string;
  price: number;
  location: string;
  description?: string;
}

interface Filters {
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

const PropertySearch2 = () => {
  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOptionsApiData, setFilterOptionsApiData] = useState({});
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

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
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
      search: "",
      sale_type: "",
      verified: "",
      project: "",
      featured_agent: "",
    });
    setPriceError("");
    setTimeout(() => {
      fetchProperties();
    }, 100);
  };

  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.bhk) params.append("bhk", filters.bhk);
    if (filters.property_type) params.append("property_type", filters.property_type);
    if (filters.construction_status) params.append("construction_status", filters.construction_status);
    if (filters.construction_type) params.append("construction_type", filters.construction_type);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    return params.toString();
  }, [filters]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const townshipId = id ? parseInt(id) : 9;
      const query = buildQueryString();
      const url = `${ApiConstants.API_BASE_URL}${ApiEndPoints.TOWNSHIP_ALL_PROPERTIES(townshipId)}${query ? `?${query}` : ""}`;
      console.log("🔍 Fetching properties from:", url);

      const res = await axios.get(url, { headers: ApiConstants.HEADERS });
      const data = res.data;
      console.log("📦 Properties data received:", data);

      const propertiesData = (data.data || []).map((item: any) => ({
        property_id: item.property_id,
        title: item.title || "",
        image: item.image || "",
        construction_status: item.construction_status || "",
        construction_type: item.construction_type || "",
        property_type: item.property_type || "",
        bhk: item.bhk || 0,
        verified: item.verified || 0,
        area_sqft: item.area_sqft || 0,
        created_at: item.created_at || "",
        price: parseFloat(item.price) || 0,
        location: item.location || "",
        description: item.description || "",
      }));

      console.log("📊 Number of properties:", propertiesData.length);

      setProperties(propertiesData);
      setTotalCount(propertiesData.length);
    } catch (error) {
      console.error("❌ Error fetching properties:", error);
      setProperties([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [id, buildQueryString]);

  useEffect(() => {
    if (filters.minPrice && filters.maxPrice && parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)) {
      setPriceError("Min price must be less than max price");
    } else {
      setPriceError("");
    }
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const hasFilters = Object.values(filters).some(value => value !== "");
      if (hasFilters) {
        fetchProperties();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [filters, fetchProperties]);

  useEffect(() => {
    fetchProperties();
  }, [id]);

  return (
    <div className="relative left-1/2 -m-8 right-1/2 mt-20 -ml-[50vw] -mr-[50vw] w-screen min-h-screen text-black overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <PropertyFilters
          filters={filters}
          filterOptions={filterOptionsApiData}
          priceError={priceError}
          handleFilterChange={handleFilterChange}
          handleSubmit={handleSubmit}
          resetFilters={resetFilters}
        />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-start items-start py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PropertyCards
            properties={properties}
            totalCount={totalCount}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default PropertySearch2;