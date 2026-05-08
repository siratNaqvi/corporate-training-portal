import express from "express";
import {
  getTrainerTrainings,
  createModule,
  createQuiz,
  submitResult,
} from "../controllers/trainerController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// only trainer access
router.use(authMiddleware, roleMiddleware(["trainer"]));

router.get("/trainings", getTrainerTrainings);
router.post("/module", createModule);
router.post("/quiz", createQuiz);
router.post("/result", submitResult);
router.post("/progress", verifyToken, updateProgress);
export default router;