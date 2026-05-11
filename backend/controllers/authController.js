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

    // Create user response object
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
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if the user's password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week

    const token = jwt.sign(
      {
        id: user._id,

        username: user.username,
        avatar: user.avatar,
        role: user.role, // replace isAdmin: false with this
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age },
    );

    // Create user info object
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar, // This will be null if no avatar
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: age,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "Logged out successfully" });
};
