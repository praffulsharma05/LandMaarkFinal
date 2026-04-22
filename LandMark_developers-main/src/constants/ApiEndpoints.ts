// src/constants/ApiConstants.ts

import Properties from "../Screen/Properties/Properties";

 

export const ApiEndPoints = {
    CITIES: 'api/cities',
    // PROPERTIES: 'api/properties',
    PROPERTIES: (city: string) => `api/allPropertiees`,
    OPTIONS: 'api/options',
    AI_SEARCH: 'api/propSearch/ai',
    TOWNSHIPS: "api/townships",
    TOWNSHIP_PROPERTIES: (id: number) => `api/townships/${id}/popular-properties`,
    TOWNSHIP_ALL_PROPERTIES: (id: number) => `api/townships/${id}/all-properties`,

}
 