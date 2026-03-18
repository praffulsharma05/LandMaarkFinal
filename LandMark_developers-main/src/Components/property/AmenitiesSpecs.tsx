import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Icon mapping
const iconMap = {
  Tent: () => <span className="text-2xl">⛺</span>,
  Bike: () => <span className="text-2xl">🚲</span>,
  Store: () => <span className="text-2xl">🏪</span>,
  Flower2: () => <span className="text-2xl">🌸</span>,
  Waves: () => <span className="text-2xl">🌊</span>,
  Landmark: () => <span className="text-2xl">🏛️</span>,
  Trees: () => <span className="text-2xl">🌳</span>,
  Droplets: () => <span className="text-2xl">💧</span>,
  Table: () => <span className="text-2xl">🏓</span>,
};

const AmenitiesSpecs = ({ amenities, floorData }) => {
  const [openSection, setOpenSection] = useState("floor");

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* ================= Amenities ================= */}
      <div className="border-b px-6 py-6">
        <h2 className="text-xl font-semibold mb-6">
          Vanshdeep The Aura Top Amenities
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {amenities.map((item, i) => {
            const IconComponent = iconMap[item.icon] || (() => <span className="text-2xl">🏢</span>);
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-2">{IconComponent()}</div>
                <p className="text-sm text-gray-700 leading-tight">
                  {item.name}
                </p>
              </div>
            );
          })}

          {/* More Button */}
          <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-200">
            <p className="text-purple-600 font-medium">+30 more</p>
            <ChevronDown className="w-4 h-4 text-purple-600 mt-1" />
          </div>
        </div>
      </div>

      {/* ================= Specifications ================= */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold mb-4">
          Vanshdeep The Aura Specifications
        </h2>

        {/* Floor & Counter */}
        <div className="border-b py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setOpenSection(openSection === "floor" ? "" : "floor")
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🧱</span>
              <p className="font-medium">Floor & Counter</p>
            </div>

            {openSection === "floor" ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </div>

          {openSection === "floor" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 text-sm">
              {floorData.map((item, i) => (
                <div key={i}>
                  <p className="text-gray-500">{item.label}</p>
                  <p className="font-medium text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fitting */}
        <div className="border-b py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setOpenSection(openSection === "fitting" ? "" : "fitting")
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <p className="font-medium">Fitting</p>
            </div>

            {openSection === "fitting" ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </div>
        </div>

        {/* Wall & Ceiling */}
        <div className="py-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setOpenSection(openSection === "wall" ? "" : "wall")
            }
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🧱</span>
              <p className="font-medium">Wall & Ceiling</p>
            </div>

            {openSection === "wall" ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSpecs;