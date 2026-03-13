import React from "react";

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
  price: string;
  location: string;
}

interface Props {
  properties: Property[];
  totalCount: number;
}

const PropertyCards: React.FC<Props> = ({ properties, totalCount }) => {
  return (
    <div className="results-section">

      <div className="results-header">
        <h2>Properties Found: {totalCount}</h2>
      </div>

      <div className="properties-grid">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.property_id} className="property-card">

              {property.image ? (
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-main-image"
                />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}

              <div className="property-details">

                <h3>{property.title}</h3>

                <div className="property-tags">
                  {property.bhk && <span>{property.bhk} BHK</span>}
                  {property.property_type && <span>{property.property_type}</span>}
                  {property.construction_status && (
                    <span>{property.construction_status}</span>
                  )}
                </div>

                <p>{property.area_sqft} sqft</p>

                <div className="property-footer">
                  <span className="property-price">
                    ₹{(parseFloat(property.price) / 10000000).toFixed(1)} Crores
                  </span>

                  <span className="property-location">
                    📍 {property.location}
                  </span>
                </div>

              </div>

            </div>
          ))
        ) : (
          <p>No Properties Found</p>
        )}
      </div>
    </div>
  );
};

export default PropertyCards;