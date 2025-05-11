import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import RecipeWrapper from "./pages/recipeWrapper";
import Meals from "./pages/meals";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeWrapper />} />
        <Route path="/meals" element={<Meals />} />
      </Routes>
    </div>
  );
}

export default App;
