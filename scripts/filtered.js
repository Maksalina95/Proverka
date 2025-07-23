import { fetchSheetData } from "./config.js";
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
    block.classList.add("product-card");
    block.innerHTML = `
      <img src="${item["изображение"]}" alt="${item["название"]}">
      <h3>${item["название"]}</h3>
      <p>${item["цена"]} ₽</p>
    `;

    block.addEventListener("click", () => {
      setProductData(container, item); // тот же способ, как на главной
    });

    list.appendChild(block);
  });

  document.getElementById("back").addEventListener("click", () => {
    location.reload(); // или вызови функцию, которая показывает категории
  });
}
