// import React, { useState } from 'react';
// import {  Heart, Share2Icon } from 'lucide-react';

// const ImageGallery = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
       
      
       
//       <div className="relative md:col-span-2  w-full h-[450px] overflow-hidden ">

 
//   <img
//     src={images[currentImageIndex]}
//     alt="property"
//     className="w-full h-full  object-cover"
//   />
 
//   <div className="absolute top-0 left-0 h-full w-1/4 backdrop-blur-md bg-white/30">
//   </div>
 
  
//   <div className="absolute top-0 right-0 h-full w-1/4 backdrop-blur-md bg-white/30">
//     <div className="absolute top-4 right-4 flex gap-2">
//           <button className="p-2 bg-white rounded-lg text-blue hover:bg-gray-100 shadow-md">
//             <Share2Icon className="w-5  h-5" />
//           </button>
//           <button className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-md">
//             <Heart className="w-5 h-5" />
//           </button>
//         </div></div>

// </div>
//       <div className="flex flex-col gap-4">
//         <img
//           src={images[currentImageIndex]}
//           alt="Side"
//           className="w-full h-[210px] object-cover "
//         />

//         <div className="relative">
//           <img
//             src={images[currentImageIndex]}
//             alt="Side"
//             className="w-full h-[210px] object-cover "
//           />

//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
//             <span className="text-white text-lg font-semibold">
//               +17 more
//             </span>

//           </div>
          
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;
// src/components/ImageGallery.jsx
import React, { useState } from 'react';
import { Heart, Share2Icon } from 'lucide-react';
import ImageGalleryModal from '../../Components/ImageGalleryModal/ImageGalleryModal';

const ImageGallery = ({ images, propertyId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);

  const handleImageClick = (index) => {
    setModalStartIndex(index);
    setIsModalOpen(true);
  };

  const handleMoreClick = () => {
    // Click on the "+17 more" overlay
    setModalStartIndex(2); // Start from the third image since we have 2 visible in sidebar
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Main large image */}
        <div className="relative md:col-span-2 w-full h-[450px] overflow-hidden cursor-pointer">
          <img
            src={images[currentImageIndex]}
            alt="property"
            className="w-full h-full object-cover"
            onClick={() => handleImageClick(currentImageIndex)}
          />
          
          <div className="absolute top-0 left-0 h-full w-1/4 backdrop-blur-md bg-white/30"></div>
          
          <div className="absolute top-0 right-0 h-full w-1/4 backdrop-blur-md bg-white/30">
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white rounded-lg text-blue hover:bg-gray-100 shadow-md">
                <Share2Icon className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-md">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar images */}
        <div className="flex flex-col gap-4">
          <img
            src={images[0]}
            alt="Side"
            className="w-full h-[210px] object-cover cursor-pointer"
            onClick={() => handleImageClick(0)}
          />

          <div className="relative cursor-pointer" onClick={handleMoreClick}>
            <img
              src={images[1] || images[0]}
              alt="Side"
              className="w-full h-[210px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <span className="text-white text-lg font-semibold">
                +{images.length - 2} more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing all images */}
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={propertyId}
        initialImageIndex={modalStartIndex}
      />
    </>
  );
};

export default ImageGallery;