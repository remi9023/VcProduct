const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav a");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const modal = document.querySelector(".product-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector("#modalTitle");
const modalPanel = document.querySelector(".modal-panel");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const prevButton = document.querySelector(".modal-nav.prev");
const nextButton = document.querySelector(".modal-nav.next");
const canvas = document.querySelector(".particle-canvas");
const ctx = canvas.getContext("2d");

const products = [
  { title: "Product 01", src: "Product_Image/Product_1.jpg" },
  { title: "Product 02", src: "Product_Image/Product_2.jpg" },
  { title: "Product 03", src: "Product_Image/Product_3.jpg" },
  { title: "Product 04", src: "Product_Image/Product_4.jpg" },
  { title: "Product 05", src: "Product_Image/Product_5.png" },
  { title: "Product 06", src: "Product_Image/Product_6.png" },
  { title: "Product 07", src: "Product_Image/Product_7.png" },
  { title: "Product 08", src: "Product_Image/Product_8.jpg" },
  { title: "Product 09", src: "Product_Image/Product_9.png" },
  { title: "Product 10", src: "Product_Image/Product_10.png" },
  { title: "Product 11", src: "Product_Image/Product_11.jpg" },
  { title: "Product 12", src: "Product_Image/Product_12.jpg" },
  { title: "Product 13", src: "Product_Image/Product_13.jpg" },
];

let currentIndex = 0;
let particles = [];
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
    openModal(Number(item.dataset.index), item);
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

function openModal(index, sourceElement) {
  showProduct(index, false);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  resizeCanvas();

  const rect = sourceElement.getBoundingClientRect();
  burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
  restartPopAnimation();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  particles = [];
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

  if (animate) {
    burstParticles(window.innerWidth / 2, window.innerHeight / 2);
    restartPopAnimation();
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

function burstParticles(x, y) {
  resizeCanvas();
  const colors = ["#176b5b", "#d99735", "#ffffff", "#8ec6b6", "#f2c879"];

  for (let i = 0; i < 74; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 7;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 3 + Math.random() * 6,
      life: 58 + Math.random() * 24,
      maxLife: 82,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  if (!particleFrame) {
    animateParticles();
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.08;
    particle.vx *= 0.985;
    particle.vy *= 0.985;
    particle.life -= 1;

    const alpha = Math.max(particle.life / particle.maxLife, 0);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius * alpha, 0, Math.PI * 2);
    ctx.fill();

    return particle.life > 0;
  });

  ctx.globalAlpha = 1;

  if (particles.length) {
    particleFrame = requestAnimationFrame(animateParticles);
  } else {
    particleFrame = null;
  }
}
