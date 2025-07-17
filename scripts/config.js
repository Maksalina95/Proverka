// scripts/config.js

const sheetId = '1D0VRNDIEgh1WFPNHNDiF5-Oncdw0Q7Zb3KHbk1LO_08';
const sheetUrl = `https://opensheet.elk.sh/${sheetId}/Лист1`;

async function fetchProducts() {
  const res = await fetch(sheetUrl);
  const data = await res.json();

  // Сортируем по новизне (последние — в начале)
  return data.reverse(); 
}
