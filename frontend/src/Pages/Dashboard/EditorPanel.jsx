import React, { useState, useEffect } from "react";
import { apiRequest } from "../../services/api";

const EditorPanel = () => {
  const [form, setForm] = useState({
    strMeal: "",
    strCategory: "",
    strArea: "",
    strInstructions: "",
    strMealThumb: "",
    strYoutube: "",
    strIngredients: "",
    strTags: "",
    strSource: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch recipes when component loads
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await apiRequest.get("/recipes");
      setRecipes(response.data.data || response.data.recipes || []);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await apiRequest.post("/recipes", form);
      setSuccess("Recipe added successfully!");
      setForm({
        strMeal: "",
        strCategory: "",
        strArea: "",
        strInstructions: "",
        strMealThumb: "",
        strYoutube: "",
        strIngredients: "",
        strTags: "",
        strSource: "",
      });
      fetchRecipes(); // Refresh the recipe list
    } catch (error) {
      setError("Failed to add recipe. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await apiRequest.delete(`/recipes/${id}`);
      setSuccess("Recipe deleted successfully!");
      fetchRecipes(); // Refresh the list
    } catch (error) {
      setError("Failed to delete recipe");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Add Recipe Form */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="text-sm font-medium text-gray-800 mb-5">
          Add a new recipe
        </h2>

        {success && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Your existing form fields */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Recipe name *
            </label>
            <input
              type="text"
              name="strMeal"
              value={form.strMeal}
              onChange={handleChange}
              placeholder="e.g. Spaghetti Carbonara"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Category *
              </label>
              <input
                type="text"
                name="strCategory"
                value={form.strCategory}
                onChange={handleChange}
                placeholder="e.g. Pasta"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Cuisine area *
              </label>
              <input
                type="text"
                name="strArea"
                value={form.strArea}
                onChange={handleChange}
                placeholder="e.g. Italian"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Ingredients *
            </label>
            <textarea
              name="strIngredients"
              value={form.strIngredients}
              onChange={handleChange}
              placeholder="e.g. 200g pasta, 2 eggs, 100g bacon..."
              required
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Instructions *
            </label>
            <textarea
              name="strInstructions"
              value={form.strInstructions}
              onChange={handleChange}
              placeholder="Step by step instructions..."
              required
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Image URL *
            </label>
            <input
              type="url"
              name="strMealThumb"
              value={form.strMealThumb}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                YouTube URL
              </label>
              <input
                type="url"
                name="strYoutube"
                value={form.strYoutube}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Source URL
              </label>
              <input
                type="url"
                name="strSource"
                value={form.strSource}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Tags (optional)
            </label>
            <input
              type="text"
              name="strTags"
              value={form.strTags}
              onChange={handleChange}
              placeholder="e.g. Italian, Pasta, Quick"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save recipe"}
          </button>
        </form>
      </div>

      {/* Display Recipes List */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-medium text-gray-800 mb-5">
          Your Recipes ({recipes.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition"
            >
              {recipe.strMealThumb && (
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="font-medium text-gray-800">{recipe.strMeal}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {recipe.strCategory} • {recipe.strArea}
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No recipes yet. Add your first recipe above!
          </p>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
