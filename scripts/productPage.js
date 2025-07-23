import { loadPage } from "./app.js"; // чтобы вернуться назад

let products = [];
let currentIndex = 0;

export function setProductData(data) {
  products = data;
}

export function showProductPage(container, index) {
  const product = products[index];
  currentIndex = index;

  container.innerHTML = `
    <div class="product-card large">
      <button id="backBtn" class="back-button">← Назад</button>
      <img src="${product["изображение"]}" alt="${product["название"]}" />
      <h2>${product["название"]}</h2>
      <p>${product["описание"]}</p>
      <strong>${product["цена"]} ₽</strong>
      <br />
      <a href="https://wa.me/79376280080?text=${encodeURIComponent("Привет! Хочу заказать: " + product["название"] + " за " + product["цена"] + " ₽")}" target="_blank" class="whatsapp-btn">Заказать в WhatsApp</a>
      <div class="nav-buttons">
        <button id="prevProduct">← Предыдущий</button>
        <button id="nextProduct">Следующий →</button>
      </div>
    </div>
  `;

  document.getElementById("backBtn").onclick = () => loadPage("home");
  document.getElementById("prevProduct").onclick = () => {
    if (currentIndex > 0) showProductPage(container, currentIndex - 1);
  };
  document.getElementById("nextProduct").onclick = () => {
    if (currentIndex < products.length - 1) showProductPage(container, currentIndex + 1);
  };
}
