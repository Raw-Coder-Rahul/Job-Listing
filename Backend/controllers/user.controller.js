import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        return res.status(201).json({
            message: `Account created successfully for ${fullName}`,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error registering user",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        if (user.role !== role) {
            return res.status(403).json({
                message: "Role mismatch",
                success: false,
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict", // fixed string
            })
            .json({
                message: `Welcome back ${safeUser.fullName}`,
                user: safeUser,
                success: true,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error login failed",
            success: false,
        });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error logout",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.files;

        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        const skillsArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        await user.save();

        const safeUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: safeUser,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error updating profile",
            success: false,
        });
    }
};
