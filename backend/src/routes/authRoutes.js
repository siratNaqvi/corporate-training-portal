import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// ✅ AUTH ROUTES (MISSING BEFORE)
router.post("/register", register);
router.post("/login", login);

// Protected test route
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

export default router;