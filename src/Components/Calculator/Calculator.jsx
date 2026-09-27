import { useState, useMemo } from 'react';
import './Calculator.css';
import { CAR_MODELS } from '../../data/evData';
import { 
  Zap, 
  Fuel, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  HelpCircle,
  Percent,
  Calendar,
  CheckCircle2
} from 'lucide-react';

const Calculator = ({ onOpenTestDrive, onOpenDeposit }) => {
  const [activeTab, setActiveTab] = useState('SAVINGS'); // 'SAVINGS' or 'LOAN'

  // Tab 1: Fuel vs EV Savings States
  const [monthlyKm, setMonthlyKm] = useState(1500);
  const [selectedEvId, setSelectedEvId] = useState('apex-gt');
  const [gasPrice, setGasPrice] = useState(24500); // 24.500 VND/lit
  const [gasConsumption, setGasConsumption] = useState(9.5); // 9.5 L / 100km
  const [electricityRate, setElectricityRate] = useState(3300); // 3.300 VND/kWh

  // Tab 2: Loan States
  const [loanCarId, setLoanCarId] = useState('apex-gt');
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30%
  const [loanTermMonths, setLoanTermMonths] = useState(60); // 5 years = 60 months
  const [interestRateYear, setInterestRateYear] = useState(7.9); // 7.9% / year

  const formatVnd = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  // Calculations for Savings
  const savingsData = useMemo(() => {
    // Gas car cost per month
    const litersPerMonth = (monthlyKm / 100) * gasConsumption;
    const gasCostMonth = litersPerMonth * gasPrice;

    // EV cost per month (assume ~16 kWh / 100km for sedan, 19 for SUV, 14 for compact)
    const kwhPer100km = selectedEvId === 'titan-pro' ? 19.5 : selectedEvId === 'apex-gt' ? 16.5 : 13.8;
    const kwhPerMonth = (monthlyKm / 100) * kwhPer100km;
    const evCostMonth = kwhPerMonth * electricityRate;

    const monthlySaved = gasCostMonth - evCostMonth;
    const yearlySaved = monthlySaved * 12;
    const fiveYearSaved = yearlySaved * 5;

    // CO2 reduction (approx 2.3 kg CO2 per liter of gasoline)
    const co2SavedKgYear = Math.round(litersPerMonth * 12 * 2.3);
    const treesEquivalent = Math.round(co2SavedKgYear / 22); // 1 tree absorbs ~22kg CO2/year

    return {
      gasCostMonth,
      evCostMonth,
      monthlySaved,
      yearlySaved,
      fiveYearSaved,
      co2SavedKgYear,
      treesEquivalent
    };
  }, [monthlyKm, selectedEvId, gasPrice, gasConsumption, electricityRate]);

  // Calculations for Loan
  const loanData = useMemo(() => {
    const car = CAR_MODELS.find(c => c.id === loanCarId) || CAR_MODELS[0];
    const carPrice = car.basePrice;

    const downPaymentAmount = Math.round(carPrice * (downPaymentPercent / 100));
    const principalLoanAmount = carPrice - downPaymentAmount;

    // Monthly interest calculation (decreasing balance approx or flat estimate)
    const monthlyRate = (interestRateYear / 100) / 12;
    const monthlyPrincipal = Math.round(principalLoanAmount / loanTermMonths);
    const firstMonthInterest = Math.round(principalLoanAmount * monthlyRate);
    const estimatedMonthlyPayment = monthlyPrincipal + firstMonthInterest;

    return {
      car,
      carPrice,
      downPaymentAmount,
      principalLoanAmount,
      monthlyPrincipal,
      firstMonthInterest,
      estimatedMonthlyPayment
    };
  }, [loanCarId, downPaymentPercent, loanTermMonths, interestRateYear]);

  return (
    <section className="calculator-section">
      <div className="calc-header">
        <div className="badge-tag badge-cyan">
          <TrendingUp size={14} />
          <span>Công Cụ Tài Chính Độc Quyền</span>
        </div>
        <h2 className="calc-title">Ước Tính Chi Phí & Tài Chính</h2>
        <p className="calc-subtitle">
          Khám phá bài toán kinh tế thông minh khi sở hữu xe điện EV-olution và lập kế hoạch vay trả góp dễ dàng.
        </p>

        {/* Tab switchers */}
        <div className="calc-mode-switch">
          <button 
            className={`mode-btn ${activeTab === 'SAVINGS' ? 'active' : ''}`}
            onClick={() => setActiveTab('SAVINGS')}
          >
            <Fuel size={18} />
            <span>Tiết kiệm Xăng vs Điện</span>
          </button>
          <button 
            className={`mode-btn ${activeTab === 'LOAN' ? 'active' : ''}`}
            onClick={() => setActiveTab('LOAN')}
          >
            <CreditCard size={18} />
            <span>Ước tính Vay Trả Góp</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SAVINGS CALCULATOR */}
      {activeTab === 'SAVINGS' && (
        <div className="calc-grid">
          {/* Controls */}
          <div className="calc-controls glass-panel">
            <h3 className="panel-heading">Nhập Thông Tin Di Chuyển</h3>

            {/* Slider Distance */}
            <div className="input-group">
              <div className="input-header">
                <span className="input-label">Quãng đường di chuyển hàng tháng</span>
                <span className="input-val-highlight">{monthlyKm.toLocaleString()} km/tháng</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100" 
                value={monthlyKm} 
                onChange={(e) => setMonthlyKm(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>500 km</span>
                <span>2,500 km</span>
                <span>5,000 km</span>
              </div>
            </div>

            {/* Select EV Model */}
            <div className="input-group">
              <label className="input-label">Mẫu xe điện muốn so sánh</label>
              <select 
                value={selectedEvId} 
                onChange={(e) => setSelectedEvId(e.target.value)}
                className="calc-select"
              >
                {CAR_MODELS.map(car => (
                  <option key={car.id} value={car.id}>{car.name} ({car.category})</option>
                ))}
              </select>
            </div>

            {/* Gas settings */}
            <div className="two-cols-inputs">
              <div className="input-group">
                <label className="input-label">Giá xăng hiện tại (đ/lít)</label>
                <input 
                  type="number" 
                  value={gasPrice} 
                  onChange={(e) => setGasPrice(Number(e.target.value))}
                  className="calc-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Mức tiêu thụ xe xăng (L/100km)</label>
                <input 
                  type="number" 
                  step="0.5" 
                  value={gasConsumption} 
                  onChange={(e) => setGasConsumption(Number(e.target.value))}
                  className="calc-input"
                />
              </div>
            </div>

            {/* Eco info card */}
            <div className="calc-eco-badge">
              <Leaf size={24} className="eco-icon" />
              <div>
                <div className="eco-title">Giảm {savingsData.co2SavedKgYear.toLocaleString()} kg $CO_2$/năm</div>
                <div className="eco-desc">Tương đương với việc trồng mới khoảng <strong>{savingsData.treesEquivalent} cây xanh</strong> mỗi năm.</div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="calc-results glass-panel">
            <h3 className="panel-heading">Hiệu Quả Kinh Tế Thực Tế</h3>

            <div className="cost-comparison-bars">
              <div className="cost-card gas-card">
                <div className="cost-head">
                  <Fuel size={20} />
                  <span>Chi phí xe xăng / tháng</span>
                </div>
                <div className="cost-amount">{formatVnd(savingsData.gasCostMonth)}</div>
                <div className="cost-sub">Dựa trên {gasConsumption}L/100km</div>
              </div>

              <div className="cost-card ev-card">
                <div className="cost-head">
                  <Zap size={20} />
                  <span>Chi phí sạc điện / tháng</span>
                </div>
                <div className="cost-amount text-cyan">{formatVnd(savingsData.evCostMonth)}</div>
                <div className="cost-sub">Chỉ bằng ~25% chi phí xăng</div>
              </div>
            </div>

            <div className="savings-highlight-card">
              <span className="savings-sub-title">Tiết kiệm dự kiến mỗi năm</span>
              <div className="savings-big-val">{formatVnd(savingsData.yearlySaved)}</div>
              <div className="savings-pill">
                Sau 5 năm sở hữu tiết kiệm đến <strong>{formatVnd(savingsData.fiveYearSaved)}</strong>
              </div>
            </div>

            <div className="calc-actions">
              <button className="glow-btn-orange btn-full" onClick={onOpenDeposit}>
                <CreditCard size={18} />
                <span>Đặt cọc xe để nhận ưu đãi sạc miễn phí</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOAN FINANCING CALCULATOR */}
      {activeTab === 'LOAN' && (
        <div className="calc-grid">
          {/* Controls */}
          <div className="calc-controls glass-panel">
            <h3 className="panel-heading">Thông Số Vay Mua Xe</h3>

            {/* Choose Car */}
            <div className="input-group">
              <label className="input-label">Mẫu xe & Giá niêm yết</label>
              <select 
                value={loanCarId} 
                onChange={(e) => setLoanCarId(e.target.value)}
                className="calc-select"
              >
                {CAR_MODELS.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.name} - {formatVnd(car.basePrice)}
                  </option>
                ))}
              </select>
            </div>

            {/* Slider Down Payment */}
            <div className="input-group">
              <div className="input-header">
                <span className="input-label">Tỷ lệ trả trước (%)</span>
                <span className="input-val-highlight">{downPaymentPercent}% ({formatVnd(loanData.downPaymentAmount)})</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="80" 
                step="5" 
                value={downPaymentPercent} 
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>20%</span>
                <span>50%</span>
                <span>80%</span>
              </div>
            </div>

            {/* Slider Loan Term */}
            <div className="input-group">
              <div className="input-header">
                <span className="input-label">Thời hạn vay</span>
                <span className="input-val-highlight">{loanTermMonths / 12} năm ({loanTermMonths} tháng)</span>
              </div>
              <input 
                type="range" 
                min="12" 
                max="96" 
                step="12" 
                value={loanTermMonths} 
                onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>1 năm</span>
                <span>4 năm</span>
                <span>8 năm</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="input-group">
              <label className="input-label">Lãi suất ưu đãi năm (%/năm)</label>
              <input 
                type="number" 
                step="0.1" 
                value={interestRateYear} 
                onChange={(e) => setInterestRateYear(Number(e.target.value))}
                className="calc-input"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="calc-results glass-panel">
            <h3 className="panel-heading">Bảng Phân Bổ Tài Chính Hàng Tháng</h3>

            <div className="loan-highlight-box">
              <span className="loan-box-label">Ước tính thanh toán tháng đầu tiên</span>
              <div className="loan-monthly-big text-cyan">
                {formatVnd(loanData.estimatedMonthlyPayment)}
                <span className="loan-month-unit">/tháng</span>
              </div>
              <p className="loan-sub-text">(Bao gồm gốc + lãi, số tiền lãi giảm dần theo dư nợ thực tế)</p>
            </div>

            <div className="loan-breakdown-list">
              <div className="loan-item-row">
                <span className="loan-item-title">Giá xe niêm yết</span>
                <span className="loan-item-val">{formatVnd(loanData.carPrice)}</span>
              </div>

              <div className="loan-item-row">
                <span className="loan-item-title">Số tiền trả trước ({downPaymentPercent}%)</span>
                <span className="loan-item-val font-bold">{formatVnd(loanData.downPaymentAmount)}</span>
              </div>

              <div className="loan-item-row">
                <span className="loan-item-title">Số tiền vay ngân hàng</span>
                <span className="loan-item-val text-cyan font-bold">{formatVnd(loanData.principalLoanAmount)}</span>
              </div>

              <div className="loan-item-row">
                <span className="loan-item-title">Tiền gốc hàng tháng</span>
                <span className="loan-item-val">{formatVnd(loanData.monthlyPrincipal)}</span>
              </div>

              <div className="loan-item-row">
                <span className="loan-item-title">Lãi suất tháng đầu tiên</span>
                <span className="loan-item-val">{formatVnd(loanData.firstMonthInterest)}</span>
              </div>
            </div>

            <div className="calc-actions">
              <button className="glow-btn-cyan btn-full" onClick={() => onOpenTestDrive(loanData.car.id)}>
                <Calendar size={18} />
                <span>Đặt lịch lái thử xe {loanData.car.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Calculator;
