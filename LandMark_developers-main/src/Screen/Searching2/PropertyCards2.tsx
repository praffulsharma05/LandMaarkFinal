import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPinIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Property } from "./types";
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
  const navigate = useNavigate();
  const [likedProperties, setLikedProperties] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleCardClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const handleImageError = (propertyId: number) => {
    setImageErrors((prev) => new Set(prev).add(propertyId));
  };

  const toggleLike = (propertyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  return (
    <div className="property-cards-container">
      {totalCount > 0 && <h1 className="results-count">{totalCount} Properties found</h1>}
      
      <div className="property-grid">
        {properties.map((property) => (
          <div 
              key={property.property_id} 
              className="property-card"
              onClick={() => handleCardClick(property.property_id)}
            >
            <div className="card-image-wrapper">
              <img
                src={imageErrors.has(property.property_id) ? "/placeholder-property.jpg" : (property.image || "/placeholder-property.jpg")}
                alt={property.title}
                className="card-image"
                onError={() => handleImageError(property.property_id)}
              />
              <button 
                className={`like-button ${likedProperties.has(property.property_id) ? 'liked' : ''}`}
                onClick={(e) => toggleLike(property.property_id, e)}
                type="button"
              >
                <HeartIcon className={`heart-icon ${likedProperties.has(property.property_id) ? 'selected' : ''}`} />
              </button>
              {property.verified === 1 && <span className="verified-badge">Verified</span>}
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-price">{formatPrice(property.price)}</p>
              </div>
              
              <div className="property-location">
                <MapPinIcon className="location-icon" />
                <span>{property.location || "Location not available"}</span>
              </div>
              
              <div className="property-details">
                <span className="detail-item">{formatBHK(property.bhk)}</span>
                <span className="detail-separator">|</span>
                <span className="detail-item">{property.area_sqft} sq ft</span>
                <span className="detail-separator">|</span>
                <span className="detail-item">{property.property_type}</span>
              </div>
              
              <div className="property-status">
                <span className={`status-badge ${property.construction_status?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {property.construction_status || "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && properties.length === 0 && (
        <div className="no-results">
          <p>No properties found</p>
        </div>
      )}
    </div>
  );
};

export default PropertyCards2;