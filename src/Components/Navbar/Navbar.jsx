import { useState } from 'react';
import './Navbar.css';
import { 
  Zap, 
  Car, 
  Sliders, 
  Calculator, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  CalendarCheck,
  CreditCard 
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onOpenTestDrive, onOpenDeposit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Zap },
    { id: 'models', label: 'Dòng xe', icon: Car },
    { id: 'configurator', label: 'Tùy biến xe', icon: Sliders },
    { id: 'calculator', label: 'Tính chi phí & Vay', icon: Calculator },
    { id: 'charging', label: 'Trạm sạc', icon: MapPin },
    { id: 'services', label: 'Dịch vụ & Bảo hành', icon: ShieldCheck },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="nav-container">
      <nav className="nav glass-panel">
        {/* Brand Logo */}
        <div className="nav-logo-wrap" onClick={() => handleNavClick('home')}>
          <div className="nav-logo-icon">
            <Zap size={22} className="logo-spark" />
          </div>
          <span className="nav-logo-text">
            EV<span className="text-cyan">-olution</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} className="nav-item-icon" />
                <span>{item.label}</span>
                {isActive && <div className="active-glow-pill" />}
              </li>
            );
          })}
        </ul>

        {/* Action CTAs */}
        <div className="nav-actions">
          <button 
            className="nav-btn-test-drive" 
            onClick={onOpenTestDrive}
            title="Đăng ký lái thử miễn phí"
          >
            <CalendarCheck size={16} />
            <span>Lái thử</span>
          </button>

          <button 
            className="nav-btn-deposit glow-btn-orange" 
            onClick={onOpenDeposit}
            title="Đặt cọc giữ chỗ nhận xe sớm"
          >
            <CreditCard size={16} />
            <span>Đặt cọc ngay</span>
          </button>

          {/* Mobile hamburger button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-panel">
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li
                  key={item.id}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
          <div className="mobile-actions">
            <button className="nav-btn-test-drive w-full" onClick={() => { setMobileMenuOpen(false); onOpenTestDrive(); }}>
              <CalendarCheck size={18} />
              <span>Đăng ký lái thử</span>
            </button>
            <button className="nav-btn-deposit glow-btn-orange w-full" onClick={() => { setMobileMenuOpen(false); onOpenDeposit(); }}>
              <CreditCard size={18} />
              <span>Đặt cọc xe trực tuyến</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
