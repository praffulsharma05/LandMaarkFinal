// PropertyListings.tsx
import React, { useState, useEffect } from 'react';
import './PropertyListings.css';

interface Property {
  sno: number;
  plotNo: string;
  size: string;
  dimension: string;
  builtUpArea: string;
  plc: string;
  type: string;
  price: number;
  priceRaw: number;
  sizeRaw: number;
  description: string;
  location: string;
  bhk: string;
}

interface ApiResponse {
  success: boolean;
  data: ApiProperty[];
  summary?: any;
}

interface ApiProperty {
  plot_number: string;
  price: string;
  size?: string;
  dimension?: string;
  built_up_area?: string;
  area_sqft?: string;
  plc?: string;
  property_type?: string;
  description?: string;
  location?: string;
}

interface Stats {
  totalPlots: number;
  minPrice: number;
  maxPrice: number;
  minSize: number;
  maxSize: number;
  bhkMin: number;
  bhkMax: number;
}

const PropertyListings: React.FC = () => {
  const [plotData, setPlotData] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalPlots: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    bhkMin: 0,
    bhkMax: 0,
  });
  const [activeDetails, setActiveDetails] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    bhk: '',
    size: '',
    price: '',
    plc: '',
    sortBy: '',
  });

  const API_URL = '/api/townships/id/properties';

  const extractBhk = (type: string): string => {
    const match = type.match(/(\d+)\s*BHK/i);
    return match ? match[1] : '';
  };

  const getTypeBadgeClass = (type: string): string => {
    if (type.includes('Corner') || type.includes('CORNER')) return 'corner';
    if (type.includes('Guest')) return 'guest';
    if (type.includes('Duplex')) return 'duplex';
    if (type.includes('Villa')) return 'villa';
    return '';
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const result: ApiResponse = await response.json();

      if (result.success) {
        const properties: Property[] = result.data
          .filter(p => p.plot_number && p.price && parseFloat(p.price) > 0)
          .map((p, index) => ({
            sno: index + 1,
            plotNo: p.plot_number,
            size: p.size || '-',
            dimension: p.dimension || '-',
            builtUpArea: p.built_up_area || p.area_sqft || '-',
            plc: p.plc || 'Normal',
            type: p.property_type || '-',
            price: Math.round(parseFloat(p.price) / 100000),
            priceRaw: parseFloat(p.price),
            sizeRaw: parseFloat(String(p.size).split('-')[0]) || 0,
            description: p.description || '-',
            location: p.location || '-',
            bhk: extractBhk(p.property_type || ''),
          }));

        setPlotData(properties);
        updateStats(properties);
      } else {
        setError('Failed to load data');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (data: Property[]) => {
    const validData = data.filter(p => p.priceRaw > 0);
    const prices = validData.map(p => p.priceRaw);
    const sizes = validData.map(p => p.sizeRaw).filter(s => s > 0);
    const bhkValues = [...new Set(data.map(p => p.bhk).filter(b => b && b !== ''))].map(Number).sort();

    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const minSize = sizes.length ? Math.min(...sizes) : 0;
    const maxSize = sizes.length ? Math.max(...sizes) : 0;

    setStats({
      totalPlots: data.length,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      bhkMin: bhkValues.length ? Math.min(...bhkValues) : 0,
      bhkMax: bhkValues.length ? Math.max(...bhkValues) : 0,
    });
  };

  const getUniqueTypes = (): string[] => {
    return [...new Set(plotData.map(p => p.type).filter(t => t && t !== '-'))].sort();
  };

  const filterData = () => {
    let filtered = [...plotData];

    // BHK filter
    if (filters.bhk) {
      filtered = filtered.filter(p => p.type === filters.bhk);
    }

    // Size filter
    if (filters.size) {
      const minSize = parseInt(filters.size);
      filtered = filtered.filter(p => p.sizeRaw >= minSize && p.sizeRaw < minSize + 50);
    }

    // Price filter
    if (filters.price) {
      const maxPrice = parseInt(filters.price);
      if (filters.price === '150') {
        filtered = filtered.filter(p => p.price >= maxPrice);
      } else {
        filtered = filtered.filter(p => p.price <= maxPrice);
      }
    }

    // PLC filter
    if (filters.plc) {
      if (filters.plc === 'corner') {
        filtered = filtered.filter(p => p.plc.toLowerCase().includes('corner'));
      } else {
        filtered = filtered.filter(p => !p.plc.toLowerCase().includes('corner'));
      }
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.priceRaw - b.priceRaw);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.priceRaw - a.priceRaw);
          break;
        case 'size-asc':
          filtered.sort((a, b) => a.sizeRaw - b.sizeRaw);
          break;
        case 'size-desc':
          filtered.sort((a, b) => b.sizeRaw - a.sizeRaw);
          break;
      }
    }

    setFilteredData(filtered);
  };

  const toggleDetails = (index: number) => {
    setActiveDetails(activeDetails === index ? null : index);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters, plotData]);

  useEffect(() => {
    if (plotData.length > 0) {
      filterData();
    }
  }, [plotData]);

  if (loading) {
    return (
      <div className="container">
        <div className="table-container">
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
    

      <div className="table-container">
        <div className="table-header">
          <h2>
            <i className="fas fa-list"></i> Plot Details
          </h2>
          <span className="count">{filteredData.length} Plots</span>
        </div>

        <div className="filters">
          <select
            value={filters.bhk}
            onChange={(e) => handleFilterChange('bhk', e.target.value)}
          >
            <option value="">All BHK Types</option>
            {getUniqueTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
          >
            <option value="">All Sizes</option>
            <option value="80">80-100 sq.yd</option>
            <option value="100">100-150 sq.yd</option>
            <option value="150">150-200 sq.yd</option>
            <option value="200">200+ sq.yd</option>
          </select>

          <select
            value={filters.price}
            onChange={(e) => handleFilterChange('price', e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="60">Under 60L</option>
            <option value="80">60-80L</option>
            <option value="100">80-100L</option>
            <option value="120">100-120L</option>
            <option value="150">Above 120L</option>
          </select>

          <select
            value={filters.plc}
            onChange={(e) => handleFilterChange('plc', e.target.value)}
          >
            <option value="">All Plots</option>
            <option value="corner">Corner Plots</option>
            <option value="normal">Normal Plots</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="size-asc">Size: Low to High</option>
            <option value="size-desc">Size: High to Low</option>
          </select>
        </div>

        <div className="table-wrapper">
          {error ? (
            <div className="empty-state">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <p>No plots found matching your criteria</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}></th>
                  <th>S.No.</th>
                  <th>Plot No.</th>
                  <th>Size (Sq.Yd)</th>
                  <th>Dimension</th>
                  <th>Built-up Area</th>
                  <th>PLC</th>
                  <th>Type</th>
                  <th>Price (Lakhs)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((plot, index) => (
                  <React.Fragment key={plot.sno}>
                    <tr onClick={() => toggleDetails(index)}>
                      <td>
                        <button className={`expand-btn ${activeDetails === index ? 'active' : ''}`}>
                          <i className="fas fa-chevron-down"></i>
                        </button>
                      </td>
                      <td className="sno">{plot.sno}</td>
                      <td className="plot-no">{plot.plotNo}</td>
                      <td>{plot.size}</td>
                      <td>{plot.dimension}</td>
                      <td>{plot.builtUpArea}</td>
                      <td>{plot.plc}</td>
                      <td>
                        <span className={`type-badge ${getTypeBadgeClass(plot.type)}`}>
                          {plot.type}
                        </span>
                      </td>
                      <td className="price">₹{plot.price}L</td>
                    </tr>
                    <tr className={`details-row ${activeDetails === index ? 'active' : ''}`}>
                      <td colSpan={9}>
                        <div className="details-content">
                          <div className="detail-card">
                            <div className="label">Plot Number</div>
                            <div className="value">{plot.plotNo}</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Plot Size</div>
                            <div className="value">{plot.size} Sq.Yd</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Dimension</div>
                            <div className="value">{plot.dimension}</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Built-up Area</div>
                            <div className="value">{plot.builtUpArea} Sq.Ft</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Property Type</div>
                            <div className="value">{plot.type}</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">PLC</div>
                            <div className="value">{plot.plc}</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Total Price</div>
                            <div className="value highlight">₹{plot.price.toLocaleString()} Lakhs</div>
                          </div>
                          <div className="detail-card">
                            <div className="label">Price per Sq.Yd</div>
                            <div className="value">
                              ₹{plot.sizeRaw ? Math.round(plot.priceRaw / plot.sizeRaw).toLocaleString() : '-'}
                            </div>
                          </div>
                          <div className="detail-card" style={{ gridColumn: 'span 2' }}>
                            <div className="label">Description</div>
                            <div className="value">{plot.description}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;