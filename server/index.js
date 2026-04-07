import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import auth from "./src/routes/authRoutes.js";
import  users from "./src/routes/userRoutes.js";
import camp from "./src/routes/campRoutes.js";
import {errorHandler} from "./src/middleware/errorHandlerMiddleware.js";
// import {globalRateLimitMiddleware} from "./src/middleware/globalRateLimitMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// app.use(globalRateLimitMiddleware); // Apply rate limiting to all routes
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/camps", camp);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});