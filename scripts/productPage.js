export function showProductPage(container, product) {
  container.innerHTML = `
    <div class="product-card-large">
      <img src="${product["фото"]}" alt="${product["название"]}" />
      <h2>${product["название"]}</h2>
      <p>${product["описание"] || ""}</p>
      <p class="price">Цена: ${product["цена"]}₽</p>
      <div class="buttons">
        <a href="https://wa.me/${product["whatsapp1"]}" class="whatsapp-btn" target="_blank">WhatsApp 1</a>
        <a href="https://wa.me/${product["whatsapp2"]}" class="whatsapp-btn" target="_blank">WhatsApp 2</a>
        ${product["telegram"] ? `<a href="${product["telegram"]}" class="telegram-btn" target="_blank">Telegram</a>` : ""}
        ${product["instagram"] ? `<a href="${product["instagram"]}" class="insta-btn" target="_blank">Instagram</a>` : ""}
        ${product["сайт"] ? `<a href="${product["сайт"]}" class="site-btn" target="_blank">Сайт</a>` : ""}
      </div>
      <button class="back-button">← Назад</button>
    </div>
  `;

  // Назад — возвращает к предыдущей странице
  const backBtn = container.querySelector(".back-button");
  backBtn.addEventListener("click", () => {
    history.back();
  });
}
