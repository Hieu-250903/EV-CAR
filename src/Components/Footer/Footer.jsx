import './Footer.css';
import { Zap, Phone, Mail, MapPin, Send, ShieldCheck, ArrowUp } from 'lucide-react';

const Footer = ({ setActiveTab, onOpenTestDrive, onOpenDeposit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="footer-content glass-panel">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo" onClick={() => handleNav('home')}>
              <div className="f-logo-icon">
                <Zap size={22} className="text-cyan" />
              </div>
              <span className="f-logo-text">EV<span className="text-cyan">-olution</span></span>
            </div>
            <p className="footer-bio">
              Định hình tương lai di chuyển thuần điện bền vững. Kết nối trí tuệ nhân tạo, thiết kế khí động học 
              và công nghệ pin an toàn hàng đầu thế giới.
            </p>
            <div className="footer-hotline-badge">
              <Phone size={16} className="text-orange" />
              <div>
                <span>Hotline tư vấn & Lái thử:</span>
                <strong>1900 8888</strong>
              </div>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Khám Phá Dòng Xe</h4>
            <ul className="footer-links-list">
              <li onClick={() => handleNav('models')}>EV-Apex GT (Sedan Thể Thao)</li>
              <li onClick={() => handleNav('models')}>EV-Titan Pro (SUV 7 Chỗ)</li>
              <li onClick={() => handleNav('models')}>EV-Nova Urban (Crossover)</li>
              <li onClick={() => handleNav('configurator')}>Trình Tùy Biến Xe Trực Quan</li>
              <li onClick={() => handleNav('calculator')}>Bảng Tính Tiết Kiệm Xăng/Điện</li>
            </ul>
          </div>

          {/* Ecosystem Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Hệ Sinh Thái Sạc & Dịch Vụ</h4>
            <ul className="footer-links-list">
              <li onClick={() => handleNav('charging')}>Bản Đồ 3.500+ Trạm Sạc</li>
              <li onClick={() => handleNav('charging')}>Giải Pháp Trụ Sạc Wallbox Tại Nhà</li>
              <li onClick={() => handleNav('services')}>Chính Sách Bảo Hành Pin 10 Năm</li>
              <li onClick={() => handleNav('services')}>Cứu Hộ Pin Khẩn Cấp 24/7</li>
              <li onClick={() => handleNav('services')}>Đặt Hẹn Bảo Dưỡng Trực Tuyến</li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Đăng Ký Nhận Tin Tức EV</h4>
            <p className="f-newsletter-sub">
              Nhận thông báo ưu đãi đặt cọc sớm, bản tin công nghệ pin và lời mời tham gia sự kiện lái thử.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận tin từ EV-olution!'); }} className="f-news-form">
              <input type="email" required placeholder="Nhập địa chỉ email của bạn..." className="f-news-input" />
              <button type="submit" className="f-news-btn glow-btn-cyan" title="Gửi email">
                <Send size={16} />
              </button>
            </form>
            <div className="footer-actions-row">
              <button className="f-action-pill" onClick={onOpenTestDrive}>
                Đăng ký lái thử
              </button>
              <button className="f-action-pill orange" onClick={onOpenDeposit}>
                Đặt cọc xe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="f-copyright">
            © 2026 EV-olution Technologies Inc. Tất cả quyền được bảo lưu. Thiết kế & phát triển cho tương lai xanh.
          </p>
          <div className="f-bottom-links">
            <span>Chính sách bảo mật</span> • 
            <span>Điều khoản dịch vụ</span> • 
            <span>Tiêu chuẩn an toàn Euro NCAP</span>
          </div>
          <button className="scroll-top-btn" onClick={scrollToTop} title="Lên đầu trang">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
