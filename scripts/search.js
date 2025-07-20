// scripts/search.js
export function setupSearch(data, container) {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");
  const suggestions = document.getElementById("suggestions");

  if (!input || !suggestions || !data || !container) return;

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (!value) {
      clearBtn.style.display = "none";
      return;
    }

    clearBtn.style.display = "inline";

    const filtered = data.filter(item =>
      item["название"]?.toLowerCase().includes(value) ||
      item["описание"]?.toLowerCase().includes(value)
    );

    filtered.slice(0, 5).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item["название"];
      li.addEventListener("click", () => {
        suggestions.innerHTML = "";
        input.value = "";
        clearBtn.style.display = "none";
        container.innerHTML = `<h2>${item["название"]}</h2>
          <img src="${item["фото"]}" alt="${item["название"]}">
          <p>${item["описание"]}</p>
          <p><strong>${item["цена"]}</strong></p>`;
      });
      suggestions.appendChild(li);
    });
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    suggestions.innerHTML = "";
    clearBtn.style.display = "none";
  });
}
