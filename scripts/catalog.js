// scripts/catalog.js
import { fetchSheetData } from "./config.js";
import { showFilteredProducts } from "./filtered.js";

let allData = []; // Храним все товары

export async function showCatalog(container) {
  container.innerHTML = "<h2>Категории</h2><div id='categories'></div>";
  allData = await fetchSheetData(); // Загружаем и сохраняем
  const list = document.getElementById("categories");

  const categories = [...new Set(allData.map(item => item["категория"]).filter(Boolean))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      showSubcategories(container, allData, cat);
    });

    list.appendChild(btn);
  });

  setupSearch(container); // Включаем поиск
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
      showFilteredProducts(container, category, sub);
    });

    list.appendChild(btn);
  });

  document.getElementById("back").addEventListener("click", () => {
    showCatalog(container); // ← вернуться к списку категорий
  });
}

function setupSearch(container) {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");
  const suggestions = document.getElementById("suggestions");

  if (!input) return;

  input.oninput = () => {
    const query = input.value.trim().toLowerCase();
    suggestions.innerHTML = "";

    if (query === "") {
      clearBtn.style.display = "none";
      return;
    }

    clearBtn.style.display = "block";

    const matches = allData.filter(item =>
      item["название"]?.toLowerCase().includes(query) ||
      item["описание"]?.toLowerCase().includes(query)
    );

    matches.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item["название"];
      li.addEventListener("click", () => {
        input.value = "";
        suggestions.innerHTML = "";
        clearBtn.style.display = "none";
        showSearchResults(container, [item]);
      });
      suggestions.appendChild(li);
    });
  };

  clearBtn.onclick = () => {
    input.value = "";
    suggestions.innerHTML = "";
    clearBtn.style.display = "none";
  };
}

function showSearchResults(container, results) {
  container.innerHTML = `<h2>Результаты поиска</h2><div class="product-grid"></div><button id="back">← Назад</button>`;
  const grid = container.querySelector(".product-grid");

  results.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item["фото"]}" alt="${item["название"]}" />
      <h3>${item["название"]}</h3>
      <p>${item["описание"] || ""}</p>
      <p><strong>${item["цена"]}</strong></p>
    `;
    grid.appendChild(card);
  });

  document.getElementById("back").addEventListener("click", () => {
    showCatalog(container);
  });
}
