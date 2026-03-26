// // // src/services/api.ts
// import { ApiConstants } from "../constants/ApiConstants";
// import{ ApiEndPoints} from "../constants/ApiEndpoints"

// export interface CityProperty {
//   id: number;
//   title: string;
//   builder:string;
//   price: string;
//   location: string;
//   area: string;
//   image: string;
//   tag: string;
//   bhk: number;
//   propertyType: string;
//   description: string;
//   verified: boolean;
  
//   amenities: Array<{ amenity_id: number; amenity_name: string }>;
//   places: Array<{
//     place_id: number;
//     place_name: string;
//     place_category: string;
//     distance_meters: string;
//   }>;
//   specifications: Record<string, string>;
//   overview: Record<string, string>;
//   latitude?: string;
//   longitude?: string;
//   construction_status?: string;
//   area_sqft?: number;
//   raw_price?: number;
  
//   // Additional fields from API
//   project_units?: string | number;
//   project_area?: string;
//   size?: string;
//   project_size?: string;
//   launch_date?: string;
//   avg_price?: string;
//   possession_date?: string;
//   configuration?: string;
//   rera_id?: string;
//   nearby_places?: Array<{ name: string; distance: string }>;
//   created_at?: string;
// }
// export const fetchProperties = async (): Promise<CityProperty[]> => {
//   try {
//     const response = await fetch(`${ApiConstants.API_BASE_URL}${ApiEndPoints.PROPERTIES}`, {
//       headers: {
//         'ngrok-skip-browser-warning': 'true',
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const result = await response.json();
//     const propertiesData = result.data || [];
//     return propertiesData.map((item: any) => {
//       // Safely parse price
//       const numericPrice = item.price ? parseFloat(item.price) : 0;
//       const formattedPrice = numericPrice > 0 ? new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//         minimumFractionDigits: 0,
//         maximumFractionDigits: 0,
//       }).format(numericPrice) : 'Contact for price';
//       // Safely determine tag
//       let tag = 'Featured';
//       if (item.construction_status === 'Ready to Move') {
//         tag = 'Ready to Move';
//       } else if (item.construction_status === 'Under Construction') {
//         tag = 'Under Construction';
//       }

//       // Safely format area
//       const areaSqft = item.area_sqft ? Number(item.area_sqft) : 0;
//       const formattedArea = areaSqft > 0 ? `${areaSqft.toLocaleString()} sq ft` : 'Area not specified';

//       // Safely construct image URL
//       const imageUrl = item.image 
//         ? `${ApiConstants.API_BASE_URL}uploads/${item.image}`
//         : 'https://via.placeholder.com/300x200?text=Property+Image';
// console.log(imageUrl)
//       return {
//         id: item.property_id || 0,
//         title: item.property_name || item.title || 'Property',
//         price: formattedPrice,
//         raw_price: numericPrice,
//         location: item.location || 'Location not specified',
//         area: formattedArea,
//         image: imageUrl,
//         tag: tag,
//         bhk: item.bhk || 0,
//         propertyType: item.property_type || 'Residential',
//         description: item.description || 'No description available',
//         verified: item.verified === 1,
//         amenities: item.amenities || [],
//         places: item.places || [],
//         specifications: item.specifications || {},
//         overview: item.overview || {},
//         latitude: item.latitude,
//         longitude: item.longitude,
//         construction_status: item.construction_status || 'Ready to Move',
//         area_sqft: areaSqft,
        
//         // Include additional fields
//         project_units: item.project_units,
//         project_area: item.project_area,
//         size: item.size,
//         project_size: item.project_size,
//         launch_date: item.launch_date,
//         avg_price: item.avg_price,
//         possession_date: item.possession_date,
//         configuration: item.configuration,
//         rera_id: item.rera_id,
//         nearby_places: item.nearby_places,
//         created_at: item.created_at,
//       };
//     });
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     return [];
//   }
// };

// export const fetchPropertyById = async (id: number): Promise<CityProperty | null> => {
//   try {
//     const properties = await fetchProperties();
//     const property = properties.find(p => p.id === parseInt(id.toString()));
//     return property || null;
//   } catch (error) {
//     console.error('Error fetching property by ID:', error);
//     return null;
//   }
// };
// // src/services/api.ts 










import { ApiConstants } from "../constants/ApiConstants";
import { ApiEndPoints } from "../constants/ApiEndpoints";

export interface CityProperty {
  id: number;
  title: string;
  builder?: string; // Made optional as it might not always be present
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
  latitude?: string;
  longitude?: string;
  construction_status?: string;
  construcstion_type?: string; // Fixed typo in property name
  area_sqft?: number;
  raw_price?: number;
  
  // Additional fields from API
  project_units?: string | number;
  project_area?: string;
  size?: string;
  project_size?: string;
  launch_date?: string;
  avg_price?: string;
  possession_date?: string;
  configuration?: string;
  rera_id?: string;
  nearby_places?: Array<{ name: string; distance: string }>;
  created_at?: string;
}

// New interface for property images
export interface PropertyImage {
  id: number;
  property_id: number;
  image_url: string;
  is_primary: boolean;
  caption?: string;
  created_at?: string;
}

export const fetchProperties = async (): Promise<CityProperty[]> => {
  try {
    const response = await fetch(`${ApiConstants.API_BASE_URL}${ApiEndPoints.PROPERTIES}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const propertiesData = result.data || [];
    
    return propertiesData.map((item: any) => {
      // Safely parse price
      const numericPrice = item.price ? parseFloat(item.price) : 0;
      const formattedPrice = numericPrice > 0 ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericPrice) : 'Contact for price';

      // Safely determine tag
      let tag = 'Featured';
      if (item.construction_status === 'Ready to Move') {
        tag = 'Ready to Move';
      } else if (item.construction_status === 'Under Construction') {
        tag = 'Under Construction';
      }

      // Safely format area
      const areaSqft = item.area_sqft ? Number(item.area_sqft) : 0;
      const formattedArea = areaSqft > 0 ? `${areaSqft.toLocaleString()} sq ft` : 'Area not specified';

      // Safely construct image URL
      const imageUrl = item.image 
        ? `${ApiConstants.API_BASE_URL}uploads/${item.image}`
        : 'https://via.placeholder.com/300x200?text=Property+Image';

      return {
        id: item.property_id || 0,
        title: item.property_name || item.title || 'Property',
        builder: item.builder || '', // Added builder field
        price: formattedPrice,
        raw_price: numericPrice,
        location: item.location || 'Location not specified',
        area: formattedArea,
        image: imageUrl,
        tag: tag,
        bhk: item.bhk || 0,
        propertyType: item.property_type || 'Residential',
        description: item.description || 'No description available',
        verified: item.verified === 1,
        amenities: item.amenities || [],
        places: item.places || [],
        specifications: item.specifications || {},
        overview: item.overview || {},
        latitude: item.latitude,
        longitude: item.longitude,
        construction_status: item.construction_status || '',
        construcstion_type: item.construction_type || '',
        area_sqft: areaSqft,
        
        // Include additional fields
        project_units: item.project_units,
        project_area: item.project_area,
        size: item.size,
        project_size: item.project_size,
        launch_date: item.launch_date,
        avg_price: item.avg_price,
        possession_date: item.possession_date,
        configuration: item.configuration,
        rera_id: item.rera_id,
        nearby_places: item.nearby_places,
        created_at: item.created_at,
      };
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// New function to fetch property images by property ID
export const fetchPropertyImages = async (propertyId: number): Promise<PropertyImage[]> => {
  try {
    const response = await fetch(`${ApiConstants.API_BASE_URL}${ApiEndPoints.PROPERTY_IMAGES}?property_id=${propertyId}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    const imagesData = result.data || [];
    
    return imagesData.map((item: any) => ({
      id: item.id,
      property_id: item.property_id,
      image_url: item.image_url ? `${ApiConstants.API_BASE_URL}uploads/${item.image_url}` : '',
      is_primary: item.is_primary === 1,
      caption: item.caption || '',
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching property images:', error);
    return [];
  }
};

export const fetchPropertyById = async (id: number): Promise<CityProperty | null> => {
  try {
    const properties = await fetchProperties();
    const property = properties.find(p => p.id === id);
    return property || null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
};

// Add default export for convenience
export default {
  fetchProperties,
  fetchPropertyImages,
  fetchPropertyById,
};