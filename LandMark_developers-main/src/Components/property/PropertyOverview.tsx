 
 
import React from 'react';

const PropertyOverview = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between mb-4">
              
            </div>
             <h3 className="font-semibold">Property Overview</h3>
            <div className="grid grid-cols-1  sm:grid-cols-2 mt-15 gap-y-6 gap-x-10">
              {data.map((item, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-sm mb-1">{item.label}</p>

                  {item.link ? (
                    <a href="#" className="text-blue-600 font-medium hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  )}

                  {item.sub && (
                    <p className="text-blue-600 text-sm mt-1 cursor-pointer hover:underline">
                      {item.sub} →
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">About this property</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                1 BHK Flat for sale in Jaipur. This property is in Jagatpura, which is
                a coveted investment location. This tastefully designed 1BHK unit is
                among Jaipur's best properties. Contact now for more details. This
                property in Jaipur is on floor 6. The total number of floors in this
                Flat is 8.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;