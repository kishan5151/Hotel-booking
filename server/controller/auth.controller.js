/** @format */

import { User } from "../models/user.model.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
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
      return res.status(400).json({
        success: false,
        error: "Incomplete information",
      });
    }

    //check if user already is not login
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already exist",
      });
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
    res.status(400).json({
      success: false,
      error: "Something want wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email or Password is required",
      });
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
      return res.status(400).json({
        success: false,
        error: "Email or Password is incorrect",
      });
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
    res.status(400).json({
      success: false,
      message: "Something want wrong",
    });
  }
};
