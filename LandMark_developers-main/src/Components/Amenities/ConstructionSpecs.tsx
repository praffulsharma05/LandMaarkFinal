import React, { useState } from 'react';
import { Grid, Wrench, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { constructionSections } from '../../store/amenities/constructionSpecsData';

interface ConstructionSpecsProps {
  onSectionToggle?: (sectionId: string, isOpen: boolean) => void;
}

const iconMap: Record<string, any> = {
  Grid: Grid,
  Wrench: Wrench,
  Building2: Building2,
};

const ConstructionSpecs: React.FC<ConstructionSpecsProps> = ({ onSectionToggle }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    const newOpenSection = openSection === sectionId ? null : sectionId;
    setOpenSection(newOpenSection);
    onSectionToggle?.(sectionId, newOpenSection === sectionId);
  };

  const renderIcon = (iconName: string, className: string = "w-5 h-5 text-gray-600") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <div className="space-y-4">
      {constructionSections.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-4">
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-2">
              {renderIcon(section.icon || 'Grid')}
              <p className="font-medium text-gray-800">{section.title}</p>
            </div>
            {openSection === section.id ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>

          {openSection === section.id && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {section.data.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConstructionSpecs;