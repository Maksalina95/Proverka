// search.js

const searchInput = document.getElementById("searchInput");
const applyBtn = document.getElementById("applyBtn");
const clearBtn = document.getElementById("clearBtn");
const suggestionsList = document.getElementById("suggestions"); // ✅ правильный ID

// Загружаем данные из Google Таблицы
async function fetchSheetData() {
  const sheetId = "1D0VRNDIEgh1WFPNHNDiF5-Oncdw0Q7Zb3KHbk1LO_08";
  const sheetName = "Sheet1";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&tqx=out:json`;

  const response = await fetch(url);
  const text = await response.text();
  const json = JSON.parse(text.substr(47).slice(0, -2));

  const rows = json.table.rows;
  const data = rows.map(row => {
    const obj = {};
    row.c.forEach((cell, index) => {
      const columnName = json.table.cols[index].label;
      obj[columnName] = cell ? cell.v : "";
    });
    return obj;
  });

  return data;
}

// Отображение автоподсказок
async function showSuggestions() {
  const query = searchInput.value.toLowerCase();

  if (!window.products || window.products.length === 0) {
    window.products = await fetchSheetData();
    console.log("Загруженные товары:", window.products); // ✅ отладка
  }

  suggestionsList.innerHTML = "";

  if (query.length === 0) return;

  const suggestions = window.products.filter(product =>
    product["название"] && product["название"].toLowerCase().includes(query)
  );

  suggestions.forEach(product => {
    const li = document.createElement("li");
    li.textContent = product["название"];
    li.addEventListener("click", () => {
      searchInput.value = product["название"];
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(li);
  });
}

// Применение поиска
applyBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();

  if (window.products && query.length > 0) {
    const filtered = window.products.filter(product =>
      product["название"] && product["название"].toLowerCase().includes(query)
    );

    // Сохраняем отфильтрованные данные в sessionStorage
    sessionStorage.setItem("filteredProducts", JSON.stringify(filtered));
    window.location.hash = "#catalog";
  }
});

// Очистка поля
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  suggestionsList.innerHTML = "";
  searchInput.focus();
});

// Слушатель ввода
searchInput.addEventListener("input", showSuggestions);
