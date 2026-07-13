import express from "express";
import { registerUser, loginUser, logoutUser, deleteUser } from "../controllers/userControllers";
import { authenticateToken } from "../middleware/auth.middleware";
import requireAdmin from "../middleware/role.middleware";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", logoutUser);

// delete a user
router.delete("/users/:id", authenticateToken, requireAdmin, deleteUser);

export default router;