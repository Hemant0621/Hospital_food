import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const router = express.Router();

// Register Route
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, username, email, password, role } = req.body;

  if (!name || !username || !email || !password || !role) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      res.status(400).send({ message: "Email already in use" });
      return;
    }

    if (existingUsername) {
      res.status(400).send({ message: "Username already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error registering user", error });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error });
  }
});

export default router;
