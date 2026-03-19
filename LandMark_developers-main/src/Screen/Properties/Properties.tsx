 
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import PropertyCard from "../../Components/Properties/PropertyCard";
import {
  propertiesData,
  Property,
} from "../../store/Properties/propertiesData";
 
const Properties = () => {

  const [wishlist, setWishlist] = useState<number[]>([]);

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
   



  return (
    <div className="mx-auto max-w-7xl px-6 mt-10 py-10" >
      <h1 className="text-4xl font-bold mb-10">Available Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propertiesData.map((property: Property) => {
          const selected = wishlist.includes(property.id);

          return (
            <PropertyCard 
          
              key={property.id}
              property={property}
              selected={selected}
              onToggle={toggleWishlist}
              onClick={() => goToDetails(property)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Properties;
