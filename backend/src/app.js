import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/certificates", certificateRoutes);
// ✅ MUST exist
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/trainer", trainerRoutes);
// test route
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;