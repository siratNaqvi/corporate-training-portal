import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getMyCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.get("/my", verifyToken, getMyCertificates);

export default router;