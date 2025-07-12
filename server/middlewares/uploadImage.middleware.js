/** @format */

import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image to Cloudinary
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Convert buffer to data URI
    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "users", // optional: stores in Cloudinary/users/
    });

    req.body.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error("Image upload failed:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

export const uploadSingleImage = [upload.single("image"), uploadImage];
