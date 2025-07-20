const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const suggestionsList = document.getElementById('suggestions');

function filterProducts(query) {
  return window.products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}

function showSuggestions(filtered) {
  suggestionsList.innerHTML = '';
  if (filtered.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  filtered.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name;
    li.onclick = () => {
      searchInput.value = p.name;
      suggestionsList.style.display = 'none';
      const result = filterProducts(p.name);
      displayProducts(result);
    };
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = 'block';
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    const filtered = filterProducts(query);
    showSuggestions(filtered);
    clearSearch.style.display = 'block';
    displayProducts(filtered);
  } else {
    suggestionsList.style.display = 'none';
    clearSearch.style.display = 'none';
    displayProducts(window.products);
  }
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearSearch.style.display = 'none';
  suggestionsList.style.display = 'none';
  displayProducts(window.products);
});
