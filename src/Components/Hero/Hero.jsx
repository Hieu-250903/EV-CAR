import "./Hero.css";
import arrow_btn from "../../assets/arrow_btn.png";
import play_icon from "../../assets/play_icon.png";
import pause_icon from "../../assets/pause_icon.png";
import { Zap, Gauge, BatteryCharging, Shield, ChevronRight } from 'lucide-react';

const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  playStatus,
  setPlayStatus,
  onExploreClick,
  onOpenTestDrive
}) => {
  return (
    <div className="hero-section">
      <div className="hero-main">
        {/* Main Hero Typography */}
        <div className="hero-text-wrap">
          <div className="hero-badge badge-tag badge-cyan">
            <Zap size={14} />
            <span>Kỷ Nguyên Xe Thuần Điện Mới</span>
          </div>
          <h1 className="hero-heading">
            <span>{heroData.text1}</span>
            <span className="hero-heading-sub">{heroData.text2}</span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <div className="hero-explore-btn" onClick={onExploreClick}>
            <p>Khám phá các dòng xe</p>
            <div className="explore-arrow-circle">
              <img src={arrow_btn} alt="Arrow" />
            </div>
          </div>

          <button className="hero-drive-btn" onClick={onOpenTestDrive}>
            <span>Đăng ký lái thử</span>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Bottom controls: Slider dots + Play video button */}
        <div className="hero-dot-play">
          <div className="hero-dots-wrap">
            <span className="hero-counter">0{heroCount + 1} / 03</span>
            <ul className="hero-dots">
              <li 
                onClick={() => setHeroCount(0)} 
                className={heroCount === 0 ? "hero-dot active" : "hero-dot"}
                title="EV-Apex GT"
              />
              <li 
                onClick={() => setHeroCount(1)} 
                className={heroCount === 1 ? "hero-dot active" : "hero-dot"}
                title="EV-Titan Pro"
              />
              <li 
                onClick={() => setHeroCount(2)} 
                className={heroCount === 2 ? "hero-dot active" : "hero-dot"}
                title="EV-Nova Urban"
              />
            </ul>
          </div>

          <div className="hero-play" onClick={() => {
            console.log("[HERO] Nút Play/Pause được click! playStatus hiện tại:", playStatus);
            setPlayStatus(!playStatus);
          }}>
            <div className="play-icon-glow">
              <img src={playStatus ? pause_icon : play_icon} alt="Play/Pause" />
            </div>
            <p>{playStatus ? "Tạm dừng video" : "Xem video trải nghiệm"}</p>
          </div>
        </div>
      </div>

      {/* Floating Specs Bar */}
      <div className="hero-specs-bar glass-panel">
        <div className="spec-item">
          <div className="spec-icon-wrap">
            <BatteryCharging size={20} className="spec-icon" />
          </div>
          <div>
            <div className="spec-value">720 <span className="spec-unit">km</span></div>
            <div className="spec-label">Quãng đường 1 lần sạc</div>
          </div>
        </div>

        <div className="spec-divider" />

        <div className="spec-item">
          <div className="spec-icon-wrap">
            <Gauge size={20} className="spec-icon" />
          </div>
          <div>
            <div className="spec-value">2.8 <span className="spec-unit">giây</span></div>
            <div className="spec-label">Tăng tốc 0 - 100 km/h</div>
          </div>
        </div>

        <div className="spec-divider" />

        <div className="spec-item">
          <div className="spec-icon-wrap">
            <Zap size={20} className="spec-icon" />
          </div>
          <div>
            <div className="spec-value">18 <span className="spec-unit">phút</span></div>
            <div className="spec-label">Sạc nhanh 10% - 80% DC</div>
          </div>
        </div>

        <div className="spec-divider" />

        <div className="spec-item">
          <div className="spec-icon-wrap">
            <Shield size={20} className="spec-icon" />
          </div>
          <div>
            <div className="spec-value">10 <span className="spec-unit">Năm</span></div>
            <div className="spec-label">Bảo hành pin chính hãng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
