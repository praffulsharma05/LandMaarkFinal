import { ApiConstants } from "../../constants/ApiConstants";

export const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

export const formatBHK = (bhk: number) => bhk === 0 ? "Studio" : `${bhk} BHK`;

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'ready to move':
    case 'ready':
      return 'bg-green-500';
    case 'under construction':
      return 'bg-amber-500';
    case 'new launch':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export const getImageUrl = (image: string, propertyId: number, imageErrors: Set<number>) => {
  if (!image || imageErrors.has(propertyId)) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return ApiConstants.API_BASE_URL + `uploads/${image}`;
};
