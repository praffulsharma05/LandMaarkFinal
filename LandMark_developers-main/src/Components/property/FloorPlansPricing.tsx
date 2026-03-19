import React, { useState } from 'react';
import { Home, Ruler, Grid, Layers, ZoomIn, Move, RotateCw } from 'lucide-react';

const FloorPlansPricing = ({ pricingCards, floorPlans }) => {
  const [selectedUnit, setSelectedUnit] = useState('1bhk');
  const [selectedView, setSelectedView] = useState('2d');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">Floor Plans and Pricing</h2>
        <p className="text-gray-600 mb-6">Explore detailed floor plans</p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {pricingCards.map((card) => (
            <div
              key={card.key}
              onClick={() => setSelectedUnit(card.key)}
              className={`bg-white rounded-xl p-3 border cursor-pointer transition-all duration-200
                hover:shadow-md
                ${
                  selectedUnit === card.key
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-semibold">{card.type}</h3>
                  <p className="text-xs text-gray-500">Apartment</p>
                </div>
                <Home className="w-4 h-4 text-blue-600" />
              </div>

              <p className="text-base font-bold text-blue-600 mb-1">
                ₹{card.price}
              </p>

              <div className="flex items-center text-gray-600 text-xs mb-2">
                <Ruler className="w-3 h-3 mr-1" />
                <span>{card.area} SQ.FT</span>
              </div>

              <div className="border-t pt-2">
                <p className="text-xs text-gray-500">Starting</p>
                <p className="text-sm font-semibold">₹{card.base}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Plan */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                {selectedView === '2d' ? '2D Floor Plan' : '3D Floor Plan'}
              </h3>
              <span className="text-blue-600 text-sm">
                {floorPlans[selectedUnit].type}
              </span>
            </div>

            {/* Image */}
            <div className="relative bg-gray-100 rounded-xl h-100 overflow-hidden mb-4">
              <img
                src="https://housing-images.n7net.in/012c1500/b83a3bea6784b96589c151345d4ed44e/v0/fs.jpeg"
                alt="plan"
                className="w-full h-[500px] object-cover"
              />

              {/* Toggle */}
              <div className="absolute top-3 left-3 flex gap-2">
                <button
                  onClick={() => setSelectedView('2d')}
                  className={`px-3 py-1 rounded ${
                    selectedView === '2d'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white'
                  }`}
                >
                  <Grid className="w-4 h-4 inline mr-1" />
                  2D
                </button>

                <button
                  onClick={() => setSelectedView('3d')}
                  className={`px-3 py-1 rounded ${
                    selectedView === '3d'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white'
                  }`}
                >
                  <Layers className="w-4 h-4 inline mr-1" />
                  3D
                </button>
              </div>

              {/* Controls */}
              <div className="absolute top-3 right-3 flex gap-2">
                <ZoomIn className="w-4 h-4 bg-white p-1 rounded cursor-pointer" />
                <Move className="w-4 h-4 bg-white p-1 rounded cursor-pointer" />
                <RotateCw className="w-4 h-4 bg-white p-1 rounded cursor-pointer" />
              </div>
            </div>

            {/* Rooms */}
            {selectedView === '3d' && (
              <div className="grid grid-cols-2 gap-3">
                {floorPlans[selectedUnit].rooms.map((room, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{room.name}</p>
                    <p className="text-sm text-gray-500">{room.dimensions}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlansPricing;