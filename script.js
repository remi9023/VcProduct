const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav a");

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
