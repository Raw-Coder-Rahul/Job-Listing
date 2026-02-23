import express from "express";
import multer from "multer";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("profilePhoto"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile/update", updateProfile);

export default router;