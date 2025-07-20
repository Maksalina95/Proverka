// scripts/app.js
import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { setupGlobalSearch } from "./search.js"; // Добавлено

const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");

function setActive(page) {
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`nav a[data-page="${page}"]`).classList.add("active");
}

async function loadPage(page) {
  setActive(page);
  if (page === "home") {
    await showHome(content);
  } else if (page === "catalog") {
    await showCatalog(content);
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

loadPage("home"); // Главная при запуске

setupGlobalSearch(); // Глобальный поиск на всех страницах
