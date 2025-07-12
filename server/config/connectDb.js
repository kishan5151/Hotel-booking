/** @format */

import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connect successfully");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
