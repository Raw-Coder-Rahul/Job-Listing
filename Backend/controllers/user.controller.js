import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role)
      return res.status(400).json({ message: "Missing required fields", success: false });

    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhotoUrl = "";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "profile_photos" });
        profilePhotoUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully for ${fullName}`,
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error registering user", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({ message: "Missing required fields", success: false });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Incorrect email or password", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect email or password", success: false });

    if (user.role !== role)
      return res.status(403).json({ message: "You don’t have permission to access this resource", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: `Welcome back ${user.fullName}`, user: safeUser, success: true });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error login failed", success: false });
  }
};

export const logout = (req, res) => {
  return res
    .cookie("token", "", { maxAge: 0 })
    .status(200)
    .json({ message: "Logged out successfully", success: true });
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "profile_photos" });
        user.profile.profilePhoto = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
      }
    }

    await user.save();

    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ message: "Profile updated successfully", user: safeUser, success: true });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error updating profile", success: false });
  }
};