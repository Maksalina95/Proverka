import { products } from './app.js';

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchButton = document.getElementById('searchButton');
const suggestionsList = document.getElementById('suggestionsList');

let productNames = [];

window.addEventListener('DOMContentLoaded', () => {
  if (Array.isArray(products)) {
    productNames = products.map(p => p.name || p.название || "").filter(Boolean);
  }

  // При вводе в поле поиска
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    clearSearch.style.display = query ? 'block' : 'none';

    const filtered = productNames.filter(name =>
      name.toLowerCase().includes(query)
    );

    suggestionsList.innerHTML = '';
    if (query && filtered.length) {
      filtered.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.onclick = () => {
          searchInput.value = item;
          suggestionsList.style.display = 'none';
          clearSearch.style.display = 'block';
          // 👉 Вставь фильтрацию товаров, если готово:
          // filterProductsByName(item);
        };
        suggestionsList.appendChild(li);
      });
      suggestionsList.style.display = 'block';
    } else {
      suggestionsList.style.display = 'none';
    }
  });

  // Очистка поля
  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    clearSearch.style.display = 'none';
    searchInput.focus();
    // 👉 Также можешь показать все товары снова, если хочешь
    // renderAllProducts();
  });

  // Поиск по кнопке
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    alert("Вы ищете: " + query);
    // 👉 Вставь сюда filterProductsByName(query), если реализовано
  });

  // Скрыть подсказки при клике вне области
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) {
      suggestionsList.style.display = 'none';
    }
  });
});
