 
// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import PropertyCard from "../../Components/Properties/PropertyCard";
// import { fetchProperties, CityProperty } from "../../services/services";
// import { useNavigate } from "react-router-dom";

// const Properties = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState<CityProperty[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [wishlist, setWishlist] = useState<number[]>([]);

//   // Fetch properties from API
//   useEffect(() => {
//     const loadProperties = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProperties();
//         setProperties(data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching properties:', err);
//         setError('Failed to load properties. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProperties();
//   }, []);

//   // Load wishlist from cookies
//   useEffect(() => {
//     const saved = Cookies.get("wishlist");
//     if (saved) {
//       setWishlist(JSON.parse(saved));
//     }
//   }, []);

//   const toggleWishlist = (id: number) => {
//     let updated;
//     if (wishlist.includes(id)) {
//       updated = wishlist.filter((item) => item !== id);
//     } else {
//       updated = [...wishlist, id];
//     }
//     setWishlist(updated);
//     Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
//   };

//   if (loading) {
//     return (
//       <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
//         <div className="flex justify-center items-center min-h-[400px]">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading properties...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
//       <h1 className="text-4xl font-bold mb-10">Available Properties</h1>

//       {properties.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500">No properties available at the moment.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {properties.map((property: CityProperty) => {
//             const selected = wishlist.includes(property.id);
//             return (
//               <PropertyCard
//                 key={property.id}
//                 property={property}
//                 selected={selected}
//                 onToggle={toggleWishlist}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Properties;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropertyCard from "../../Components/Properties/PropertyCard";
import { fetchProperties, CityProperty } from "../../services/services";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<CityProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Fetch properties from API
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        setProperties(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Load wishlist from cookies
  useEffect(() => {
    const saved = Cookies.get("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
      <h1 className="text-4xl font-bold mb-10">Available Properties</h1>

      {properties.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No properties available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property: CityProperty) => {
            const selected = wishlist.includes(property.id);
            return (
              <PropertyCard
                key={property.id}
                property={property}
                selected={selected}
                onToggle={toggleWishlist}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Properties;