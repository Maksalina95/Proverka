function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p>Товары не найдены</p>';
    return;
  }

  products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'product';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.price} ₽</p>
    `;
    productList.appendChild(item);
  });
}

window.addEventListener('load', () => {
  if (window.products) {
    displayProducts(window.products);
  } else {
    console.error('Товары не загружены');
  }
});
