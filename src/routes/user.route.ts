import express from "express";
import { createUser, getUsers } from "../controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 */

/**
 * @swagger
 * /api/v1/user/users:
 *  post:
 *   summary: Create a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/NewUser'
 *   responses:
 *    201:
 *     description: User created successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    400:
 *     description: User already exists
 *    500:
 *     description: Error creating user
 */
router.post("/users", createUser);

/**
 * @swagger
 * /api/v1/user/users:
 *  get:
 *   summary: Get all users
 *   tags: [User]
 *   responses:
 *    200:
 *     description: Get list users successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    500:
 *     description: Error getting users
 */
router.get("/users", getUsers);

export default router;
