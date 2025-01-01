import jwt from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
};

const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
};
export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
