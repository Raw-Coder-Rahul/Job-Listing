import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }
        //convert passwords to hashes
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });
    } catch (error) {

    }
};