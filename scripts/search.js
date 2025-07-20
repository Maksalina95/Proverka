// scripts/search.js
import { getProducts, renderCatalog } from "./catalog.js";

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchButton = document.getElementById('searchButton');
const suggestionsList = document.getElementById('suggestionsList');

let products = [];

async function initSearch() {
  products = await getProducts();

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    clearSearch.style.display = query ? 'block' : 'none';

    const filtered = products.filter(p =>
      (p.name || p.название || '').toLowerCase().includes(query)
    );

    suggestionsList.innerHTML = '';
    if (query && filtered.length) {
      filtered.slice(0, 6).forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.name || p.название;
        li.onclick = () => {
          searchInput.value = li.textContent;
          clearSearch.style.display = 'block';
          suggestionsList.innerHTML = '';
          renderCatalog([p]); // показываем один товар
        };
        suggestionsList.appendChild(li);
      });
      suggestionsList.style.display = 'block';
    } else {
      suggestionsList.style.display = 'none';
    }
  });

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    renderCatalog(products); // вернуть все товары
    searchInput.focus();
  });

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = products.filter(p =>
      (p.name || p.название || '').toLowerCase().includes(query)
    );
    renderCatalog(filtered);
    suggestionsList.style.display = 'none';
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-bar')) {
      suggestionsList.style.display = 'none';
    }
  });
}

window.addEventListener("DOMContentLoaded", initSearch);
