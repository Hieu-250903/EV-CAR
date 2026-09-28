import './Footer.css';
import { Zap, Phone, Send, ArrowUp } from 'lucide-react';

// lucide-react phiên bản này không export các social icon — dùng SVG inline
const FacebookIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YoutubeIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const XIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);


const Footer = ({ setActiveTab, onOpenTestDrive, onOpenDeposit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FacebookIcon,  href: '#', label: 'Facebook'  },
    { icon: YoutubeIcon,   href: '#', label: 'YouTube'   },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: XIcon,         href: '#', label: 'Twitter'   },
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
