import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";

// register a user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const normalizedRole = role === "admin" ? "admin" : "user";

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role: normalizedRole });
    const userResponse = user.toObject();
    const safeUser = {
      id: userResponse._id,
      name: userResponse.name,
      email: userResponse.email,
      role: userResponse.role,
    };

    return res.status(201).json({ message: "User registered successfully", user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "User logged in successfully", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in", error });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error logging out", error: err });
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const userRole = req.userRole;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!userRole || userRole !== "admin") {
    return res.status(403).json({ message: "Insufficient permissions" });
  }

  const userIdParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userIdParam)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user", error });
  }
};