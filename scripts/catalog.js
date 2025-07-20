// scripts/catalog.js
import { fetchSheetData } from "./config.js";
import { renderProducts } from "./filtered.js";

export async function showCatalog(container) {
  container.innerHTML = `
    <div id="catalog-search">
      <input type="text" id="catalogSearchInput" placeholder="Поиск товаров...">
      <button id="clearCatalogSearch" style="display:none;">✖</button>
    </div>
    <h2>Категории</h2>
    <div id="categories"></div>
  `;

  const data = await fetchSheetData();
  const list = document.getElementById("categories");

  const categories = [...new Set(data.map(item => item["категория"]).filter(Boolean))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      showSubcategories(container, data, cat);
    });
    list.appendChild(btn);
  });

  // Поиск в каталоге
  const searchInput = document.getElementById("catalogSearchInput");
  const clearBtn = document.getElementById("clearCatalogSearch");

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    clearBtn.style.display = term ? "inline" : "none";
    if (term.length === 0) {
      container.innerHTML = ""; // сбрасываем
      showCatalog(container);
    } else {
      const results = data.filter(item =>
        item["название"]?.toLowerCase().includes(term) ||
        item["описание"]?.toLowerCase().includes(term)
      );
      renderProducts(container, results); // переиспользуем рендер
    }
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    showCatalog(container);
  });
}

function showSubcategories(container, data, category) {
  container.innerHTML = `<h2>${category}</h2><div id='subcategories'></div><button id="back">← Назад</button>`;
  const list = document.getElementById("subcategories");

  const subcats = [...new Set(
    data
      .filter(item => item["категория"] === category)
      .map(item => item["подкатегория"])
      .filter(Boolean)
  )];

  subcats.forEach(sub => {
    const btn = document.createElement("button");
    btn.className = "subcategory-btn";
    btn.textContent = sub;

    btn.addEventListener("click", () => {
      const filtered = data.filter(item =>
        item["категория"] === category &&
        item["подкатегория"] === sub
      );
      renderProducts(container, filtered);
    });

    list.appendChild(btn);
  });

  document.getElementById("back").addEventListener("click", () => {
    showCatalog(container);
  });
}
