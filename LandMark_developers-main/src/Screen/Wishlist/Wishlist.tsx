// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import "./Wishlist.css";
// import { Heart } from "lucide-react";

// import WishlistCard from "../../Components/Wishlist/WishlistCard";
// import {
//   propertiesData,
//   Property,
// } from "../../store/Properties/propertiesData";

// const Wishlist = () => {
//   const [wishlist, setWishlist] = useState<number[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   useEffect(() => {
//     const saved = Cookies.get("wishlist");
//     if (saved) {
//       setWishlist(JSON.parse(saved));
//     }
//   }, []);

//   const selectedProperties = propertiesData.filter((p) =>
//     wishlist.includes(p.id),
//   );

//   const removeFromWishlist = (id: number) => {
//     const newWishlist = wishlist.filter((item) => item !== id);
//     setWishlist(newWishlist);
//     Cookies.set("wishlist", JSON.stringify(newWishlist), { expires: 7 });
//   };

//   const toggleSelect = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <div className="flex items-center gap-3 mb-10">
//         <Heart className="text-red-500" />
//         <h1 className="text-3xl font-bold">My Wishlist</h1>
//       </div>

//       {selectedProperties.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500">Your wishlist is empty</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {selectedProperties.map((property: Property) => (
//             <WishlistCard
//               key={property.id}
//               property={property}
//               selected={selectedIds.includes(property.id)}
//               onRemove={removeFromWishlist}
//               onSelect={toggleSelect}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import WishlistHeader from "../../Components/Wishlist/WishlistHeader";
import WishlistCard from "../../Components/Wishlist/WishlistCard";
import { propertiesData } from "../../store/Properties/propertiesData";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = Cookies.get("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const selectedProperties = propertiesData.filter((p) =>
    wishlist.includes(p.id),
  );

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((item) => item !== id);
    setWishlist(updated);
    Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedIds.length === selectedProperties.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectedProperties.map((p) => p.id));
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    Cookies.set("wishlist", JSON.stringify([]), { expires: 7 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 mt-16 via-white to-amber-50/30">
      <WishlistHeader
        total={selectedProperties.length}
        selectedCount={selectedIds.length}
        onSelectAll={selectAll}
        onClear={clearWishlist}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {selectedProperties.map((property) => (
          <WishlistCard
            key={property.id}
            property={property}
            selected={selectedIds.includes(property.id)}
            hovered={hoveredId === property.id}
            onHover={() => setHoveredId(property.id)}
            onLeave={() => setHoveredId(null)}
            onSelect={() => toggleSelect(property.id)}
            onRemove={() => removeFromWishlist(property.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
