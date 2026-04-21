export interface Property {
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

export interface FilterOptions {
  bhk?: Array<{ bhk: number }>;
  property_type?: Array<{ name: string }>;
  construction_status?: Array<{ name: string }>;
  construction_type?: Array<{ name: string }>;
}