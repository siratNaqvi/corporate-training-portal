import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./config/data-source.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
// routes
import authRoutes from "./routes/authRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: "http://localhost:5173", // 👈 FIXED
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/dashboard", dashboardRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// users test route
app.get("/api/users", async (req, res) => {
  try {
    const users = await AppDataSource.query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DB + server start
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });