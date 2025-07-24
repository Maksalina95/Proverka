import { fetchSheetData } from "./config.js";
import { showProductPage, setProductData } from "./productPage.js";

export async function showHome(container) {
  container.innerHTML = `
    <h2>Товары</h2>
    <div id="products" class="products-grid"></div>
  `;

  const data = await fetchSheetData();
  setProductData(data);
  renderProducts(data, container);
}

function renderProducts(products, container) {
  const list = document.getElementById("products");
  list.innerHTML = "";

  products.forEach((item, index) => {
    if (!item["изображение"] || !item["название"] || !item["цена"]) return;

    const block = document.createElement("div");
    block.className = "product";
    block.innerHTML = `
      <img src="${item["изображение"]}" alt="${item["название"]}" />
      <h3>${item["название"]}</h3>
      <p>${item["описание"] || ""}</p>
      <strong>${item["цена"]} ₽</strong>
    `;

    block.addEventListener("click", () => {
      showProductPage(container, index);
    });

    list.appendChild(block);
  });
}
