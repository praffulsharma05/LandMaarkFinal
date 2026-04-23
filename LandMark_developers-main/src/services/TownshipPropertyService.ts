import axios from "axios";
import { ApiConstants } from "../constants/ApiConstants";
import { ApiEndPoints } from "../constants/ApiEndpoints";

export interface TownshipProperty {
  property_id: number;
  title: string;
  property_name?: string;
  image: string;
  description: string;
  price?: string;
  location?: string;
  bhk?: number;
  area_sqft?: number;
}

export const fetchTownshipProperties = async (townshipId: number): Promise<TownshipProperty[]> => {
  try {
    const response = await axios.get(
      `${ApiConstants.API_BASE_URL}${ApiEndPoints.TOWNSHIP_PROPERTIES(townshipId)}`,
      { headers: ApiConstants.HEADERS }
    );
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching township properties:', error);
    return [];
  }
};