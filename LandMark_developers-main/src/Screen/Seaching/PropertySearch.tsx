import React from "react";
import PropertyFilters from "./PropertyFilters";
import PropertyCards from "./PropertyCards";
import { usePropertySearch } from "./usePropertySearch";
import "./PropertyCards.css";

const PropertySearch: React.FC = () => {
  const {
    pageState,
    filterOptionsApiData,
    filters,
    priceError,
    handleFilterChange,
    handleSubmit,
    resetFilters
  } = usePropertySearch();

  return (
    <div className="property-search-container">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <PropertyFilters
          filters={filters}
          filterOptions={filterOptionsApiData}
          priceError={priceError}
          handleFilterChange={handleFilterChange}
          handleSubmit={handleSubmit}
          resetFilters={resetFilters}
        />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {pageState.loading ? (
          <div className="flex justify-start items-start property-search-loading">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PropertyCards properties={pageState.items} totalCount={pageState.totalCount} loading={pageState.loading} />
        )}
      </div>
    </div>
  );
};

export default PropertySearch;
