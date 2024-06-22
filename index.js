const list = document.querySelector("#list");
const img = document.querySelector("#itemImg");
const itemName = document.querySelector("#itemName");
const youtube = document.querySelector("#youtubeLink");
const instruction = document.querySelector("#instruction");
const subList = document.querySelector("#subList");

async function fetchWithCacheClear(url) {
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
		},
	});
	const data = await response.json();
	return data;
}

async function loadList() {
	try {
		const response = await fetch(
			`http://www.themealdb.com/api/json/v1/1/categories.php`
		);
		const categories = await response.json();
		console.log(categories);
		categories.categories.forEach((cat) => {
			const category = document.createElement("li");
			category.innerHTML = cat.strCategory;

			list.appendChild(category);
			category.addEventListener("click", () => selectCategory(cat.strCategory));
		});
	} catch (error) {
		console.error("Error fetching categories:", error);
	}
}

async function selectCategory(category) {
	try {
		const response = await fetch(
			`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
		);
		const obj = await response.json();
		const meals = obj.meals;
		subList.innerHTML = "";
		meals.forEach((el) => {
			const meal = document.createElement("li");
			meal.innerHTML = el.strMeal;
			subList.appendChild(meal);
			meal.addEventListener("click", () => loadItem(el.idMeal));
		});
	} catch (error) {
		console.error("Error fetching subList:", error);
	}
}

async function loadItem(id) {
	try {
		const response = await fetch(
			`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		);
		const data = await response.json();
		const item = data.meals[0];
		console.log("item", item);
		img.src = item.strMealThumb;
		itemName.innerHTML = item.strMeal;
		youtube.href = item.strYoutube;
		instruction.innerHTML = item.strInstructions;
	} catch (error) {
		console.error("Error fetching an item detail:", error);
	}
}

document.addEventListener("DOMContentLoaded", loadList);
// loadItem(52772);
