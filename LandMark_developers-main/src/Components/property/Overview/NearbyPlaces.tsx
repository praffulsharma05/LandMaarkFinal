import React from 'react';
import { CityProperty } from '../../../services/services';

interface NearbyPlacesProps {
  places: CityProperty['places'];
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ places }) => {
  if (!places || places.length === 0) return null;

  return (
    <>
      <div className="border-t  border-gray-200 my-6"></div>
      <div className="mt-8">
        <h3 className="text-xl text-left font-bold border-b w-1/5 mb-8 ">Nearby Places</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {places.slice(0, 4).map((place, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{place.place_name}</p>
                <p className="text-xs text-gray-500">{place.place_category}</p>
              </div>
              <p className="text-xs text-blue-600">
                {(parseFloat(place.distance_meters) / 1000).toFixed(1)} km
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NearbyPlaces;