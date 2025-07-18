import { baseUrl } from './config.js';

export function loadCatalog() {
  const app = document.getElementById("app");
  app.innerHTML = "<h2>Каталог</h2><div class='product-list' id='productList'></div>";

  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      data.forEach(item => {
        if (item.photo) {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${item.photo}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>${item.price} ₽</p>
          `;
          list.appendChild(card);
        }
      });
    });
}
