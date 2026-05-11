import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    strMeal: {
      type: String,
      required: [true, "Recipe name is required"],
      trim: true,
    },
    strCategory: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    strArea: {
      type: String,
      required: [true, "Cuisine area is required"],
      trim: true,
    },
    strInstructions: {
      type: String,
      required: [true, "Instructions are required"],
    },
    strMealThumb: {
      type: String,
      required: [true, "Image URL is required"],
    },
    strYoutube: {
      type: String,
      default: "",
    },
    strIngredients: {
      type: String,
      required: [true, "Ingredients are required"],
    },
    strTags: {
      type: String,
      default: "",
    },
    strSource: {
      type: String,
      default: "",
    },
    createdBy: {
      // ← ADD THIS FIELD
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Recipe", recipeSchema);
