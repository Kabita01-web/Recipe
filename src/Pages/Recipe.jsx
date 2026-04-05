import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // modal state
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
  //     .then((response) => response.json())
  //     .then((data) => setRecipes(data.meals))
  //     .catch((error) => console.error("Error While Fetching Data:", error));
  // }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
        );
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error While Fetching Data:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipedetails/${recipe.idMeal}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🍗 Chicken Recipes
      </h1>

      {!recipes ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.strMeal}
                </h2>

                <p className="text-sm text-gray-500">
                  🍽️ {recipe.strCategory} | 🌍 {recipe.strArea}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleRecipeClick(recipe)}
                    className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
                  >
                    View Details
                  </button>

                  {/* YouTube */}
                  {recipe.strYoutube && (
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      ▶ YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-3">
              {selectedRecipe.strMeal}
            </h2>

            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <p className="text-gray-600 mb-2">
              🍽️ {selectedRecipe.strCategory}
            </p>
            <p className="text-gray-600 mb-4">🌍 {selectedRecipe.strArea}</p>

            <p className="text-gray-700 text-sm leading-relaxed">
              {selectedRecipe.strInstructions}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-5 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
