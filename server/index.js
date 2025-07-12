/** @format */

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./config/connectDb.js";

dotenv.config({ path: "./config/config.env" });

//Connect DB
connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(morgan("dev"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
