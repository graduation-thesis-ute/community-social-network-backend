import express from "express";
import { getUsers } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

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
router.get("/users", auth(), getUsers);

export default router;
