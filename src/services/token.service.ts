import { ca } from "date-fns/locale";
import { RefreshToken } from "../models/refreshtoken.model";

// Save refresh token to database
const saveRefreshToken = async (
  userId: string,
  refreshToken: string,
  expiresIn: number
): Promise<void> => {
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  try {
    await RefreshToken.create({
      userId,
      refreshToken,
      expiresAt,
    });
    console.log("Refresh token saved successfully");
  } catch (error) {
    console.error("Error saving refresh token:", error);
  }
};

// Verify refresh token from database
const verifyRefreshTokenInDB = async (refreshToken: string): Promise<any> => {
  try {
    const storedRefreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
      isValid: true,
    });
    if (!storedRefreshToken) {
      throw new Error("Invalid refresh token");
    }

    if (new Date() > storedRefreshToken.expiresAt) {
      throw new Error("Refresh token has expired");
    }

    return { userId: storedRefreshToken.userId };
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    throw new Error("Error verifying refresh token");
  }
};

// Revoke refresh token from database
const revokeRefreshToken = async (refreshToken: string): Promise<void> => {
  try {
    await RefreshToken.updateOne(
      { refreshToken: refreshToken },
      { isValid: false }
    );
    console.log("Refresh token revoked successfully");
  } catch (error) {
    console.error("Error revoking refresh token:", error);
  }
};

export { saveRefreshToken, verifyRefreshTokenInDB, revokeRefreshToken };
