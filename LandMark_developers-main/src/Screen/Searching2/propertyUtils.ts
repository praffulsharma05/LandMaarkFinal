import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";
import { Property } from "./types";

interface ApiPropertyItem {
  property_id: number;
  title?: string;
  image?: string;
  construction_status?: string;
  construction_type?: string;
  property_type?: string;
  bhk?: number;
  verified?: number;
  area_sqft?: number;
  created_at?: string;
  price?: string | number;
  location?: string;
  description?: string;
}

export const fetchProperties = async (townshipId: number, query: string = ""): Promise<Property[]> => {
  try {
    const baseUrl = `${ApiConstants.API_BASE_URL}${ApiEndPoints.TOWNSHIP_PROPERTIES_FULL(townshipId)}`;
    const url = query ? `${baseUrl}&${query}` : baseUrl;
    const res = await fetch(url, { 
      headers: ApiConstants.HEADERS 
    });
    const data = await res.json();
    return (data.data?.properties || []).map((item: ApiPropertyItem) => ({
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
      price: parseFloat(String(item.price)) || 0,
      location: item.location || "",
      description: item.description || "",
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const buildQueryString = (filters: Record<string, string>): string => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, String(value));
  });
  return params.toString();
};