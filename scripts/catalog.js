import { showProductPage, setProductData } from "./productPage.js";  
  
export async function showCatalog(container, products) {  
  container.innerHTML = `  
    <div class="catalog">  
      ${products.map((product, index) => `  
        <div class="product-card" data-index="${index}">  
          <img src="${product["изображение"]}" alt="${product["название"]}" />  
          <h3>${product["название"]}</h3>  
          <p>${product["цена"]} ₽</p>  
        </div>  
      `).join('')}  
    </div>  
  `;  
  
  // Сохраняем данные и вешаем обработчики на карточки  
  setProductData(products);  
  document.querySelectorAll(".product-card").forEach(card => {  
    card.addEventListener("click", () => {  
      const index = card.dataset.index;  
      showProductPage(container, parseInt(index));  
    });  
  });  
}
