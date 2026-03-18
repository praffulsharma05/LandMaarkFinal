import React from 'react';

const PropertyOverview = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">Property Overview</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
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

      {/* About Section */}
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
  );
};

export default PropertyOverview;