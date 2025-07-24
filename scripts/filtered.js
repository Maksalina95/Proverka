// scripts/filtered.js

import { setProductData, showProductPage } from "./productPage.js";

export function showFilteredProducts(container, category, subcategory) {
  fetch("./data.json") // или fetchSheetData(), если ты работаешь с Google Таблицей
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter(item =>
        item["категория"] === category &&
        item["подкатегория"] === subcategory &&
        item["изображение"]
      );

      // ✅ Сохраняем эти товары для перелистывания
      setProductData(filtered);

      container.innerHTML = `<h2>${subcategory}</h2><div id="products"></div><button id="back">← Назад</button>`;
      const list = document.getElementById("products");

      filtered.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${item["изображение"]}" alt="${item["название"]}" />
          <h3>${item["название"]}</h3>
          <p>${item["описание"]}</p>
          <strong>${item["цена"]} ₽</strong>
        `;
        div.addEventListener("click", () => {
          showProductPage(container, index);
        });
        list.appendChild(div);
      });

      document.getElementById("back").addEventListener("click", () => {
        window.history.back(); // или снова showCatalog(), как тебе удобнее
      });
    });
}
