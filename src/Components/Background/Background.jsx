import { useEffect, useRef } from "react";
import "./Background.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

const images = [image1, image2, image3];

const Background = ({ playStatus, heroCount, isSubPage = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React thỉnh thoảng không gán đúng thuộc tính muted vào DOM element.
    // Force muted bằng JS để đảm bảo trình duyệt cho phép autoplay:
    video.defaultMuted = true;
    video.muted = true;

    if (playStatus) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("[BG] Video đang phát"))
          .catch(err => console.error("[BG] Lỗi phát video:", err));
      }
    } else {
      video.pause();
    }
  }, [playStatus]);

  return (
    <div className="background-container">
      <video
        ref={videoRef}
        className="background"
        style={{
          opacity: !isSubPage && playStatus ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
        autoPlay
        loop
        muted
        playsInline
        src="/video1.mp4"
      />

      {/* Ảnh nền trang chủ */}
      {!isSubPage && (
        <img
          src={images[heroCount] || image1}
          className="background fade-in"
          alt=""
          style={{
            opacity: playStatus ? 0 : 1,
            transition: "opacity 0.6s ease",
          }}
        />
      )}

      {/* Overlay trang phụ */}
      {isSubPage && <div className="background-subpage-overlay" />}
    </div>
  );
};

export default Background;
