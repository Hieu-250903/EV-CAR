import { useState } from 'react';
import './Charging.css';
import { CHARGING_STATIONS, chargingHubImg } from '../../data/evData';
import { 
  Zap, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle, 
  Search, 
  Coffee, 
  Wifi, 
  Home, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

const Charging = () => {
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [speedFilter, setSpeedFilter] = useState('ALL');
  const [selectedStationId, setSelectedStationId] = useState('cs-01');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const filteredStations = CHARGING_STATIONS.filter(st => {
    const matchCity = selectedCity === 'ALL' || st.city.includes(selectedCity);
    const matchSpeed = speedFilter === 'ALL' || st.speedTier === speedFilter;
    return matchCity && matchSpeed;
  });

  const selectedStation = CHARGING_STATIONS.find(s => s.id === selectedStationId) || CHARGING_STATIONS[0];

  const handleBookSlot = (station) => {
    setBookingSuccess(`Đã giữ chỗ sạc thành công tại "${station.name}" trong 30 phút!`);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <section className="charging-section">
      {/* Hero Banner */}
      <div className="charging-hero-card glass-panel">
        <div className="charging-hero-img-box">
          <img src={chargingHubImg} alt="EV Supercharging Hub" className="charging-hero-img" />
          <div className="charging-hero-overlay" />
        </div>

        <div className="charging-hero-content">
          <div className="badge-tag badge-cyan">
            <Zap size={14} />
            <span>Hạ Tầng Năng Lượng Xanh 24/7</span>
          </div>
          <h2 className="charging-hero-title">Mạng Lưới Trạm Sạc Siêu Nhanh</h2>
          <p className="charging-hero-desc">
            Với hơn <strong>3.500+ cổng sạc</strong> trải dài khắp các tỉnh thành và 100% các tuyến cao tốc huyết mạch, 
            EV-olution giúp bạn tự tin chinh phục mọi hành trình xuyên Việt mà không lo về pin.
          </p>

          <div className="charging-hero-stats">
            <div className="c-stat-item">
              <span className="c-stat-num">350 kW</span>
              <span className="c-stat-lbl">Công suất sạc tối đa</span>
            </div>
            <div className="c-stat-item">
              <span className="c-stat-num">15 Phút</span>
              <span className="c-stat-lbl">Sạc đi thêm 300 km</span>
            </div>
            <div className="c-stat-item">
              <span className="c-stat-num">63/63</span>
              <span className="c-stat-lbl">Tỉnh thành phủ sóng</span>
            </div>
          </div>
        </div>
      </div>

      {bookingSuccess && (
        <div className="booking-toast glass-panel">
          <CheckCircle size={20} className="toast-icon text-green" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Interactive Map & Station Explorer */}
      <div className="charging-explorer">
        {/* Search & Filter Header */}
        <div className="explorer-filters glass-panel">
          <div className="filter-group">
            <span className="filter-label">Khu vực:</span>
            <div className="filter-pills">
              <button 
                className={`pill-btn ${selectedCity === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCity('ALL')}
              >
                Toàn Quốc
              </button>
              <button 
                className={`pill-btn ${selectedCity === 'Hà Nội' ? 'active' : ''}`}
                onClick={() => setSelectedCity('Hà Nội')}
              >
                Hà Nội
              </button>
              <button 
                className={`pill-btn ${selectedCity === 'Hồ Chí Minh' ? 'active' : ''}`}
                onClick={() => setSelectedCity('Hồ Chí Minh')}
              >
                TP.HCM
              </button>
              <button 
                className={`pill-btn ${selectedCity === 'Đà Nẵng' ? 'active' : ''}`}
                onClick={() => setSelectedCity('Đà Nẵng')}
              >
                Đà Nẵng
              </button>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Tốc độ sạc:</span>
            <div className="filter-pills">
              <button 
                className={`pill-btn ${speedFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setSpeedFilter('ALL')}
              >
                Tất cả
              </button>
              <button 
                className={`pill-btn ${speedFilter === 'super' ? 'active' : ''}`}
                onClick={() => setSpeedFilter('super')}
              >
                Supercharger (350kW)
              </button>
              <button 
                className={`pill-btn ${speedFilter === 'fast' ? 'active' : ''}`}
                onClick={() => setSpeedFilter('fast')}
              >
                Sạc nhanh DC
              </button>
            </div>
          </div>
        </div>

        {/* Map & List Split */}
        <div className="charging-split-view">
          {/* Left: Interactive Futuristic Tech Map Canvas */}
          <div className="tech-map-canvas glass-panel">
            <div className="map-badge-top">
              <MapPin size={16} className="text-cyan" />
              <span>Bản Đồ Định Vị Trạm Sạc Thời Gian Thực</span>
            </div>

            {/* Stylized Vietnam Schematic Grid */}
            <div className="map-graphic-box">
              <div className="radar-sweep" />

              {/* Station Markers on Map */}
              {CHARGING_STATIONS.map((st, index) => {
                const isSelected = selectedStationId === st.id;
                // Coordinates converted to stylized % positions
                const topPositions = [28, 72, 70, 48, 86];
                const leftPositions = [45, 52, 60, 56, 42];
                return (
                  <div 
                    key={st.id}
                    className={`map-pin-point ${isSelected ? 'active' : ''}`}
                    style={{ 
                      top: `${topPositions[index % topPositions.length]}%`, 
                      left: `${leftPositions[index % leftPositions.length]}%` 
                    }}
                    onClick={() => setSelectedStationId(st.id)}
                    title={st.name}
                  >
                    <div className="pin-pulse" />
                    <div className="pin-dot">
                      <Zap size={14} />
                    </div>
                    <span className="pin-tooltip">{st.city} - {st.availablePorts}/{st.totalPorts}</span>
                  </div>
                );
              })}

              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-dot green" /> Cổng sạc còn trống
                </div>
                <div className="legend-item">
                  <span className="legend-dot cyan" /> Trạm Supercharger
                </div>
              </div>
            </div>

            {/* Selected Station Mini Detail */}
            <div className="map-selected-preview">
              <div className="preview-header">
                <div>
                  <h4 className="preview-title">{selectedStation.name}</h4>
                  <p className="preview-address">{selectedStation.address}</p>
                </div>
                <div className="preview-type-tag">{selectedStation.type}</div>
              </div>

              <div className="preview-actions">
                <button 
                  className="glow-btn-cyan btn-sm"
                  onClick={() => handleBookSlot(selectedStation)}
                >
                  <Clock size={15} />
                  <span>Đặt giữ chỗ sạc</span>
                </button>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStation.name + ' ' + selectedStation.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-action btn-sm"
                >
                  <Navigation size={15} />
                  <span>Chỉ đường Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Station Cards List */}
          <div className="stations-list-wrap">
            <h3 className="stations-list-title">Danh Sách Trạm ({filteredStations.length})</h3>

            <div className="stations-scroll-list">
              {filteredStations.map(st => {
                const isSelected = selectedStationId === st.id;
                return (
                  <div 
                    key={st.id} 
                    className={`station-item-card glass-panel ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedStationId(st.id)}
                  >
                    <div className="st-head-row">
                      <div>
                        <span className="st-city-badge">{st.city}</span>
                        <h4 className="st-name">{st.name}</h4>
                      </div>
                      <div className="st-availability-badge">
                        <span className="available-num">{st.availablePorts}</span>
                        <span className="total-num">/{st.totalPorts} cổng trống</span>
                      </div>
                    </div>

                    <p className="st-address">{st.address}</p>

                    <div className="st-meta-row">
                      <div className="st-meta-item">
                        <Zap size={14} className="text-cyan" />
                        <span>{st.type}</span>
                      </div>
                      <div className="st-meta-item">
                        <Clock size={14} />
                        <span>{st.openTime}</span>
                      </div>
                      <div className="st-meta-item">
                        <span>Đơn giá: {st.pricePerKwh.toLocaleString()} đ/kWh</span>
                      </div>
                    </div>

                    <div className="st-amenities-row">
                      {st.amenities.map((item, idx) => (
                        <span key={idx} className="amenity-chip">{item}</span>
                      ))}
                    </div>

                    <div className="st-card-footer">
                      <button 
                        className="st-book-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookSlot(st);
                        }}
                      >
                        <span>Đặt chỗ</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Home Charging Solutions Promo */}
      <div className="home-charging-promo glass-panel">
        <div className="home-promo-text">
          <div className="badge-tag badge-cyan">
            <Home size={14} />
            <span>Trụ Sạc Treo Tường Tại Nhà</span>
          </div>
          <h3 className="home-promo-title">Tận Hưởng Sự Tiện Lợi: Cắm Sạc Qua Đêm, Sáng Đầy Pin</h3>
          <p className="home-promo-desc">
            Bộ sạc thông minh EV-Wallbox 11kW với khả năng kết nối Wi-Fi, tự động chọn giờ điện thấp điểm để sạc, 
            bảo vệ quá tải và tích hợp quản lý thông qua ứng dụng EV-Connect trên điện thoại.
          </p>
        </div>
        <div className="home-promo-cta">
          <div className="wallbox-price-pill">
            <span>Chỉ từ</span>
            <strong>18.000.000 đ</strong>
            <small>(Đã bao gồm chi phí lắp đặt)</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charging;
