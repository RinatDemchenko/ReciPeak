import { useState, useEffect } from "react";
import Menu from "../components/menu";
import Dish from "../components/dish";
import Ingradient from "../components/ingradient";
import {
  getAllIngradients,
  searchByMultipleIngredients,
} from "../services/api";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState({ meals: [] });
  const [loading, setLoading] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searching, setSearching] = useState(false);
  const [ingredientInfo, setIngredientInfo] = useState({
    name: "",
    info: "",
    visible: false,
  });
  useEffect(() => {
    setLoading(true);
    getAllIngradients()
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      });
  }, []);

  function revealInfo(name, info) {
    setIngredientInfo({
      name: name,
      info: info,
      visible: true,
    });
  }

  function closeInfo() {
    setIngredientInfo({
      name: "",
      info: "",
      visible: false,
    });
  }

  function addIngredient(name) {
    if (!selectedIngredients.includes(name.toLowerCase().replace(/\s+/g, "_"))) {
      setSelectedIngredients([...selectedIngredients, name.toLowerCase().replace(/\s+/g, "_")]);
    }
  }

  function removeIngredient(name) {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== name.toLowerCase().replace(/\s+/g, "_")));
  }

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
    <div className="min-h-screen bg-gray-100">
      <Menu />
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
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            onClick={closeInfo}
            aria-label="Close"
          >
            <img src="/close.png" alt="close" className="w-6 h-6" />
          </button>
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

      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">
          {!results.meals || (results.meals[0] && results.meals[0].strIngredient) 
            ? "Start searching for ingredients" 
            : "Recipes with selected ingredients"}
        </h1>
        
        {!results.meals || (results.meals[0] && results.meals[0].strIngredient) && (
          <input
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Type ingredient name..."
            className="p-2 border rounded-md w-full max-w-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        
        {selectedIngredients.length > 0 && (
          <div className="w-full max-w-md mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Selected Ingredients:</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    <span className="mr-1">{ingredient}</span>
                    <button 
                      onClick={() => removeIngredient(ingredient)}
                      className="text-blue-600 hover:text-blue-800 font-bold ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={findRecipes}
                disabled={searching || selectedIngredients.length === 0}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 
                  ${searching || selectedIngredients.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md'}`}
              >
                {searching ? 'Searching...' : 'Find Possible Recipes'}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            {!results.meals || (results.meals[0] && results.meals[0].strIngredient) 
              ? "Loading ingredients..." 
              : "Searching for recipes..."}
          </div>
        ) : results.meals && results.meals.length > 0 ? (
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {results.meals[0] && results.meals[0].strIngredient ? (
              results.meals
                .filter((item) =>
                  item.strIngredient.toLowerCase().includes(filter.toLowerCase())
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
            ) : (
              results.meals.map((meal) => (
                <Dish
                  name={meal.strMeal}
                  image={meal.strMealThumb}
                  id={meal.idMeal}
                />
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            {!results.meals || (results.meals[0] && results.meals[0].strIngredient) 
              ? "No ingredients found" 
              : "No recipes found with these ingredients"}
          </div>
        )}
      </div>
    </div>
  );
}
