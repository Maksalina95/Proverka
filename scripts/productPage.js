import { fetchSheetData } from "./config.js";
import { setProductData, setProductIndex } from "./productPage.js";  

// 🧠 Хранилище для текущих товаров и выбранного индекса
let productData = [];
let productIndex = 0;

export function setProductData(data) {
  productData = data;
}

export function setProductIndex(index) {
  productIndex = index;
}

export function getCurrentProduct() {
  return productData[productIndex];
}

// 🏪 Показывает страницу отдельного товара
export async function showProductPage(container, index) {
  const product = productData[index];
  productIndex = index;

  container.innerHTML = `
    <div class="product-card">
      <button class="back-button" id="backToPrevious">← Назад</button>
      <img src="${product["изображение"]}" alt="${product["название"]}">
      <h2>${product["название"]}</h2>
      <p class="description">${product["описание"] || ""}</p>
      <div class="price">${product["цена"]} ₽</div>
      <a href="https://wa.me/7XXXXXXXXXX?text=Здравствуйте, меня интересует товар: ${encodeURIComponent(product["название"])}"
         class="whatsapp-btn" target="_blank">
         Заказать в WhatsApp
      </a>
    </div>
  `;

  // Назад — просто history.back()
  document.getElementById("backToPrevious").addEventListener("click", () => {
    history.back();
  });
}
