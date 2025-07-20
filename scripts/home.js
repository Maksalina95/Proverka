// scripts/home.js
import { fetchSheetData } from "./config.js";
import { setupSearch } from "./search.js";

export async function showHome(container) {
  const data = await fetchSheetData();
  container.innerHTML = `<h2>Добро пожаловать!</h2><p>Найди нужный товар через поиск</p>`;
  
  // Включаем поиск
  setupSearch(data, container);
}
