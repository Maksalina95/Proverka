import { loadPage } from "./app.js";
import { fetchSheetData } from "./config.js";

export async function showProductPage(container, index) {
  const data = await fetchSheetData();
  const product = data[index];

  container.innerHTML = `
    <div class="product-page">
      <h2>${product["название"]}</h2>
      <img src="${product["фото"]}" alt="${product["название"]}" />
      <p>${product["описание"] || ""}</p>
      <p>Цена: ${product["цена"]} ₽</p>
      <button class="back-button">← Назад</button>
    </div>
  `;

  container.querySelector(".back-button").addEventListener("click", () => {
    loadPage("catalog");
  });
}
