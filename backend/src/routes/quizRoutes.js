import express from "express";
import {
  createQuiz,
  getQuizByModule,
  submitQuiz,
   attemptQuiz
} from "../controllers/quizController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { getQuizByTraining } from "../controllers/quizController.js";
const router = express.Router();

// Trainer
router.post("/create", verifyToken, createQuiz);

// Employee
router.get("/:module_id", verifyToken, getQuizByModule);
router.post("/submit", verifyToken, submitQuiz);
router.get("/training/:training_id", verifyToken, getQuizByTraining);
router.post("/attempt", verifyToken, attemptQuiz);
export default router;