import { fetchSheetData } from "./config.js";
import { loadPage } from "./app.js";
import { setProductData } from "./productPage.js";

export async function showFilteredProducts(container, category, subcategory) {
  const data = await fetchSheetData();

  const filtered = data.filter(item =>
    item["категория"] === category &&
    item["подкатегория"] === subcategory
  );

  container.innerHTML = `
    <h2>${subcategory}</h2>
    <div id="products"></div>
    <button id="back">← Назад</button>
  `;

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

    block.addEventListener("click", async () => {
      container.innerHTML = `
        <div class="product-detail">
          <img src="${item["изображение"]}" alt="${item["название"]}" />
          <h2>${item["название"]}</h2>
          <p>${item["описание"]}</p>
          <strong>${item["цена"]} ₽</strong>
          <button id="backToFiltered">← Назад</button>
        </div>
      `;

      document.getElementById("backToFiltered").addEventListener("click", () => {
        showFilteredProducts(container, category, subcategory);
      });
    });

    list.appendChild(block);
  });

  document.getElementById("back").addEventListener("click", () => {
    loadPage("categories");
  });
}
