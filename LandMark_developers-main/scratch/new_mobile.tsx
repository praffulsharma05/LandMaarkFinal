// scratch/new_mobile.tsx - Contains only the if (isMobile) block replacement

if (isMobile) {
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleAllUnits = () => {
    setAllExpanded(!allExpanded);
    const units = document.querySelectorAll('.md3-unit-detail');
    units.forEach((unit: any) => {
      unit.open = !allExpanded;
    });
  };

  return (
    <div className="md3-mobile-view">
      <main className="md3-main-content">
        {/* Hero Section */}
        <section className="md3-hero">
          <img alt="Hero" src={property.images?.[0] || property.image_url || 'https://via.placeholder.com/600x400'} />
          <div className="md3-badge-rera">
            <CheckCircle2 size={12} strokeWidth={2.5} />
            <span>RERA</span>
          </div>
          <div className="md3-hero-actions">
            <button className="md3-hero-action-btn">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="md3-hero-action-btn">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div className="md3-image-count">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>image</span>
            <span>{property.images?.length || 1}</span>
          </div>
        </section>


        {/* Navigation Tabs */}
        <nav className="md3-tabs-nav">
          <div className="md3-tabs-container md3-hide-scrollbar">
            <button
              className={`md3-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >Overview</button>
            <button
              className={`md3-tab-btn ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => setActiveTab('amenities')}
            >Amenities</button>
            <button
              className={`md3-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >Specs</button>

          </div>
        </nav>

        {/* Nearby Places */}
        {property.places && property.places.length > 0 && (
          <section className="md3-section" style={{ marginTop: '24px' }}>
            <h4 className="md3-headline">
              <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>near_me</span>
              Nearby Places
            </h4>
            <div className="md3-carousel md3-hide-scrollbar">
              {property.places.map((place: any, index: number) => (
                <div key={index} className="md3-place-card">
                  <div className="md3-place-left">
                    <div className="md3-info-icon-wrapper">
                      <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>
                        {place.place_category?.toLowerCase().includes('school') || place.place_category?.toLowerCase().includes('college') ? 'school' :
                          place.place_category?.toLowerCase().includes('hospital') ? 'medical_services' :
                            place.place_category?.toLowerCase().includes('bus') ? 'directions_bus' : 'location_on'}
                      </span>
                    </div>
                    <div>
                      <p className="md3-place-name">{place.place_name}</p>
                    </div>
                  </div>
                  <p className="md3-place-dist">{place.distance_meters}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Township Overview (Top Amenities placeholder converted) */}
        <section className="md3-section">
          <h3 className="md3-headline" style={{ paddingTop: '1rem' }}>Township Overview</h3>
          <div className="md3-quick-info-grid">
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>straighten</span>
              </div>
              <div>
                <p className="md3-info-label">Area Unit</p>
                <p className="md3-info-value-sm">{property.area_unit || 'sq. yd.'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>trending_up</span>
              </div>
              <div>
                <p className="md3-info-label">Avg. Price</p>
                <p className="md3-info-value-sm">{property.avg_price || 'Contact'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>home</span>
              </div>
              <div>
                <p className="md3-info-label">Configurations</p>
                <p className="md3-info-value-sm">{property.configurations || property.propertyType || 'Plots'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>event</span>
              </div>
              <div>
                <p className="md3-info-label">Launch Date</p>
                <p className="md3-info-value-sm">{property.launch_date || 'TBA'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>apartment</span>
              </div>
              <div>
                <p className="md3-info-label">Possession Starts</p>
                <p className="md3-info-value-sm">{property.possession_starts || 'TBA'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>grid_view</span>
              </div>
              <div>
                <p className="md3-info-label">Project Area</p>
                <p className="md3-info-value-sm">{property.area || 'N/A'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>square_foot</span>
              </div>
              <div>
                <p className="md3-info-label">Land Area</p>
                <p className="md3-info-value-sm">{property.land_area || 'N/A'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>bar_chart</span>
              </div>
              <div>
                <p className="md3-info-label">Property Count</p>
                <p className="md3-info-value-sm">{property.property_count || '0'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>grid_on</span>
              </div>
              <div>
                <p className="md3-info-label">Total Units</p>
                <p className="md3-info-value-sm">{property.total_units || '0'}</p>
              </div>
            </div>
            <div className="md3-info-card">
              <div className="md3-info-icon-wrapper">
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>tag</span>
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
          <section className="md3-amenities-section">
            <h3 className="md3-headline">Top Amenities</h3>
            <div className="md3-amenities-grid">
              {(showAllAmenities ? property.amenities : property.amenities.slice(0, 5)).map((amenity: any, idx: number) => (
                <div key={idx} className="md3-amenity-item">
                  <div className="md3-amenity-icon-wrapper">
                    {amenity.iconUrl ? (
                      <img src={amenity.iconUrl} alt={amenity.amenity_name} />
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
                  <div className="md3-amenity-icon-wrapper" style={{ backgroundColor: 'var(--md-sys-color-primary-container)' }}>
                    <span style={{ color: 'var(--md-sys-color-on-primary-container)', fontWeight: 700, fontSize: '12px' }}>
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
                  <div className="md3-amenity-icon-wrapper" style={{ backgroundColor: 'var(--md-sys-color-primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronUp size={24} />
                  </div>
                  <span className="md3-amenity-label" style={{ color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>Less</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Specifications */}
        {property.specifications && Object.keys(property.specifications).length > 0 && (
          <section className="md3-section" style={{ marginTop: '24px' }}>
            <h3 className="md3-headline">Specifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(property.specifications).map(([key, specsArray]: [string, any], idx: number) => (
                <details key={idx} className="md3-accordion">
                  <summary className="md3-accordion-header" style={{ listStyle: 'none' }}>
                    <span className="md3-accordion-title">{key}</span>
                    <span className="material-symbols-outlined md3-chevron">expand_more</span>
                  </summary>
                  <div className="md3-accordion-content" style={{ display: 'block', paddingTop: '1rem' }}>
                    {specsArray.map((spec: any, sIdx: number) => {
                      const iconUrl = typeof spec.icon === 'object' && spec.icon !== null
                        ? spec.icon.value
                        : (typeof spec.icon === 'string' ? spec.icon : null);

                      return (
                        <div key={sIdx} className="md3-spec-item">
                          <div className="md3-spec-icon-wrapper">
                            {iconUrl ? (
                              <img src={iconUrl} alt={spec.key} />
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
        )}

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
                  <div className="md3-brochure-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>picture_as_pdf</span>
                  </div>
                  <div className="md3-brochure-info">
                    <p className="md3-brochure-title">{fileName}</p>
                    <p className="md3-brochure-size">PDF Document</p>
                  </div>
                  <div className="md3-brochure-actions">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="md3-brochure-btn view">
                      <span className="material-symbols-outlined">visibility</span>
                    </a>
                    <a href={pdfUrl} download className="md3-brochure-btn download">
                      <span className="material-symbols-outlined">download</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>

      {/* BottomNavBar */}
      <footer className="md3-bottom-nav">
        <button className="md3-btn md3-btn-secondary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
          <span>Contact Developer</span>
        </button>
        <button className="md3-btn md3-btn-primary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat_bubble</span>
          <span>Ask for Details</span>
        </button>
      </footer>

      {/* Language Toggle */}
      <div style={{ position: 'fixed', bottom: '80px', right: '16px', zIndex: 50, backgroundColor: 'white', borderRadius: '9999px', padding: '4px', display: 'flex', border: '1px solid var(--md-sys-color-outline-variant)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <button style={{ backgroundColor: '#B0893E', color: 'white', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, border: 'none' }}>EN</button>
        <button style={{ backgroundColor: 'transparent', color: 'var(--md-sys-color-on-surface-variant)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, border: 'none' }}>HI</button>
      </div>
    </div>
  );
}
