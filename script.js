const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav a");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const modal = document.querySelector(".product-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector(".modal-description");
const modalPanel = document.querySelector(".modal-panel");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const prevButton = document.querySelector(".modal-nav.prev");
const nextButton = document.querySelector(".modal-nav.next");
const canvas = document.querySelector(".particle-canvas");
const ctx = canvas.getContext("2d");

const products = [
  {
    title: "Product 01",
    src: "Product_Image/Product_1.jpg",
    description: "대표 제품 이미지를 중심으로 전체적인 분위기와 첫인상을 확인할 수 있는 샘플입니다.",
  },
  {
    title: "Product 02",
    src: "Product_Image/Product_2.jpg",
    description: "제품의 형태와 사용 장면을 빠르게 살펴볼 수 있도록 구성한 보조 이미지입니다.",
  },
  {
    title: "Product 03",
    src: "Product_Image/Product_3.jpg",
    description: "상세 페이지에서 강조하고 싶은 제품의 특징을 보여주는 이미지 영역입니다.",
  },
  {
    title: "Product 04",
    src: "Product_Image/Product_4.jpg",
    description: "작은 썸네일에서도 제품 정보를 명확하게 전달할 수 있는 샘플 이미지입니다.",
  },
  {
    title: "Product 05",
    src: "Product_Image/Product_5.png",
    description: "고해상도 제품 이미지를 크게 띄워 세부 디테일을 확인하도록 만든 샘플입니다.",
  },
  {
    title: "Product 06",
    src: "Product_Image/Product_6.png",
    description: "제품의 색상, 질감, 구성 요소를 한눈에 보여주기 위한 확대 확인용 이미지입니다.",
  },
  {
    title: "Product 07",
    src: "Product_Image/Product_7.png",
    description: "사용자가 관심 제품을 클릭했을 때 핵심 정보를 함께 전달하는 예시입니다.",
  },
  {
    title: "Product 08",
    src: "Product_Image/Product_8.jpg",
    description: "간결한 설명과 외부 링크를 함께 배치해 다음 행동으로 이어지게 합니다.",
  },
  {
    title: "Product 09",
    src: "Product_Image/Product_9.png",
    description: "제품군 안에서 다른 이미지와 비교하며 살펴볼 수 있는 갤러리 샘플입니다.",
  },
  {
    title: "Product 10",
    src: "Product_Image/Product_10.png",
    description: "클릭 시 파티클 효과와 함께 제품을 더 강하게 부각하는 인터랙션 예시입니다.",
  },
  {
    title: "Product 11",
    src: "Product_Image/Product_11.jpg",
    description: "제품 소개 문구를 짧게 넣어 구매 전 탐색 흐름을 돕는 팝업 설명입니다.",
  },
  {
    title: "Product 12",
    src: "Product_Image/Product_12.jpg",
    description: "실제 운영 시에는 가격, 용도, 구성품 같은 핵심 정보를 이 영역에 넣을 수 있습니다.",
  },
  {
    title: "Product 13",
    src: "Product_Image/Product_13.jpg",
    description: "마지막 샘플까지 동일한 팝업 구조로 보여주는 반응형 제품 이미지입니다.",
  },
];

let currentIndex = 0;
let particles = [];
let shockwaves = [];
let particleFrame = null;

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openModal(Number(item.dataset.index));
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

prevButton.addEventListener("click", () => showProduct(currentIndex - 1, true));
nextButton.addEventListener("click", () => showProduct(currentIndex + 1, true));

window.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;

  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") showProduct(currentIndex - 1, true);
  if (event.key === "ArrowRight") showProduct(currentIndex + 1, true);
});

window.addEventListener("resize", resizeCanvas);

function openModal(index) {
  showProduct(index, false);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  resizeCanvas();

  restartPopAnimation();
  burstFromImageFrame();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  particles = [];
  shockwaves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particleFrame) {
    cancelAnimationFrame(particleFrame);
    particleFrame = null;
  }
}

function showProduct(index, animate) {
  currentIndex = (index + products.length) % products.length;
  const product = products[currentIndex];

  modalImage.src = product.src;
  modalImage.alt = `${product.title} 확대 이미지`;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;

  if (animate) {
    restartPopAnimation();
    burstFromImageFrame();
  }
}

function restartPopAnimation() {
  modalPanel.classList.remove("pop-in");
  void modalPanel.offsetWidth;
  modalPanel.classList.add("pop-in");
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function burstFromImageFrame() {
  requestAnimationFrame(() => {
    const rect = modalImage.getBoundingClientRect();
    burstFrameParticles(rect);
  });
}

function burstFrameParticles(rect) {
  resizeCanvas();
  const colors = ["#176b5b", "#d99735", "#ffffff", "#8ec6b6", "#f2c879", "#ffe9a8"];
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  shockwaves.push(
    { x: centerX, y: centerY, radius: Math.min(rect.width, rect.height) * 0.45, speed: 12, life: 32, maxLife: 32, width: 8, color: "#ffffff" },
    { x: centerX, y: centerY, radius: Math.min(rect.width, rect.height) * 0.38, speed: 8, life: 42, maxLife: 42, width: 3, color: "#d99735" },
  );

  for (let i = 0; i < 220; i += 1) {
    const edgePoint = getRandomFramePoint(rect);
    const normal = getOutwardNormal(edgePoint.edge);
    const tangentJitter = (Math.random() - 0.5) * 0.9;
    const angle = Math.atan2(normal.y, normal.x) + tangentJitter;
    const speed = 4 + Math.random() * 13;
    const isSpark = i % 4 === 0;

    particles.push({
      x: edgePoint.x,
      y: edgePoint.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: isSpark ? 2 + Math.random() * 3 : 4 + Math.random() * 8,
      life: isSpark ? 46 + Math.random() * 18 : 64 + Math.random() * 34,
      maxLife: 98,
      color: colors[Math.floor(Math.random() * colors.length)],
      spin: Math.random() * Math.PI,
      shape: isSpark ? "spark" : "circle",
    });
  }

  if (!particleFrame) {
    animateParticles();
  }
}

function getRandomFramePoint(rect) {
  const edge = Math.floor(Math.random() * 4);

  if (edge === 0) {
    return { edge, x: rect.left + Math.random() * rect.width, y: rect.top };
  }

  if (edge === 1) {
    return { edge, x: rect.right, y: rect.top + Math.random() * rect.height };
  }

  if (edge === 2) {
    return { edge, x: rect.left + Math.random() * rect.width, y: rect.bottom };
  }

  return { edge, x: rect.left, y: rect.top + Math.random() * rect.height };
}

function getOutwardNormal(edge) {
  const normals = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  return normals[edge];
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shockwaves = shockwaves.filter((wave) => {
    wave.radius += wave.speed;
    wave.life -= 1;

    const alpha = Math.max(wave.life / wave.maxLife, 0);
    ctx.globalAlpha = alpha * 0.72;
    ctx.strokeStyle = wave.color;
    ctx.lineWidth = wave.width * alpha;
    ctx.beginPath();
    ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
    ctx.stroke();

    return wave.life > 0;
  });

  particles = particles.filter((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.12;
    particle.vx *= 0.972;
    particle.vy *= 0.972;
    particle.spin += 0.16;
    particle.life -= 1;

    const alpha = Math.max(particle.life / particle.maxLife, 0);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;

    if (particle.shape === "spark") {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.spin);
      ctx.fillRect(-particle.radius * 2, -particle.radius / 2, particle.radius * 4, particle.radius);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * alpha, 0, Math.PI * 2);
      ctx.fill();
    }

    return particle.life > 0;
  });

  ctx.globalAlpha = 1;

  if (particles.length || shockwaves.length) {
    particleFrame = requestAnimationFrame(animateParticles);
  } else {
    particleFrame = null;
  }
}
