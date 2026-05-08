import AppDataSource from "../config/data-source.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

const userRepo = AppDataSource.getRepository("User");

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await userRepo.save(user);

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};