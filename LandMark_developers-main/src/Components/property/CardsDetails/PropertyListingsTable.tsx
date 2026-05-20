import React from 'react';
import { ChevronRight, FileText, Download, Eye } from 'lucide-react';
import { Property, KeyValue } from './PropertyListingsHelpers';
import { formatValue } from './PropertyListingsHelpers';
import './PropertyListings.css';

interface UIProps {
  loading: boolean; error: string | null;
  expandedIndices: Set<number>; townshipName: string;
}
interface PdfProps {
  data: { name: string; url: string; file_path?: string }[];
  thumbnails: { [key: string]: string };
}
interface Handlers {
  handleToggleAll: () => void;
  handleStopPropagation: (e: React.MouseEvent) => void;
  createToggleHandler: (idx: number) => () => void;
}
interface Props {
  filteredData: Property[];
  ui: UIProps;
  pdf: PdfProps;
  t: (key: string) => string;
  handlers: Handlers;
}

const PropertyListingsTable: React.FC<Props> = ({ filteredData, ui, pdf, t, handlers }) => {
  if (ui.loading) return (
    <div className="container"><div className="table-container"><div className="loading"><div className="spinner"></div></div></div></div>
  );
  const isAllExpanded = ui.expandedIndices.size === filteredData.length && filteredData.length > 0;
  return (
    <div className="container">
      <div className="table-container">
        <div className="township-banner-header">
          <div className="township-banner">
            <h1>{ui.townshipName || t('property.listings.propertyList')}<span className="banner-count">({filteredData.length})</span></h1>
          </div>
          {filteredData.length > 0 && (
            <div className="listings-expand-all-wrapper">
              <button className={`listings-expand-all-btn ${isAllExpanded ? 'expanded' : ''}`} onClick={handlers.handleToggleAll}
                title={isAllExpanded ? t('property.listings.collapseAllCards') : t('property.listings.expandAllCards')}
                aria-label={isAllExpanded ? t('property.listings.collapseAllCards') : t('property.listings.expandAllCards')}>
                <span>{isAllExpanded ? t('property.listings.collapseAll') : t('property.listings.expandAll')}</span>
                <ChevronRight size={16} className="toggle-chevron" />
              </button>
            </div>
          )}
        </div>
        <div className="project-details-cards-grid">
          {ui.error ? (
            <div className="empty-state"><i className="fas fa-exclamation-circle"></i><p>{ui.error}</p></div>
          ) : filteredData.length === 0 ? (
            <div className="empty-state"><i className="fas fa-search"></i><p>{t('property.listings.noPlotsFound')}</p></div>
          ) : (
            filteredData.map((plot, index) => (
              <div key={plot.sno} className={`project-detail-card ${ui.expandedIndices.has(index) ? 'active' : ''}`} onClick={handlers.createToggleHandler(index)}>
                <div className="card-header-compact">
                  <div className="header-left-side">
                    <span className="plot-id">{t('property.listings.plot')} {plot.plotNo}</span>
                    {plot.size && plot.size !== '-' && (
                      <span className="plot-sqyds">{plot.size.toLowerCase().includes('yd') || plot.size.toLowerCase().includes('sq') ? plot.size : `${plot.size} ${t('property.listings.sqYds')}`}</span>
                    )}
                  </div>
                  <div className="header-right-side">
                    <span className="compact-price">{plot.price > 0 ? `₹${plot.price} L` : ''}</span>
                    <ChevronRight size={18} className={`arrow-icon ${ui.expandedIndices.has(index) ? 'rotate' : ''}`} />
                  </div>
                </div>
                {ui.expandedIndices.has(index) && (
                  <div className="card-expanded-panel" onClick={handlers.handleStopPropagation}>
                    <div className="expanded-info-grid">
                      {plot.rawKeyValues.filter(kv => {
                        if (kv.key === 'Is Deleted' || kv.value === null || kv.value === undefined || kv.value === '' || kv.value === '[]' || kv.value === '{}') return false;
                        if (Array.isArray(kv.value) && kv.value.length === 0) return false;
                        if (typeof kv.value === 'object' && kv.value !== null && Object.keys(kv.value).length === 0) return false;
                        return true;
                      }).map((kv, i) => (
                        <div key={i} className="info-item"><span className="label">{kv.key}:</span><span className="value">{formatValue(kv.value)}</span></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="desktop-table table-wrapper">
          {ui.error ? (
            <div className="empty-state"><i className="fas fa-exclamation-circle"></i><p>{ui.error}</p></div>
          ) : filteredData.length === 0 ? (
            <div className="empty-state"><i className="fas fa-search"></i><p>{t('property.listings.noPlotsFound')}</p></div>
          ) : (
            <table>
              <thead><tr>
                <th>{t('property.listings.plotNo')}</th><th>{t('property.listings.size')}</th><th>{t('property.listings.subTownship')}</th>
                <th>{t('property.listings.projectArea')}</th><th>{t('property.listings.configuration')}</th><th>{t('property.listings.constructionStatus')}</th>
              </tr></thead>
              <tbody>{filteredData.map((plot) => {
                const kv = plot.rawKeyValues?.reduce((acc: Record<string, unknown>, item: KeyValue) => { acc[item.key] = item.value; return acc; }, {} as Record<string, unknown>) || {};
                return (
                  <tr key={plot.sno} className="no-expand">
                    <td className="plot-no">{plot.plotNo}</td><td>{plot.size}</td>
                    <td>{String(kv['Sub Township'] || '-')}</td><td>{String(kv['Project Area'] || '-')}</td>
                    <td>{String(kv.Configuration || '-')}</td><td>{String(kv['Construction Status'] || '-')}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          )}
        </div>
      </div>
      {(pdf.data && pdf.data.length > 0) && (
        <div className="pdf-section-wrapper">
          <div className="tab-content-card">
            <h2 className="section-title"><span className="title-underline">{t('property.listings.brochuresDocuments')}</span></h2>
            <div className="pdf-grid-premium">
              {pdf.data.map((pdfItem, index) => {
                const pdfUrl = pdfItem.url || pdfItem.file_path || '#';
                const thumbnailUrl = pdf.thumbnails[pdfUrl];
                return (
                  <div key={index} className="pdf-card-premium">
                    <div className="pdf-thumbnail-container">
                      {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt={pdfItem.name} className="pdf-thumbnail-img" loading="lazy" />
                      ) : (
                        <div className="pdf-thumbnail-fallback">
                          <div className="fallback-glow"></div>
                          <FileText className="fallback-pdf-icon" size={48} />
                          <span className="fallback-pdf-badge">{t('property.listings.pdfDocument')}</span>
                        </div>
                      )}
                      <div className="pdf-glass-overlay">
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="pdf-glass-btn view"><Eye size={18} /><span>{t('property.listings.view')}</span></a>
                        <a href={pdfUrl} download target="_blank" rel="noopener noreferrer" className="pdf-glass-btn download"><Download size={18} /><span>{t('property.listings.download')}</span></a>
                      </div>
                    </div>
                    <div className="pdf-card-footer">
                      <h3 className="pdf-card-name">{pdfItem.name || `${t('property.listings.document')} ${index + 1}`}</h3>
                      <p className="pdf-card-size">{t('property.listings.pdfBrochure')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListingsTable;
