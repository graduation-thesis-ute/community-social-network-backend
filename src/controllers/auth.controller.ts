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
import {
  revokeRefreshToken,
  saveRefreshToken,
  verifyRefreshTokenInDB,
} from "../services/token.service";

// Register user
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, memberId } = req.body;

    //check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return APIResponse.fail(res, 409, "User already exists");
    }

    const hashedPassword = await encodePassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
      memberId,
    });
    return APIResponse.success(
      res,
      201,
      "Account created successfully, please check your email to verify your account"
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return APIResponse.error(res, 500, "Error creating user", [error.message]);
  }
};

// Login user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { memberId: username }],
    });
    if (!user) {
      return APIResponse.fail(res, 404, "User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return APIResponse.fail(res, 400, "Invalid password");
    }

    const accessToken = generateAccessToken({
      userId: user._id,
    });
    const refreshToken = generateRefreshToken({
      userId: user._id,
    });

    await saveRefreshToken(user._id as string, refreshToken, 7 * 24 * 60 * 60);
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
  try {
    verifyRefreshToken(refreshToken);
    const { userId } = await verifyRefreshTokenInDB(refreshToken);
    await revokeRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({
      id: userId,
    });
    const newRefreshToken = generateRefreshToken({
      id: userId,
    });

    await saveRefreshToken(userId, newRefreshToken, 7 * 24 * 60 * 60);

    return APIResponse.success(res, 200, "Access token refreshed", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
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
  try {
    if (!refreshToken) {
      return APIResponse.fail(res, 403, "Access denied, token missing");
    }
    await revokeRefreshToken(refreshToken);
    return APIResponse.success(res, 200, "User logged out successfully");
  } catch (error: any) {
    console.error("Error logging out user:", error);
    return APIResponse.error(res, 500, "Error logging out user", [
      error.message,
    ]);
  }
};

export { registerUser, loginUser, refreshAccessToken, logoutUser };
