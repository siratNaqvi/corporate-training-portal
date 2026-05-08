import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User.js";
import { TrainingProgram } from "../entities/TrainingProgram.js";
import { CourseModule } from "../entities/CourseModule.js";
import { Enrollment } from "../entities/Enrollment.js";
import { Quiz } from "../entities/Quiz.js";
import { QuizResult } from "../entities/QuizResult.js";
import { Certificate } from "../entities/Certificate.js";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  entities: [User, TrainingProgram, CourseModule, Enrollment, Quiz, QuizResult, Certificate],
});

export default AppDataSource;