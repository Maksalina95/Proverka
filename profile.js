import { sendToGoogleSheet } from "./sheets.js";

export async function showProfilePage(container) {
  container.innerHTML = '';

  const name = localStorage.getItem('name');
  const phone = localStorage.getItem('phone');

  if (name && phone) {
    // Если вошёл
    container.innerHTML = `
      <h2>Добро пожаловать, ${name}!</h2>
      <p>Ваш номер: ${phone}</p>
      <button id="logoutBtn">Выйти</button>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      localStorage.clear();
      showProfilePage(container);
    };

  } else {
    // Если не вошёл
    container.innerHTML = `
      <h2>Вход в личный кабинет</h2>
      <form id="loginForm">
        <input type="text" id="nameInput" placeholder="Имя" required><br>
        <input type="tel" id="phoneInput" placeholder="Телефон" required><br>
        <button type="submit">Войти</button>
      </form>
    `;

    document.getElementById("loginForm").onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById("nameInput").value.trim();
      const phone = document.getElementById("phoneInput").value.trim();
      const date = new Date().toLocaleDateString();

      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);

      await sendToGoogleSheet(name, phone, date);

      showProfilePage(container);
    };
  }
}
