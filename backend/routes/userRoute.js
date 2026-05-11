import express from "express";
import {
  updateUser,
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/userControlller.js";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/edit-profile/:id", verifyToken, updateUser);
router.get("/", verifyAdmin, getAllUsers);
router.delete("/:id", verifyAdmin, deleteUser);
router.put("/:id/role", verifyAdmin, updateUserRole);

export default router;
