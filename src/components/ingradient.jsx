/**
 * Ingredient card component
 * Displays ingredient information with image, name, and add functionality
 * @param {string} name - Ingredient name
 * @param {string} info - Ingredient description/information
 * @param {function} revealInfo - Function to show ingredient details modal
 * @param {function} onAddIngredient - Function to add ingredient to selection
 */
export default function Ingradient({
  name,
  info,
  revealInfo,
  onAddIngredient,
}) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg w-58 h-64 flex flex-col transform hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-100 group">
      <div className="h-[75%] overflow-hidden relative bg-gradient-to-br from-slate-50 to-gray-100">
        <img
          src={`https://www.themealdb.com/images/ingredients/${name.replace(
            /\s+/g,
            "_"
          )}.png`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = "/fallback-image.jpg";
          }}
        />
        {/* Hover overlay with info button */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <div
            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => revealInfo(name, info)}
          >
            <img src="/info.png" alt="info" className="w-6 h-6 opacity-70" />
          </div>
        </div>
      </div>
      <div className="flex bg-gradient-to-r from-white to-slate-50 p-4 h-[25%] justify-center items-center">
        <h2 className="text-sm font-semibold text-gray-700 w-[70%] leading-tight">
          {name}
        </h2>
        <button
          onClick={() => onAddIngredient(name)}
          className="flex justify-center items-center text-white w-10 h-10 cursor-pointer 
                    bg-indigo-400 hover:bg-indigo-500 rounded-lg
                    shadow-md hover:shadow-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
          aria-label="Add ingredient"
        >
          <img
            src="/add.png"
            alt="add"
            className="w-6 h-6 filter brightness-0 invert"
          />
        </button>
      </div>
    </div>
  );
}
