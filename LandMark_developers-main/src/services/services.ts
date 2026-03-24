// src/services/api.ts
import { ApiConstants } from "../constants/ApiConstants";
import{ ApiEndPoints} from "../constants/ApiEndpoints"

export interface CityProperty {
  id: number;
  title: string;
  price: string;
  location: string;
  area: string;
  image: string;
  tag: string;
  bhk: number;
  propertyType: string;
  description: string;
  verified: boolean;
  amenities: Array<{ amenity_id: number; amenity_name: string }>;
  places: Array<{
    place_id: number;
    place_name: string;
    place_category: string;
    distance_meters: string;
  }>;
  specifications: Record<string, string>;
  overview: Record<string, string>;
}

export const fetchProperties = async (): Promise<CityProperty[]> => {
  try {
    const response = await fetch(`${ApiConstants.API_BASE_URL}${ApiEndPoints.PROPERTIES}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // The API returns { success: true, count: 3, data: [...] }
    const propertiesData = result.data;
    
    // Transform the API response to match your CityProperty type structure
    return propertiesData.map((item: any) => {
      // Format price with Indian Rupee symbol
      const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(parseFloat(item.price));

      // Determine tag based on construction status
      let tag = 'Featured';
      if (item.construction_status === 'Ready to Move') {
        tag = 'Ready to Move';
      } else if (item.construction_status === 'Under Construction') {
        tag = 'Under Construction';
      }

      // Format area
      const formattedArea = `${item.area_sqft.toLocaleString()} sq ft`;

      // Construct image URL - adjust base URL if images are hosted elsewhere
      const imageUrl = `${ApiConstants.API_BASE_URL}uploads/${item.image}`;

      return {
        id: item.property_id,
        title: item.property_name,
        price: formattedPrice,
        location: item.location,
        area: formattedArea,
        image: imageUrl,
        tag: tag,
        bhk: item.bhk,
        propertyType: item.property_type,
        description: item.description,
        verified: item.verified === 1,
        amenities: item.amenities || [],
        places: item.places || [],
        specifications: item.specifications || {},
        overview: item.overview || {},
      };
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};