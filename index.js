const list = document.querySelector("#list");
const img = document.querySelector("#itemImg");
const itemName = document.querySelector("#itemName");
const youtube = document.querySelector("#youtubeLink");
const instruction = document.querySelector("#instruction");

async function loadList() {
	const response = await fetch(
		`http://www.themealdb.com/api/json/v1/1/categories.php`
	);
	const categories = await response.json();
	console.log(categories);
	categories.categories.forEach((cat) => {
		const category = document.createElement("li");
		category.innerHTML = cat.strCategory;
		list.appendChild(category);
	});
}

async function loadItem(id) {
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
}

document.addEventListener("DOMContentLoaded", loadList);
loadItem(52772);
