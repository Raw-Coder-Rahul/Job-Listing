import express from "express";
import multer from "multer";
import path from "path";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

router.post("/register", upload.single("profilePhoto"), register);
router.post("/login", login);
router.post("/logout", logout);

// Protect profile update route
router.post(
  "/profile/update",
  authenticateToken,
  upload.single("profilePhoto"),
  updateProfile
);

export default router;