import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";  // Import Morgan for logging
import cors from "cors";
import connectDB from "./util/DataBase.js";
import userRoutes from './Router/userRoute.js';  // Import user routes
import postRoutes from "./Router/postRoute.js";
import eventRoutes from "./Router/eventRoute.js"
import searchRoutes from "./Router/searchRoute.js"; // Import search routes
import leaderboardRoutes from "./Router/leaderboard.route.js"; // Import leaderboard routes
import trendingRoutes from "./Router/trendingRoute.js"; // Import trending routes
import marketRoutes from "./Router/market.route.js"; // Import market routes
import confessionRoutes from "./Router/confession.route.js"; // Import confession routes
import dotenv from "dotenv";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));  // Use Morgan for logging HTTP requests

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true                
};
app.use(cors(corsOptions));

// Route
app.get("/api/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

app.use('/api/v1/users', userRoutes);  // Prefix for user-related routes

app.use('/api/v1/post', postRoutes);  // Prefix for user-related routes

app.use('/api/v1/event', eventRoutes);

app.use('/api/v1/search', searchRoutes);

app.use('/api/v1', leaderboardRoutes); // Prefix for leaderboard routes

app.use('/api/v1/trending', trendingRoutes);
app.use('/api/v1/market', marketRoutes); // Prefix for market routes
app.use('/api/v1/confession', confessionRoutes); // Prefix for confession routes

// Start the server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
