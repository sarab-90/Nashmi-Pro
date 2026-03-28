import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

