import React from "react";

interface Props {
  image: string;
  title: string;
  description: string;
}

const AboutCard: React.FC<Props> = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AboutCard;