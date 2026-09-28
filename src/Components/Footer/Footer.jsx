import './Footer.css';
import { Zap, Phone, Send, ArrowUp, Youtube, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = ({ setActiveTab, onOpenTestDrive, onOpenDeposit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook,  href: '#', label: 'Facebook' },
    { icon: Youtube,   href: '#', label: 'YouTube'  },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter,   href: '#', label: 'Twitter'  },
  ];

  return (
    <footer className="footer-wrap">
      <div className="footer-content">
        {/* Gradient border layer */}
        <div className="footer-content-border" />

        <div className="footer-grid">
          {/* ── Brand Col ─────────────────── */}
          <div className="footer-brand-col">
            <div className="footer-logo" onClick={() => handleNav('home')}>
              <div className="f-logo-icon">
                <Zap size={22} className="text-cyan" style={{ filter: 'drop-shadow(0 0 6px rgba(0,242,254,0.8))' }} />
              </div>
              <span className="f-logo-text">EV<span className="text-cyan">-olution</span></span>
            </div>

            <p className="footer-bio">
              Định hình tương lai di chuyển thuần điện bền vững. Kết nối trí tuệ nhân tạo,
              thiết kế khí động học và công nghệ pin an toàn hàng đầu thế giới.
            </p>

            <div className="footer-hotline-badge">
              <Phone size={16} className="text-orange" />
              <div>
                <span>Hotline tư vấn &amp; Lái thử</span>
                <strong>1900 8888</strong>
              </div>
            </div>

            {/* Social row */}
            <div className="footer-social-row">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="f-social-btn" title={label} aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav Links Col ─────────────── */}
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

          {/* ── Ecosystem Col ─────────────── */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Hệ Sinh Thái &amp; Dịch Vụ</h4>
            <ul className="footer-links-list">
              <li onClick={() => handleNav('charging')}>Bản Đồ 3.500+ Trạm Sạc</li>
              <li onClick={() => handleNav('charging')}>Trụ Sạc Wallbox Tại Nhà</li>
              <li onClick={() => handleNav('services')}>Bảo Hành Pin 10 Năm</li>
              <li onClick={() => handleNav('services')}>Cứu Hộ Khẩn Cấp 24/7</li>
              <li onClick={() => handleNav('services')}>Đặt Hẹn Bảo Dưỡng Online</li>
            </ul>
          </div>

          {/* ── Newsletter Col ─────────────── */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Nhận Tin Tức EV</h4>
            <p className="f-newsletter-sub">
              Nhận ưu đãi đặt cọc sớm, bản tin công nghệ pin và lời mời tham gia sự kiện lái thử.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Cảm ơn bạn đã đăng ký nhận tin từ EV-olution!');
              }}
              className="f-news-form"
            >
              <input
                type="email"
                required
                placeholder="Địa chỉ email của bạn..."
                className="f-news-input"
              />
              <button type="submit" className="f-news-btn glow-btn-cyan" title="Đăng ký">
                <Send size={15} />
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

        {/* ── Bottom Bar ─────────────────── */}
        <div className="footer-bottom-bar">
          <p className="f-copyright">
            © 2026 EV-olution Technologies Inc. Tất cả quyền được bảo lưu.
          </p>
          <div className="f-bottom-links">
            <span>Chính sách bảo mật</span>
            <span style={{ color: '#1e293b' }}>•</span>
            <span>Điều khoản dịch vụ</span>
            <span style={{ color: '#1e293b' }}>•</span>
            <span>Euro NCAP 5★</span>
          </div>
          <button className="scroll-top-btn" onClick={scrollToTop} title="Lên đầu trang">
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
