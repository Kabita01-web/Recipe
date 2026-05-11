import express from "express";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from "../controllers/recipeController.js";
import { verifyEditor } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", verifyEditor, createRecipe);
router.delete("/delete/:id", verifyEditor, deleteRecipe);
router.put("/edit/:id", verifyEditor, updateRecipe);

export default router;
