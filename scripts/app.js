// scripts/app.js import { showHome } from "./home.js"; import { showCatalog } from "./catalog.js"; import { fetchSheetData } from "./config.js"; import { setupSearch } from "./search.js";

const content = document.getElementById("content"); const navLinks = document.querySelectorAll("nav a");

function setActive(page) { navLinks.forEach(link => link.classList.remove("active")); document.querySelector(nav a[data-page="${page}"]).classList.add("active"); }

async function loadPage(page) { setActive(page);

const data = await fetchSheetData();

if (page === "home") { await showHome(content); setupSearch(data, content); } else if (page === "catalog") { await showCatalog(content); setupSearch(data, content); } }

navLinks.forEach(link => { link.addEventListener("click", e => { e.preventDefault(); const page = link.getAttribute("data-page"); loadPage(page); }); });

// Загрузка главной при старте loadPage("home");
