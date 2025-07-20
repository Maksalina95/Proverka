// scripts/search.js

import { fetchSheetData } from './config.js';
import { showCatalog } from './catalog.js';

const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");
const clearBtn = document.getElementById("clearSearch");
const searchBtn = document.getElementById("searchButton");
const content = document.getElementById("content");

async function initSearch() {
  if (!window.products || window.products.length === 0) {
    window.products = await fetchSheetData();
  }

  function filterProducts(query) {
    const lower = query.toLowerCase();
    return window.products.filter(p => p.название?.toLowerCase().includes(lower));
  }

  function showSuggestions(filtered) {
    suggestionsList.innerHTML = "";
    if (!searchInput.value.trim()) {
      suggestionsList.style.display = "none";
      return;
    }

    filtered.slice(0, 10).forEach(product => {
      const li = document.createElement("li");
      li.textContent = product.название;
      li.addEventListener("click", () => {
        searchInput.value = product.название;
        suggestionsList.style.display = "none";
        renderSearchResults([product]);
      });
      suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = filtered.length ? "block" : "none";
  }

  function renderSearchResults(products) {
    content.innerHTML = "";
    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${p.название}</h3>
        ${p.фото ? `<img src="${p.фото}" alt="${p.название}">` : ""}
        ${p.цена ? `<p><strong>Цена:</strong> ${p.цена}</p>` : ""}
        ${p.описание ? `<p>${p.описание}</p>` : ""}
      `;
      content.appendChild(div);
    });
  }

  // Слушатели
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    clearBtn.style.display = query ? "block" : "none";

    const filtered = filterProducts(query);
    showSuggestions(filtered);
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    suggestionsList.style.display = "none";
    showCatalog(content); // Показать весь каталог
  });

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      const filtered = filterProducts(query);
      renderSearchResults(filtered);
      suggestionsList.style.display = "none";
    }
  });
}

initSearch();
