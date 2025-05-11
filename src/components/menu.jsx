import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10 md:justify-around">
      <Link to="/" className="flex items-center">
        <img src="\logo.png" alt="logo" className="w-45 h-20 mr-2" />
      </Link>
      <div className="flex w-60 items-center justify-around">
        <Link
          to="/meals"
          className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200 py-2 rounded-md hover:bg-gray-100"
        >
          Meals
        </Link>
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200  py-2 rounded-md hover:bg-gray-100"
        >
          Ingredients
        </Link>
      </div>
    </nav>
  );
}
