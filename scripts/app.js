function renderProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product['Фото']}" alt="${product['Название']}">
      <h3>${product['Название']}</h3>
      <p>${product['Цена']} ₽</p>
    `;
    container.appendChild(div);
  });
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const suggestions = document.getElementById('suggestions');

  function showSuggestions(value) {
    const val = value.trim().toLowerCase();
    suggestions.innerHTML = '';

    if (val === '') {
      suggestions.style.display = 'none';
      return;
    }

    const matches = window.products.filter(p =>
      p['Название']?.toLowerCase().includes(val)
    );

    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match['Название'];
      li.addEventListener('click', () => {
        input.value = match['Название'];
        suggestions.style.display = 'none';
        renderProducts([match]);
      });
      suggestions.appendChild(li);
    });

    suggestions.style.display = matches.length ? 'block' : 'none';
  }

  input.addEventListener('input', (e) => {
    const value = e.target.value;
    showSuggestions(value);
    renderProducts(window.products.filter(p =>
      p['Название']?.toLowerCase().includes(value.toLowerCase())
    ));
    clearBtn.style.display = value ? 'block' : 'none';
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    suggestions.style.display = 'none';
    renderProducts(window.products);
  });
}

// Запуск после загрузки window.products
window.initApp = function () {
  renderProducts(window.products);
  setupSearch();
};
