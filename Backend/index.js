import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5474"],
  credentials: true,
};
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API!",
    timestamp: new Date().toISOString(),
    success: true,
  });
});

const PORT = process.env.PORT || 5000;

// api's
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  console.log(`If check click http://localhost:${PORT}`);
});
