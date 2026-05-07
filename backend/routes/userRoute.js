import express from "express";
import { updateUser } from "../controllers/userControlller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/edit-profile/:id", verifyToken, updateUser);

export default router;
