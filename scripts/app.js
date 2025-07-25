// --- Логика PWA: показ кнопки "Установить" ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', async () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Пользователь выбрал: ${outcome}`);
      deferredPrompt = null;
    });
  }
});

// ** Обрати внимание на пути: "./scripts/..." **
import { showHome } from "./scripts/home.js";
import { showCatalog } from "./scripts/catalog.js";
import { showProductPage } from "./scripts/productPage.js";
import { setupSearchGlobal } from "./scripts/search.js";

const content = document.getElementById("content");
const navLinks = document.querySelectorAll("nav a");

function setActive(page) {
  navLinks.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`nav a[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add("active");
}

async function loadPage(page, data, skipHistory = false) {
  setActive(page);

  const searchContainer = document.querySelector(".search-container");
  if (page === "home" || page === "catalog") {
    searchContainer.style.display = "flex";
  } else {
    searchContainer.style.display = "none";
  }

  if (!skipHistory) {
    const url = page === "product" ? `#product-${data}` : `#${page}`;
    history.pushState({ page, data }, "", url);
  }

  if (page === "home") {
    await showHome(content);
  } else if (page === "catalog") {
    await showCatalog(content);
  } else if (page === "product") {
    await showProductPage(content, data);
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

loadPage("home");
setupSearchGlobal();

// ** Поправлен обработчик popstate - теперь вызывает loadPage **
window.onpopstate = (event) => {
  const state = event.state;
  if (state?.page) {
    loadPage(state.page, state.data, true);
  } else {
    loadPage("home", null, true);
  }
};

export { loadPage };
