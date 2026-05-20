import React from "react";
import Section5Card from "../../../Components/HomePage/Section5Card";
import { Cards as Section5Item } from "../../../store/HomePage/Section5Card";

interface IconicPropertiesSectionProps {
  section5: {
    title: string;
    subtitle: string;
    footerText: string;
    items: Section5Item[];
  };
}

export const IconicPropertiesSection: React.FC<IconicPropertiesSectionProps> = ({
  section5,
}) => {
  const title = section5.title || "";
  const subtitle = section5.subtitle || "";
  const footerText = section5.footerText || "";
  const items = section5.items || [];

  return (
    <section className="home-section-5">
      <div className="section-5-inner">
        <div className="section-5-title">{title}</div>
        <p className="section-5-subtitle">{subtitle}</p>

        <div className="section-5-grid">
          {items.map((item) => (
            <Section5Card key={item.id} property={item} />
          ))}
        </div>
        <p className="section-5-footer-text">{footerText}</p>
        <div className="section-5-btn-wrapper">
      
        </div>
      </div>
    </section>
  );
};
