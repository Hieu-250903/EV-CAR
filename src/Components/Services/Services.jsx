import { useState } from 'react';
import './Services.css';
import { EV_FAQS, SHOWROOMS } from '../../data/evData';
import { 
  ShieldCheck, 
  Wrench, 
  Wifi, 
  Truck, 
  Clock, 
  ChevronDown, 
  CheckCircle2, 
  PhoneCall, 
  Calendar,
  Zap
} from 'lucide-react';

const Services = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [serviceBooked, setServiceBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carPlate: '',
    serviceType: 'Bảo dưỡng định kỳ 20.000 km',
    showroom: SHOWROOMS[0].id,
    date: '2026-10-05',
    time: '09:00'
  });

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleSubmitService = (e) => {
    e.preventDefault();
    setServiceBooked(true);
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <div className="badge-tag badge-cyan">
          <ShieldCheck size={14} />
          <span>Hệ Sinh Thái Hậu Mãi Toàn Diện</span>
        </div>
        <h2 className="services-title">EV-olution Care: Đồng Hành Trọn Vẹn</h2>
        <p className="services-subtitle">
          Chính sách bảo hành vượt trội và dịch vụ chăm sóc khách hàng 24/7 mang đến sự an tâm tuyệt đối trên mọi cây số.
        </p>
      </div>

      {/* 4 Pillars of EV-Care */}
      <div className="services-pillars-grid">
        <div className="pillar-card glass-panel">
          <div className="pillar-icon-box cyan">
            <ShieldCheck size={28} />
          </div>
          <h3 className="pillar-title">Bảo Hành Pin 10 Năm</h3>
          <p className="pillar-desc">
            Cam kết bảo hành Pin cao áp và Hệ thống truyền động điện trong <strong>10 năm hoặc 200.000 km</strong>. 
            Đổi mới miễn phí nếu dung lượng suy giảm quá 30%.
          </p>
        </div>

        <div className="pillar-card glass-panel">
          <div className="pillar-icon-box orange">
            <Truck size={28} />
          </div>
          <h3 className="pillar-title">Cứu Hộ Pin Khẩn Cấp 24/7</h3>
          <p className="pillar-desc">
            Xe sạc lưu động chuyên dụng sẵn sàng tiếp cận trong 30 phút tại các thành phố lớn để sạc khẩn cấp khi xe hết pin giữa đường.
          </p>
        </div>

        <div className="pillar-card glass-panel">
          <div className="pillar-icon-box green">
            <Wifi size={28} />
          </div>
          <h3 className="pillar-title">Cập Nhật Phần Mềm OTA</h3>
          <p className="pillar-desc">
            Xe tự động nâng cấp tính năng tự lái, tối ưu hóa thuật toán quản lý pin và mở khóa các tiện ích giải trí mới qua mạng Internet trọn đời.
          </p>
        </div>

        <div className="pillar-card glass-panel">
          <div className="pillar-icon-box cyan">
            <Wrench size={28} />
          </div>
          <h3 className="pillar-title">Dịch Vụ Sửa Chữa Lưu Động</h3>
          <p className="pillar-desc">
            Kỹ thuật viên chính hãng đến tận nhà hoặc cơ quan để kiểm tra, bảo dưỡng định kỳ và thay thế phụ tùng đơn giản mà không cần đến đại lý.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Service Booking Form + FAQ */}
      <div className="services-split">
        {/* Booking Form */}
        <div className="service-booking-form glass-panel">
          <h3 className="booking-title">Đặt Hẹn Dịch Vụ & Bảo Dưỡng</h3>
          <p className="booking-desc">Điền thông tin bên dưới để được kỹ thuật viên tiếp nhận nhanh chóng.</p>

          {serviceBooked ? (
            <div className="booking-success-box">
              <CheckCircle2 size={48} className="text-green" />
              <h4>Đặt Lịch Thành Công!</h4>
              <p>Mã lịch hẹn của bạn là: <strong>EV-SRV-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
              <p className="sub">Nhân viên cố vấn dịch vụ sẽ gọi điện thoại xác nhận với bạn trong vòng 15 phút.</p>
              <button className="glow-btn-cyan btn-full mt-4" onClick={() => setServiceBooked(false)}>
                Đặt thêm lịch hẹn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitService} className="form-stack">
              <div className="form-group">
                <label>Họ và tên chủ xe</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="calc-input"
                />
              </div>

              <div className="two-cols-inputs">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="calc-input"
                  />
                </div>
                <div className="form-group">
                  <label>Biển số xe / Dòng xe</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="30K - 888.88"
                    value={formData.carPlate}
                    onChange={(e) => setFormData({...formData, carPlate: e.target.value})}
                    className="calc-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nội dung dịch vụ yêu cầu</label>
                <select 
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  className="calc-select"
                >
                  <option value="Bảo dưỡng định kỳ 20.000 km">Bảo dưỡng định kỳ (20.000 km / 1 năm)</option>
                  <option value="Kiểm tra & Cân bằng tế bào Pin">Kiểm tra & Cân bằng tế bào Pin</option>
                  <option value="Cập nhật phần mềm hệ thống">Nâng cấp phần mềm & Kiểm tra cảm biến ADAS</option>
                  <option value="Lắp đặt trụ sạc Wallbox tại nhà">Khảo sát & Lắp đặt trụ sạc Wallbox tại nhà</option>
                </select>
              </div>

              <div className="two-cols-inputs">
                <div className="form-group">
                  <label>Ngày hẹn</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="calc-input"
                  />
                </div>
                <div className="form-group">
                  <label>Khung giờ</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="calc-select"
                  >
                    <option value="08:30">08:30 Sáng</option>
                    <option value="10:00">10:00 Sáng</option>
                    <option value="14:00">02:00 Chiều</option>
                    <option value="16:00">04:00 Chiều</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="glow-btn-cyan btn-full">
                <Calendar size={18} />
                <span>Xác nhận đặt lịch bảo dưỡng</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="faq-container">
          <h3 className="faq-main-title">Câu Hỏi Thường Gặp Về Xe Điện</h3>
          <div className="faq-list">
            {EV_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-card glass-panel ${isOpen ? 'open' : ''}`}>
                  <div className="faq-question-row" onClick={() => toggleFaq(index)}>
                    <span className="faq-q-text">{faq.q}</span>
                    <ChevronDown size={20} className={`faq-arrow-icon ${isOpen ? 'rotated' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="faq-answer-row">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hotline Emergency Box */}
          <div className="hotline-box glass-panel">
            <div className="hotline-icon">
              <PhoneCall size={24} className="text-orange" />
            </div>
            <div>
              <span className="hotline-label">Tổng đài cứu hộ pin khẩn cấp 24/7:</span>
              <div className="hotline-number">1900 8888 (Miễn cước cuộc gọi)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
