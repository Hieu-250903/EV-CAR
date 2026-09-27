import { useState } from 'react';
import './Models.css';
import { CAR_MODELS } from '../../data/evData';
import { 
  Battery, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  CalendarCheck, 
  Info, 
  X, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

const Models = ({ onSelectModelForConfig, onOpenTestDrive }) => {
  const [filter, setFilter] = useState('ALL');
  const [selectedSpecModel, setSelectedSpecModel] = useState(null);

  const filteredCars = filter === 'ALL' 
    ? CAR_MODELS 
    : CAR_MODELS.filter(car => car.category.toUpperCase() === filter);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="models-section">
      <div className="models-header">
        <div className="badge-tag badge-cyan">
          <Zap size={14} />
          <span>Thế Hệ Xe Điện Tương Lai</span>
        </div>
        <h2 className="models-title">Bộ Sưu Tập Xe Điện EV-olution</h2>
        <p className="models-subtitle">
          Khám phá dải sản phẩm thuần điện đẳng cấp thế giới, kết hợp hoàn hảo giữa công nghệ tự lái AI, 
          hiệu năng thể thao và triết lý thiết kế khí động học tương lai.
        </p>

        {/* Filter Tabs */}
        <div className="models-filter-tabs">
          <button 
            className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            Tất Cả Mẫu Xe ({CAR_MODELS.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'SEDAN' ? 'active' : ''}`}
            onClick={() => setFilter('SEDAN')}
          >
            Sedan Thể Thao
          </button>
          <button 
            className={`filter-btn ${filter === 'SUV' ? 'active' : ''}`}
            onClick={() => setFilter('SUV')}
          >
            SUV Gia Đình 7 Chỗ
          </button>
          <button 
            className={`filter-btn ${filter === 'CROSSOVER' ? 'active' : ''}`}
            onClick={() => setFilter('CROSSOVER')}
          >
            Crossover Đô Thị
          </button>
        </div>
      </div>

      {/* Car Cards Grid */}
      <div className="models-grid">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card glass-panel">
            {/* Image Preview & Category Badge */}
            <div className="car-image-container">
              <img src={car.image} alt={car.name} className="car-image" />
              <div className="car-category-badge">{car.category}</div>
              <div className="car-ready-badge">
                <span className="pulsing-green-dot" /> Sẵn sàng giao ngay
              </div>
            </div>

            {/* Content Details */}
            <div className="car-details">
              <div className="car-name-row">
                <h3 className="car-name">{car.name}</h3>
                <span className="car-power-tag">{car.power}</span>
              </div>
              <p className="car-tagline">{car.tagline}</p>

              {/* Specs Metric Grid */}
              <div className="car-specs-grid">
                <div className="car-spec-cell">
                  <div className="spec-label-row">
                    <Battery size={14} className="cell-icon" />
                    <span>Quãng đường</span>
                  </div>
                  <div className="cell-val">{car.range} <span className="cell-unit">km</span></div>
                </div>

                <div className="car-spec-cell">
                  <div className="spec-label-row">
                    <Gauge size={14} className="cell-icon" />
                    <span>Tăng tốc</span>
                  </div>
                  <div className="cell-val">{car.accel} <span className="cell-unit">(0-100)</span></div>
                </div>

                <div className="car-spec-cell">
                  <div className="spec-label-row">
                    <Zap size={14} className="cell-icon" />
                    <span>Sạc nhanh</span>
                  </div>
                  <div className="cell-val">{car.fastCharge.split(' ')[0]} <span className="cell-unit">phút</span></div>
                </div>

                <div className="car-spec-cell">
                  <div className="spec-label-row">
                    <ShieldCheck size={14} className="cell-icon" />
                    <span>Hệ dẫn động</span>
                  </div>
                  <div className="cell-val-small">{car.drive.split(' ')[0]}</div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="car-card-bottom">
                <div className="price-block">
                  <span className="price-label">Giá khởi điểm từ</span>
                  <div className="price-val">{formatPrice(car.basePrice)}</div>
                </div>

                <div className="car-actions-row">
                  <button 
                    className="btn-configurator glow-btn-cyan"
                    onClick={() => onSelectModelForConfig(car.id)}
                  >
                    <Sliders size={16} />
                    <span>Tùy biến xe</span>
                  </button>

                  <button 
                    className="btn-outline-action"
                    onClick={() => onOpenTestDrive(car.id)}
                    title="Đăng ký lái thử mẫu xe này"
                  >
                    <CalendarCheck size={16} />
                    <span>Lái thử</span>
                  </button>

                  <button 
                    className="btn-spec-info"
                    onClick={() => setSelectedSpecModel(car)}
                    title="Xem bảng thông số kỹ thuật chi tiết"
                  >
                    <Info size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Tech Specs Modal */}
      {selectedSpecModel && (
        <div className="modal-backdrop" onClick={() => setSelectedSpecModel(null)}>
          <div className="spec-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="spec-modal-header">
              <div>
                <span className="badge-tag badge-cyan">{selectedSpecModel.category}</span>
                <h3 className="spec-modal-title">{selectedSpecModel.name} - Thông Số Chi Tiết</h3>
              </div>
              <button className="spec-close-btn" onClick={() => setSelectedSpecModel(null)}>
                <X size={22} />
              </button>
            </div>

            <div className="spec-modal-body">
              <div className="spec-modal-hero">
                <img src={selectedSpecModel.image} alt={selectedSpecModel.name} />
              </div>

              <div className="spec-table-grid">
                <div className="spec-row">
                  <span className="spec-prop">Dung lượng khối Pin</span>
                  <span className="spec-data">{selectedSpecModel.battery}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Quãng đường tối đa (WLTP)</span>
                  <span className="spec-data text-cyan font-bold">{selectedSpecModel.range} km / 1 lần sạc</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Thời gian sạc nhanh DC (10-80%)</span>
                  <span className="spec-data">{selectedSpecModel.fastCharge}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Công suất cực đại</span>
                  <span className="spec-data">{selectedSpecModel.power}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Tăng tốc 0 - 100 km/h</span>
                  <span className="spec-data">{selectedSpecModel.accel}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Tốc độ tối đa giới hạn</span>
                  <span className="spec-data">{selectedSpecModel.topSpeed}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Hệ thống dẫn động</span>
                  <span className="spec-data">{selectedSpecModel.drive}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Tiêu chuẩn an toàn</span>
                  <span className="spec-data text-green">5 Sao Euro NCAP & ASEAN NCAP</span>
                </div>
                <div className="spec-row">
                  <span className="spec-prop">Bảo hành chính hãng</span>
                  <span className="spec-data">10 Năm hoặc 200.000 km cho Pin và Động cơ</span>
                </div>
              </div>

              <div className="spec-modal-footer">
                <button 
                  className="glow-btn-cyan btn-full"
                  onClick={() => {
                    const id = selectedSpecModel.id;
                    setSelectedSpecModel(null);
                    onSelectModelForConfig(id);
                  }}
                >
                  <Sliders size={18} />
                  <span>Cấu hình & Tùy biến {selectedSpecModel.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Models;
