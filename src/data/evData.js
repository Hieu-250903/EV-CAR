import carApex from "../assets/car_sedan_apex.jpg";
import carTitan from "../assets/car_suv_titan.jpg";
import carNova from "../assets/car_nova_urban.jpg";
import chargingHubImg from "../assets/charging_hub.jpg";

export const CAR_MODELS = [
  {
    id: "apex-gt",
    name: "EV-Apex GT",
    tagline: "Sedan Thể Thao Thuần Điện Đẳng Cấp Thượng Lưu",
    category: "Sedan",
    basePrice: 1890000000,
    range: 720,
    accel: "2.8s",
    topSpeed: "260 km/h",
    battery: "102 kWh (Cell-to-Chassis)",
    fastCharge: "18 phút (10-80% DC 350kW)",
    power: "680 HP",
    drive: "AWD Động cơ kép Dual-Motor",
    image: carApex,
    colors: [
      { id: "silver", name: "Bạc Cyber Metallic", hex: "#a1a1aa", filter: "none", price: 0 },
      { id: "blue", name: "Xanh Midnight Cyber", hex: "#1e3a8a", filter: "hue-rotate(185deg) saturate(1.4)", price: 15000000 },
      { id: "black", name: "Đen Onyx Stealth", hex: "#09090b", filter: "brightness(0.65) contrast(1.2)", price: 0 },
      { id: "red", name: "Đỏ Crimson Velocity", hex: "#dc2626", filter: "hue-rotate(320deg) saturate(1.6)", price: 22000000 },
      { id: "white", name: "Trắng Ngọc Trai Alpine", hex: "#f8fafc", filter: "brightness(1.15) contrast(0.95)", price: 0 }
    ],
    trims: [
      { id: "std", name: "Apex Single-Motor RWD", range: 580, hp: "380 HP", priceAdd: 0, accel: "4.3s" },
      { id: "lr", name: "Apex Long Range Dual-Motor AWD", range: 720, hp: "540 HP", priceAdd: 220000000, accel: "3.4s" },
      { id: "perf", name: "Apex Track Edition AWD Tri-Motor", range: 680, hp: "780 HP", priceAdd: 490000000, accel: "2.8s" }
    ],
    wheels: [
      { id: "w-19", name: 'Mâm Khí Động Học Aero Stream 19"', price: 0 },
      { id: "w-21", name: 'Mâm Thể Thao Phay Kim Cương Turbine 21"', price: 42000000 }
    ],
    interiors: [
      { id: "in-black", name: "Da Nappa Cao Cấp Đen Obsidian", price: 0 },
      { id: "in-white", name: "Da Sinh Học Vegan Trắng Tuyết Arctic", price: 20000000 },
      { id: "in-tan", name: "Da Nappa Nâu Caramel Saddle Brown", price: 32000000 }
    ]
  },
  {
    id: "titan-pro",
    name: "EV-Titan Pro",
    tagline: "SUV Điện 7 Chỗ Hạng Sang Đỉnh Cao Công Nghệ & An Toàn",
    category: "SUV",
    basePrice: 2250000000,
    range: 650,
    accel: "3.9s",
    topSpeed: "230 km/h",
    battery: "115 kWh LFP An Toàn",
    fastCharge: "22 phút (10-80% DC 250kW)",
    power: "620 HP",
    drive: "Hệ thống dẫn động 4 bánh e-AWD",
    image: carTitan,
    colors: [
      { id: "blue", name: "Xanh Deep Ocean Blue", hex: "#1e3a8a", filter: "none", price: 0 },
      { id: "black", name: "Đen Phantom Black", hex: "#0f172a", filter: "brightness(0.65) contrast(1.1)", price: 0 },
      { id: "silver", name: "Xám Bạc Titanium Gray", hex: "#94a3b8", filter: "grayscale(1) brightness(1.2)", price: 18000000 },
      { id: "emerald", name: "Xanh Lục Bảo Emerald Green", hex: "#047857", filter: "hue-rotate(90deg) saturate(1.3)", price: 25000000 }
    ],
    trims: [
      { id: "std", name: "Titan Standard Edition", range: 530, hp: "420 HP", priceAdd: 0, accel: "5.1s" },
      { id: "lr", name: "Titan Pro Long Range AWD", range: 650, hp: "620 HP", priceAdd: 280000000, accel: "3.9s" },
      { id: "exec", name: "Titan Executive 4 Ghế VIP Siêu Sang", range: 630, hp: "650 HP", priceAdd: 560000000, accel: "3.9s" }
    ],
    wheels: [
      { id: "w-20", name: 'Mâm SUV Khí Động 20"', price: 0 },
      { id: "w-22", name: 'Mâm Rèn Thể Thao Forged Wheel 22"', price: 55000000 }
    ],
    interiors: [
      { id: "in-black", name: "Nội Thất Da Đen Thạch Anh", price: 0 },
      { id: "in-tan", name: "Nội Thất Da Bò Nappa Hoàng Gia", price: 35000000 },
      { id: "in-white", name: "Nội Thất Da Trắng Ngọc Trai", price: 25000000 }
    ]
  },
  {
    id: "nova-urban",
    name: "EV-Nova Urban",
    tagline: "Crossover Điện Đô Thị Trẻ Trung, Bền Vững & Linh Hoạt",
    category: "Crossover",
    basePrice: 890000000,
    range: 480,
    accel: "6.2s",
    topSpeed: "185 km/h",
    battery: "65 kWh Blade Battery",
    fastCharge: "25 phút (10-80% DC 120kW)",
    power: "215 HP",
    drive: "FWD Dẫn động cầu trước điện tử",
    image: carNova,
    colors: [
      { id: "white", name: "Trắng Ngọc Trai + Xanh Mint Accent", hex: "#f1f5f9", filter: "none", price: 0 },
      { id: "cyan", name: "Xanh Cyan Neon Tương Lai", hex: "#06b6d4", filter: "hue-rotate(160deg) saturate(1.5)", price: 12000000 },
      { id: "yellow", name: "Vàng Cyberpunk Solar", hex: "#eab308", filter: "hue-rotate(45deg) saturate(1.8)", price: 15000000 },
      { id: "gray", name: "Xám Nardo Gray Thể Thao", hex: "#64748b", filter: "grayscale(1) brightness(0.9)", price: 0 }
    ],
    trims: [
      { id: "std", name: "Nova City Dynamic", range: 410, hp: "170 HP", priceAdd: 0, accel: "7.2s" },
      { id: "lr", name: "Nova Plus Long Range", range: 480, hp: "215 HP", priceAdd: 110000000, accel: "6.2s" }
    ],
    wheels: [
      { id: "w-18", name: 'Mâm Thể Thao Eco-Aero 18"', price: 0 },
      { id: "w-19", name: 'Mâm Phay 2 Tông Màu Dynamic 19"', price: 20000000 }
    ],
    interiors: [
      { id: "in-dark", name: "Vải Dệt Sinh Học Tái Chế Eco-Dark", price: 0 },
      { id: "in-duo", name: "Da Tổng Hợp Phối Màu Neon Urban", price: 15000000 }
    ]
  }
];

export const TECH_PACKAGES = [
  {
    id: "autopilot",
    name: "Gói Tự Lái Cấp Độ 3 (EV-Pilot Pro)",
    desc: "Tự động chuyển làn trên cao tốc, giữ khoảng cách thông minh, tự động lùi chuồng & triệu hồi xe từ xa.",
    price: 85000000
  },
  {
    id: "audio",
    name: "Dàn Âm Thanh Dolby Atmos 23 Loa (1200W)",
    desc: "Âm thanh vòm đa hướng sống động như rạp hát, tích hợp công nghệ khử tiếng ồn lốp chủ động (ANC).",
    price: 35000000
  },
  {
    id: "wallbox",
    name: "Trụ Sạc Nhanh Treo Tường Tại Nhà 11kW Wallbox",
    desc: "Bao gồm trọn gói dịch vụ kỹ thuật viên khảo sát, lắp đặt tiêu chuẩn an toàn chống rò điện chính hãng.",
    price: 18000000
  }
];

export const CHARGING_STATIONS = [
  {
    id: "cs-01",
    name: "Trạm Sạc Siêu Nhanh EV-Hub Hoàn Kiếm",
    city: "Hà Nội",
    address: "Số 01 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
    type: "Supercharger 350kW",
    speedTier: "super",
    availablePorts: 8,
    totalPorts: 10,
    pricePerKwh: 3400,
    openTime: "24/7",
    amenities: ["Café Star", "Wifi miễn phí", "Khu vệ sinh cao cấp", "Cửa hàng tiện lợi 24h"],
    lat: 21.0253,
    lng: 105.8560
  },
  {
    id: "cs-02",
    name: "Trạm Sạc EV Landmark 81 Hub",
    city: "TP. Hồ Chí Minh",
    address: "Tầng B2 Vinhomes Central Park, Bình Thạnh, TP.HCM",
    type: "Supercharger 350kW",
    speedTier: "super",
    availablePorts: 12,
    totalPorts: 14,
    pricePerKwh: 3400,
    openTime: "24/7",
    amenities: ["TTTM Landmark", "Rạp chiếu phim", "Nhà hàng", "Khu làm việc"],
    lat: 10.7951,
    lng: 106.7218
  },
  {
    id: "cs-03",
    name: "Trạm Sạc Cao Tốc Long Thành - Dầu Giây",
    city: "Đồng Nai",
    address: "Trạm dừng nghỉ Km41+100 Cao tốc TP.HCM - Long Thành",
    type: "Ultra-Fast DC 250kW",
    speedTier: "fast",
    availablePorts: 6,
    totalPorts: 8,
    pricePerKwh: 3600,
    openTime: "24/7",
    amenities: ["Trạm dừng chân", "Trạm cứu hộ lưu động", "Foodcourt", "Khu nghỉ ngơi"],
    lat: 10.8231,
    lng: 107.0145
  },
  {
    id: "cs-04",
    name: "Trạm Sạc EV-Center Sông Hàn",
    city: "Đà Nẵng",
    address: "Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng",
    type: "Fast Charger 150kW",
    speedTier: "fast",
    availablePorts: 6,
    totalPorts: 6,
    pricePerKwh: 3300,
    openTime: "06:00 - 23:00",
    amenities: ["View sông Hàn", "Quán café", "Bãi đỗ xe an ninh"],
    lat: 16.0678,
    lng: 108.2208
  },
  {
    id: "cs-05",
    name: "Trạm Sạc EV Vincom Cần Thơ",
    city: "Cần Thơ",
    address: "Đường 30/4, Quận Ninh Kiều, TP. Cần Thơ",
    type: "Standard AC & Fast DC 120kW",
    speedTier: "standard",
    availablePorts: 5,
    totalPorts: 8,
    pricePerKwh: 3200,
    openTime: "24/7",
    amenities: ["Trung tâm thương mại", "Cà phê Highland", "ATM"],
    lat: 10.0345,
    lng: 105.7812
  }
];

export const SHOWROOMS = [
  { id: "hn-01", name: "EV-olution Flagship Hoàn Kiếm", city: "Hà Nội", address: "18 Lê Phụng Hiểu, Hoàn Kiếm, Hà Nội", phone: "024 3999 8888" },
  { id: "hn-02", name: "EV-olution Center Cầu Giấy", city: "Hà Nội", address: "88 Duy Tân, Cầu Giấy, Hà Nội", phone: "024 3888 6666" },
  { id: "hcm-01", name: "EV-olution Landmark 81 Hub", city: "TP. Hồ Chí Minh", address: "720A Điện Biên Phủ, Bình Thạnh, TP.HCM", phone: "028 3777 9999" },
  { id: "hcm-02", name: "EV-olution Showroom Quận 7", city: "TP. Hồ Chí Minh", address: "105 Nguyễn Lương Bằng, Phú Mỹ Hưng, Q.7", phone: "028 3666 5555" },
  { id: "dn-01", name: "EV-olution Gallery Đà Nẵng", city: "Đà Nẵng", address: "240 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng", phone: "0236 355 8888" }
];

export const EV_FAQS = [
  {
    q: "Pin xe điện EV-olution có tuổi thọ bao lâu và được bảo hành thế nào?",
    a: "Hệ thống pin của EV-olution sử dụng công nghệ Cell-to-Chassis thế hệ mới nhất, đạt độ suy giảm dung lượng dưới 10% sau 300.000 km di chuyển. Tất cả xe điện bán ra đều được áp dụng chính sách bảo hành Pin chính hãng 10 năm hoặc 200.000 km (tùy điều kiện nào đến trước), đổi mới miễn phí nếu dung lượng pin giảm quá 30%."
  },
  {
    q: "Xe điện có an toàn khi đi qua đoạn đường ngập nước ở Việt Nam không?",
    a: "Khối pin và cụm động cơ điện của EV-olution đạt chuẩn chống bụi và kháng nước cao nhất IP67 và IP68. Xe đã vượt qua các bài kiểm nghiệm ngâm nước ở độ sâu 0.5 mét liên tục trong 30 phút mà không có bất kỳ hiện tượng rò điện hay đoản mạch nào, cực kỳ an toàn trong điều kiện mưa ngập đô thị."
  },
  {
    q: "Chi phí sạc điện so với tiền đổ xăng thông thường như thế nào?",
    a: "Chi phí vận hành của xe điện chỉ bằng khoảng 25% - 30% so với xe xăng cùng phân khúc. Trung bình chỉ tốn khoảng 350 - 450 VNĐ cho mỗi km di chuyển, giúp bạn tiết kiệm từ 30 - 50 triệu VNĐ mỗi năm nếu đi khoảng 1.500 km/tháng."
  },
  {
    q: "Tôi có thể sạc xe tại nhà như thế nào?",
    a: "Mỗi xe được bàn giao kèm 1 bộ sạc di động 3.5kW cắm ổ điện dân dụng 220V. Ngoài ra, EV-olution hỗ trợ lắp đặt bộ sạc treo tường thông minh Wallbox 7kW - 11kW tại nhà riêng hoặc chung cư có slot đỗ xe, chỉ cần cắm sạc qua đêm là pin sẽ đầy 100% sẵn sàng cho ngày mới."
  }
];

export { chargingHubImg };
