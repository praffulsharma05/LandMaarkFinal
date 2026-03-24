// import { Heart } from "lucide-react";

// interface Props {
//   total: number;
//   selectedCount: number;
//   onSelectAll: () => void;
//   onClear: () => void;
// }

// const WishlistHeader = ({
//   total,
//   selectedCount,
//   onSelectAll,
//   onClear,
// }: Props) => {
//   return (
//     <div className="bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm sticky top-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="p-3 bg-amber-100 rounded-xl">
//             <Heart className="w-6 h-6 text-amber-700 fill-amber-700" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-light text-amber-900">My Wishlist</h1>
//             <p className="text-sm text-amber-600">
//               {total} {total === 1 ? "property" : "properties"} saved
//             </p>
//           </div>
//         </div>

//         {total > 0 && (
//           <div className="flex gap-3">
//             <button
//               onClick={onSelectAll}
//               className="px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg"
//             >
//               {selectedCount === total ? "Deselect All" : "Select All"}
//             </button>

//             <button
//               onClick={onClear}
//               className="px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg"
//             >
//               Clear All
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistHeader;
 
import React from "react";
import { Heart, Trash2, CheckSquare, Square } from "lucide-react";

interface Props {
  total: number;
  selectedCount: number;
  onSelectAll: () => void;
  onClear: () => void;
}

const WishlistHeader = ({
  total,
  selectedCount,
  onSelectAll,
  onClear,
}: Props) => {
  const allSelected = total > 0 && selectedCount === total;

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Heart className="w-6 h-6 text-amber-700 fill-amber-700" />
          </div>

          <div>
            <h1 className="text-2xl font-light text-amber-900">My Wishlist</h1>
            <p className="text-sm text-amber-600">
              {total} {total === 1 ? "property" : "properties"} saved
            </p>
          </div>
        </div>

        {total > 0 && (
          <div className="flex gap-3">
            <button
              onClick={onSelectAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg transition"
            >
              {allSelected ? (
                <>
                  <CheckSquare className="w-4 h-4" />
                  Deselect All
                </>
              ) : (
                <>
                  <Square className="w-4 h-4" />
                  Select All
                </>
              )}
            </button>

            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="bg-amber-50 px-4 py-2 text-sm text-amber-700">
          {selectedCount} property{selectedCount !== 1 ? 'ies' : ''} selected
        </div>
      )}
    </div>
  );
};

export default WishlistHeader;