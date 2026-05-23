import React, { useState, useCallback, useMemo } from 'react';
import { Heart, Share2, Check, Image as ImageIcon, Play } from 'lucide-react';
import ImageGalleryModal from '../../Components/ImageGalleryModal/ImageGalleryModal';
import { CityProperty } from '../../services/services';
import { COLORS } from '../../styles/colors';
import useIsMobile from '../../hooks/useIsMobile';
import { useTranslation } from '../../hooks/useTranslation';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
  propertyId: number;
  property: CityProperty;
}

const fetchImageAsBlob = async (url: string): Promise<Blob | null> => {
  try {
    const response = await fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } });
    if (response.ok) return await response.blob();
  } catch (e) { console.warn('Direct fetch failed, trying proxy...', e); }
  try {
    let targetUrl = url;
    if (url.includes('/uploads/')) targetUrl = url.substring(url.indexOf('/uploads/'));
    const response = await fetch(targetUrl);
    if (response.ok) return await response.blob();
  } catch (fetchError) { console.warn('Proxy fetch failed, falling back to Canvas:', fetchError); }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.85);
      } catch (canvasError) { console.warn('Canvas conversion failed:', canvasError); resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

const shareProperty = async (
  imgUrl: string, title: string, link: string, showToast: () => void
): Promise<void> => {
  const fullShareText = `Hi there, \u{1F44B}\nCheck out this beautiful property which I have found on LandMaark. Could you take a quick look and connect if interested?: ${title}\n${link}`;
  try {
    if (navigator.share) {
      if (imgUrl) {
        try {
          const blob = await fetchImageAsBlob(imgUrl);
          if (blob) {
            const blobType = blob.type || 'image/jpeg';
            let extension = 'jpg';
            if (blobType.includes('png')) extension = 'png';
            else if (blobType.includes('webp')) extension = 'webp';
            else if (blobType.includes('gif')) extension = 'gif';
            const file = new File([blob], `property.${extension}`, { type: blobType });
            const combinedShareData: Record<string, unknown> = { title, text: fullShareText, files: [file] };
            if (navigator.canShare && navigator.canShare(combinedShareData as ShareData)) { await navigator.share(combinedShareData as ShareData); return; }
            const fileOnlyShareData: Record<string, unknown> = { files: [file] };
            if (navigator.canShare && navigator.canShare(fileOnlyShareData)) {
              try { await navigator.clipboard.writeText(fullShareText); } catch (cErr) { console.warn('Silent clipboard copy failed', cErr); }
              await navigator.share(fileOnlyShareData); return;
            }
          }
        } catch (shareError) { console.warn('Sharing with image file failed:', shareError); }
      }
      await navigator.share({ title, text: fullShareText });
      return;
    }
    await navigator.clipboard.writeText(fullShareText);
    showToast();
  } catch (err: unknown) {
    const shareErr = err as { name?: string };
    if (shareErr?.name !== 'AbortError') {
      console.error('Share failed:', err);
      try { await navigator.clipboard.writeText(fullShareText); showToast(); }
      catch (clipboardError) { console.error('Failed to copy:', clipboardError); alert('Please copy the link manually: ' + link); }
    }
  }
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, property: propData }) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [modalState, setModalState] = useState<{ open: boolean; startIndex: number }>({ open: false, startIndex: 0 });
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [, setToastVisible] = useState<boolean>(false);
  const [property] = useState<CityProperty | null>(propData || null);
  const isMobile = useIsMobile();

  const displayImages = useMemo(() => 
    property?.allImages?.length && property.allImages.length > 0 ? property.allImages : images,
  [property, images]);
  const videos = useMemo(() => property?.video ?? [], [property]);
  const mediaItems = useMemo(() => [
    ...displayImages.map(imgUrl => ({ type: 'image', url: imgUrl })),
    ...videos.map(vUrl => ({ type: 'video', url: vUrl }))
  ], [displayImages, videos]);

  const handleImageClick = useCallback((index: number) => {
    if (mediaItems[index]?.type === 'video') { setCurrentImageIndex(index); }
    else { setModalState({ open: true, startIndex: index }); }
  }, [mediaItems]);

  const showTemporaryToast = useCallback(() => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const imgUrl = (mediaItems[currentImageIndex] || mediaItems[0] || { url: '' }).url;
    const link = window.location.href;
    const title = property?.title || document.title;
    await shareProperty(imgUrl, title, link, showTemporaryToast);
  };

  const handleSave = (e: React.MouseEvent) => { e.stopPropagation(); setIsSaved(!isSaved); showTemporaryToast(); };
  const activeMedia = mediaItems[currentImageIndex] || mediaItems[0] || { type: 'image', url: '' };
  const handleMainImageClick = useCallback(() => { if (activeMedia.type !== 'video') handleImageClick(currentImageIndex); }, [activeMedia.type, currentImageIndex, handleImageClick]);
  const handleCloseModal = useCallback(() => setModalState(prev => ({ ...prev, open: false })), []);
  const handleSidebarClick = useCallback(() => { if (videos.length > 0) setCurrentImageIndex(mediaItems.length - 1); else handleImageClick(1); }, [videos.length, mediaItems.length, handleImageClick]);
  const handleViewMoreClick = useCallback(() => handleImageClick(2), [handleImageClick]);

  return (
    <>
      <div className="gallery-container">
        <div className="main-image-wrapper" onClick={handleMainImageClick}>
          {activeMedia.type === 'video' ? (
            <video src={activeMedia.url} className="main-image" controls autoPlay muted playsInline />
          ) : (
            <img src={activeMedia.url} alt={t('property.gallery.property')} className="main-image" loading="lazy" />
          )}
          {!isMobile && (
            <div className="cover-image-label">
              {activeMedia.type === 'video' ? t('property.gallery.videoTour') : t('property.gallery.coverImage')}
            </div>
          )}
          {isMobile && property?.rera_id && (
            <div className="rera-badge-capsule">
              <div className="rera-check-circle"><Check size={12} strokeWidth={4} /></div>
              <span className="rera-label">{t('property.gallery.rera')}</span>
            </div>
          )}
          {!isMobile && (
            <div className="desktop-action-btns">
              <button className="desktop-share-btn" onClick={handleShare}><Share2 size={16} />{t('property.gallery.share')}</button>
              <button className={`desktop-save-btn ${isSaved ? 'desktop-save-btn--saved' : ''}`} onClick={handleSave}>
                <Heart size={16} fill={isSaved ? COLORS.error.DEFAULT : 'none'} stroke={isSaved ? COLORS.error.DEFAULT : 'currentColor'} />
                {isSaved ? t('property.gallery.saved') : t('property.gallery.save')}
              </button>
            </div>
          )}
          {isMobile && (
            <div className="prop-gallery-actions-unique">
              <button className="prop-gallery-action-btn-unique" onClick={handleShare} aria-label={t('property.gallery.shareBtn')}><Share2 size={32} strokeWidth={2.5} /></button>
              <button className="prop-gallery-action-btn-unique" onClick={handleSave} aria-label={t('property.gallery.saveBtn')}>
                <Heart size={32} strokeWidth={2.5} fill={isSaved ? COLORS.error.DEFAULT : 'none'} stroke={isSaved ? COLORS.error.DEFAULT : COLORS.gray[600]} />
              </button>
            </div>
          )}
          {isMobile && activeMedia.type !== 'video' && (
            <div className="tap-overlay"><span>{t('property.gallery.tapToSeeAll')}</span></div>
          )}
          <div className="image-count-badge"><ImageIcon size={14} /><span>{displayImages.length}</span></div>
        </div>
        <div className="sidebar-images-desktop">
          <div className="sidebar-img-container" onClick={handleSidebarClick}>
            <img src={displayImages[1] || displayImages[0]} alt={t('property.gallery.sideImage')} className="sidebar-img-wrapper" loading="lazy" />
            <div className="play-overlay"><Play size={32} fill={COLORS.white} /></div>
          </div>
          <div className="view-more-wrapper" onClick={handleViewMoreClick}>
            <img src={displayImages[2] || displayImages[0]} alt={t('property.gallery.sideImage')} className="view-more-img" loading="lazy" />
            <div className="view-more-overlay">
              <span className="view-more-text">
                +{displayImages.length > 3 ? `${displayImages.length - 2} ${t('property.gallery.more')}` : t('property.gallery.viewMore')}
              </span>
            </div>
          </div>
        </div>
      </div>
      {property && (
        <ImageGalleryModal isOpen={modalState.open} onClose={handleCloseModal} property={property} initialImageIndex={modalState.startIndex} />
      )}
    </>
  );
};

export default ImageGallery;
