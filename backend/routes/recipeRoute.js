import express from "express";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/create", createRecipe);
router.delete("/delete/:id", deleteRecipe);
router.put("/edit/:id", updateRecipe);

export default router;
