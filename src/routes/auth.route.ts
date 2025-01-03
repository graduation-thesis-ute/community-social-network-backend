import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/auth.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth management
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *   summary: Register a new account
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateAccountInput'
 *   responses:
 *    201:
 *     description: Account created successfully, please check your email to verify your account
 *    400:
 *     description: User already exists
 *    500:
 *     description: Error creating user
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *   summary: Login account
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LoginAccountInput'
 *   responses:
 *    200:
 *     description: Login successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/LoginAccountOutput'
 *    400:
 *     description: Invalid password
 *    404:
 *     description: User not found
 *    500:
 *     description: Error logging in user
 *
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/v1/auth/refresh-access-token:
 *  post:
 *   summary: Refresh access token
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        refreshToken:
 *         type: string
 *         description: The refresh token
 *         default: "example-refresh-token-string"
 *   responses:
 *    200:
 *     description: Access token refreshed successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/RefreshAccessTokenOutput'
 *    403:
 *     description: Access denied, token missing or invalid
 *    500:
 *     description: Error refreshing access token
 */
router.post("/refresh-access-token", refreshAccessToken);

/**
 * @swagger
 * /api/v1/auth/logout:
 *  post:
 *   summary: Logout account
 *   tags: [Auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        refreshToken:
 *         type: string
 *         description: The refresh token
 *         default: "example-refresh-token-string"
 *   responses:
 *    200:
 *     description: User logged out successfully
 *    403:
 *     description: Access denied, token missing
 *    500:
 *     description: Error logging out user
 */
router.post("/logout", logoutUser);

export default router;
