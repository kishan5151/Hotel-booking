/** @format */

import express from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller.js";
import { uploadSingleImage } from "../middlewares/uploadImage.middleware.js";
const router = express.Router();

router.post("/register", uploadSingleImage, registerController);
router.post("/login", loginController);
export default router;
