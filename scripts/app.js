import { showCatalog } from "./catalog.js";
import { showProductPage } from "./productPage.js";

export async function loadPage(page, options = {}, fromPopState = false) {
  const container = options.container || document.getElementById("content");

  if (page === 'product') {
    await showProductPage(container, options.index);
  } else if (page === 'catalog') {
    await showCatalog(container);
  } else {
    container.innerHTML = '<h2>Главная страница</h2><p>Добро пожаловать!</p>';
  }

  // Обновляем URL и pushState только если НЕ из popstate
  if (!fromPopState) {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    if (page === "product" && options.index !== undefined) {
      url.searchParams.set("index", options.index);
    } else {
      url.searchParams.delete("index");
    }

    history.pushState({ page, index: options.index }, "", url);
  }

  // Обновляем активную ссылку в навигации
  document.querySelectorAll("nav a").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

// Первичная загрузка
const params = new URLSearchParams(window.location.search);
const page = params.get("page") || "home";
const index = params.get("index");

loadPage(page, { container: document.getElementById("content"), index });
