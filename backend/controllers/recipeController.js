import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    strIngredients,
    strTags,
    strSource,
  } = req.body;
  try {
    const newRecipe = await Recipe.create({
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strYoutube,
      strIngredients,
      strTags,
      strSource,
    });
    const recipeResponse = {
      _id: newRecipe._id,
      strMeal: newRecipe.strMeal,
      strCategory: newRecipe.strCategory,
      strArea: newRecipe.strArea,
      strInstructions: newRecipe.strInstructions,
      strMealThumb: newRecipe.strMealThumb,
      strYoutube: newRecipe.strYoutube,
      strIngredients: newRecipe.strIngredients,
      strTags: newRecipe.strTags,
      strSource: newRecipe.strSource,
    };
    res.status(201).json({
      message: "Recipe created successfully",
      data: recipeResponse,
    });
  } catch (error) {
    console.log("Error creating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating recipe",
      error: error.message,
    });
  }
};

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting recipe",
      error: error.message,
    });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } catch (error) {
    console.log("Error updating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
      error: error.message,
    });
  }
};
