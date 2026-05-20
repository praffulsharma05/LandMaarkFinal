import React from "react";
import { MapPin } from "lucide-react";
import { Cards } from "../../store/HomePage/Section5Card";
import "./Section5Card.css";

interface PropertyCardProps {
  property: Cards;
}

const Section5Card: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="section5-card">
      <img
        src={property.image}
        alt={property.title}
        className="section5-card-img"
        loading="lazy"
      />

      <div className="section5-card-content">
        <h1 className="section5-card-title">
          {property.title}
        </h1>

        <div className="section5-card-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>

        <p className="section5-card-price">{property.price}</p>


      </div>
    </div>
  );
};

export default Section5Card;
