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
    <div id="products" class="products-grid"></div>
    <button id="back">← Назад</button>
  `;

  const list = document.getElementById("products");

  // 👇 важное: передаём весь массив товаров + index
  filtered.forEach((item, index) => {
    if (!item["изображение"]) return;

    const block = document.createElement("div");
    block.classList.add("product");

    block.innerHTML = `
      <img src="${item["изображение"]}" alt="${item["название"]}">
      <h3>${item["название"]}</h3>
      <p>${item["цена"]} ₽</p>
    `;

    block.addEventListener("click", () => {
      setProductData(filtered);            // передаём весь список!
      loadPage("product", index);          // индекс нужного товара
    });

    list.appendChild(block);
  });

  // Назад
  document.getElementById("back").addEventListener("click", () => {
    import("./catalog.js").then(mod => mod.showCatalog(container));
  });
}
