/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useParams } from 'react-router-dom';
import { Loader, Info, ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';
import useIsMobile from '../../hooks/useIsMobile';
import ImageGalleryModal from '../../Components/ImageGalleryModal/ImageGalleryModal';
import PropertyHeader from '../../Components/property/PropertyHeader';
import PropertyOverview from '../../Components/property/PropertyOverview';
import PropertyTabs from '../../Components/property/PropertyTabs';
import ImageGallery from '../../Components/property/ImageGallery';
import ContactCard from '../../Components/property/ContactCard';
import PropertyListings from '../../Components/property/CardsDetails/PropertyListings';
import AmenitiesSpecs from '../../Components/property/AmenitiesSpecs';
import OverviewItem from '../../Components/property/Overview/OverviewItem';
import NearbyPlaces from '../../Components/property/Overview/NearbyPlaces';
import PdfThumbnail from '../../Components/property/PdfThumbnail';
import { Car, Home, Building2, ShieldCheck, CheckCircle2, Share2, Heart, Bookmark } from 'lucide-react';
import { CityProperty } from '../../services/services';
import { ApiConstants } from '../../constants/ApiConstants';
import { ApiEndPoints } from '../../constants/ApiEndpoints';
import './PropertyDetailPage.css';

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

const PropertyDetailPage = () => {
  const [heroModalOpen, setHeroModalOpen] = React.useState(false);
  const [heroStartIndex, setHeroStartIndex] = React.useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [property, setProperty] = useState<CityProperty | null>(null);
  const [allTownshipProperties, setAllTownshipProperties] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [townshipName, setTownshipName] = useState<string>('');
  const [townshipData, setTownshipData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const { id } = useParams();

  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<any>(null);

  const loadProperty = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      // Use the id from the URL as the townshipId
      const tId = id || '9';

      // Fetch all properties from the specific township API
      const url = `${ApiConstants.API_BASE_URL}${ApiEndPoints.TOWNSHIP_PROPERTIES_FULL(Number(tId))}`;

      const response = await fetch(url, {
        headers: ApiConstants.HEADERS
      });

      if (!response.ok) {
        throw new Error('Failed to fetch properties: ' + response.status);
      }

      const result = await response.json();

      // Normalize API data: extract value from {key, value} objects and add camelCase aliases
      const normalizeData = (data: any): any => {
        if (!data || typeof data !== 'object') return data;
        const out: any = {};
        for (const [k, v] of Object.entries(data)) {
          if (v && typeof v === 'object' && 'value' in v && !Array.isArray(v)) {
            out[k] = v.value;
            if ((v as any).image) {
              out[`${k}_image`] = (v as any).image;
            }
          } else {
            out[k] = v;
          }
        }
        // Add camelCase aliases for display-name keys
        const keyMap: Record<string, string> = {
          'Avg. Price': 'avg_price',
          'Area Unit': 'area_unit',
          'Configurations': 'configurations',
          'Land Area': 'land_area',
          'Launch Date': 'launch_date',
          'Possession Starts': 'possession_starts',
          'Project Area': 'project_area',
          'Property Count': 'property_count',
          'RERA ID': 'rera_id',
          'Total Units': 'total_units',
          'Sizes': 'sizes',
          'name': 'name',
          'description': 'description',
          'location': 'location',
          'city': 'city',
          'latitude': 'latitude',
          'longitude': 'longitude',
        };
        for (const [displayKey, camelKey] of Object.entries(keyMap)) {
          if (displayKey in out) {
            out[camelKey] = out[displayKey];
          }
          if (`${displayKey}_image` in out) {
            out[`${camelKey}_image`] = out[`${displayKey}_image`];
          }
        }
        return out;
      };

      const normalizedData = normalizeData(result.data) || {};
      const properties: any[] = normalizedData.properties || [];
      setTownshipName(normalizedData.name || '');
      setTownshipData(normalizedData || null);
      setAllTownshipProperties(properties);

      // Find the specific property by ID
      let propertyData = properties.find((p: any) => String(p.property_id) === id);

      // Fallback: If not found by ID, just take the first property from the list
      if (!propertyData && properties.length > 0) {
        propertyData = properties[0];
      }

      // Ultimate Fallback: If still no propertyData (e.g. township has no properties yet),
      // we create a virtual propertyData shell so the township detail page still loads beautifully!
      if (!propertyData && result.success && result.data) {
        propertyData = {
          property_id: Number(id),
          title: normalizedData.name || '',
          image: (normalizedData.images && normalizedData.images[0]) || normalizedData.image || '',
          description: normalizedData.description || '',
          location: normalizedData.location || '',
          price: normalizedData.avg_price || 'Contact us',
          amenities: [],
          places: [],
          specifications: []
        };
      }

      if (propertyData) {
        // Transform API data to match CityProperty interface
        // Prioritize top-level township data (normalizedData) over property-specific data
        const topLevelData = normalizedData || {};

        // Extract key_values into a flat dictionary for easy access
        const kvMap = propertyData.key_values?.reduce((acc: any, kv: any) => {
          acc[kv.key] = kv.value;
          if (kv.key) {
            acc[kv.key.toLowerCase()] = kv.value;
          }
          return acc;
        }, {}) || {};

        // Calculate a fallback area from Size/Sq Yds if needed
        const fallbackArea = parseFloat(String(kvMap['Sq Yds'] || kvMap['Size'] || '0').replace(/[^0-9.]/g, '')) || 0;

        // Parse PDF values dynamically (from topLevelData, propertyData, or key_values)
        let pdfVal = topLevelData.pdf || propertyData.pdf || kvMap['pdf'];
        let pdfArray: string[] = [];
        if (pdfVal) {
          if (Array.isArray(pdfVal)) {
            pdfArray = pdfVal;
          } else if (typeof pdfVal === 'string') {
            try {
              if (pdfVal.trim().startsWith('[')) {
                pdfArray = JSON.parse(pdfVal);
              } else {
                pdfArray = [pdfVal];
              }
            } catch {
              pdfArray = [pdfVal];
            }
          }
        }

        const transformedProperty: CityProperty = {
          id: propertyData.property_id,
          title: topLevelData.name || propertyData.title,
          price: topLevelData.avg_price || propertyData.price || kvMap['Price'] || '0',
          image_url: (topLevelData.images && topLevelData.images[0]) || propertyData.image || '',
          description: topLevelData.description || propertyData.description || kvMap['Description'] || '',
          location: topLevelData.location || propertyData.location,
          propertyType: topLevelData.configurations || propertyData.property_type || kvMap['Configuration'] || kvMap['Property Type'],
          bhk: propertyData.bhk || kvMap['Bhk'],
          area_sqft: propertyData.area_sqft || fallbackArea,
          raw_price: parseFloat(propertyData.price || kvMap['Price']) || 0,
          area: topLevelData.project_area || String(propertyData.area_sqft || fallbackArea),
          size: topLevelData.sizes || propertyData.size || kvMap['Dimension'] || kvMap['Size'],
          project_size: topLevelData.project_size || propertyData.project_size || kvMap['Project Size'],
          launch_date: topLevelData.launch_date || propertyData.launch_date || kvMap['Launch Date'],
          rera_id: topLevelData.rera_id || propertyData.rera_id || kvMap['RERA ID'],
          construction_type: propertyData.construction_type || kvMap['Construction Type'],
          construction_status: propertyData.construction_status || kvMap['Construction Status'],
          possession_starts: topLevelData.possession_starts || propertyData.possession_starts,
          latitude: topLevelData.latitude || propertyData.latitude,
          longitude: topLevelData.longitude || propertyData.longitude,
          area_unit: topLevelData.area_unit,
          configurations: topLevelData.configurations,
          property_count: topLevelData.property_count,
          sizes: topLevelData.sizes,
          avg_price: topLevelData.avg_price,
          land_area: topLevelData.land_area,
          total_units: topLevelData.total_units,
          area_unit_image: topLevelData.area_unit_image,
          avg_price_image: topLevelData.avg_price_image,
          configurations_image: topLevelData.configurations_image,
          land_area_image: topLevelData.land_area_image,
          launch_date_image: topLevelData.launch_date_image,
          possession_starts_image: topLevelData.possession_starts_image,
          project_area_image: topLevelData.project_area_image,
          property_count_image: topLevelData.property_count_image,
          rera_id_image: topLevelData.rera_id_image,
          total_units_image: topLevelData.total_units_image,
          sizes_image: topLevelData.sizes_image,
          city_image: topLevelData.city_image,
          image: (topLevelData.images && topLevelData.images[0]) || propertyData.image || '',
          images: (topLevelData.images && topLevelData.images.length > 0)
            ? topLevelData.images
            : properties.flatMap((p: any) => p.images || (p.image ? [p.image] : [])),
          allImages: (topLevelData.images && topLevelData.images.length > 0)
            ? topLevelData.images
            : properties.flatMap((p: any) => p.images || (p.image ? [p.image] : [])),
          amenities: (topLevelData.mapped_amenities && topLevelData.mapped_amenities.length > 0)
            ? topLevelData.mapped_amenities.map((a: any) => ({
              amenity_id: a.amenity_id || a.id || 0,
              amenity_name: a.value || a.name || a.amenity_name || '',
              iconUrl: a.icon?.value || a.iconUrl || undefined
            }))
            : (propertyData.amenities?.map((a: any) => ({
              amenity_id: a.amenity_id || a.id || 0,
              amenity_name: a.value || a.amenity_name || a.name || '',
              iconUrl: a.icon?.value || a.iconUrl || undefined
            })) || []),
          places: (topLevelData.nearby_places && topLevelData.nearby_places.length > 0)
            ? topLevelData.nearby_places.map((p: any) => ({
              place_id: p.place_id || p.id || 0,
              place_name: p.name || p.place_name || '',
              place_category: p.category || p.place_category || '',
              distance_meters: String(p.distance || p.distance_meters || 0),
              iconUrl: p.icon || p.iconUrl || ''
            }))
            : (propertyData.places?.map((p: any) => ({
              place_id: p.place_id || p.id || 0,
              place_name: p.name || p.place_name || '',
              place_category: p.place_category || p.category || '',
              distance_meters: String(p.distance_meters || p.distance || 0),
              iconUrl: p.icon || p.iconUrl || ''
            })) || []),
          specifications: (topLevelData.mapped_specifications && Object.keys(topLevelData.mapped_specifications).length > 0)
            ? topLevelData.mapped_specifications
            : propertyData.specifications || [],
          overview: propertyData.overview || propertyData.key_values?.reduce((acc: any, kv: any) => {
            acc[kv.key] = kv.value;
            return acc;
          }, {}) || {},
          verified: true,
          tag: '',
          video: topLevelData.video || propertyData.video,
          pdf: pdfArray,
          additionalDetails: normalizedData["Additional Details"] || propertyData["Additional Details"] || [],
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
  }, [id]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  useEffect(() => {
    // Reset body style overflow and remove modal open classes when this page detail mounts/updates
    document.body.style.overflow = "";
    document.body.classList.remove('gallery-modal-open');
    window.scrollTo(0, 0);
  }, [id, loading]);

  useEffect(() => {
    if (property) {
      const saved = Cookies.get("wishlist");
      if (saved) {
        try {
          const wishlistIds: number[] = JSON.parse(saved);
          setIsLiked(wishlistIds.includes(property.id));
        } catch (e) {
          console.error("Failed to parse wishlist cookie", e);
        }
      }
    }
  }, [property]);

  const isMobile = useIsMobile();

  const scrollToMobileSection = (sectionId: string, tabName: string) => {
    setActiveTab(tabName);
    const element = document.getElementById(sectionId);
    if (element) {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    } else {
      // Fallback for missing sections
      if (tabName === 'location') {
        const mapBtn = document.querySelector('.view-map-btn');
        if (mapBtn) {
          mapBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  // Intersection Observer to automatically update activeTab on scroll on mobile
  useEffect(() => {
    if (!isMobile || !property) return;

    const sectionIds = [
      { id: 'mobile-overview-section', tab: 'overview' },
      { id: 'mobile-amenities-section', tab: 'amenities' },
      { id: 'mobile-specs-section', tab: 'specs' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const match = sectionIds.find(s => s.id === targetId);
          if (match) {
            setActiveTab(match.tab);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile, property]);

  // Scroll active tab button horizontally into center view when activeTab changes
  useEffect(() => {
    if (!isMobile) return;
    const activeBtn = document.querySelector('.md3-tab-btn.active') as HTMLElement;
    const container = document.querySelector('.md3-tabs-container') as HTMLElement;
    if (activeBtn && container) {
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: btnOffsetLeft - containerWidth / 2 + btnWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [activeTab, isMobile]);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-content">
          <Loader className="loader-spinner" />
          <p className="loading-text">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="error-wrapper-premium">
        <div className="error-content-premium">
          <div className="lottie-container-premium">
            <DotLottieReact
              src="https://assets-v2.lottiefiles.com/a/358e0c5e-1176-11ee-8663-8f76e1809294/JmwXG8XzU7.lottie"
              style={{ width: '220px', height: '220px', margin: '0 auto' }}
              loop
              autoplay
            />
          </div>
          <h2 className="error-title-premium">Failed to load property details</h2>
          <p className="error-subtitle-premium">
            {error || 'The property you are looking for is temporarily unavailable or does not exist.'}
          </p>
          <button
            onClick={loadProperty}
            className="error-back-btn-premium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const toggleLike = () => {
    if (!property) return;
    const saved = Cookies.get("wishlist");
    let wishlistIds: number[] = [];
    if (saved) {
      try {
        wishlistIds = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse wishlist cookie", e);
      }
    }

    let updated;
    if (wishlistIds.includes(property.id)) {
      updated = wishlistIds.filter((item) => item !== property.id);
      setIsLiked(false);
    } else {
      updated = [...wishlistIds, property.id];
      setIsLiked(true);
    }
    Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
  };

  const pricePerSqft = property.area_sqft ? Math.round(property.raw_price! / property.area_sqft) : 0;
  const emiApprox = Math.round(property.raw_price! / 200);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'specs', label: 'Specs' },
  ];

  const headerData = {
    name: property.title,
    builder: property.builder || '',
    location: property.location,
    type: property.propertyType,
    area: property.area,
    rating: property.bhk,
    possession: property.possession_starts || property.construction_status || 'Ready to Move',
    rera_id: property.rera_id || '',
    price: {
      min: property.raw_price || 0,
      max: property.raw_price || 0,
      perSqft: pricePerSqft,
      emi: emiApprox,
      display: property.avg_price
    }
  };

  if (isMobile) {
    const toggleAllUnits = () => {
      setAllExpanded(!allExpanded);
      const units = document.querySelectorAll('.md3-unit-detail');
      units.forEach((unit: any) => {
        unit.open = !allExpanded;
      });
    };

    // Hero share handler
    const handleHeroShare = async () => {
      if (!property) return;
      const link = window.location.href;
      const propertyTitle = property.title || 'LandMaark';
      const shareText = `Hi there, 👋\nCheck out this beautiful property which I have found on LandMaark. Could you take a quick look and connect if interested?: ${propertyTitle}\n${link}`;

      try {
        let shared = false;
        const imageUrl = property.image_url || property.images?.[0];

        // Try file sharing if image is available and canShare is supported
        if (imageUrl && navigator.canShare) {
          try {
            const blob = await fetchImageAsBlob(imageUrl);
            if (blob) {
              const contentType = blob.type || 'image/jpeg';
              const extension = contentType.split('/')[1] || 'jpg';
              const file = new File([blob], `property_${property.id}.${extension}`, { type: contentType });

              const shareData = {
                files: [file],
                title: propertyTitle,
                text: shareText
              };

              if (navigator.canShare(shareData as ShareData)) {
                await navigator.share(shareData as ShareData);
                shared = true;
              }
            }
          } catch (fileErr) {
            console.warn('Could not share image file, falling back to text-only share', fileErr);
          }
        }

        // Fallback to text-only share if file share didn't happen
        if (!shared) {
          if (navigator.share) {
            await navigator.share({
              title: propertyTitle,
              text: shareText
            });
          } else {
            await navigator.clipboard.writeText(shareText);
            alert('Link and description copied to clipboard!');
          }
        }
      } catch (err) {
        console.error('Share failed', err);
        // Direct clipboard copy fallback
        try {
          await navigator.clipboard.writeText(shareText);
          alert('Link and description copied to clipboard!');
        } catch (clipErr) {
          console.error('Clipboard copy failed', clipErr);
        }
      }
    };

    return (
      <div className="md3-mobile-view">
        <main className="md3-main-content">

          {/* Hero Section */}
          <section className="md3-hero" onClick={() => { setHeroModalOpen(true); setHeroStartIndex(0); }} style={{ cursor: 'pointer' }}>
            <img alt="Hero" src={property.images?.[0] || property.image_url || 'https://via.placeholder.com/600x400'} />
            <div className="md3-badge-rera">
              <CheckCircle2 size={12} strokeWidth={2.5} />
              <span>RERA</span>
            </div>
            <div className="md3-hero-actions" style={{ zIndex: 10 }}>
              <button
                className="md3-hero-action-btn"
                style={{ zIndex: 10, color: 'var(--md-sys-color-on-surface-variant)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeroShare();
                }}
              >
                <Share2 size={28} stroke="currentColor" strokeWidth={2} fill="none" />
              </button>
              <button
                className="md3-hero-action-btn"
                style={{ zIndex: 10, color: isLiked ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-on-surface-variant)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
              >
                <Heart size={28} stroke="currentColor" strokeWidth={2} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="md3-image-count">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>image</span>
              <span>{property.images?.length || 1}</span>
            </div>
          </section>
          {property && (
            <ImageGalleryModal
              isOpen={heroModalOpen}
              onClose={() => setHeroModalOpen(false)}
              property={property}
              initialImageIndex={heroStartIndex}
            />
          )}

          {/* Property Header Section (Matches screenshot) */}
          <section className="md3-section" style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
            {/* Badges Row */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
              <span style={{
                backgroundColor: '#374151',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '20px',
                letterSpacing: '0.3px'
              }}>
                Zero Brokerage
              </span>
              {property.rera_id && (
                <span style={{
                  border: '1px solid #e5e7eb',
                  color: '#4b5563',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#fff'
                }}>
                  <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '15px', fontWeight: 'bold' }}>check_circle</span>
                  RERA
                </span>
              )}
            </div>

            {/* Title & Location */}
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                margin: '0 0 4px 0',
                lineHeight: '1.2'
              }}>
                {property.title}
              </h1>

              {/* Location subtitle */}
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 12px 0',
                fontWeight: '500'
              }}>
                {typeof property.location === 'object' && property.location !== null
                  ? ((property.location as any).value || (property.location as any).location || '')
                  : String(property.location)}
              </p>
            </div>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px', fontWeight: '600', lineHeight: '28px', color: '#111827' }}>
                {property.avg_price || 'Contact'}
              </span>
              {pricePerSqft > 0 && (
                <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                  (₹{pricePerSqft >= 1000 ? `${(pricePerSqft / 1000).toFixed(0)} K` : pricePerSqft}/sq.ft)
                </span>
              )}
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#9ca3af', cursor: 'pointer', marginLeft: '2px' }}>
                info
              </span>
            </div>

            {/* BHK / Configuration Subtitle */}
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0,
              fontWeight: '500'
            }}>
              ({property.bhk ? `${property.bhk} BHK ` : ''}{property.propertyType || 'Apartment'})
            </p>
          </section>

          {/* Nearby Places Section */}
          <section className="md3-section" style={{ marginTop: '24px' }}>
            <NearbyPlaces places={property.places} />
          </section>



          {/* Navigation Tabs */}
          <nav className="md3-tabs-nav">
            <div className="md3-tabs-container md3-hide-scrollbar">
              <button
                className={`md3-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => scrollToMobileSection('mobile-overview-section', 'overview')}
              >Overview</button>
              <button
                className={`md3-tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
                onClick={() => scrollToMobileSection('mobile-amenities-section', 'amenities')}
              >Amenities</button>
              <button
                className={`md3-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => scrollToMobileSection('mobile-specs-section', 'specs')}
              >Specs</button>
            </div>
          </nav>



          {/* Township Overview (Top Amenities placeholder converted) */}
          <section id="mobile-overview-section" className="md3-section">
            <h3 className="md3-headline" style={{ paddingTop: '1rem' }}>Township Overview</h3>
            <div className="md3-quick-info-grid">
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.area_unit_image ? (
                    <img src={property.area_unit_image} alt="Area Unit" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>straighten</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Area Unit</p>
                  <p className="md3-info-value-sm">{property.area_unit || 'sq. yd.'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.avg_price_image ? (
                    <img src={property.avg_price_image} alt="Avg. Price" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>trending_up</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Avg. Price</p>
                  <p className="md3-info-value-sm">{property.avg_price || 'Contact'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.configurations_image ? (
                    <img src={property.configurations_image} alt="Configurations" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>home</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Configurations</p>
                  <p className="md3-info-value-sm">{property.configurations || property.propertyType || 'Plots'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.launch_date_image ? (
                    <img src={property.launch_date_image} alt="Launch Date" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>event</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Launch Date</p>
                  <p className="md3-info-value-sm">{property.launch_date || 'TBA'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.possession_starts_image ? (
                    <img src={property.possession_starts_image} alt="Possession Starts" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>apartment</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Possession Starts</p>
                  <p className="md3-info-value-sm">{property.possession_starts || 'TBA'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.project_area_image ? (
                    <img src={property.project_area_image} alt="Project Area" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>grid_view</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Project Area</p>
                  <p className="md3-info-value-sm">{property.area || 'N/A'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.land_area_image ? (
                    <img src={property.land_area_image} alt="Land Area" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>square_foot</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Land Area</p>
                  <p className="md3-info-value-sm">{property.land_area || 'N/A'}</p>
                </div>
              </div>
              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.property_count_image ? (
                    <img src={property.property_count_image} alt="Property Count" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>bar_chart</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">Property Count</p>
                  <p className="md3-info-value-sm">{property.property_count || '0'}</p>
                </div>
              </div>

              <div className="md3-info-card">
                <div className="md3-info-icon-wrapper">
                  {property.rera_id_image ? (
                    <img src={property.rera_id_image} alt="RERA ID" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>tag</span>
                  )}
                </div>
                <div>
                  <p className="md3-info-label">RERA ID</p>
                  <p className="md3-info-value-sm">{property.rera_id || 'N/A'}</p>
                </div>
              </div>
            </div>


          </section>

          {/* Top Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <section id="mobile-amenities-section" className="md3-amenities-section">
              <h3 className="md3-headline">Top Amenities</h3>
              <div className="md3-amenities-grid">
                {(showAllAmenities ? property.amenities : property.amenities.slice(0, 5)).map((amenity: any, idx: number) => (
                  <div key={idx} className="md3-amenity-item">
                    <div className="md3-amenity-icon-wrapper">
                      {amenity.iconUrl ? (
                        <img src={amenity.iconUrl} alt={amenity.amenity_name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                      ) : (
                        <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>star</span>
                      )}
                    </div>
                    <span className="md3-amenity-label">{amenity.amenity_name}</span>
                  </div>
                ))}
                {!showAllAmenities && property.amenities.length > 5 && (
                  <div
                    className="md3-amenity-item"
                    onClick={() => setShowAllAmenities(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="md3-amenity-icon-wrapper md3-amenity-action-btn">
                      <span style={{ fontWeight: 700, fontSize: '12px' }}>
                        +{property.amenities.length - 5}
                      </span>
                    </div>
                    <span className="md3-amenity-label" style={{ color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>More</span>
                  </div>
                )}
                {showAllAmenities && property.amenities.length > 5 && (
                  <div
                    className="md3-amenity-item"
                    onClick={() => setShowAllAmenities(false)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="md3-amenity-icon-wrapper md3-amenity-action-btn">
                      <ChevronUp size={24} />
                    </div>
                    <span className="md3-amenity-label" style={{ color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>Less</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Specifications */}
          {(() => {
            const mobileGroupedSpecs: Record<string, Array<{ key: string; value: string; iconUrl?: string }>> = {};

            if (property.specifications) {
              if (Array.isArray(property.specifications)) {
                mobileGroupedSpecs['General'] = property.specifications.map((item: any) => ({
                  key: item.name || item.key || item.label || 'Feature',
                  value: item.value || 'Not specified',
                  iconUrl: typeof item.icon === 'object' && item.icon !== null
                    ? item.icon.value
                    : (typeof item.icon === 'string' ? item.icon : item.iconUrl || undefined)
                }));
              } else if (typeof property.specifications === 'object' && property.specifications !== null) {
                const isGrouped = Object.values(property.specifications).some(val => Array.isArray(val));
                if (isGrouped) {
                  Object.entries(property.specifications).forEach(([category, group]: [string, any]) => {
                    if (Array.isArray(group)) {
                      mobileGroupedSpecs[category] = group.map((item: any) => ({
                        key: item.name || item.key || item.label || 'Feature',
                        value: item.value || 'Not specified',
                        iconUrl: typeof item.icon === 'object' && item.icon !== null
                          ? item.icon.value
                          : (typeof item.icon === 'string' ? item.icon : item.iconUrl || undefined)
                      }));
                    }
                  });
                } else {
                  mobileGroupedSpecs['General'] = Object.entries(property.specifications).map(([key, value]) => ({
                    key: key,
                    value: String(value),
                  }));
                }
              }
            }

            const hasMobileSpecs = Object.keys(mobileGroupedSpecs).length > 0 &&
              Object.values(mobileGroupedSpecs).some(arr => arr.length > 0);

            if (!hasMobileSpecs) return null;

            return (
              <section id="mobile-specs-section" className="md3-section" style={{ marginTop: '24px' }}>
                <h3 className="md3-headline">Specifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Object.entries(mobileGroupedSpecs).map(([key, specsArray], idx: number) => (
                    <details key={idx} className="md3-accordion">
                      <summary className="md3-accordion-header" style={{ listStyle: 'none' }}>
                        <span className="md3-accordion-title">{key}</span>
                        <ChevronDown className="md3-chevron" size={24} />
                      </summary>
                      <div className="md3-accordion-content" style={{ display: 'block', paddingTop: '1rem' }}>
                        {specsArray.map((spec: any, sIdx: number) => {
                          return (
                            <div key={sIdx} className="md3-spec-item">
                              <div className="md3-spec-icon-wrapper">
                                {spec.iconUrl ? (
                                  <img src={spec.iconUrl} alt={spec.key} />
                                ) : (
                                  <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)', fontSize: '20px' }}>star</span>
                                )}
                              </div>
                              <div className="md3-spec-text">
                                <span className="md3-spec-key">{spec.key}</span>
                                <span className="md3-spec-value">{spec.value}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })()}
          {/* Property Units */}
          {allTownshipProperties && allTownshipProperties.length > 0 && (
            <section className="md3-section">
              <h3 className="md3-headline" style={{ marginBottom: '8px' }}>Property Units</h3>
              <div className="md3-units-header">
                <p className="md3-unit-count">{property.title} ({allTownshipProperties.length})</p>
                <button className="md3-expand-btn" onClick={toggleAllUnits}>
                  <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
                  {allExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              <div>
                {allTownshipProperties.map((unit: any, idx: number) => {
                  const kvMap = unit.key_values?.reduce((acc: any, kv: any) => {
                    acc[kv.key] = kv.value;
                    return acc;
                  }, {}) || {};

                  const isAvailable = unit.status?.toLowerCase() !== 'sold out' && unit.status?.toLowerCase() !== 'sold';
                  const plotName = kvMap['Plot'] || unit.title || `Plot ${idx + 1}`;
                  const sizeStr = kvMap['Sq Yds'] || unit.area_sqft || 'N/A';
                  const priceStr = kvMap['Price'] || unit.price || 'Contact';
                  const facingStr = kvMap['Facing'] || 'N/A';

                  return (
                    <details key={idx} className="md3-unit-detail unit-detail">
                      <summary className="md3-unit-summary">
                        <div className="md3-unit-summary-left">
                          <div className="md3-unit-badge">{plotName}</div>
                          <span className="md3-unit-size">{sizeStr} Sq Yds</span>
                        </div>
                        <ChevronDown className="md3-chevron" size={24} />
                      </summary>
                      <div className="md3-unit-content">
                        <div className="md3-unit-grid">
                          {(unit.key_values || [])
                            .filter((kv: any) => kv.key !== 'ID')
                            .map((kv: any, kvIdx: number) => {
                              const isStatus = kv.key === 'Construction Status' || kv.key === 'Availability';
                              const statusVal = String(kv.value).toLowerCase();
                              const isAvail = statusVal === 'available';
                              const isSold = statusVal === 'sold out' || statusVal === 'sold';
                              return (
                                <div key={kvIdx}>
                                  <p className="md3-unit-meta-label">{kv.key}</p>
                                  <p className={`md3-unit-meta-val ${isStatus ? (isAvail ? 'md3-status-avail' : isSold ? 'md3-status-sold' : '') : ''}`}>
                                    {kv.value}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          )}

          {/* Brochures */}
          {property.pdf && property.pdf.length > 0 && (
            <section className="md3-section">
              <h3 className="md3-headline">Download Brochures</h3>
              {property.pdf.map((pdfUrl: string, idx: number) => {
                const fileName = pdfUrl.split('/').pop() || `Brochure_${idx + 1}.pdf`;
                return (
                  <div key={idx} className="md3-brochure-card" style={{ marginBottom: '1rem' }}>
                    <div className="md3-brochure-preview">
                      <PdfThumbnail url={pdfUrl} />
                      <div className="md3-brochure-overlay">
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="md3-brochure-btn view">
                          <Eye size={16} />
                          <span>View</span>
                        </a>
                        <a href={pdfUrl} download className="md3-brochure-btn download">
                          <Download size={16} />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                    <div className="md3-brochure-info">
                      <p className="md3-brochure-title">{fileName}</p>
                      <p className="md3-brochure-size">PDF BROCHURE</p>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </main>



        {/* Contact Form Modal */}
        {contactModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setContactModalOpen(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '450px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setContactModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  zIndex: 10,
                }}
              >
                &times;
              </button>
              <div style={{ padding: '0.5rem' }}>
                <ContactCard />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop View (Redesigned to match reference)
  return (
    <div className="property-detail-container desktop-padding">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-desktop">
        <span>Home</span>
        <span className="breadcrumb-separator">/</span>
        <span>{property.location.split(',').pop()?.trim() || 'Location'}</span>
        <span className="breadcrumb-separator">/</span>
        <span>{property.location.split(',')[0].trim()}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{property.title}</span>
      </div>

      <PropertyHeader property={headerData} />

      <div className="gallery-section-desktop">
        <ImageGallery images={property.images} propertyId={property.id} property={property} />
      </div>

      {/* Feature Highlights Grid */}
      <div className="feature-highlights-desktop">
        <div className="feature-item">
          <p className="feature-value">{property.configurations || property.propertyType || 'N/A'}</p>
          <p className="feature-label">Configurations</p>
        </div>

        <div className="feature-item">
          <p className="feature-value">{property.avg_price || 'Contact'}</p>
          <p className="feature-label">Avg. Price</p>
        </div>
        <div className="feature-item">
          <p className="feature-value">{property.area || 'N/A'}</p>
          <p className="feature-label">Project Area</p>
        </div>
      </div>

      <div className="desktop-content-grid">
        <div className="desktop-main-content">
          <NearbyPlaces places={property.places} />
          <PropertyTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            property={property}
            pricePerSqft={pricePerSqft}
          />
        </div>
        <div className="desktop-sidebar">
          <ContactCard />
          <div className="sidebar-ad-placeholder">
            {/* Additional sidebar content can go here */}
          </div>
        </div>
      </div>

      <div className="full-width-sections">
        <PropertyOverview property={property} pricePerSqft={pricePerSqft} townshipName={townshipName} townshipData={townshipData} />
        <AmenitiesSpecs property={property} />

        {/* Desktop Additional Details Section */}
        {property.additionalDetails && property.additionalDetails.length > 0 && (
          <div className="tab-content-card additional-details-section" style={{ marginTop: '0.75rem' }}>
            <h2 className="section-title">
              <span className="title-underline">Additional Details</span>
            </h2>
            <div className="items-grid">
              {property.additionalDetails.map((detail: any, idx: number) => (
                <OverviewItem
                  key={idx}
                  label={detail.key}
                  value={detail.value}
                  icon={Info}
                />
              ))}
            </div>
          </div>
        )}

        <PropertyListings initialData={allTownshipProperties} townshipId={id} townshipName={townshipName} pdf={property.pdf} />
      </div>
    </div>
  );
}

export default PropertyDetailPage;
