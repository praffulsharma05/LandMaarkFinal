import React from "react";

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

export default SkeletonCard;
