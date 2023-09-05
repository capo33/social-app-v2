import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import UserModel from "../models/User";
import { generateToken } from "../utils/generateToken";

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

    // Set cookies
    res.status(201).json({
      success: true,
      message: "User created successfully",
      ...userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();

    // Set cookies
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username}`,
      token: token,
      ...userWithoutPassword,
    });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
 const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, answer, newPassword } = req.body;

  // Check if user exists, if not throw error
  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // Check if email is provided
  if (!email) {
    res.status(400);
    throw new Error("Please provide your email");
  }

  // Check if answer is provided
  if (!answer) {
    res.status(400);
    throw new Error("Please provide your answer");
  }

  // // Check if answer is correct
  // const isAnswerCorrect = await bcrypt.compare(answer, existingUser.answer);

  // if (!isAnswerCorrect) {
  //   res.status(400);
  //   throw new Error("Invalid credentials");
  // }

  // Check if newPassword is provided
  if (existingUser.answer !== answer) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // Check if newPassword is empty
  if (!newPassword) {
    res.status(400);
    throw new Error("Please provide a new password");
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update user password
  const user = await UserModel.findByIdAndUpdate(existingUser._id, {
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
    user,
  });
};

export { register, login, forgotPassword };
