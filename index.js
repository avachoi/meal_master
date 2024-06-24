const list = document.querySelector("#list");
const img = document.querySelector("#itemImg");
const itemName = document.querySelector("#itemName");
const youtube = document.querySelector("#youtubeLink");
const instruction = document.querySelector("#instruction");
const subList = document.querySelector("#subList");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const CORS_PROXY = "https://api.allorigins.win/get?url=";

async function fetchWithCORS(url) {
	try {
		const response = await fetch(CORS_PROXY + encodeURIComponent(url));
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return JSON.parse(data.contents);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

async function loadList() {
	const url = `http://www.themealdb.com/api/json/v1/1/categories.php`;
	const categories = await fetchWithCORS(url);
	if (categories) {
		console.log(categories);
		categories.categories.forEach((cat) => {
			const category = document.createElement("li");
			category.innerHTML = cat.strCategory;
			list.appendChild(category);
			category.addEventListener("click", () => selectCategory(cat.strCategory));
		});
	}
}

async function selectCategory(category) {
	const url = `http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
	const obj = await fetchWithCORS(url);
	if (obj) {
		const meals = obj.meals;
		subList.innerHTML = ""; // Clear previous meals
		meals.forEach((el) => {
			const meal = document.createElement("li");
			meal.innerHTML = el.strMeal;
			meal.addEventListener("click", () => loadItem(el.idMeal));
			subList.appendChild(meal);
		});
	}
}

async function loadItem(id) {
	const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const data = await fetchWithCORS(url);
	if (data) {
		subList.innerHTML = "";
		const item = data.meals[0];

		img.src = item.strMealThumb;
		itemName.innerHTML = item.strMeal;

		const youtubeUrl = item.strYoutube;
		let videoId = youtubeUrl.split("v=")[1];
		const ampersandPosition = videoId.indexOf("&");
		if (ampersandPosition !== -1) {
			videoId = videoId.substring(0, ampersandPosition);
		}
		const embedUrl = `https://www.youtube.com/embed/${videoId}`;
		youtube.src = embedUrl;

		instruction.innerHTML = item.strInstructions;
	}
}

async function searchItems(name) {
	const url = `http://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
	const data = await fetchWithCORS(url);
	if (data.meals) {
		subList.innerHTML = "";
		data.meals.forEach((el) => {
			const meal = document.createElement("li");
			meal.innerHTML = el.strMeal;
			meal.addEventListener("click", () => loadItem(el.idMeal));

			subList.appendChild(meal);
		});
	} else {
		subList.innerHTML = "no item available";
	}
}
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const item = searchInput.value.trim();
	if (item) {
		console.log("search.value", searchInput.value.trim());
		searchItems(searchInput.value.trim());
	}
});

document.addEventListener("DOMContentLoaded", loadList);
