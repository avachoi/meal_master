import {
	list,
	img,
	itemName,
	youtube,
	instruction,
	subList,
	form,
	searchInput,
	searchBtn,
	noVideo,
} from "./elements.js";

export const CORS_PROXY = "https://api.allorigins.win/get?url=";

export async function fetchWithCORS(url) {
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

function convertToParagraphs(text) {
	const paragraphs = text
		.split("\r\n")
		.map((line) => `<p>${line}</p>`)
		.join("");

	return paragraphs;
}

export async function loadItem(id) {
	const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const data = await fetchWithCORS(url);
	if (data) {
		const item = data.meals[0];
		img.src = item.strMealThumb;
		itemName.innerHTML = item.strMeal;

		const youtubeUrl = item.strYoutube;
		if (youtubeUrl.length > 0) {
			noVideo.innerHTML = "";
			let videoId = youtubeUrl.split("v=")[1];
			const ampersandPosition = videoId.indexOf("&");
			if (ampersandPosition !== -1) {
				videoId = videoId.substring(0, ampersandPosition);
			}
			const embedUrl = `https://www.youtube.com/embed/${videoId}`;
			youtube.src = embedUrl;
		} else {
			youtube.src = "";
			noVideo.innerHTML = "The video is unavailable";
		}

		instruction.innerHTML = convertToParagraphs(item.strInstructions);
	}
}

export async function loadList() {
	const url = `http://www.themealdb.com/api/json/v1/1/categories.php`;
	const categories = await fetchWithCORS(url);
	if (categories) {
		subList.innerHTML = "";
		categories.categories.forEach((cat) => {
			const category = document.createElement("li");
			category.innerHTML = cat.strCategory;
			list.appendChild(category);
			category.addEventListener("click", () => selectCategory(cat.strCategory));
		});
		await loadItem(52982);
	}
}

export async function selectCategory(category) {
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

export async function searchItems(name) {
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
		searchItems(searchInput.value.trim());
	}
});
