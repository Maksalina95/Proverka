// scripts/search.js
import { fetchSheetData } from "./config.js";
import { showFilteredProducts } from "./filtered.js";

export async function setupSearch(container) {
  const searchInput = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");
  const searchBtn = document.getElementById("searchBtn");

  const data = await fetchSheetData();

  function filterSuggestions(value) {
    const filtered = data
      .filter(item => item["название"]?.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5); // до 5 подсказок
    suggestions.innerHTML = "";

    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item["название"];
      li.addEventListener("click", () => {
        searchInput.value = item["название"];
        suggestions.innerHTML = "";
        showResults(item["название"]);
      });
      suggestions.appendChild(li);
    });
  }

  function showResults(value) {
    const filtered = data.filter(item =>
      item["название"]?.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length === 0) {
      container.innerHTML = `<h2>Ничего не найдено</h2>`;
      return;
    }

    container.innerHTML = `<h2>Результаты поиска для "${value}"</h2><div id="products"></div>`;
    const list = document.getElementById("products");

    filtered.forEach(item => {
      if (!item["изображение"]) return;
      const block = document.createElement("div");
      block.className = "product";
      block.innerHTML = `
        <img src="${item["изображение"]}" alt="${item["название"]}" />
        <h3>${item["название"]}</h3>
        <p>${item["описание"]}</p>
        <strong>${item["цена"]} ₽</strong>
      `;
      list.appendChild(block);
    });
  }

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (value.length > 0) {
      filterSuggestions(value);
    } else {
      suggestions.innerHTML = "";
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = searchInput.value.trim();
      suggestions.innerHTML = "";
      showResults(value);
    }
  });

  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    suggestions.innerHTML = "";
    showResults(value);
  });
}
