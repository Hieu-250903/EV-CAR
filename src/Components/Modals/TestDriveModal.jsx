import { useState } from 'react';
import './Modals.css';
import { CAR_MODELS, SHOWROOMS } from '../../data/evData';
import { 
  X, 
  CalendarCheck, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Sparkles 
} from 'lucide-react';

const TestDriveModal = ({ isOpen, onClose, defaultModelId = 'apex-gt' }) => {
  const [modelId, setModelId] = useState(defaultModelId);
  const [showroomId, setShowroomId] = useState(SHOWROOMS[0].id);
  const [date, setDate] = useState('2026-10-06');
  const [time, setTime] = useState('09:30');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [licenseConfirmed, setLicenseConfirmed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const selectedCar = CAR_MODELS.find(c => c.id === modelId) || CAR_MODELS[0];
  const selectedShowroom = SHOWROOMS.find(s => s.id === showroomId) || SHOWROOMS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!licenseConfirmed) {
      alert('Vui lòng xác nhận bạn đã có bằng lái xe ô tô hợp lệ.');
      return;
    }
    const randomTicket = 'EV-TD-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="modal-header">
              <div className="badge-tag badge-cyan">
                <CalendarCheck size={14} />
                <span>Trải Nghiệm Thực Tế</span>
              </div>
              <h2 className="modal-title">Đăng Ký Lái Thử Xe Điện</h2>
              <p className="modal-desc">
                Cảm nhận sức mạnh tăng tốc tức thì, không gian tĩnh lặng và công nghệ tự hành hàng đầu cùng chuyên gia EV-olution.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-stack">
              {/* Select Car */}
              <div className="modal-field">
                <label className="modal-label">1. Chọn mẫu xe muốn lái thử</label>
                <div className="modal-car-options">
                  {CAR_MODELS.map(car => (
                    <div 
                      key={car.id} 
                      className={`modal-car-pill ${modelId === car.id ? 'active' : ''}`}
                      onClick={() => setModelId(car.id)}
                    >
                      <img src={car.image} alt={car.name} className="modal-car-thumb" />
                      <div className="modal-car-info">
                        <span className="car-pill-name">{car.name}</span>
                        <span className="car-pill-type">{car.category} • {car.power}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showroom & Time */}
              <div className="two-cols-inputs">
                <div className="modal-field">
                  <label className="modal-label">2. Showroom tiếp nhận</label>
                  <select 
                    value={showroomId} 
                    onChange={(e) => setShowroomId(e.target.value)}
                    className="calc-select"
                  >
                    {SHOWROOMS.map(sr => (
                      <option key={sr.id} value={sr.id}>
                        {sr.name} ({sr.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="two-cols-inputs">
                  <div className="modal-field">
                    <label className="modal-label">Ngày hẹn</label>
                    <input 
                      type="date" 
                      required 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      className="calc-input" 
                    />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Giờ hẹn</label>
                    <select 
                      value={time} 
                      onChange={(e) => setTime(e.target.value)}
                      className="calc-select"
                    >
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="14:00">14:00</option>
                      <option value="16:00">16:00</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="modal-field">
                <label className="modal-label">3. Thông tin người lái thử</label>
                <div className="form-stack">
                  <input 
                    type="text" 
                    required 
                    placeholder="Họ và tên của bạn *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="calc-input"
                  />
                  <div className="two-cols-inputs">
                    <input 
                      type="tel" 
                      required 
                      placeholder="Số điện thoại liên hệ *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="calc-input"
                    />
                    <input 
                      type="email" 
                      required 
                      placeholder="Email nhận mã vé *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="calc-input"
                    />
                  </div>
                </div>
              </div>

              {/* License Confirm Checkbox */}
              <label className="license-checkbox-row">
                <input 
                  type="checkbox" 
                  checked={licenseConfirmed} 
                  onChange={(e) => setLicenseConfirmed(e.target.checked)}
                />
                <span>Tôi xác nhận đã có Giấy phép lái xe ô tô (B1/B2) còn hiệu lực và sẽ mang theo khi đến lái thử.</span>
              </label>

              <button type="submit" className="glow-btn-cyan btn-full modal-submit-btn">
                <CalendarCheck size={18} />
                <span>Xác Nhận Đặt Lịch Lái Thử Miễn Phí</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket Card */
          <div className="test-drive-ticket">
            <div className="ticket-success-header">
              <CheckCircle2 size={44} className="text-green" />
              <h3>Đăng Ký Lái Thử Thành Công!</h3>
              <p>Mã đặt hẹn chính thức của bạn đã được ghi nhận trên hệ thống.</p>
            </div>

            <div className="ticket-pass-card glass-panel">
              <div className="ticket-left">
                <div className="ticket-code-badge">{ticketId}</div>
                <h4 className="ticket-car-name">{selectedCar.name}</h4>
                <p className="ticket-car-tag">{selectedCar.tagline}</p>

                <div className="ticket-meta-grid">
                  <div className="meta-box">
                    <span className="lbl">Khách hàng:</span>
                    <strong className="val">{fullName || 'Quý khách'}</strong>
                  </div>
                  <div className="meta-box">
                    <span className="lbl">Thời gian:</span>
                    <strong className="val">{date} lúc {time}</strong>
                  </div>
                  <div className="meta-box full">
                    <span className="lbl">Địa điểm:</span>
                    <strong className="val">{selectedShowroom.name}</strong>
                    <span className="sub-addr">{selectedShowroom.address}</span>
                  </div>
                </div>
              </div>

              <div className="ticket-right-qr">
                <div className="qr-box">
                  <QrCode size={80} className="text-cyan" />
                  <span className="qr-caption">Quét QR khi đến Check-in</span>
                </div>
              </div>
            </div>

            <p className="ticket-note">
              * Chuyên viên lái thử sẽ chuẩn bị sẵn xe và liên hệ với bạn qua số điện thoại <strong>{phone}</strong> trước giờ hẹn 30 phút.
            </p>

            <button className="glow-btn-cyan btn-full mt-4" onClick={handleReset}>
              Hoàn tất & Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDriveModal;
