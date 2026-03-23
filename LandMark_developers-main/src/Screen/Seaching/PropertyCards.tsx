import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CheckBadgeIcon,
  ArrowsPointingOutIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { ApiConstants } from "../../constants/ApiConstants";

interface Property {
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

interface Props {
  properties: Property[];
  totalCount: number;
  loading?: boolean;
}

const PropertyCards: React.FC<Props> = ({ properties, totalCount, loading = false }) => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatBHK = (bhk: number) => {
    if (bhk === 0) return "Studio";
    return `${bhk} BHK`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready to move':
      case 'ready':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'under construction':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'new launch':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Otherwise, prepend the backend URL
    return ApiConstants.API_BASE_URL + `uploads/${imagePath}`;
  };

  const handleImageError = (propertyId: number) => {
    setImageErrors(prev => new Set(prev).add(propertyId));
  };

  const getImageUrl = (image: string, propertyId: number) => {
    if (imageErrors.has(propertyId)) {
      return null;
    }
    const fullUrl = getFullImageUrl(image);
    return fullUrl;
  };

  const toggleLike = (e: React.MouseEvent, propertyId: number) => {
    e.stopPropagation();
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const handleShare = (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    const url = `${window.location.origin}/property/${property.property_id}`;
    navigator.clipboard.writeText(url);
    // You can add a toast notification here
    alert("Link copied to clipboard!");
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 ">
      {/* Header Section */}
     

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => {
            const imageUrl = getImageUrl(property.image, property.property_id);
            
            return (
              <div
                key={property.property_id}
                onClick={() => navigate(`/property/${property.property_id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group relative"
              >
                {/* Property Image */}
                <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImageError(property.property_id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <BuildingOfficeIcon className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-400">No Image Available</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => toggleLike(e, property.property_id)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      {likedProperties.has(property.property_id) ? (
                        <HeartSolidIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleShare(e, property)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ShareIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Verified Badge */}
                  {property.verified === 1 && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-md">
                      <CheckBadgeIcon className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  )}

                  {/* Construction Status Badge */}
                  {property.construction_status && (
                    <div className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium border shadow-sm ${getStatusColor(property.construction_status)}`}>
                      {property.construction_status}
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg shadow-lg">
                    <div className="flex items-center gap-0.5">
                      <CurrencyRupeeIcon className="w-3.5 h-3.5" />
                      <span className="font-bold text-sm">{formatPrice(property.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>

                  {/* BHK and Property Type */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-800 font-medium">
                      {formatBHK(property.bhk)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 capitalize">
                      {property.property_type}
                    </span>
                  </div>

                  {/* Area */}
                  {property.area_sqft > 0 && (
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <ArrowsPointingOutIcon className="w-4 h-4" />
                      <span>{property.area_sqft.toLocaleString()} sq.ft</span>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-1.5 text-gray-500 text-sm">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{property.location}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="bg-gray-50 rounded-full p-6 mb-4">
              <HomeIcon className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No Properties Found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCards;