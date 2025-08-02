import { useNavigate } from "react-router-dom";

/**
 * Dish card component
 * @param {string} image - Meal image URL
 * @param {string} name - Meal name
 * @param {string} id - Meal ID for navigation
 */
export default function Dish({ image, name, id }) {
  const navigate = useNavigate();
  const viewInfo = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl w-64 h-52 flex flex-col transform hover:-translate-y-3 transition-all duration-500 bg-white border border-gray-100">
      {/* Meal image container with overlay */}
      <div className="relative h-[65%] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover overlay with text */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer"
          onClick={viewInfo}
        >
          <span className="text-white font-semibold text-lg">View Recipe</span>
        </div>
      </div>

      {/* Meal details and recipe button */}
      <div className="h-[35%] bg-gradient-to-r from-white to-slate-50 p-4 flex items-center justify-center">
        <h2 className="text-sm font-semibold text-gray-700 w-[80%] leading-tight text-center">
          {name}
        </h2>
      </div>
    </div>
  );
}
