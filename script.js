const sheetUrl = 'https://opensheet.elk.sh/1D0VRNDIEgh1WFPNHNDiF5-Oncdw0Q7Zb3KHbk1LO_08/Sheet1';

let allData = [];

document.addEventListener("DOMContentLoaded", () => {
  const navHome = document.getElementById("nav-home");
  const navCatalog = document.getElementById("nav-catalog");
  const homeSection = document.getElementById("home-section");
  const catalogSection = document.getElementById("catalog-section");

  // Переключение вкладок
  navHome.addEventListener("click", e => {
    e.preventDefault();
    navHome.classList.add("active");
    navCatalog.classList.remove("active");
    homeSection.classList.remove("hidden");
    catalogSection.classList.add("hidden");
  });

  navCatalog.addEventListener("click", e => {
    e.preventDefault();
    navCatalog.classList.add("active");
    navHome.classList.remove("active");
    catalogSection.classList.remove("hidden");
    homeSection.classList.add("hidden");
  });

  // Загрузить данные из Google Таблицы
  loadData();
});

async function loadData() {
  try {
    const response = await fetch(sheetUrl);
    allData = await response.json();

    showLatestProducts();
    showCategories();

  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

// ПОКАЗАТЬ последние товары на Главной
function showLatestProducts() {
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";

  // Возьмём последние 10 товаров из массива (предполагается, что данные идут в порядке добавления)
  const latest = allData.slice(-10).reverse();

  latest.forEach(item => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      ${item.фото ? `<img src="${item.фото}" alt="${item.название}">` : ''}
      <strong>${item.название}</strong><br>
      <em>${item.описание || ''}</em><br>
      Цена: ${item.цена} руб.<br>
      Категория: ${item.категория}<br>
      Бренд: ${item.бренд || '-'}
    `;
    productsList.appendChild(div);
  });
}

// Уникальные категории
let categoriesUnique = [];
// Уникальные подкатегории по выбранной категории
let subcategoriesUnique = [];
// Уникальные подподкатегории по выбранным категории и подкатегории
let subsubcategoriesUnique = [];

function showCategories() {
  const categoriesList = document.getElementById("categories-list");
  const subcategoriesList = document.getElementById("subcategories-list");
  const subsubcategoriesList = document.getElementById("subsubcategories-list");
  const catalogProductsList = document.getElementById("catalog-products-list");

  // Очистить все уровни
  categoriesList.innerHTML = "";
  subcategoriesList.innerHTML = "";
  subsubcategoriesList.innerHTML = "";
  catalogProductsList.innerHTML = "";

  categoriesUnique = [...new Set(allData.map(item => item.категория))];

  categoriesUnique.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = cat;
    div.addEventListener("click", () => showSubcategories(cat));
    categoriesList.appendChild(div);
  });
}

function showSubcategories(category) {
  const subcategoriesList = document.getElementById("subcategories-list");
  const subsubcategoriesList = document.getElementById("subsubcategories-list");
  const catalogProductsList = document.getElementById("catalog-products-list");

  subcategoriesList.innerHTML = "";
  subsubcategoriesList.innerHTML = "";
  catalogProductsList.innerHTML = "";

  subcategoriesUnique = [...new Set(allData
    .filter(item => item.категория === category)
    .map(item => item.подкатегория))];

  subcategoriesUnique.forEach(subcat => {
    const div = document.createElement("div");
    div.className = "subcategory";
    div.textContent = subcat;
    div.addEventListener("click", () => showSubsubcategories(category, subcat));
    subcategoriesList.appendChild(div);
  });
}

function showSubsubcategories(category, subcategory) {
  const subsubcategoriesList = document.getElementById("subsubcategories-list");
  const catalogProductsList = document.getElementById("catalog-products-list");

  subsubcategoriesList.innerHTML = "";
  catalogProductsList.innerHTML = "";

  subsubcategoriesUnique = [...new Set(allData
    .filter(item => item.категория === category && item.подкатегория === subcategory)
    .map(item => item.подподкатегория))];

  subsubcategoriesUnique.forEach(subsubcat => {
    const div = document.createElement("div");
    div.className = "subsubcategory";
    div.textContent = subsubcat;
    div.addEventListener("click", () => showCatalogProducts(category, subcategory, subsubcat));
    subsubcategoriesList.appendChild(div);
  });
}

function showCatalogProducts(category, subcategory, subsubcategory) {
  const catalogProductsList = document.getElementById("catalog-products-list");
  catalogProductsList.innerHTML = "";

  const filtered = allData.filter(item =>
    item.категория === category &&
    item.подкатегория === subcategory &&
    item.подподкатегория === subsubcategory
  );

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      ${item.фото ? `<img src="${item.фото}" alt="${item.название}">` : ''}
      <strong>${item.название}</strong><br>
      <em>${item.описание || ''}</em><br>
      Цена: ${item.цена} руб.<br>
      Бренд: ${item.бренд || '-'}<br>
      Страна: ${item.страна || '-'}
    `;
    catalogProductsList.appendChild(div);
  });
}
