import { baseUrl } from './config.js';
import { renderProductList } from './app.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById("categoryList");
  if (!container) return;

  try {
    const res = await fetch(`${baseUrl}/товары`);
    const data = await res.json();

    const categories = [...new Set(data.map(p => p.категория).filter(Boolean))];

    categories.forEach(cat => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.style.cursor = "pointer";
      card.innerHTML = `<h3>${cat}</h3>`;
      card.addEventListener("click", () => {
        showSubcategories(cat);
      });
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p>Ошибка загрузки категорий.</p>`;
    console.error(err);
  }
});

function showSubcategories(category) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const subcategories = [...new Set(data
        .filter(p => p.категория === category)
        .map(p => p.подкатегория)
        .filter(Boolean)
      )];

      const subcatContainer = document.getElementById("subcategoryList");
      if (!subcatContainer) return;

      subcatContainer.innerHTML = subcategories.map(sub =>
        `<button onclick="showSubsubcategories('${category}','${sub}')">${sub}</button>`
      ).join('');
    });
}

window.showSubsubcategories = function (category, subcategory) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const subsub = [...new Set(data
        .filter(p => p.категория === category && p.подкатегория === subcategory)
        .map(p => p.подподкатегория)
        .filter(Boolean)
      )];

      const subsubContainer = document.getElementById("subsubcategoryList");
      if (!subsubContainer) return;

      subsubContainer.innerHTML = subsub.map(sub =>
        `<button onclick="showProducts('${category}', '${subcategory}', '${sub}')">${sub}</button>`
      ).join('');
    });
}

window.showProducts = function (category, subcategory, subsubcategory) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const filtered = data.filter(p =>
        p.категория === category &&
        p.подкатегория === subcategory &&
        (p.подподкатегория === subsubcategory || !p.подподкатегория)
      );

      const container = document.getElementById('productList');
      if (container) renderProductList(filtered, container);
    });
}
