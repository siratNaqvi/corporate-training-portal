import express from "express";
import {
  createModule,
  getModulesByTraining,
  getAllModules
} from "../controllers/moduleController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Trainer creates module
router.post("/create", verifyToken, createModule);

// Get modules by training
router.get("/training/:training_id", verifyToken, getModulesByTraining);

// NEW: get all modules (for dashboard)
router.get("/all", verifyToken, getAllModules);

export default router;