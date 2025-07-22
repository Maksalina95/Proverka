import { showHome } from "./home.js";
import { showCatalog } from "./catalog.js";
import { setupSearchGlobal } from "./search.js";

const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");

function setActive(page) {
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`nav a[data-page="${page}"]`).classList.add("active");
}

async function loadPage(page) {
  setActive(page);

  // Показываем или скрываем поле поиска в зависимости от страницы
  const searchContainer = document.querySelector(".search-container");
  if (page === "home" || page === "catalog") {
    searchContainer.style.display = "flex";
  } else {
    searchContainer.style.display = "none";
  }

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

// Глобальная инициализация поиска (кнопка + подсказки)
setupSearchGlobal();

// Сохраняем событие, чтобы позже отобразить кнопку
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Отменяем автоматическое появление баннера
  e.preventDefault();
  deferredPrompt = e;

  // Показываем кнопку
  const installBtn = document.getElementById('installButton');
  if (installBtn) {
    installBtn.style.display = 'block';

    // Когда пользователь нажимает кнопку
    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt(); // Показываем системный баннер

      // Ждём, что пользователь выберет
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь установил приложение');
        } else {
          console.log('Пользователь отклонил установку');
        }
        deferredPrompt = null;
      });
    });
  }
});
