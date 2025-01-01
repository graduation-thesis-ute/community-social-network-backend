import { Request, Response } from "express";
import { User } from "../models/user.model";
import { APIResponse } from "../utils/api-response.util";

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

export { getUsers };
