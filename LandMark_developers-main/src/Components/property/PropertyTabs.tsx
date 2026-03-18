import React from 'react';
import {
  Bed, Bath, Square, Calendar, Star, Check, X, TrendingDown
} from 'lucide-react';

const PropertyTabs = ({ activeTab, setActiveTab, tabs, propertyData }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Bed className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="font-semibold">{propertyData.featuredProperty.bedrooms} BHK</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Bath className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="font-semibold">{propertyData.featuredProperty.bathrooms}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Square className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-semibold">{propertyData.featuredProperty.area} sq.ft</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600 mb-2" />
                <p className="text-sm text-gray-500">Possession</p>
                <p className="font-semibold">{propertyData.mainProperty.possession}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                1 BHK Flat for sale in Jaipur. This property is in Jagatpura, which is a coveted investment location. 
                This statefully designed 1 BHK unit is among Jaipur's best properties.
              </p>
              <p className="text-gray-700">
                This property in Jaipur is on floor {propertyData.featuredProperty.floor}. 
                The total number of floors in this Flat is {propertyData.featuredProperty.totalFloors}.
              </p>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold mb-3">Additional Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Parking</p>
                  <p className="font-medium">{propertyData.featuredProperty.parking}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Balcony</p>
                  <p className="font-medium">{propertyData.featuredProperty.balcony}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Added</p>
                  <p className="font-medium">{propertyData.featuredProperty.added}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Brokerage</p>
                  <p className="font-medium text-green-600">No Charge</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'floorplans':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Floor Plans & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {propertyData.floorPlans.map((plan, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img src={plan.image} alt={plan.type} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{plan.type}</h3>
                    <p className="text-blue-600 font-bold mt-2">{plan.price}</p>
                    <p className="text-sm text-gray-600">{plan.area} sq.ft</p>
                    <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'amenities':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {propertyData.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl mr-3">{amenity.icon}</span>
                  <span className="font-medium">{amenity.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-700 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Water harvesting facility available
              </p>
            </div>
          </div>
        );

      case 'locality':
        return (
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Jagatpura Locality</h2>
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{propertyData.locality.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{propertyData.locality.societies}</p>
                <p className="text-sm text-gray-600">Societies</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{propertyData.locality.apartments}</p>
                <p className="text-sm text-gray-600">Apartments</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{propertyData.locality.ownerProperties}</p>
                <p className="text-sm text-gray-600">Owner Properties</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  Good Things Here
                </h3>
                <ul className="space-y-2">
                  {propertyData.locality.goodThings.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <X className="w-5 h-5 text-red-600 mr-2" />
                  Things that need improvement
                </h3>
                <ul className="space-y-2">
                  {propertyData.locality.improvements.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <span className="font-semibold">Connectivity: </span>
                Easy access to Jaipur International Airport via smooth roads. Connected to other parts via Airport Road, Mahal Road.
              </p>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Resident Reviews</h2>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-bold">{propertyData.locality.rating}</span>
                  <span className="text-gray-500 ml-1">/5</span>
                </div>
                <span className="text-gray-500">(84 reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Connectivity</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{propertyData.locality.connectivity}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Neighborhood</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{propertyData.locality.neighborhood}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
            </div>

            {propertyData.reviews.map((review, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.type} • {review.time}</p>
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{review.rating}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-green-600">Good: </span>
                    {review.good}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-red-600">Needs improvement: </span>
                    {review.improvement}
                  </p>
                </div>
              </div>
            ))}

            <button className="w-full mt-4 text-blue-600 font-medium hover:text-blue-800">
              View All 84 Reviews →
            </button>
          </div>
        );

      case 'pricing':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Price Trends</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-600 font-semibold">{propertyData.priceTrends.project.depreciation}%</span>
                </div>
                <p className="text-sm text-gray-600">depreciation in avg. price/sq.ft for Axis Royal Samriddhi</p>
                <p className="text-xs text-gray-500 mt-2">Last 1 year</p>
                <p className="text-lg font-bold mt-2">₹{propertyData.priceTrends.project.avgRate}/sq.ft</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-600 font-semibold">{propertyData.priceTrends.locality.depreciation}%</span>
                </div>
                <p className="text-sm text-gray-600">depreciation in avg. price/sq.ft for Jagatpura</p>
                <p className="text-xs text-gray-500 mt-2">Last 1 year</p>
                <p className="text-lg font-bold mt-2">₹{propertyData.priceTrends.locality.avgRate}/sq.ft</p>
              </div>
            </div>

            {/* Price Trend Graph Placeholder */}
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <p className="text-gray-500">Price Trend Graph (Jul 2024 - Mar 2026)</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Price Comparison</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Project</th>
                    <th className="text-left py-2">1 Year Change</th>
                    <th className="text-left py-2">Avg. Rate/sq.ft</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Axis Royal Samriddhi</td>
                    <td className="py-2 text-red-600">-5.72%</td>
                    <td className="py-2">₹2.7K</td>
                  </tr>
                  <tr>
                    <td className="py-2">Jagatpura (Locality)</td>
                    <td className="py-2 text-red-600">-11.95%</td>
                    <td className="py-2">₹4.5K</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PropertyTabs;