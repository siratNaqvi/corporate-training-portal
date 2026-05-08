import express from "express";
import {
  createTraining,
  getAllTrainings,
  assignTraining,
  getTrainerTrainings,
  getMyTrainings,
  updateProgress,
   getCertificates,        // ✅ ADD THIS
  downloadCertificate
} from "../controllers/trainingController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { getTrainerEmployeeProgress } from "../controllers/trainingController.js";
const router = express.Router();
router.get("/trainer/progress", verifyToken, getTrainerEmployeeProgress);
router.post("/create", verifyToken, createTraining);
router.get("/", verifyToken, getAllTrainings);
router.post("/assign", verifyToken, assignTraining);
router.get("/trainer", verifyToken, getTrainerTrainings);
router.get("/my", verifyToken, getMyTrainings);
router.get("/certificates", verifyToken, getCertificates);
router.get("/certificate/:id", verifyToken, downloadCertificate);
/* 🔥 FIXED MISSING ROUTE */
router.post("/progress", verifyToken, updateProgress);
console.log("✅ trainingRoutes loaded");

export default router;