import Recipe from "../models/Recipe.js";

// Create a new recipe
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
      createdBy: req.userId, // ✅ IMPORTANT: Track who created it
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
      createdBy: newRecipe.createdBy,
      createdAt: newRecipe.createdAt,
    };

    res.status(201).json({
      success: true,
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

// Get all recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "username email role");

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log("Error fetching recipes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipes",
      error: error.message,
    });
  }
};

// Get single recipe
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "username email role",
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.log("Error fetching recipe:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe",
      error: error.message,
    });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    // First check if recipe exists and user has permission
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if user is creator or admin
    if (
      recipe.createdBy.toString() !== req.userId &&
      req.userRole !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own recipes",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

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

// Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    // First check if recipe exists and user has permission
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if user is creator or admin
    if (
      recipe.createdBy.toString() !== req.userId &&
      req.userRole !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own recipes",
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

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

// Get current user's recipes
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log("Error fetching user recipes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching your recipes",
      error: error.message,
    });
  }
};
