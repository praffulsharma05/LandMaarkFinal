import React from 'react';

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <>
      <div className="border-t border-gray-200 my-6"></div>
       <h3 className="text-left text-xl border-b w-2/7 border-gray-700  font-bold mb-3">About this property</h3>
      <div className="mt-10 pt-1">
        <p className="text-gray-600 leading-relaxed text-sm text-left">{description}</p>
      </div>
    </>
  );
};

export default DescriptionSection;