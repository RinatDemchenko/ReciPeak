export async function getAllIngradients() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await response.json();
  return data;
}

export async function getRecipeById(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  let ingredientsArr = [];
  let measuresArr = [];
  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0][`strIngredient${i}`] !== "" &&
      data.meals[0][`strIngredient${i}`] !== null
    ) {
      ingredientsArr.push(`${data.meals[0][`strIngredient${i}`]}`);
    }
    if (
      data.meals[0][`strMeasure${i}`] !== "" &&
      data.meals[0][`strMeasure${i}`] !== null
    ) {
      measuresArr.push(data.meals[0][`strMeasure${i}`]);
    }
  }
  let instructionSteps = data.meals[0].strInstructions.split(".");
  return {
    name: data.meals[0].strMeal,
    image: data.meals[0].strMealThumb,
    ingredients: ingredientsArr,
    measures: measuresArr,
    instructions: instructionSteps,
    source: data.meals[0].strSource,
    tutorial: data.meals[0].strYoutube,
  };
}

export async function getAllCategories() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const data = await response.json();
  return data;
}

export async function getMealsByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  return data;
}

export async function searchByMultipleIngredients(ingredients) {
  let data = [];
  for (let ingredient of ingredients) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    let foundMeals = await response.json();
    data.push(...foundMeals.meals);
    const uniqueMeals = Array.from(
      new Map(data.map((meal) => [meal.idMeal, meal])).values()
    );
    data = uniqueMeals;
  }
  return data;
}

