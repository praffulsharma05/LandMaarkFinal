import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './ImageGalleryModal.css';
import { CityProperty } from '../../services/services';
import { useTranslation } from '../../hooks/useTranslation';
import { COLORS } from '../../styles/colors';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: CityProperty;
  initialImageIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ isOpen, onClose, property, initialImageIndex = 0 }) => {
  const { t } = useTranslation();
  const [mediaItems, setMediaItems] = useState<Array<{ type: 'image' | 'video'; url: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(initialImageIndex);
  const [loading, setLoading] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (!isOpen || !property) return;
    setLoading(true);
    try {
      const imgs = property.allImages?.length ? property.allImages : property.images?.length ? property.images : property.image ? [property.image] : ['https://via.placeholder.com/800x600?text=No+Images+Available'];
      const items = [...imgs.map((url: string) => ({ type: 'image' as const, url })), ...(property.video || []).map((url: string) => ({ type: 'video' as const, url }))];
      setMediaItems(items);
      setCurrentIndex(Math.min(initialImageIndex, items.length - 1));
    } catch {
      setMediaItems([{ type: 'image', url: 'https://via.placeholder.com/800x600?text=Error+Loading+Images' }]);
    } finally { setLoading(false); }
  }, [isOpen, property, initialImageIndex]);

  const handleNav = useCallback((dir: number) => {
    setCurrentIndex((prev) => (prev + dir + mediaItems.length) % mediaItems.length);
    setIsZoomed(false);
  }, [mediaItems.length]);

  const handlePrev = useCallback(() => handleNav(-1), [handleNav]);
  const handleNext = useCallback(() => handleNav(1), [handleNav]);
  const toggleZoom = useCallback(() => {
    if (mediaItems[currentIndex]?.type === 'video') return;
    setIsZoomed((prev) => !prev);
    setZoomPosition({ x: 0, y: 0 });
  }, [mediaItems, currentIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    else if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'Escape') onClose();
    else if (e.key === 'z' || e.key === 'Z') toggleZoom();
  }, [handlePrev, handleNext, onClose, toggleZoom]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => { touchStartX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const d = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(d) > 50) handleNav(d > 0 ? -1 : 1);
  }, [handleNav]);

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current.querySelector('img');
      if (img) {
        img.style.transform = isZoomed ? 'scale(1.5)' : 'scale(1)';
        img.style.transformOrigin = isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center';
      }
    }
  }, [isZoomed, zoomPosition]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('gallery-modal-open');
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('gallery-modal-open');
    };
  }, [isOpen, handleKeyDown]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isZoomed || !imageRef.current) return;
    const img = imageRef.current.querySelector('img');
    if (!img) return;
    const { left, top, width, height } = img.getBoundingClientRect();
    setZoomPosition({
      x: Math.min(Math.max(((e.clientX - left) / width) * 100, 0), 100),
      y: Math.min(Math.max(((e.clientY - top) / height) * 100, 0), 100)
    });
  }, [isZoomed]);

  const handleThumbnailClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentIndex(parseInt(e.currentTarget.dataset.thumbIndex || '0', 10));
    setIsZoomed(false);
  }, []);

  if (!isOpen) return null;

  const currentMedia = mediaItems[currentIndex] || { type: 'image' as const, url: '' };
  const errHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const t2 = e.target as HTMLImageElement; t2.onerror = null; t2.src = 'https://via.placeholder.com/800x600?text=Image+Load+Error';
  };
  const thumbErrHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const t2 = e.target as HTMLImageElement; t2.onerror = null; t2.src = 'https://via.placeholder.com/64x64?text=Error';
  };

  return (
    <div className="gallery-overlay">
      <div className="gallery-container">
        <button onClick={onClose} className="gallery-close-btn" aria-label={t('gallery.closeGallery')}><X size={24} /></button>
        {!loading && mediaItems.length > 0 && (
          <div className="gallery-counter"><span>{currentIndex + 1} / {mediaItems.length}</span></div>
        )}
        <div className="gallery-main-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseMove={handleMouseMove}>
          {loading ? (
            <div className="gallery-loading"><div className="gallery-spinner"></div><p>{t('gallery.loading')}</p></div>
          ) : mediaItems.length > 0 ? (
            <div className="gallery-image-wrapper">
              <div ref={imageRef} className={`gallery-image-container ${currentMedia.type === 'video' ? 'cursor-default' : (isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in')}`} onClick={toggleZoom}>
                {currentMedia.type === 'video' ? (
                  <video src={currentMedia.url} className="gallery-main-image gallery-video" controls autoPlay muted playsInline />
                ) : (
                  <img src={currentMedia.url} alt={`${t('gallery.propertyImage')} ${currentIndex + 1}`} className="gallery-main-image" onError={errHandler} loading="lazy" />
                )}
              </div>
              {mediaItems.length > 1 && (
                <>
                  <button onClick={handlePrev} className="gallery-nav-btn prev" aria-label={t('gallery.previousSlide')}><ChevronLeft size={32} /></button>
                  <button onClick={handleNext} className="gallery-nav-btn next" aria-label={t('gallery.nextSlide')}><ChevronRight size={32} /></button>
                </>
              )}
            </div>
          ) : (
            <div className="gallery-loading"><p>{t('gallery.noMediaAvailable')}</p></div>
          )}
        </div>
        {!loading && mediaItems.length > 1 && (
          <div className="thumbnail-strip-container">
            <div className="thumbnail-strip">
              {mediaItems.map((item, idx) => (
                <button key={idx} onClick={handleThumbnailClick} data-thumb-index={idx} className={`thumbnail-btn ${idx === currentIndex ? 'active' : ''}`} aria-label={`${t('gallery.goToSlide')} ${idx + 1}`}>
                  {item.type === 'video' ? (
                    <div className="thumbnail-video-wrapper">
                      <img src={property.allImages?.[0] || property.image || 'https://via.placeholder.com/64x64?text=Video'} alt={t('gallery.videoThumbnail')} className="thumbnail-img" loading="lazy" />
                      <div className="thumbnail-video-overlay"><Play size={16} fill={COLORS.white} strokeWidth={2} /></div>
                    </div>
                  ) : (
                    <img src={item.url} alt={`${t('gallery.thumbnail')} ${idx + 1}`} className="thumbnail-img" onError={thumbErrHandler} loading="lazy" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGalleryModal;
