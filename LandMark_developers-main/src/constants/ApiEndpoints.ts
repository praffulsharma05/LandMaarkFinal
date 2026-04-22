// src/constants/ApiConstants.ts

import Properties from "../Screen/Properties/Properties";

 

export const ApiEndPoints = {
    PROPERTIES: 'api/properties',
    OPTIONS: 'api/options',
    AI_SEARCH: 'api/propSearch/ai',
    TOWNSHIPS: "api/townships",
    TOWNSHIP_PROPERTIES: (id: number) => `api/townships/${id}/popular-properties`,
    TOWNSHIP_ALL_PROPERTIES: (id: number) => `api/townships/${id}/all-properties`,
    TOWNSHIP_PROPERTIES_FULL: (id: number) => `api/townships/${id}/properties`,
}
 