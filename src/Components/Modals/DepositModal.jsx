import { useState } from 'react';
import './Modals.css';
import { CAR_MODELS } from '../../data/evData';
import { 
  X, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

const DepositModal = ({ isOpen, onClose, configData }) => {
  // If config passed from configurator, use it, else default
  const defaultModel = CAR_MODELS[0];
  const model = configData?.model || defaultModel;
  const trim = configData?.trim || model.trims[0];
  const color = configData?.color || model.colors[0];
  const wheel = configData?.wheel || model.wheels[0];
  const interior = configData?.interior || model.interiors[0];
  const techPacks = configData?.techPacks || [];
  const totalPrice = configData?.totalPrice || model.basePrice;
  const depositAmount = 30000000; // 30M VND

  const [paymentMethod, setPaymentMethod] = useState('VIETQR'); // 'VIETQR', 'CARD', 'VNPAY'
  const [ownerName, setOwnerName] = useState('');
  const [ownerIdCard, setOwnerIdCard] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Hà Nội');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const formatVnd = (num) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Vui lòng đồng ý với điều khoản đặt cọc xe.');
      return;
    }
    const code = 'EV-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel deposit-modal-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {!isSuccess ? (
          <div>
            <div className="modal-header">
              <div className="badge-tag badge-orange">
                <CreditCard size={14} />
                <span>Đặt Cọc Giữ Chỗ Ưu Tiên</span>
              </div>
              <h2 className="modal-title">Đặt Cọc Mua Xe Trực Tuyến</h2>
              <p className="modal-desc">
                Giữ suất nhận xe đợt đầu tiên kèm gói ưu đãi 01 năm sạc miễn phí và bảo hành pin 10 năm.
              </p>
            </div>

            <div className="deposit-body-grid">
              {/* Left Column: Car Summary */}
              <div className="deposit-car-summary glass-panel">
                <h4 className="summary-section-title">Cấu Hình Xe Đã Chọn</h4>
                <div className="deposit-thumb-box">
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="deposit-car-img" 
                    style={{ filter: color.filter }}
                  />
                </div>

                <div className="deposit-car-name-row">
                  <h3 className="deposit-model-title">{model.name}</h3>
                  <span className="deposit-trim-badge">{trim.name}</span>
                </div>

                <div className="deposit-spec-items">
                  <div className="spec-line">
                    <span>Màu sơn:</span>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="color-swatch-circle" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </strong>
                  </div>
                  <div className="spec-line">
                    <span>Mâm xe:</span>
                    <strong>{wheel.name}</strong>
                  </div>
                  <div className="spec-line">
                    <span>Nội thất:</span>
                    <strong>{interior.name}</strong>
                  </div>
                  {techPacks.length > 0 && (
                    <div className="spec-line">
                      <span>Gói công nghệ:</span>
                      <strong>{techPacks.map(p => p.name.split('(')[0]).join(', ')}</strong>
                    </div>
                  )}
                </div>

                <div className="deposit-totals-box">
                  <div className="spec-line">
                    <span>Tổng giá trị xe:</span>
                    <span className="total-vehicle-price">{formatVnd(totalPrice)}</span>
                  </div>
                  <div className="spec-line highlight-deposit-row">
                    <span>Số tiền đặt cọc giữ chỗ:</span>
                    <span className="deposit-price-tag text-orange">{formatVnd(depositAmount)}</span>
                  </div>
                  <p className="deposit-guarantee-note">
                    <ShieldCheck size={16} className="text-green" />
                    <span>Cam kết hoàn cọc 100% không mất phí trong vòng 14 ngày nếu quý khách đổi ý.</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Order Form & Payment Method */}
              <form onSubmit={handleDepositSubmit} className="deposit-form-right">
                <h4 className="summary-section-title">Thông Tin Chủ Sở Hữu Đứng Tên Hợp Đồng</h4>

                <div className="form-stack">
                  <div className="form-group">
                    <label>Họ và tên chủ xe (theo CCCD) *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ví dụ: Trần Minh Hoàng"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="calc-input"
                    />
                  </div>

                  <div className="two-cols-inputs">
                    <div className="form-group">
                      <label>Số CCCD / Hộ chiếu *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="001201018888"
                        value={ownerIdCard}
                        onChange={(e) => setOwnerIdCard(e.target.value)}
                        className="calc-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại nhận SMS *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="0988 123 456"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="calc-input"
                      />
                    </div>
                  </div>

                  <div className="two-cols-inputs">
                    <div className="form-group">
                      <label>Email nhận hợp đồng điện tử *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="hoang.tran@gmail.com"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        className="calc-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Tỉnh/Thành phố nhận bàn giao xe</label>
                      <select 
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className="calc-select"
                      >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <h4 className="summary-section-title mt-4">Phương Thức Thanh Toán Đặt Cọc</h4>
                <div className="payment-methods-grid">
                  <div 
                    className={`payment-option-card ${paymentMethod === 'VIETQR' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('VIETQR')}
                  >
                    <QrCode size={22} className="method-icon" />
                    <div>
                      <div className="method-title">Quét mã QR Ngân hàng (VietQR)</div>
                      <div className="method-sub">Xử lý tự động tức thì 24/7</div>
                    </div>
                  </div>

                  <div 
                    className={`payment-option-card ${paymentMethod === 'CARD' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('CARD')}
                  >
                    <CreditCard size={22} className="method-icon" />
                    <div>
                      <div className="method-title">Thẻ Quốc Tế (Visa / Mastercard)</div>
                      <div className="method-sub">Bảo mật chuẩn 3D Secure</div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'VIETQR' && (
                  <div className="vietqr-box glass-panel">
                    <div className="vietqr-code-holder">
                      <QrCode size={110} className="text-cyan" />
                    </div>
                    <div className="vietqr-info">
                      <div className="qr-row"><strong>Ngân hàng:</strong> Techcombank</div>
                      <div className="qr-row"><strong>Số tài khoản:</strong> 1903 8888 6666 99</div>
                      <div className="qr-row"><strong>Chủ TK:</strong> CONG TY CP XE DIEN EV-OLUTION</div>
                      <div className="qr-row"><strong>Nội dung:</strong> {ownerPhone ? `COC ${ownerPhone}` : 'COC XEDIEN EV'}</div>
                    </div>
                  </div>
                )}

                <label className="license-checkbox-row mt-3">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted} 
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span>Tôi đã đọc và đồng ý với Quy chế giao dịch và Thỏa thuận đặt cọc mua xe của EV-olution.</span>
                </label>

                <button type="submit" className="glow-btn-orange btn-full modal-submit-btn">
                  <Lock size={16} />
                  <span>Xác Nhận Thanh Toán Đặt Cọc {formatVnd(depositAmount)}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="deposit-success-screen">
            <div className="success-badge-icon">
              <CheckCircle2 size={54} className="text-green" />
            </div>
            <h2 className="success-title">Đặt Cọc Xe Thành Công!</h2>
            <p className="success-desc">
              Chúc mừng quý khách <strong>{ownerName}</strong> đã trở thành một trong những chủ nhân đầu tiên sở hữu <strong>{model.name}</strong>.
            </p>

            <div className="order-ticket-panel glass-panel">
              <div className="order-head">
                <div>
                  <span className="order-head-lbl">MÃ HỢP ĐỒNG ĐIỆN TỬ</span>
                  <div className="order-code-text">{orderCode}</div>
                </div>
                <div className="order-status-pill">Đã xác nhận cọc</div>
              </div>

              <div className="order-specs-grid">
                <div className="order-spec-item">
                  <span className="lbl">Mẫu xe:</span>
                  <strong>{model.name} ({trim.name})</strong>
                </div>
                <div className="order-spec-item">
                  <span className="lbl">Màu sắc:</span>
                  <strong>{color.name}</strong>
                </div>
                <div className="order-spec-item">
                  <span className="lbl">Số tiền đã cọc:</span>
                  <strong className="text-cyan">{formatVnd(depositAmount)}</strong>
                </div>
                <div className="order-spec-item">
                  <span className="lbl">Địa điểm bàn giao:</span>
                  <strong>Showroom EV-olution {deliveryCity}</strong>
                </div>
                <div className="order-spec-item">
                  <span className="lbl">Thời gian dự kiến giao xe:</span>
                  <strong className="text-green">Quý 4 / 2026</strong>
                </div>
                <div className="order-spec-item">
                  <span className="lbl">Email nhận hợp đồng:</span>
                  <strong>{ownerEmail}</strong>
                </div>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                className="btn-outline-action"
                onClick={() => alert(`Đang tải file hợp đồng đặt cọc ${orderCode}.pdf...`)}
              >
                <Download size={16} />
                <span>Tải Hợp Đồng Điện Tử (PDF)</span>
              </button>

              <button className="glow-btn-cyan" onClick={handleClose}>
                <span>Về Trang Chủ</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositModal;
