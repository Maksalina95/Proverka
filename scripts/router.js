import { setupGlobalSearch } from "./search.js";

// после смены маршрута запускаем поиск
window.addEventListener("hashchange", () => {
  const container = document.getElementById("app");
  setupGlobalSearch(container);
});

// и сразу при загрузке
window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  setupGlobalSearch(container);
});
