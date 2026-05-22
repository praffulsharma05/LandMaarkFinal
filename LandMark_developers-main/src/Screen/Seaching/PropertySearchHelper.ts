import { ApiConstants } from "../../constants/ApiConstants";

export interface PropertyItem {
  property_id: number;
  title: string;
  image: string;
  price: number;
  location: string;
  bhk: number;
  property_type: string;
  construction_status: string;
  construction_type: string;
  area_sqft: number;
  description: string;
  verified: number;
  created_at: string;
}

export interface Filters {
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

export const formatProperty = (item: Record<string, unknown>): PropertyItem => ({
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
