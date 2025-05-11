import { getAllCategories, getMealsByCategory } from "../services/api";
import { useEffect, useState } from "react";
import Menu from "../components/menu";
import Dish from "../components/dish";

export default function Meals() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((data) => {
        if (data.meals) {
          const uniqueCategories = Array.from(
            new Map(
              data.meals.map((cat) => [cat.strCategory, cat])
            ).values()
          );
          setCategories(uniqueCategories);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setLoading(true);
    setError(null);
    getMealsByCategory(selectedCategory)
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching meals for ${selectedCategory}:`, err);
        setError(`Failed to load meals for ${selectedCategory}`);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <>
    <Menu />
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        Meals by Categories
      </h1>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category.strCategory}
            onClick={() => setSelectedCategory(category.strCategory)}
            className={`flex flex-col items-center p-4 rounded-lg shadow-md transition-colors ${
              selectedCategory === category.strCategory
                ? "bg-blue-100 border-blue-500 border-2"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <img
              src={`https://www.themealdb.com/images/category/${category.strCategory}.png`}
              alt={category.strCategory}
              className="w-24 h-24 object-contain mb-2"
              onError={(e) => (e.target.src = "/fallback-image.png")}
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {category.strCategory}
            </h2>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {selectedCategory} Meals
          </h2>
          {meals.length > 0 ? (
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {meals.map((meal) => (
                <Dish
                  key={meal.idMeal}
                  image={meal.strMealThumb}
                  name={meal.strMeal}
                  id={meal.idMeal}
                />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center text-gray-600">
                No meals found for {selectedCategory}
              </div>
            )
          )}
        </div>
      )}
    </div>
    </>
  );
}