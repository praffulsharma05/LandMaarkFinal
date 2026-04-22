//  import React, { useState, useEffect } from 'react';
// import { Info, Loader } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { fetchPropertyById, CityProperty } from '../../services/services';

// // Components
// import PropertyHeader from '../../Components/property/PropertyHeader';
// import ImageGallery from '../../Components/property/ImageGallery';
// import PropertyTabs from '../../Components/property/PropertyTabs';
// import FloorPlansPricing from '../../Components/property/FloorPlansPricing';
// import PropertyOverview from '../../Components/property/PropertyOverview';
// import AmenitiesSpecs from '../../Components/property/AmenitiesSpecs';
// import ContactCard from '../../Components/property/ContactCard';
// import QASection from '../../Components/property/QASection';

// const PropertyDetailPage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [property, setProperty] = useState<CityProperty | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const { id } = useParams();

//   useEffect(() => {
//     const loadProperty = async () => {
//       if (!id) return;
      
//       try {
//         setLoading(true);
//         const data = await fetchPropertyById(parseInt(id));
//         if (data) {
//           setProperty(data);
//           setError(null);
//         } else {
//           setError('Property not found');
//         }
//       } catch (err) {
//         console.error('Error loading property:', err);
//         setError('Failed to load property details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProperty();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
//           <p className="text-gray-600">Loading property details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !property) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
//           <button
//             onClick={() => window.history.back()}
//             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate derived values from API data
//   const pricePerSqft = property.area_sqft ? Math.round(property.raw_price! / property.area_sqft) : 0;
//   const emiApprox = Math.round(property.raw_price! / 200);

//   // Tabs definition
//   const tabs = [
//     { id: 'overview', label: 'Overview' },
//     { id: 'floorplans', label: 'Floor Plans' },
//     { id: 'amenities', label: 'Amenities' },
//     { id: 'locality', label: 'Locality' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'pricing', label: 'Pricing' },
//   ];

//   // Prepare images array for the gallery
//   // Use property.allImages if available, otherwise create array from property.image
//   const galleryImages = property.allImages?.length > 0 
//     ? property.allImages 
//     : (property.image ? [property.image] : []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18">
//       {/* Header - Using API Data */}
//       <PropertyHeader 
//         property={{
//           name: property.title,
//           builder: property.builder ?? 'no name',
//           location: property.location,
//           type: property.propertyType,
//           area: property.area,
//           rating: property.bhk,
//           possession: property.construction_status || 'Ready to Move',
//           price: {
//             min: property.area_sqft || 0,
//             max: property.area_sqft || 0,
//             perSqft: pricePerSqft,
//             emi: emiApprox
//           }
//         }}
//       />

//       {/* Image Gallery - Pass propertyId and images */}
//       <ImageGallery 
//         images={galleryImages}
//         propertyId={property.id}
//       />

//       {/* Price Card */}
//       <div className="bg-white py-6 px-8 mt-0 shadow-sm mb-6">
//         <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
//           <div>
//             <p className="text-lg font-semibold text-gray-900">
//               {property.bhk} BHK {property.propertyType}
//             </p>
//             <p className="text-gray-500 text-sm mt-1">Configuration</p>
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-gray-900">
//               {property.construction_status || 'Ready to Move'}
//             </p>
//             <p className="text-gray-500 text-sm mt-1">Possession Starts</p>
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-gray-900">
//               ₹{pricePerSqft.toLocaleString()}/sq.ft
//             </p>
//             <p className="text-gray-500 text-sm mt-1">Avg. Price</p>
//           </div>

//           <div>
//             <p className="text-lg font-semibold text-gray-900">
//               {property.area_sqft?.toLocaleString()} sq.ft
//             </p>
//             <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
//               <span>(Super Built-up Area</span>
//               <Info size={14} className="text-blue-600" />
//               <span>)</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <PropertyTabs 
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             tabs={tabs}
//             property={property}
//             pricePerSqft={pricePerSqft}
//           />
//           <QASection property={property} />
//         </div>

//         <div className="lg:col-span-1">
//           <ContactCard property={property} />
//         </div>
//       </div>

//       {/* Floor Plans and Pricing Section */}
//       <FloorPlansPricing property={property} />

//       {/* Property Overview Section */}
//       <PropertyOverview 
//         property={property}
//         pricePerSqft={pricePerSqft}
//       />

//       {/* Amenities and Specifications */}
//       <AmenitiesSpecs 
//         property={property}
//       />
//     </div>
//   );
// };

// export default PropertyDetailPage;
import React, { useState, useEffect } from 'react';
import { Info, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { CityProperty } from '../../services/services';
import { ApiConstants } from '../../constants/ApiConstants';

// Components
import PropertyHeader from '../../Components/property/PropertyHeader';
import ImageGallery from '../../Components/property/ImageGallery';
import PropertyTabs from '../../Components/property/PropertyTabs';
// import FloorPlansPricing from '../../Components/property/FloorPlansPricing';
import PropertyOverview from '../../Components/property/PropertyOverview';
import AmenitiesSpecs from '../../Components/property/AmenitiesSpecs';
import ContactCard from '../../Components/property/ContactCard';
import QASection from '../../Components/property/QASection';

// Define the API response interface for township property
interface TownshipProperty {
  property_id: number;
  township_id: number;
  project_id: number;
  building_id: number;
  title: string;
  description: string;
  location: string;
  latitude: string;
  longitude: string;
  bhk: number;
  property_type: string;
  construction_type: string;
  construction_status: string;
  price: string;
  area_sqft: number;
  verified: number;
  owner_id: number;
  image: string | null;
  created_at: string;
  amenities?: Array<{ amenity_id: number; name: string }>;
  specifications?: Array<{ spec_key: string; spec_value: string }>;
  overview?: any[];
}

const PropertyDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [property, setProperty] = useState<CityProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { id } = useParams();

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get township_id from localStorage or use 9 as default
        const townshipId = localStorage.getItem('selectedTownshipId') || '9';
        
        // Fetch all properties from township API
        const url = `${ApiConstants.API_BASE_URL}api/townships/${townshipId}/all-properties`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch properties: ' + response.status);
        }
        
        const result = await response.json();
        const properties: TownshipProperty[] = result.data || result;
        
        // Find the specific property by ID
        const propertyData = properties.find((p: TownshipProperty) => String(p.property_id) === id);
        
        if (propertyData) {
          // Transform API data to match CityProperty interface
          const transformedProperty: CityProperty = {
            id: propertyData.property_id,
            title: propertyData.title,
            description: propertyData.description || '',
            location: propertyData.location,
            propertyType: propertyData.property_type,
            bhk: propertyData.bhk,
            area_sqft: propertyData.area_sqft,
            raw_price: parseFloat(propertyData.price) || 0,
            area: String(propertyData.area_sqft),
            construction_status: propertyData.construction_status,
            image: propertyData.image || '',
            images: propertyData.image ? [propertyData.image] : [],
            allImages: propertyData.image ? [propertyData.image] : [],
            amenities: propertyData.amenities?.map(a => ({ amenity_id: a.amenity_id, amenity_name: a.name })) || [],
            specifications: {},
            overview: {},
            verified: true,
            tag: '',
          };
          
          setProperty(transformedProperty);
          setError(null);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate derived values from API data
  const pricePerSqft = property.area_sqft ? Math.round(property.raw_price! / property.area_sqft) : 0;
  const emiApprox = Math.round(property.raw_price! / 200);

  // Tabs definition
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'floorplans', label: 'Floor Plans' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'locality', label: 'Locality' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18">
      {/* Header - Using API Data */}
      <PropertyHeader 
        property={{
          name: property.title,
          builder: property.builder ?? 'no name',
          location: property.location,
          type: property.propertyType,
          area: property.area,
          rating: property.bhk,
          possession: property.construction_status || 'Ready to Move',
          price: {
            min: property.area_sqft || 0,
            max: property.area_sqft || 0,
            perSqft: pricePerSqft,
            emi: emiApprox
          }
        }}
      />

      {/* Image Gallery */}
      <ImageGallery images={[property.image]} />

      {/* Price Card */}
      <div className="bg-white py-6 px-8 mt-0 shadow-sm mb-6">
        <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
          <div>
            <p className="text-lg font-semibold   text-gray-900">
              {property.bhk} BHK {property.propertyType}
            </p>
            <p className="text-gray-500 text-sm mt-1">Configuration</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-900">
              {property.construction_status || 'Ready to Move'}
            </p>
            <p className="text-gray-500 text-sm mt-1">Possession Starts</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-900">
              ₹{pricePerSqft.toLocaleString()}/sq.ft
            </p>
            <p className="text-gray-500 text-sm mt-1">Avg. Price</p>
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-900">
              {property.area_sqft?.toLocaleString()} sq.ft
            </p>
            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
              <span>(Super Built-up Area</span>
              <Info size={14} className="text-blue-600" />
              <span>)</span>
            </p>
          </div>
        </div>
      </div>
       {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            property={property}
            pricePerSqft={pricePerSqft}
          />
          <QASection property={property} />
        </div>

        <div className="lg:col-span-1">
          <ContactCard property={property} />
        </div>
      </div>

      {/* Floor Plans and Pricing Section */}
      {/* <FloorPlansPricing property={property} /> */}
 
      {/* Property Overview Section */}
      <PropertyOverview 
        property={property}
        pricePerSqft={pricePerSqft}
      />

      {/* Amenities and Specifications */}
      <AmenitiesSpecs 
        property={property}
      />
    </div>
  );
};

export default PropertyDetailPage;