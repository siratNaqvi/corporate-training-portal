import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppDataSource from "./config/data-source.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // ✅ Allow localhost
    // ✅ Allow ANY vercel.app domain
    if (
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());

// ✅ Initialize DB once - works for both local and Vercel
let isDbInitialized = false;

const initializeDb = async () => {
  if (!isDbInitialized) {
    try {
      await AppDataSource.initialize();
      isDbInitialized = true;
      console.log("Database connected");
    } catch (err) {
      console.error("DB connection error:", err);
    }
  }
};

// ✅ This ensures DB is connected before every request
app.use(async (req, res, next) => {
  await initializeDb();
  next();
});

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

// ✅ Local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// ✅ Required for Vercel
export default app;