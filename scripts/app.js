// scripts/app.js
import { showHome } from './home.js';
import { showCatalog } from './catalog.js';
import { initSearch } from './search.js'; // подключаем поиск

const content = document.getElementById('content');
const navLinks = document.querySelectorAll('nav a');
const searchContainer = document.getElementById('search-container');

// Инициализация поиска
initSearch();

function setActive(page) {
  navLinks.forEach(link => link.classList.remove('active'));
  document.querySelector(`nav a[data-page="${page}"]`).classList.add('active');
}

async function loadPage(page) {
  setActive(page);

  // Показ или скрытие поля поиска
  if (page === 'home' || page === 'catalog') {
    searchContainer.style.display = 'block';
  } else {
    searchContainer.style.display = 'none';
  }

  if (page === 'home') {
    await showHome(content);
  } else if (page === 'catalog') {
    await showCatalog(content);
  }
}

// Навигация по страницам
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  });
});

// Загружаем главную при старте
loadPage('home');
