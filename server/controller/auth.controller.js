/** @format */

import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const registerController = async (req, res, next) => {
  try {
    //get reqeste
    const {
      username,
      email,
      password,
      role,
      imageUrl,
      street,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    if (!username || !email || !password || !imageUrl) {
      return next(new AppError("Incomplete information", 400));
    }

    //check if user already is not login
    const user = await User.findOne({ email });
    if (user) {
      return next(new AppError("User already exist", 400));
    }

    //create new schema object
    const newUser = new User({
      username,
      email,
      password,
      imageUrl,
      role,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });
    newUser.save();
    res.status(200).json({
      success: true,
      message: "User create successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return next(new AppError("Email or Password is required", 400));
    }

    //get user detail
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Email or Password is incorrect",
      });
    }

    const isValidPassword = await user.comaprePassword(password);
    if (!isValidPassword) {
      return new AppError("Email or Password is incorrect", 400);
    }

    //toke generation
    const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        email: user.email,
        role: user.role,
        username: user.username,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
