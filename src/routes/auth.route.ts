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
 *  name: User
 *  description: User management
 */

/**
 * @swagger
 * /api/v1/user/register:
 *  post:
 *   summary: Register a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/NewUser'
 *   responses:
 *    201:
 *     description: User registered successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: User already exists
 *    500:
 *     description: Error creating user
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *   summary: Login user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/LoginUser'
 *   responses:
 *    200:
 *     description: Login successful
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/LoginResponse'
 *    400:
 *     description: Invalid password
 *    404:
 *     description: User not found
 *    500:
 *     description: Error logging in user
 *
 */
router.post("/login", loginUser);
router.post("/refresh-access-token", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
