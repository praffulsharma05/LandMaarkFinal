// src/components/ImageGalleryModal.jsx
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Heart, Share2 } from 'lucide-react';
import { fetchPropertyImages } from '../../services/services';

const ImageGalleryModal = ({ isOpen, onClose, propertyId, initialImageIndex = 0 }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && propertyId) {
      loadImages();
    }
  }, [isOpen, propertyId]);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const propertyImages = await fetchPropertyImages(propertyId);
      if (propertyImages.length === 0) {
        setError('No images available for this property');
      } else {
        setImages(propertyImages);
        setCurrentIndex(initialImageIndex);
      }
    } catch (err) {
      setError('Failed to load images');
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const handleDownload = () => {
    if (images[currentIndex]) {
      const link = document.createElement('a');
      link.href = images[currentIndex].image_url;
      link.download = `property-image-${propertyId}-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (images[currentIndex]) {
      try {
        await navigator.clipboard.writeText(images[currentIndex].image_url);
        alert('Image URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-7xl mx-auto p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with controls */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
          {!loading && images.length > 0 && (
            <span>{currentIndex + 1} / {images.length}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleShare}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
          >
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {loading ? (
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading images...</p>
            </div>
          ) : error ? (
            <div className="text-white text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={loadImages}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : images.length > 0 ? (
            <>
              <img
                src={images[currentIndex]?.image_url}
                alt={`Property ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-white text-center">
              <p>No images available</p>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {!loading && images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
            {images.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                  idx === currentIndex 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;