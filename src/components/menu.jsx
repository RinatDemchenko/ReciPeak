import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-10 md:justify-around border-b border-gray-100">
      <Link to="/" className="flex items-center">
        <img src="\logo.png" alt="logo" className="w-45 h-20 mr-2" />
      </Link>
      <div className="flex w-60 items-center justify-around">
        <Link
          to="/meals"
          className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 py-2 px-4 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-200"
        >
          Meals
        </Link>
        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 py-2 px-4 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-200"
        >
          Ingredients
        </Link>
      </div>
    </nav>
  );
}
