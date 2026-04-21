// src/constants/ApiConstants.ts
 

export const ApiEndPoints = {
    CITIES: 'api/cities',
    PROPERTIES: 'api/properties',
    OPTIONS: 'api/options',
    AI_SEARCH: 'api/propSearch/ai',
    TOWNSHIPS: "api/townships",
    TOWNSHIP_PROPERTIES: (id: number) => `api/townships/${id}/popular-properties`,
        TOWNSHIP_ALL_PROPERTIES: (id: number) => `api/townships/${id}/all-properties`,

}
 