import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // IMPORTANT for development
  logging: false,
  entities: ["src/entities/*.js"],
    entities: [
  "src/entities/User.js",
  "src/entities/TrainingProgram.js",
  "src/entities/CourseModule.js",
  "src/entities/Enrollment.js",
  "src/entities/Quiz.js",
  "src/entities/QuizResult.js",
  "src/entities/Certificate.js"
],
});

export default AppDataSource;