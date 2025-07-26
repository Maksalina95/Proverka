export async function sendToGoogleSheet(name, phone, date) {
  const url = "https://script.google.com/macros/s/AKfycbyGz3LPJeTiXIXgIE3ND0jYdIsqRBSqTQBe8sHGGPTbWrOLf9ISbJq6j7E2W5W2E4C8/exec"; // заменим

  const formData = new FormData();
  formData.append("Имя", name);
  formData.append("Телефон", phone);
  formData.append("Дата", date);

  await fetch(url, {
    method: "POST",
    body: formData
  });
}
