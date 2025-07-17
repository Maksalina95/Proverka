document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  if (!products || products.length === 0) {
    productList.innerHTML = "<p>Нет доступных товаров.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    `;

    productList.appendChild(card);
  });
});
