import { products } from './config.js'; // Товары

export function initSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const suggestions = document.getElementById('suggestions');

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = '';

    if (query.length === 0) {
      clearBtn.style.display = 'none';
      return;
    }

    clearBtn.style.display = 'inline';

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    matches.slice(0, 6).forEach(match => {
      const li = document.createElement('li');
      li.textContent = match.name;
      li.addEventListener('click', () => {
        input.value = match.name;
        suggestions.innerHTML = '';
        // Тут можно сделать дополнительную навигацию или выделение
      });
      suggestions.appendChild(li);
    });
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    suggestions.innerHTML = '';
  });
}
