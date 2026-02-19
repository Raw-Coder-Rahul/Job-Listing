import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // corrected env var
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        req.id = decoded.userId; // attach userId to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};

export default authenticateToken;
