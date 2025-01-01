import { Request, Response } from "express";
import { User } from "../models/user.model";
import { APIResponse } from "../utils/api-response.util";
import { comparePassword, encodePassword } from "../utils/bcrypt.util";
import { generate } from "otp-generator";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";

const refreshTokens: string[] = [];

// Register user
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, memberId } = req.body;

    //check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return APIResponse.fail(res, 409, "User already exists");
    }

    const hashedPassword = await encodePassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      memberId,
    });
    return APIResponse.success(res, 201, "User created successfully", newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    return APIResponse.error(res, 500, "Error creating user", [error.message]);
  }
};

// Login user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return APIResponse.fail(res, 404, "User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return APIResponse.fail(res, 400, "Invalid password");
    }

    const accessToken = generateAccessToken({
      userId: user._id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id,
      email: user.email,
    });

    refreshTokens.push(refreshToken);
    return APIResponse.success(res, 200, "Login successful", {
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error("Error logging in user:", error);
    return APIResponse.error(res, 500, "Error logging in user", [
      error.message,
    ]);
  }
};

// Refresh Access Token
const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return APIResponse.fail(res, 403, "Access denied, token missing");
  }

  if (!refreshTokens.includes(refreshToken)) {
    return APIResponse.fail(res, 403, "Access denied, invalid token");
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    if (refreshTokens.includes(refreshToken)) {
      return APIResponse.fail(res, 403, "Access denied, invalid token");
    }

    const newAccessToken = generateAccessToken({
      id: (decoded as any).id,
      email: (decoded as any).email,
    });
    return APIResponse.success(res, 200, "Access token refreshed", {
      accessToken: newAccessToken,
    });
  } catch (error: any) {
    console.error("Error refreshing access token:", error);
    return APIResponse.error(res, 500, "Error refreshing access token", [
      error.message,
    ]);
  }
};

// Logout user
const logoutUser = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return APIResponse.fail(res, 403, "Access denied, token missing");
  }

  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) {
    refreshTokens.splice(index, 1);
  }
  return APIResponse.success(res, 200, "User logged out successfully");
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
