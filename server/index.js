/** @format */

import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./config/connectDb.js";
import authRoutes from "./routes/auth.route.js";

//Connect DB
connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
