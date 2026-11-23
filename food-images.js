// File chuyên chứa đường dẫn link hình ảnh từ Google cho từng món ăn
// Bạn chỉ cần dán link ảnh (Copy image address từ Google) vào thuộc tính `url` của từng món:

const FOOD_IMAGE_MAP = {
  "Ốc hương": { url: "", icon: "🐚", color: "#00f3ff", desc: "Ốc hương nướng/xào bơ tỏi" },
  "Sò điệp": { url: "", icon: "🐚", color: "#00f3ff", desc: "Sò điệp nướng mỡ hành" },
  "Nghêu": { url: "", icon: "🐚", color: "#00ff9d", desc: "Nghêu hấp sả" },
  "Bún mộc": { url: "", icon: "🍜", color: "#00f3ff", desc: "Bún mộc giò heo" },
  "Cà ri": { url: "", icon: "🍛", color: "#fcee0a", desc: "Cà ri gà/bò" },
  "Gà rán": { url: "", icon: "🍗", color: "#fcee0a", desc: "Gà rán giòn rụm" },
  "Sữa chua": { url: "", icon: "🥣", color: "#00ff9d", desc: "Sữa chua mát lạnh" },
  "Sữa tươi": { url: "", icon: "🥛", color: "#00f3ff", desc: "Sữa tươi nguyên chất" },
  "Bánh plan": { url: "", icon: "🍮", color: "#fcee0a", desc: "Bánh flan caramel" },
  "Pizza": { url: "", icon: "🍕", color: "#ff007f", desc: "Pizza phô mai" },
  "Phở": { url: "", icon: "🍜", color: "#00f3ff", desc: "Phở bò truyền thống" },
  "Bún bò huế": { url: "", icon: "🍜", color: "#ff007f", desc: "Bún bò Huế đậm đà" },
  "Cơm gà xối mỡ": { url: "", icon: "🍚", color: "#fcee0a", desc: "Cơm gà xối mỡ giòn" },
  "Cơm sườn": { url: "", icon: "🍚", color: "#fcee0a", desc: "Cơm tấm sườn bì chả" },
  "Bánh mì ốp la": { url: "", icon: "🥖", color: "#fcee0a", desc: "Bánh mì trứng ốp la" },
  "Matcha Latte": { url: "", icon: "🍵", color: "#00ff9d", desc: "Matcha Latte béo thơm" },
  "Tacos": { url: "", icon: "🌮", color: "#fcee0a", desc: "Tacos nhân thịt" },
  "Hồng trà Ngô Gia": { url: "", icon: "🧋", color: "#ff007f", desc: "Hồng trà Ngô Gia" },
  "Mì ramen (k thích)": { url: "", icon: "🍜", color: "#ff007f", desc: "Mì Ramen Nhật Bản" }
};

function buildOfflineFoodSvg(name, icon, accent, subtitle) {
  const safeName = String(name).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeSub = String(subtitle || "OFFLINE IMAGE READY").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <radialGradient id="g" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#07080f" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)"/>
      <g stroke="${accent}" stroke-opacity="0.16" stroke-width="1">
        <line x1="0" y1="80" x2="600" y2="80"/>
        <line x1="0" y1="160" x2="600" y2="160"/>
        <line x1="0" y1="240" x2="600" y2="240"/>
        <line x1="0" y1="320" x2="600" y2="320"/>
        <line x1="120" y1="0" x2="120" y2="400"/>
        <line x1="240" y1="0" x2="240" y2="400"/>
        <line x1="360" y1="0" x2="360" y2="400"/>
        <line x1="480" y1="0" x2="480" y2="400"/>
      </g>
      <circle cx="300" cy="165" r="88" fill="#0c0f1d" stroke="${accent}" stroke-width="4"/>
      <text x="300" y="194" font-size="90" text-anchor="middle">${icon}</text>
      <text x="300" y="312" font-family="Segoe UI, Arial, sans-serif" font-size="25" font-weight="bold" fill="#ffffff" text-anchor="middle">${safeName}</text>
      <text x="300" y="346" font-family="Courier New, monospace" font-size="14" fill="${accent}" text-anchor="middle">${safeSub}</text>
    </svg>
  `;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function getGoogleImageSearchUrl(name) {
  const clean = String(name).replace(/\(.*?\)/g, "").trim();
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(clean + " món ăn")}`;
}

function getOfflineFoodImage(name, fallbackIcon, mode) {
  const entry = FOOD_IMAGE_MAP[name];
  if (entry && entry.url && entry.url.trim() !== "") {
    return entry.url.trim();
  }
  if (entry && entry.src) {
    return entry.src;
  }
  const icon = (entry && entry.icon) || fallbackIcon || "🍽️";
  const color = (entry && entry.color) || (mode === "like" ? "#00f3ff" : "#ff007f");
  const desc = (entry && entry.desc) || "CHƯA CÓ LINK ẢNH GOOGLE";
  return buildOfflineFoodSvg(name, icon, color, desc);
}
