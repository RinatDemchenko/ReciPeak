import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../services/api'
import Recipe from '../components/recipe'
import Menu from '../components/menu'
export default function RecipeWrapper() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRecipeById(id);
        setRecipeData(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading recipe...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!recipeData) return <div className="flex justify-center items-center min-h-screen">Recipe not found</div>;

  return (
    <div>
      <Menu />
      <Recipe {...recipeData} />
    </div>
  )
}