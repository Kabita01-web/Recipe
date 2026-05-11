import express from "express";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipes,
  getRecipeById,
  getMyRecipes,
} from "../controllers/recipeController.js";
import { verifyToken, verifyEditor } from "../middleware/verifyToken.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// GET routes - view recipes
router.get("/", getRecipes); // GET /api/recipes
router.get("/my-recipes", getMyRecipes); // GET /api/recipes/my-recipes
router.get("/:id", getRecipeById); // GET /api/recipes/:id

// POST/PUT/DELETE routes - modify recipes (editors only)
router.post("/", verifyEditor, createRecipe); // POST /api/recipes
router.put("/:id", verifyEditor, updateRecipe); // PUT /api/recipes/:id
router.delete("/:id", verifyEditor, deleteRecipe); // DELETE /api/recipes/:id

export default router;
