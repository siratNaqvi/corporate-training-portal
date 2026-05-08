import express from "express";
import {
  getHRDashboard,
  getDashboardDetails
} from "../controllers/dashboardController.js";

const router = express.Router();

// HR stats
router.get("/hr", getHRDashboard);

// Activity + charts
router.get("/details", getDashboardDetails);

export default router;