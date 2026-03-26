 
 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, Heart } from "lucide-react";
import { ApiConstants } from "../../constants/ApiConstants";
import './PropertyCards.css'

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
  tag?: string;
  amenities?: Array<{ amenity_name: string }>;
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
        return 'bg-green-500';
      case 'under construction':
        return 'bg-amber-500';
      case 'new launch':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
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
    alert("Link copied to clipboard!");
  };

  const SkeletonCard = () => (
    <div className="animate-pulse rounded-2xl bg-white shadow border overflow-hidden">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      // Removed all padding classes (px-4, sm:px-6, lg:px-8) and added w-full
      <div className="w-full bg-white py-8">
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
     
   
    <div className="w-full bg-white ">

  {/* Header */}
  <div className="mb-8 pt-20 px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
    <p className="text-gray-600 text-base mt-2">
      {totalCount} {totalCount === 1 ? 'property found' : 'properties found'}
    </p>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
    
    {properties.map((property) => {
      const imageUrl = getImageUrl(property.image, property.property_id);
      const isLiked = likedProperties.has(property.property_id);

      return (
        <div
          key={property.property_id}
          onClick={() => navigate(`/property/${property.property_id}`)}
          className="cursor-pointer group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
        >

          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-gray-100">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={property.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => handleImageError(property.property_id)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}

            {/* Tag */}
            {property.tag && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
                {property.tag}
              </div>
            )}

            {/* Like */}
            <button
              onClick={(e) => toggleLike(e, property.property_id)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>

            {/* Verified */}
            {property.verified === 1 && (
              <div className="absolute bottom-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs flex gap-1">
                ✓ Verified
              </div>
            )}

            {/* Status */}
            <div className={`absolute bottom-4 right-4 ${getStatusColor(property.construction_status)} text-white px-2 py-1 rounded text-xs`}>
              {property.construction_status}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {property.title}
              </h3>
              <span className="text-blue-600 font-bold ml-2">
                {formatPrice(property.price)}
              </span>
            </div>

            {/* Location */}
            <div className="text-gray-500 mb-3 flex items-center gap-1 text-sm">
              <MapPinIcon className="w-4 h-4" />
              {property.location}
            </div>

            {/* Details */}
            <div className="flex justify-between border-t pt-3 text-sm text-gray-700">
              <span>{formatBHK(property.bhk)}</span>
              <span>{property.area_sqft} sq.ft</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                {property.property_type}
              </span>
            </div>

          

          </div>
        </div>
      );
    })}
  </div>

  {/* Empty State */}
  {properties.length === 0 && !loading && (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">No properties found</p>
      <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
    </div>
  )}

</div>
  );
};

export default PropertyCards;

//    {/* Amenities */}
            // {property.amenities?.length > 0 && (
            //   <div className="mt-3 flex flex-wrap gap-2">
            //     <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            //       {property.amenities[0].amenity_name}
            //     </span>

            //     {property.amenities.length > 1 && (
            //       <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            //         +{property.amenities.length - 1} more
            //       </span>
            //     )}
            //   </div>
            // )}