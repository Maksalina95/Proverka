const baseUrl = "https://opensheet.elk.sh/1uvZDDq7y3D73InwHYQ4vKqmhHXGtK9KjdRcVXzm5KAk";

document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;

  if (path.includes("index") || path === "/" || path === "/index.html") {
    await loadAllProducts();
    initSlider();
  }

  if (path.includes("favorites")) {
    loadFavorites();
  }

  initSearch();
});

// 🔄 Загрузка всех товаров
async function loadAllProducts() {
  const res = await fetch(`${baseUrl}/Лист1`);
  const data = await res.json();
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";

  data.reverse().forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const isFavorite = getFavorites().includes(p.id);

    card.innerHTML = `
      <img src="${p.фото}" alt="${p.название}">
      <h3>${p.название}</h3>
      <p>${p.описание || ""}</p>
      <p><strong>${p.цена} ₽</strong></p>
      <a href="https://wa.me/798376280080" target="_blank">WhatsApp</a>
    `;

    const favBtn = document.createElement("button");
    favBtn.className = "fav-btn";
    favBtn.innerHTML = isFavorite ? "❤️" : "🤍";
    favBtn.onclick = () => toggleFavorite(p.id, favBtn);
    card.appendChild(favBtn);

    container.appendChild(card);
  });
}

// ❤️ Избранное
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function toggleFavorite(id, button) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
    button.innerHTML = "🤍";
  } else {
    favorites.push(id);
    button.innerHTML = "❤️";
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  const container = document.getElementById("favoritesList");
  if (!container) return;

  fetch(`${baseUrl}/Лист1`)
    .then(res => res.json())
    .then(data => {
      const favIds = getFavorites();
      const favProducts = data.filter(p => favIds.includes(p.id));
      container.innerHTML = "";

      favProducts.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${p.фото}" alt="${p.название}">
          <h3>${p.название}</h3>
          <p>${p.описание || ""}</p>
          <p><strong>${p.цена} ₽</strong></p>
          <a href="https://wa.me/798376280080" target="_blank">WhatsApp</a>
          <button class="fav-btn" onclick="toggleFavorite('${p.id}', this)">❤️</button>
        `;
        container.appendChild(card);
      });
    });
}

// 🔍 Поиск
function initSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    cards.forEach(card => {
      const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const visible = name.includes(query);
      card.style.display = visible ? "block" : "none";
    });
  });

  // Показываем Х (очистить)
  const clearBtn = document.getElementById("clearSearch");
  if (clearBtn) {
    clearBtn.onclick = () => {
      input.value = "";
      input.dispatchEvent(new Event("input"));
    };
  }
}

// 📸 Слайдер баннеров
function initSlider() {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    slides[currentSlide].classList.add("active");

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }
}
