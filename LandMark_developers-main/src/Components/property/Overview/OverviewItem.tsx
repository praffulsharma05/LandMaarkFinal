import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OverviewItemProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subText?: string;
}

const OverviewItem: React.FC<OverviewItemProps> = ({ label, value, icon: Icon, subText }) => {
  return (
    <div className="mt-1">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center  mt-1">
        <Icon className="w-5 h-5 text-gray-400" />
        <div>
          <p className="text-lg text-gray-900 font-semibold">{value}</p>
          {subText && <p className="text-xs text-gray-400">{subText}</p>}
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;