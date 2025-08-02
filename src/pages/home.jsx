import { useState, useEffect } from "react";
import Menu from "../components/menu";
import Dish from "../components/dish";
import Ingradient from "../components/ingradient";
import {
  getAllIngradients,
  searchByMultipleIngredients,
} from "../services/api";

export default function Home() {
  // State management for filtering and search functionality
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState({ meals: [] });
  const [loading, setLoading] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searching, setSearching] = useState(false);

  // State for ingredient information modal
  const [ingredientInfo, setIngredientInfo] = useState({
    name: "",
    info: "",
    visible: false,
  });

  /**
   * Get cached ingredients from localStorage if available and updated in the last hour
   * @returns {Object|null} - Cached data or null if not available/expired
   */
  const getCachedIngredients = () => {
    try {
      const storedData = localStorage.getItem("storedData");
      if (!storedData) return null;

      const parsedData = JSON.parse(storedData);
      const now = new Date().getTime();
      const oneHour = 60 * 60 * 1000;

      if (now - parsedData.timestamp < oneHour) {
        return parsedData.data;
      } else {
        localStorage.removeItem("storedData");
        return null;
      }
    } catch (error) {
      console.error("Error reading cached data:", error);
      localStorage.removeItem("storedData");
      return null;
    }
  };

  /**
   * Save ingredients data to localStorage with timestamp
   * @param {Object} data - Ingredients data to cache
   */
  const cacheIngredients = (data) => {
    try {
      const cacheData = {
        data: data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("storedData", JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error caching data:", error);
    }
  };

  /**
   * Load all available ingredients on component mount
   * Uses cached data if available and not expired (1 hour)
   */
  useEffect(() => {
    setLoading(true);

    const cachedData = getCachedIngredients();

    if (cachedData) {
      setResults(cachedData);
      setLoading(false);
      console.log("Using cached ingredients data");
    } else {
      getAllIngradients()
        .then((data) => {
          setResults(data);
          cacheIngredients(data);
          setLoading(false);
          console.log("Fetched fresh ingredients data and cached it");
        })
        .catch((error) => {
          console.error("Error fetching ingredients:", error);
          setLoading(false);
        });
    }
  }, []);

  /**
   * Show ingredient information modal
   */
  function revealInfo(name, info) {
    setIngredientInfo({
      name: name,
      info: info,
      visible: true,
    });
  }

  /**
   * Close ingredient information modal
   */
  function closeInfo() {
    setIngredientInfo({
      name: "",
      info: "",
      visible: false,
    });
  }

  function addIngredient(name) {
    if (
      !selectedIngredients.includes(name.toLowerCase().replace(/\s+/g, "_"))
    ) {
      setSelectedIngredients([
        ...selectedIngredients,
        name.toLowerCase().replace(/\s+/g, "_"),
      ]);
    }
  }

  function removeIngredient(name) {
    setSelectedIngredients(
      selectedIngredients.filter(
        (ing) => ing !== name.toLowerCase().replace(/\s+/g, "_")
      )
    );
  }

  /**
   * Search for recipes based on selected ingredients
   */
  async function findRecipes() {
    if (selectedIngredients.length === 0) return;

    setSearching(true);
    setLoading(true);
    try {
      const data = await searchByMultipleIngredients(selectedIngredients);
      setResults({ meals: data });
    } catch (error) {
      console.error("Error searching for recipes:", error);
    } finally {
      setSearching(false);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Menu />

      {/* Ingredient information modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          ingredientInfo.visible
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeInfo}
      >
        <div
          className={`relative bg-white rounded-lg shadow-xl w-full max-w-[600px] mx-4 sm:mx-6 md:mx-0 transform transition-all duration-300 ${
            ingredientInfo.visible
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal close button */}
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            onClick={closeInfo}
            aria-label="Close"
          >
            <img src="/close.png" alt="close" className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <div className="flex flex-col sm:flex-row p-6 gap-6">
            <div className="w-full sm:w-1/2 h-48 sm:h-auto">
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredientInfo.name.replace(
                  /\s+/g,
                  "_"
                )}.png`}
                alt={ingredientInfo.name}
                className="w-full h-full object-contain rounded-md"
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                }}
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {ingredientInfo.name}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-h-[200px] overflow-y-auto">
                {ingredientInfo.info || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6">
        {/* Selected ingredients display and search button */}
        {selectedIngredients.length > 0 && (
          <div className="w-full max-w-2xl mb-10">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
                Selected Ingredients:
              </h2>
              <div className="flex flex-wrap gap-3 mb-6 justify-center">
                {selectedIngredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 px-4 py-2 rounded-full border border-indigo-200 shadow-sm"
                  >
                    <span className="font-medium">
                      {ingredient.replace(/_/g, " ")}
                    </span>
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 w-5 h-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={findRecipes}
                disabled={searching || selectedIngredients.length === 0}
                className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg 
                  ${
                    searching || selectedIngredients.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  }`}
              >
                {searching ? "Searching..." : "Find Possible Recipes"}
              </button>
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {!results.meals ||
          (results.meals[0] && results.meals[0].strIngredient)
            ? "Start searching for ingredients"
            : "Recipes with selected ingredients"}
        </h1>

        {/* Search input for ingredients */}
        {!results.meals ||
          (results.meals[0] && results.meals[0].strIngredient && (
            <input
              onChange={(e) => setFilter(e.target.value)}
              type="text"
              placeholder="Type ingredient name..."
              className="p-4 border border-gray-200 rounded-xl w-full max-w-lg mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm bg-white transition-all duration-200"
            />
          ))}

        {/* Results display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">
              {!results.meals ||
              (results.meals[0] && results.meals[0].strIngredient)
                ? "Loading ingredients..."
                : "Searching for recipes..."}
            </p>
          </div>
        ) : results.meals && results.meals.length > 0 ? (
          <div className="mt-12 flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {results.meals[0] && results.meals[0].strIngredient
              ? // Display ingredients grid
                results.meals
                  .filter((item) =>
                    item.strIngredient
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                  )
                  .map((item, index) => (
                    <Ingradient
                      key={index}
                      name={item.strIngredient}
                      info={item.strDescription}
                      revealInfo={revealInfo}
                      onAddIngredient={addIngredient}
                    />
                  ))
              : // Display recipes grid
                results.meals.map((meal) => (
                  <Dish
                    key={meal.idMeal}
                    name={meal.strMeal}
                    image={meal.strMealThumb}
                    id={meal.idMeal}
                  />
                ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {!results.meals ||
                (results.meals[0] && results.meals[0].strIngredient)
                  ? "No ingredients found"
                  : "No recipes found"}
              </h3>
              <p className="text-gray-500">
                {!results.meals ||
                (results.meals[0] && results.meals[0].strIngredient)
                  ? "Try adjusting your search terms"
                  : "Try selecting different ingredients"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
