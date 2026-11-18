
const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");

const itemsData = {
  clothes: [
    { id: "dress", emoji: "👗", name: "Ko‘ylak" },
    { id: "shirt", emoji: "👕", name: "Futbolka" },
    { id: "jacket", emoji: "🧥", name: "Kurtka" },
    { id: "suit", emoji: "🤵", name: "Kostyum" },
    { id: "hoodie", emoji: "🧥", name: "Huddi" },
    { id: "skirt", emoji: "👚", name: "Yubka" }
  ],
  shoes: [
    { id: "sneakers", emoji: "👟", name: "Krossovka" },
    { id: "boots", emoji: "🥾", name: "Etik" },
    { id: "heels", emoji: "👠", name: "Tufli" },
    { id: "sandals", emoji: "🩴", name: "Shippak" },
    { id: "classic", emoji: "👞", name: "Klassik" }
  ],
  hair: [
    { id: "short", emoji: "💇", name: "Kal ta soch" },
    { id: "long", emoji: "👩", name: "Uzun soch" },
    { id: "curly", emoji: "🦱", name: "Jingalak" },
    { id: "spiky", emoji: "🦔", name: "Tik soch" },
    { id: "braid", emoji: "👧", name: "O‘rim soch" }
  ],
  hat: [
    { id: "crown", emoji: "👑", name: "Toj" },
    { id: "cap", emoji: "🧢", name: "Kepka" },
    { id: "hat", emoji: "🎩", name: "Shlyapa" },
    { id: "beanie", emoji: "🧶", name: "Qishki qalpoq" },
    { id: "none", emoji: "🚫", name: "Bosh kiyimsiz" }
  ],
  accessories: [
    { id: "glasses", emoji: "🕶️", name: "Ko‘zoynak" },
    { id: "necklace", emoji: "📿", name: "Marjon" },
    { id: "watch", emoji: "⌚", name: "Soat" },
    { id: "bag", emoji: "👜", name: "Sumka" },
    { id: "bow", emoji: "🎀", name: "Bantik" },
    { id: "none", emoji: "🚫", name: "Aksessuarsiz" }
  ]
};

const state = {
  clothes: "dress",
  shoes: "sneakers",
  hair: "long",
  hat: "crown",
  accessories: "necklace",
  color: "#ef476f",
  background: "pink"
};

const backgrounds = {
  pink: ["#fbc2eb", "#a6c1ee"],
  blue: ["#89f7fe", "#66a6ff"],
  purple: ["#c471f5", "#fa71cd"],
  green: ["#96e6a1", "#d4fc79"],
  night: ["#141e30", "#243b55"]
};

const colorOptions = {
  "#ef476f": "#b92755",
  "#4361ee": "#243cae",
  "#06a77d": "#057052",
  "#9b5de5": "#6330a5",
  "#f4a261": "#c66d32",
  "#22223b": "#101020",
  "#f8f9fa": "#c7c7d1",
  "#e9c46a": "#ad842b"
};

let score = 0;
let record = Number(localStorage.getItem("fashionRecord")) || 0;
let activeTab = "clothes";

document.getElementById("record").textContent = record;

function roundedRect(x, y, w, h, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

function ellipse(x, y, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawAvatar() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Fon
  const bg = backgrounds[state.background];
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, bg[0]);
  gradient.addColorStop(1, bg[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // Fon yulduzchalari
  for (let i = 0; i < 24; i++) {
    const x = (i * 97 + 40) % w;
    const y = (i * 137 + 30) % h;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "18px Arial";
    ctx.fillText("✦", x, y);
  }

  // Platforma va soya
  ellipse(300, 710, 155, 20, "rgba(30,30,60,0.25)");

  const skin = "#f1c49c";
  const dark = colorOptions[state.color] || "#9c3558";

  // Oyoqlar
  roundedRect(220, 545, 65, 130, 27, skin);
  roundedRect(315, 545, 65, 130, 27, skin);

  // Paypoqlar
  roundedRect(222, 630, 62, 35, 10, "#ffffff");
  roundedRect(317, 630, 62, 35, 10, "#ffffff");

  // Oyoq kiyimlar
  const shoe = state.shoes;

  if (shoe === "heels") {
    ellipse(250, 680, 48, 19, "#d43f79");
    ellipse(350, 680, 48, 19, "#d43f79");
    roundedRect(280, 679, 8, 30, 3, "#72234a");
    roundedRect(380, 679, 8, 30, 3, "#72234a");
  } else if (shoe === "boots") {
    roundedRect(215, 615, 78, 75, 15, "#633d2c");
    roundedRect(307, 615, 78, 75, 15, "#633d2c");
    ellipse(250, 690, 42, 13, "#3c2925");
    ellipse(350, 690, 42, 13, "#3c2925");
  } else if (shoe === "sandals") {
    ellipse(250, 682, 45, 17, "#e9a23b");
    ellipse(350, 682, 45, 17, "#e9a23b");
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(230, 665);
    ctx.lineTo(270, 685);
    ctx.moveTo(330, 665);
    ctx.lineTo(370, 685);
    ctx.stroke();
  } else if (shoe === "classic") {
    ellipse(250, 681, 48, 21, "#242433");
    ellipse(350, 681, 48, 21, "#242433");
  } else {
    ellipse(250, 680, 50, 22, "#ffffff");
    ellipse(350, 680, 50, 22, "#ffffff");
    roundedRect(216, 664, 70, 12, 5, "#e9edf5");
    roundedRect(316, 664, 70, 12, 5, "#e9edf5");
  }

  // Qo‘llar
  ctx.save();
  ctx.translate(300, 350);
  ctx.rotate(-0.1);
  roundedRect(-125, -10, 50, 185, 25, skin);
  ctx.restore();

  ctx.save();
  ctx.translate(300, 350);
  ctx.rotate(0.1);
  roundedRect(75, -10, 50, 185, 25, skin);
  ctx.restore();

  // Kiyimlar
  const cloth = state.clothes;
  const c = state.color;
  const shadow = dark;

  if (cloth === "dress" || cloth === "skirt") {
    roundedRect(230, 285, 140, 175, 28, c);

    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(240, 400);
    ctx.lineTo(360, 400);
    ctx.lineTo(405, 570);
    ctx.lineTo(195, 570);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.moveTo(240, 400);
    ctx.lineTo(360, 400);
    ctx.lineTo(405, 570);
    ctx.lineTo(195, 570);
    ctx.closePath();
    ctx.globalAlpha = 0.16;
    ctx.fill();
    ctx.globalAlpha = 1;

    roundedRect(230, 395, 140, 13, 5, shadow);
  } else {
    roundedRect(225, 285, 150, 185, 22, c);

    if (cloth === "jacket") {
      roundedRect(217, 285, 80, 180, 15, shadow);
      roundedRect(303, 285, 80, 180, 15, c);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(300, 290);
      ctx.lineTo(300, 460);
      ctx.stroke();
    }

    if (cloth === "suit") {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(300, 300);
      ctx.lineTo(280, 360);
      ctx.lineTo(300, 375);
      ctx.lineTo(320, 360);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#e63946";
      ctx.beginPath();
      ctx.moveTo(300, 350);
      ctx.lineTo(287, 375);
      ctx.lineTo(300, 420);
      ctx.lineTo(313, 375);
      ctx.closePath();
      ctx.fill();
    }

    if (cloth === "hoodie") {
      ellipse(300, 292, 65, 40, shadow);
      roundedRect(265, 430, 70, 30, 10, shadow);
    }

    // Kiyimdagi tugmalar
    for (let i = 0; i < 3; i++) {
      ellipse(300, 350 + i * 30, 4, 4, "#ffe5a0");
    }
  }

  // Bo‘yin
  roundedRect(270, 235, 60, 70, 18, skin);

  // Bo‘yin va yuz
  ellipse(300, 175, 105, 112, skin);

  // Quloqlar
  ellipse(194, 180, 20, 30, skin);
  ellipse(406, 180, 20, 30, skin);

  // Soch
  if (state.hair === "long" || state.hair === "braid") {
    ellipse(300, 130, 115, 110, "#452a24");
    roundedRect(192, 135, 35, 230, 18, "#452a24");
    roundedRect(373, 135, 35, 230, 18, "#452a24");
  } else if (state.hair === "curly") {
    ellipse(300, 100, 112, 65, "#452a24");
    for (let i = 0; i < 8; i++) {
      ellipse(210 + i * 25, 90 + (i % 2) * 10, 27, 28, "#57372c");
    }
  } else if (state.hair === "spiky") {
    ellipse(300, 102, 98, 48, "#452a24");
    for (let i = 0; i < 7; i++) {
      ctx.fillStyle = "#452a24";
      ctx.beginPath();
      ctx.moveTo(220 + i * 25, 105);
      ctx.lineTo(230 + i * 25, 40 + (i % 2) * 15);
      ctx.lineTo(250 + i * 25, 110);
      ctx.fill();
    }
  } else {
    ellipse(300, 105, 100, 52, "#452a24");
  }

  // Yuz
  ellipse(300, 185, 77, 85, skin);

  // Ko‘zlar
  ellipse(270, 175, 7, 10, "#29212a");
  ellipse(330, 175, 7, 10, "#29212a");

  // Yonoqlar
  ellipse(248, 205, 15, 8, "#e99592");
  ellipse(352, 205, 15, 8, "#e99592");

  // Tabassum
  ctx.strokeStyle = "#8e3f4c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(300, 205, 22, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Soch old qismi
  if (state.hair !== "short") {
    ctx.fillStyle = "#452a24";
    ctx.beginPath();
    ctx.moveTo(205, 155);
    ctx.quadraticCurveTo(220, 70, 300, 105);
    ctx.quadraticCurveTo(370, 70, 395, 155);
    ctx.quadraticCurveTo(330, 125, 300, 145);
    ctx.quadraticCurveTo(260, 120, 205, 155);
    ctx.fill();
  }

  // Bosh kiyim
  if (state.hat !== "none") {
    const hatEmoji = {
      crown: "👑",
      cap: "🧢",
      hat: "🎩",
      beanie: "🧶"
    };

    ctx.font = "85px Arial";
    ctx.textAlign = "center";
    ctx.fillText(hatEmoji[state.hat], 300, 85);
  }

  // Aksessuarlar
  if (state.accessories === "glasses") {
    ctx.strokeStyle = "#29212a";
    ctx.lineWidth = 6;
    ctx.strokeRect(240, 158, 48, 30);
    ctx.strokeRect(312, 158, 48, 30);
    ctx.beginPath();
    ctx.moveTo(288, 170);
    ctx.lineTo(312, 170);
    ctx.stroke();
  } else if (state.accessories === "necklace") {
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(300, 300, 42, 0.2, Math.PI - 0.2);
    ctx.stroke();
    ellipse(300, 340, 9, 9, "#ffd166");
  } else if (state.accessories === "watch") {
    roundedRect(380, 415, 24, 38, 8, "#e9c46a");
  } else if (state.accessories === "bag") {
    roundedRect(385, 400, 65, 75, 15, "#9b5de5");
    ctx.strokeStyle = "#ffe5a0";
    ctx.lineWidth = 5;
    ctx.strokeRect(398, 390, 40, 30);
  } else if (state.accessories === "bow") {
    ctx.font = "60px Arial";
    ctx.fillText("🎀", 385, 130);
  }

  // Kiyim yorlig‘i
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("FASHION STAR", 300, 745);
}

function showItems(tab) {
  activeTab = tab;
  const box = document.getElementById("items");
  box.innerHTML = "";

  document.querySelectorAll(".tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });

  itemsData[tab].forEach(item => {
    const button = document.createElement("button");
    button.className = "item";
    button.innerHTML = `
      <span class="emoji">${item.emoji}</span>
      <span>${item.name}</span>
    `;

    if (state[tab] === item.id) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      if (state[tab] === item.id) return;

      state[tab] = item.id;
      addScore(10);
      drawAvatar();
      showItems(tab);

      document.getElementById("message").textContent =
        `${item.name} tanlandi! +10 ball ✨`;
    });

    box.appendChild(button);
  });
}

function addScore(points) {
  score += points;

  if (score > record) {
    record = score;
    localStorage.setItem("fashionRecord", record);
  }

  document.getElementById("score").textContent = score;
  document.getElementById("record").textContent = record;
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    showItems(button.dataset.tab);
  });
});

// Rang tanlash
document.querySelectorAll(".color").forEach(button => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;

    if (state.color === color) return;

    state.color = color;

    document.querySelectorAll(".color").forEach(c => {
      c.classList.toggle("selected", c === button);
    });

    addScore(5);
    drawAvatar();

    document.getElementById("message").textContent =
      "Yangi rang tanlandi! +5 ball 🎨";
  });
});

// Fon tanlash
document.querySelectorAll("[data-bg]").forEach(button => {
  button.addEventListener("click", () => {
    const bg = button.dataset.bg;

    if (state.background === bg) return;

    state.background = bg;
    addScore(5);
    drawAvatar();

    document.getElementById("message").textContent =
      "Sahna foni almashtirildi! +5 ball 🌈";
  });
});

// Tasodifiy obraz
document.getElementById("randomBtn").addEventListener("click", () => {
  Object.keys(itemsData).forEach(category => {
    const choices = itemsData[category];
    const random = choices[Math.floor(Math.random() * choices.length)];
    state[category] = random.id;
  });

  const colors = Object.keys(colorOptions);
  state.color = colors[Math.floor(Math.random() * colors.length)];

  const bgNames = Object.keys(backgrounds);
  state.background = bgNames[Math.floor(Math.random() * bgNames.length)];

  addScore(20);
  drawAvatar();
  showItems(activeTab);

  document.querySelectorAll(".color").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.color === state.color
    );
  });

  document.getElementById("message").textContent =
    "Yangi tasodifiy obraz yaratildi! +20 ball 🎉";
});

// Qayta boshlash
document.getElementById("resetBtn").addEventListener("click", () => {
  state.clothes = "dress";
  state.shoes = "sneakers";
  state.hair = "long";
  state.hat = "crown";
  state.accessories = "necklace";
  state.color = "#ef476f";
  state.background = "pink";

  score = 0;
  document.getElementById("score").textContent = score;

  document.querySelectorAll(".color").forEach(button => {
    button.classList.toggle(
      "selected",
      button.dataset.color === state.color
    );
  });

  drawAvatar();
  showItems(activeTab);

  document.getElementById("message").textContent =
    "Qahramon boshlang‘ich holatga qaytdi! 🔄";
});

// PNG yuklab olish
document.getElementById("downloadBtn").addEventListener("click", () => {
  drawAvatar();

  const link = document.createElement("a");
  link.download = "mening_qahramonim.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  document.getElementById("message").textContent =
    "Qahramoningiz rasmi yuklab olindi! 📸";
});

// Dastlabki holat
document.querySelectorAll(".color").forEach(button => {
  button.classList.toggle(
    "selected",
    button.dataset.color === state.color
  );
});

showItems("clothes");
drawAvatar();
