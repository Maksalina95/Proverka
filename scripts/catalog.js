import { baseUrl } from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
  const categoryContainer = document.getElementById("category-list");
  const productsContainer = document.getElementById("products");

  const data = await fetch(baseUrl).then(res => res.json());

  const hash = decodeURIComponent(location.hash.slice(1));

  if (!hash) {
    // Категории
    const categories = [...new Set(data.map(item => item["категория"]))];
    categories.forEach(category => {
      const div = document.createElement("div");
      div.className = "category-item";
      div.textContent = category;
      div.onclick = () => location.hash = encodeURIComponent(category);
      categoryContainer.appendChild(div);
    });
  } else {
    // Товары из категории
    const filtered = data.filter(item => item["категория"] === hash);
    filtered.forEach(item => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${item["изображение"]}" alt="${item["название"]}" />
        <h3>${item["название"]}</h3>
        <p>${item["цена"]} ₽</p>
      `;
      productsContainer.appendChild(div);
    });
  }
});
