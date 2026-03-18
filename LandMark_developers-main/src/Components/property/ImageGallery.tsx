import React, { useState } from 'react';
import { Share2, Heart } from 'lucide-react';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {/* Main Image */}
      <div className="md:col-span-2 relative">
        <img
          src={images[currentImageIndex]}
          alt="Property"
          className="w-full h-[400px] object-cover rounded-xl"
        />

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-md">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-md">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <img
          src={images[currentImageIndex]}
          alt="Side"
          className="w-full h-[190px] object-cover rounded-xl"
        />

        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt="Side"
            className="w-full h-[190px] object-cover rounded-xl"
          />

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
            <span className="text-white text-lg font-semibold">
              +17 more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;