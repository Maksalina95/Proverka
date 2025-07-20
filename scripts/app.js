import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { setupSearchGlobal } from "./search.js";

const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");

function setActive(page) {
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`nav a[data-page="${page}"]`).classList.add("active");
}

function hideSearch() {
  const search = document.querySelector(".search-container");
  if (search) search.style.display = "none";
}

async function loadPage(page) {
  setActive(page);
  hideSearch(); // скрываем поиск на любой странице по умолчанию

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

// Загрузка главной при старте
loadPage("home");

// Инициализация глобального поиска
setupSearchGlobal();
