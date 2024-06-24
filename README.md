# Meal Master

![Screen Shot 2024-06-24 at 4 18 38 PM](https://github.com/avachoi/meal_master/assets/72422987/c0cb0061-abef-4322-82ef-e097baa95eca)



Meal Master is a web application that allows users to search and view recipes from various categories. It uses the MealDB API to fetch meal details, including images, instructions, and YouTube videos for preparation.

## Features

- Browse meal categories.
- Search for meals by name.
- View meal details including images, instructions, and YouTube tutorial videos.

## Technologies Used

- HTML
- CSS
- JavaScript
- MealDB API
- Google Fonts

## API Reference
The application uses the MealDB API to fetch meal data. The following endpoints are used:

- Categories: http://www.themealdb.com/api/json/v1/1/categories.php
- Filter by Category: http://www.themealdb.com/api/json/v1/1/filter.php?c={category}
- Lookup Meal by ID: http://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
- Search Meal by Name: http://www.themealdb.com/api/json/v1/1/search.php?s={name}
