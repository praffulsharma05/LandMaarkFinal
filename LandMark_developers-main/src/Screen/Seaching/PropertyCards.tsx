import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, Heart } from "lucide-react";
import { ApiConstants } from "../../constants/ApiConstants";
import { useTranslation } from "../../hooks/useTranslation";
import './PropertyCards.css'

interface Property {
  property_id: number; title: string; image: string; construction_status: string;
  construction_type: string; property_type: string; bhk: number; verified: number;
  area_sqft: number; created_at: string; price: number; location: string;
  description?: string; tag?: string; amenities?: Array<{ amenity_name: string }>;
}

interface Props { properties: Property[]; totalCount: number; loading?: boolean; }

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl bg-white shadow border overflow-hidden">
    <div className="property-search-image-skeleton bg-gray-200"></div>
    <div className="p-6">
      <div className="flex justify-between mb-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div><div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-4 bg-gray-200 rounded w-1/4"></div><div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
);

const PropertyCards: React.FC<Props> = ({ properties, totalCount, loading = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const formatBHK = (bhk: number) => bhk === 0 ? "Studio" : `${bhk} BHK`;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready to move': case 'ready': return 'bg-green-500';
      case 'under construction': return 'bg-amber-500';
      case 'new launch': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getImageUrl = (image: string, propertyId: number) => {
    if (!image || imageErrors.has(propertyId)) return null;
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return ApiConstants.API_BASE_URL + `uploads/${image}`;
  };

  const onCardClick = useCallback((e: React.MouseEvent) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) navigate(`/property/${id}`);
  }, [navigate]);

  const onImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) setImageErrors(prev => new Set(prev).add(id));
  }, []);

  const onToggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) setLikedProperties((prev) => {
      const ns = new Set(prev);
      if (ns.has(id)) { ns.delete(id); } else { ns.add(id); }
      return ns;
    });
  }, []);

  if (loading) return (
    <div className="w-full bg-white py-8">
      <div className="mb-8 px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded property-search-width-skeleton mb-2"></div>
        <div className="h-4 bg-gray-200 rounded property-search-width-small-skeleton"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (<SkeletonCard key={i} />))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <div className="mb-8 property-cards-header px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('propertySearch.properties')}</h1>
        <p className="text-gray-600 text-base mt-2">{totalCount} {totalCount === 1 ? t('propertySearch.propertyFound') : t('propertySearch.propertiesFound')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {properties.map((property) => {
          const imageUrl = getImageUrl(property.image, property.property_id);
          const isLiked = likedProperties.has(property.property_id);
          return (
            <div key={property.property_id} onClick={onCardClick} data-property-id={property.property_id}
              className="cursor-pointer group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div className="relative property-card-image-container overflow-hidden bg-gray-100">
                {imageUrl ? (
                  <img src={imageUrl} alt={property.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" data-property-id={property.property_id} onError={onImageError} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200"><span className="text-gray-400">{t('propertySearch.noImage')}</span></div>
                )}
                {property.tag && <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">{property.tag}</div>}
                <button onClick={onToggleLike} data-property-id={property.property_id} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow" aria-label={t('wishlist.browseProperties')}>
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                </button>
                {property.verified === 1 && <div className="absolute bottom-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs flex gap-1">{t('propertySearch.verified')}</div>}
                <div className={`absolute bottom-4 right-4 ${getStatusColor(property.construction_status)} text-white px-2 py-1 rounded text-xs`}>{property.construction_status}</div>
              </div>
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h2>
                  <span className="text-blue-600 font-bold ml-2">{formatPrice(property.price)}</span>
                </div>
                <div className="text-gray-500 mb-3 flex items-center gap-1 text-sm">
                  <MapPinIcon className="w-4 h-4" />{property.location}
                </div>
                <div className="flex justify-between border-t pt-3 text-sm text-gray-700">
                  <span>{formatBHK(property.bhk)}</span>
                  <span>{property.area_sqft} {t('propertySearch.sqft')}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{property.property_type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {properties.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('propertySearch.noPropertiesFound')}</p>
          <p className="text-gray-400 text-sm mt-2">{t('propertySearch.tryAdjusting')}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCards;
