import { fetchSheetData } from "./config.js";
import { showProductPage, setProductData } from "./productPage.js";

export async function showCatalog(container) {
  container.innerHTML = `<h2>Каталог</h2><div id="catalog"></div>`;

  const data = await fetchSheetData();
  setProductData(data); // 💾 обязательно

  // Собираем категории и подкатегории
  const categories = {};
  data.forEach((item, index) => {
    const category = item["категория"];
    const subcategory = item["подкатегория"];

    if (!categories[category]) {
      categories[category] = {};
    }
    if (!categories[category][subcategory]) {
      categories[category][subcategory] = [];
    }
    categories[category][subcategory].push({ ...item, index });
  });

  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  Object.entries(categories).forEach(([catName, subcats]) => {
    const catBlock = document.createElement("div");
    catBlock.className = "category-block";
    const catTitle = document.createElement("h3");
    catTitle.textContent = catName;
    catBlock.appendChild(catTitle);

    Object.entries(subcats).forEach(([subcatName, items]) => {
      const subcatBlock = document.createElement("div");
      subcatBlock.className = "subcategory-block";
      const subcatTitle = document.createElement("h4");
      subcatTitle.textContent = subcatName;
      subcatBlock.appendChild(subcatTitle);

      const list = document.createElement("div");
      list.className = "product-list";

      items.forEach((item) => {
        if (!item["изображение"]) return;

        const block = document.createElement("div");
        block.className = "product";
        block.innerHTML = `
          <img src="${item["изображение"]}" alt="${item["название"]}" />
          <h3>${item["название"]}</h3>
          <p>${item["описание"]}</p>
          <strong>${item["цена"]} ₽</strong>
        `;

        block.addEventListener("click", () => {
          showProductPage(container, item.index); // 📦
        });

        list.appendChild(block);
      });

      subcatBlock.appendChild(list);
      catBlock.appendChild(subcatBlock);
    });

    catalog.appendChild(catBlock);
  });
}
