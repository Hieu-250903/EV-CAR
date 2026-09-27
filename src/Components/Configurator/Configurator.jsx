import { useState, useMemo } from 'react';
import './Configurator.css';
import { CAR_MODELS, TECH_PACKAGES } from '../../data/evData';
import { 
  Check, 
  CreditCard, 
  Zap, 
  Battery, 
  Gauge, 
  Sparkles, 
  Bookmark, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const Configurator = ({ initialModelId = 'apex-gt', onProceedToDeposit }) => {
  // Model state
  const [selectedModelId, setSelectedModelId] = useState(initialModelId);
  const currentModel = useMemo(() => {
    return CAR_MODELS.find(m => m.id === selectedModelId) || CAR_MODELS[0];
  }, [selectedModelId]);

  // Options states
  const [selectedTrimId, setSelectedTrimId] = useState(currentModel.trims[0]?.id || 'std');
  const [selectedColorId, setSelectedColorId] = useState(currentModel.colors[0]?.id || 'silver');
  const [selectedWheelId, setSelectedWheelId] = useState(currentModel.wheels[0]?.id || 'w-19');
  const [selectedInteriorId, setSelectedInteriorId] = useState(currentModel.interiors[0]?.id || 'in-black');
  const [selectedTechPacks, setSelectedTechPacks] = useState(['autopilot']);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // When model changes, reset options to model defaults
  const handleModelChange = (modelId) => {
    setSelectedModelId(modelId);
    const newModel = CAR_MODELS.find(m => m.id === modelId);
    if (newModel) {
      setSelectedTrimId(newModel.trims[0].id);
      setSelectedColorId(newModel.colors[0].id);
      setSelectedWheelId(newModel.wheels[0].id);
      setSelectedInteriorId(newModel.interiors[0].id);
    }
  };

  // Find active option objects
  const activeTrim = currentModel.trims.find(t => t.id === selectedTrimId) || currentModel.trims[0];
  const activeColor = currentModel.colors.find(c => c.id === selectedColorId) || currentModel.colors[0];
  const activeWheel = currentModel.wheels.find(w => w.id === selectedWheelId) || currentModel.wheels[0];
  const activeInterior = currentModel.interiors.find(i => i.id === selectedInteriorId) || currentModel.interiors[0];

  // Toggle tech pack
  const toggleTechPack = (packId) => {
    if (selectedTechPacks.includes(packId)) {
      setSelectedTechPacks(selectedTechPacks.filter(id => id !== packId));
    } else {
      setSelectedTechPacks([...selectedTechPacks, packId]);
    }
  };

  // Calculate Total Price
  const totalPrice = useMemo(() => {
    let sum = currentModel.basePrice;
    if (activeTrim) sum += activeTrim.priceAdd;
    if (activeColor) sum += activeColor.price;
    if (activeWheel) sum += activeWheel.price;
    if (activeInterior) sum += activeInterior.price;
    selectedTechPacks.forEach(packId => {
      const pack = TECH_PACKAGES.find(p => p.id === packId);
      if (pack) sum += pack.price;
    });
    return sum;
  }, [currentModel, activeTrim, activeColor, activeWheel, activeInterior, selectedTechPacks]);

  // Format VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Monthly estimate (70% loan for 5 years, 8% interest rate)
  const monthlyEstimate = Math.round((totalPrice * 0.7 * 1.25) / 60);

  const handleSaveConfig = () => {
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleDepositClick = () => {
    onProceedToDeposit({
      model: currentModel,
      trim: activeTrim,
      color: activeColor,
      wheel: activeWheel,
      interior: activeInterior,
      techPacks: selectedTechPacks.map(id => TECH_PACKAGES.find(p => p.id === id)),
      totalPrice: totalPrice,
      depositAmount: 30000000 // 30 million VND
    });
  };

  return (
    <div className="configurator-wrapper">
      {/* Top Model Switcher */}
      <div className="config-model-tabs glass-panel">
        <span className="config-tabs-label">Chọn dòng xe:</span>
        <div className="tabs-list">
          {CAR_MODELS.map(model => (
            <button
              key={model.id}
              className={`config-model-tab ${selectedModelId === model.id ? 'active' : ''}`}
              onClick={() => handleModelChange(model.id)}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      <div className="configurator-layout">
        {/* Left: Interactive Visualizer */}
        <div className="visualizer-container glass-panel">
          <div className="visualizer-header">
            <div>
              <div className="badge-tag badge-cyan">{currentModel.category}</div>
              <h2 className="visualizer-model-name">{currentModel.name}</h2>
              <p className="visualizer-trim-name">{activeTrim.name}</p>
            </div>
            <div className="visualizer-color-tag">
              <span className="color-swatch-circle" style={{ backgroundColor: activeColor.hex }} />
              <span>{activeColor.name}</span>
            </div>
          </div>

          {/* Car Image with Dynamic Filter */}
          <div className="visualizer-canvas-box">
            <img 
              src={currentModel.image} 
              alt={currentModel.name} 
              className="visualizer-car-img"
              style={{ filter: activeColor.filter }}
            />
            <div className="visualizer-glow-floor" />
          </div>

          {/* Real-time Dynamic Metrics */}
          <div className="visualizer-metrics-bar">
            <div className="metric-box">
              <Battery size={18} className="metric-icon" />
              <div>
                <div className="metric-val">{activeTrim.range} km</div>
                <div className="metric-sub">Quãng đường (WLTP)</div>
              </div>
            </div>

            <div className="metric-box">
              <Gauge size={18} className="metric-icon" />
              <div>
                <div className="metric-val">{activeTrim.accel}</div>
                <div className="metric-sub">0-100 km/h</div>
              </div>
            </div>

            <div className="metric-box">
              <Zap size={18} className="metric-icon" />
              <div>
                <div className="metric-val">{activeTrim.hp}</div>
                <div className="metric-sub">Công suất tối đa</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="customizer-panel">
          {/* Section 1: Powertrain & Trims */}
          <div className="config-section glass-panel">
            <div className="section-title-wrap">
              <h3 className="section-title">1. Phiên bản & Động cơ</h3>
              <span className="section-step-indicator">Bắt buộc</span>
            </div>
            <div className="options-stack">
              {currentModel.trims.map(trim => (
                <div 
                  key={trim.id}
                  className={`option-card ${selectedTrimId === trim.id ? 'active' : ''}`}
                  onClick={() => setSelectedTrimId(trim.id)}
                >
                  <div className="option-info">
                    <div className="option-name">{trim.name}</div>
                    <div className="option-specs-inline">
                      <span>{trim.range} km range</span> • <span>{trim.hp}</span> • <span>0-100 in {trim.accel}</span>
                    </div>
                  </div>
                  <div className="option-price-tag">
                    {trim.priceAdd === 0 ? 'Đã bao gồm' : `+ ${formatPrice(trim.priceAdd)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Exterior Paint Colors */}
          <div className="config-section glass-panel">
            <div className="section-title-wrap">
              <h3 className="section-title">2. Màu sơn ngoại thất</h3>
              <span className="selected-color-name">{activeColor.name}</span>
            </div>
            <div className="color-palette-grid">
              {currentModel.colors.map(color => (
                <div
                  key={color.id}
                  className={`color-choice-item ${selectedColorId === color.id ? 'active' : ''}`}
                  onClick={() => setSelectedColorId(color.id)}
                  title={color.name}
                >
                  <div className="color-swatch-large" style={{ backgroundColor: color.hex }}>
                    {selectedColorId === color.id && <Check size={16} className="color-check-icon" />}
                  </div>
                  <span className="color-title-mini">{color.name.split(' ')[0]}</span>
                  <span className="color-price-mini">
                    {color.price === 0 ? 'Tiêu chuẩn' : `+${(color.price / 1000000)}Tr`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Wheels */}
          <div className="config-section glass-panel">
            <h3 className="section-title">3. Kích thước & Kiểu mâm xe</h3>
            <div className="options-stack">
              {currentModel.wheels.map(wheel => (
                <div
                  key={wheel.id}
                  className={`option-card ${selectedWheelId === wheel.id ? 'active' : ''}`}
                  onClick={() => setSelectedWheelId(wheel.id)}
                >
                  <div className="option-name">{wheel.name}</div>
                  <div className="option-price-tag">
                    {wheel.price === 0 ? 'Tiêu chuẩn' : `+ ${formatPrice(wheel.price)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Interior */}
          <div className="config-section glass-panel">
            <h3 className="section-title">4. Chất liệu & Màu nội thất</h3>
            <div className="options-stack">
              {currentModel.interiors.map(interior => (
                <div
                  key={interior.id}
                  className={`option-card ${selectedInteriorId === interior.id ? 'active' : ''}`}
                  onClick={() => setSelectedInteriorId(interior.id)}
                >
                  <div className="option-name">{interior.name}</div>
                  <div className="option-price-tag">
                    {interior.price === 0 ? 'Tiêu chuẩn' : `+ ${formatPrice(interior.price)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Tech Packages */}
          <div className="config-section glass-panel">
            <h3 className="section-title">5. Gói Công Nghệ & Trạm Sạc Tại Nhà</h3>
            <div className="options-stack">
              {TECH_PACKAGES.map(pack => {
                const isChecked = selectedTechPacks.includes(pack.id);
                return (
                  <div
                    key={pack.id}
                    className={`option-card-pack ${isChecked ? 'active' : ''}`}
                    onClick={() => toggleTechPack(pack.id)}
                  >
                    <div className="pack-checkbox">
                      {isChecked && <Check size={14} />}
                    </div>
                    <div className="pack-content">
                      <div className="pack-header-row">
                        <span className="pack-name">{pack.name}</span>
                        <span className="pack-price">+ {formatPrice(pack.price)}</span>
                      </div>
                      <p className="pack-desc">{pack.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Summary Bar */}
          <div className="config-summary-box glass-panel">
            <div className="summary-price-column">
              <span className="summary-label">Tổng giá trị xe dự kiến</span>
              <div className="summary-total-price">{formatPrice(totalPrice)}</div>
              <div className="summary-estimate-loan">
                Hoặc trả góp từ <span className="text-cyan font-bold">{formatPrice(monthlyEstimate)}</span>/tháng
              </div>
            </div>

            <div className="summary-actions-column">
              <button 
                className="btn-save-config" 
                onClick={handleSaveConfig}
                title="Lưu cấu hình xe để xem lại sau"
              >
                <Bookmark size={18} />
                <span>{saveSuccessMsg ? "Đã lưu thành công!" : "Lưu cấu hình"}</span>
              </button>

              <button 
                className="btn-deposit-checkout glow-btn-orange" 
                onClick={handleDepositClick}
              >
                <CreditCard size={18} />
                <span>Đặt cọc xe ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
