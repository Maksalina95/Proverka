// scripts/app.js
import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";

const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearSearch");
const suggestionsList = document.getElementById("suggestions");
const searchButton = document.getElementById("searchButton");

let allProducts = [];

function setActive(page) {
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`nav a[data-page="${page}"]`).classList.add("active");
}

async function loadPage(page) {
  setActive(page);
  if (page === "home") {
    await showHome(content);
  } else if (page === "catalog") {
    await showCatalog(content);
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

// Загрузка главной при старте
loadPage("home");

// -----------------------------
// 🔍 Поиск — начинается тут
// -----------------------------

function waitForProducts() {
  if (window.products && Array.isArray(window.products)) {
    allProducts = window.products;
  } else {
    setTimeout(waitForProducts, 100);
  }
}

waitForProducts();

function renderSearchResults(results) {
  content.innerHTML = '';

  if (!results.length) {
    content.innerHTML = "<p>Ничего не найдено 😢</p>";
    return;
  }

  results.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product-card';

    item.innerHTML = `
      <img src="${product.photo}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      ${product.description ? `<p>${product.description}</p>` : ''}
      <div class="buttons">
        <a href="https://wa.me/${product.whatsapp1}" class="btn">WhatsApp 1</a>
        <a href="https://wa.me/${product.whatsapp2}" class="btn">WhatsApp 2</a>
      </div>
    `;

    content.appendChild(item);
  });
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const results = allProducts.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  renderSearchResults(results);
  suggestionsList.innerHTML = '';
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  suggestionsList.innerHTML = '';
  clearBtn.style.display = query ? 'inline' : 'none';

  if (!query) return;

  const matched = allProducts.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  const uniqueSuggestions = [...new Set(
    matched.map(p => p.name).filter(name => name.toLowerCase().includes(query))
  )].slice(0, 5);

  uniqueSuggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    li.addEventListener('click', () => {
      searchInput.value = suggestion;
      suggestionsList.innerHTML = '';
      handleSearch();
    });
    suggestionsList.appendChild(li);
  });
});

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSearch();
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  suggestionsList.innerHTML = '';
  loadPage("home");
});
