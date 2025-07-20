import { fetchSheetData } from "./config.js";

export function setupGlobalSearch(container) {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length === 0) return;

    const data = await fetchSheetData();

    const results = data.filter(item =>
      item["название"]?.toLowerCase().includes(query) ||
      item["описание"]?.toLowerCase().includes(query)
    );

    container.innerHTML = `<h2>Результаты поиска</h2><div id="products"></div>`;
    const list = document.getElementById("products");

    results.forEach(item => {
      if (!item["изображение"]) return;
      const block = document.createElement("div");
      block.className = "product";
      block.innerHTML = `
        <img src="${item["изображение"]}" alt="${item["название"]}" />
        <h3>${item["название"]}</h3>
        <p>${item["описание"]}</p>
        <strong>${item["цена"]} ₽</strong>
      `;
      list.appendChild(block);
    });
  });
}
