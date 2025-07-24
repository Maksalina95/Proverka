import { setProductData, showProductPage } from "./productPage.js";

export function showFilteredProducts(container, category, subcategory) {
  fetch("./data.json") // или fetchSheetData(), если данные из Google Sheets
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.filter(item =>
        item["категория"] === category &&
        item["подкатегория"] === subcategory &&
        item["изображение"] // фильтруем только товары с фото
      );

      setProductData(filtered); // сохраняем отфильтрованный список для навигации

      container.innerHTML = `
        <h2>${subcategory}</h2>
        <div id="products" class="products-grid"></div>
        <button id="back">← Назад</button>
      `;

      const list = document.getElementById("products");

      filtered.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${item["изображение"]}" alt="${item["название"]}" />
          <h3>${item["название"]}</h3>
          <p>${item["описание"] || ""}</p>
          <strong>${item["цена"]} ₽</strong>
        `;

        div.addEventListener("click", () => {
          showProductPage(container, index); // показываем карточку товара
        });

        list.appendChild(div);
      });

      document.getElementById("back").addEventListener("click", () => {
        window.history.back(); // можно заменить на showCatalog(container) если хочешь
      });
    })
    .catch(err => {
      container.innerHTML = `<p>Ошибка загрузки данных: ${err.message}</p>`;
      console.error("Ошибка в showFilteredProducts:", err);
    });
}
