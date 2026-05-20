import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Property } from "./types";
import { useTranslation } from "../../hooks/useTranslation";
import "./PropertyCards2.css";
import "./HeartIcon.css";
interface Props {
  properties: Property[];
  totalCount: number;
  loading?: boolean;
}

const formatPrice = (price: number) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

const formatBHK = (bhk: number) => bhk === 0 ? "Studio" : `${bhk} BHK`;

const PropertyCards2: React.FC<Props> = ({ properties, totalCount, loading = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) navigate(`/property/${id}`);
  }, [navigate]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) setImageErrors((prev) => new Set(prev).add(id));
  }, []);

  const toggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const id = Number((e.currentTarget as HTMLElement).dataset.propertyId);
    if (id) {
      setLikedProperties((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="property-cards-container">
        <div className="property-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="property-card animate-pulse">
              <div className="card-image-wrapper bg-gray-200" />
              <div className="card-content">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="property-cards-container">
      {totalCount > 0 && <h1 className="results-count">{totalCount} {totalCount === 1 ? t('propertySearch.propertyFound') : t('propertySearch.propertiesFound')}</h1>}
      
      <div className="property-grid">
        {properties.map((property) => (
          <div 
              key={property.property_id} 
              className="property-card"
              onClick={handleCardClick}
              data-property-id={property.property_id}
            >
            <div className="card-image-wrapper">
              <img
                src={imageErrors.has(property.property_id) ? "/placeholder-property.jpg" : (property.image || "/placeholder-property.jpg")}
                alt={property.title}
                className="card-image"
                loading="lazy"
                data-property-id={property.property_id}
                onError={handleImageError}
              />
              <button 
                className={`like-button ${likedProperties.has(property.property_id) ? 'liked' : ''}`}
                onClick={toggleLike}
                type="button"
                data-property-id={property.property_id}
                aria-label={t('wishlist.browseProperties')}
              >
                <HeartIcon className={`heart-icon ${likedProperties.has(property.property_id) ? 'selected' : ''}`} />
              </button>
              {property.verified === 1 && <span className="verified-badge">{t('propertySearch.verified')}</span>}
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h2 className="property-title">{property.title}</h2>
                <p className="property-price">{formatPrice(property.price)}</p>
              </div>
              
              <div className="property-location">
                <MapPinIcon className="location-icon" />
                <span>{property.location || "Location not available"}</span>
              </div>
              
              <div className="property-details">
                <span className="detail-item">{formatBHK(property.bhk)}</span>
                <span className="detail-separator">|</span>
                <span className="detail-item">{property.area_sqft} {t('propertySearch.sqft2')}</span>
                <span className="detail-separator">|</span>
                <span className="detail-item">{property.property_type}</span>
              </div>
              
              <div className="property-badges">
                <span className={`status-badge ${
                  property.construction_status 
                    ? property.construction_status.toLowerCase().replace(/\s+/g, '-')
                    : 'n-a'
                }`}>
                  {property.construction_status || "N/A"}
                </span>
                {property.construction_type && (
                  <span className={`type-badge ${
                    property.construction_type.toLowerCase().replace(/\s+/g, '-')
                  }`}>
                    {property.construction_type}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && properties.length === 0 && (
        <div className="no-results">
          <p>{t('propertySearch.noPropertiesFound')}</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCards2;