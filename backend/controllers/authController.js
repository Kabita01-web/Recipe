// export const register = (req, res) => {
//   res.status(200).json({ message: "User registration successful" });
// };

// export const userProfile = (req, res) => {
//   res.status(200).json({ message: "User profile data" });
// };

// export const udateProfile = (req, res) => {
//   const userId = req.params.id;
//   res.status(200).json({ message: "User profile updated successfully" });
// };

// export const deleteProfile = (req, res) => {
//   const userId = req.params.id;
//   res.status(200).json({ message: "User profile deleted successfully" });
// };

import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, avatar, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: `${username} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      avatar,
      role: role || "user",
    });

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      role: newUser.role,
    };

    res
      .status(201)
      .json({ message: "User registered successfully", data: userResponse });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    // ✅ SEND BOTH TOKEN AND USER
    res.json({
      token, // ← CRITICAL: Frontend needs this
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logoutUser = (req, res) => {
  res.status(200).json({ msg: "Logged out successfully" });
};
