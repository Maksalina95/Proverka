import { fetchSheetData } from './config.js';

export async function initSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const suggestions = document.getElementById('suggestions');

  const products = await fetchSheetData(); // Загружаем данные из таблицы

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = '';

    if (query.length === 0) {
      clearBtn.style.display = 'none';
      return;
    }

    clearBtn.style.display = 'inline';

    const matches = products.filter(p =>
      (p.название || '').toLowerCase().includes(query) ||
      (p.описание || '').toLowerCase().includes(query)
    );

    matches.slice(0, 6).forEach(match => {
      const li = document.createElement('li');
      li.textContent = match.название || '';
      li.addEventListener('click', () => {
        input.value = match.название || '';
        suggestions.innerHTML = '';
        // Тут можно сделать навигацию или подсветку товара
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
