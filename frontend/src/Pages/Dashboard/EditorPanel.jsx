import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    } catch (error) {
      setError("Failed to add recipe. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
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
    </div>
  );
};

export default EditorPanel;
