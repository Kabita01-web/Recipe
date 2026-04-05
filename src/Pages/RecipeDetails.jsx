import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRecipe(data.meals[0]);
      } else {
        setRecipe("No Recipe Found");
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-red-500">No Recipe Found</div>
    );
  }

  // Extract ingredients dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`,
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        {/* Image & Title */}
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-80 object-cover rounded-xl"
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {recipe.strCategory}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Area:</strong> {recipe.strArea}
            </p>

            {/* YouTube Button */}
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                ▶ Watch on YouTube
              </a>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {ingredients.map((item, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
