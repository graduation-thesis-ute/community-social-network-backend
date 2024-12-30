import { Request, Response } from "express";
import User from "../models/user.model";
import { APIResponse } from "../services/api-response";

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    //check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return APIResponse.fail(res, 409, "User already exists");
    }
    const newUser = new User({
      name,
      email,
      password,
      role,
    });
    await newUser.save();
    return APIResponse.success(res, 201, "User created successfully");
  } catch (error: any) {
    console.error("Error creating user:", error);
    return APIResponse.error(res, 500, "Error creating user", [error.message]);
  }
};

// Get all users
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    return APIResponse.success(res, 200, "Get list users successfully", users);
  } catch (error: any) {
    console.error("Error getting users:", error);
    return APIResponse.error(res, 500, "Error getting users", [error.message]);
  }
};

export { createUser, getUsers };
